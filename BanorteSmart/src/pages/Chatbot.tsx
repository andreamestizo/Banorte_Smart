import React, { useState, useRef, useEffect } from 'react';
import { getDataSummary as getElectricityDataSummary } from '../data/electricityData';
import { getDataSummary as getWaterDataSummary } from '../data/waterData';
import logo from '../assets/Logo.png';
import './Chatbot.css';

interface ChatbotProps {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  '¿Qué día gasté más en electricidad?',
  '¿Cuánto ahorré esta semana?',
  '¿Cuánto gasté en agua?',
  'Dame recomendaciones para ahorrar',
  '¿Cuál es mi consumo total?',
  '¿Cuándo tengo picos de consumo?',
];

export const Chatbot: React.FC<ChatbotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        '¡Hola! Soy Maya, tu asistente de Banorte. Puedo ayudarte a analizar tu consumo de electricidad y agua, y darte recomendaciones para ahorrar en ambos servicios. ¿En qué puedo ayudarte?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(messageText);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (message: string): Promise<string> => {
    const electricitySummary = getElectricityDataSummary();
    const waterSummary = getWaterDataSummary();
    const apiKey =  import.meta.env.VITE_GEMINI_API_KEY;

    // If no API key, provide rule-based responses
    if (!apiKey) {
      return getRuleBasedResponse(message, electricitySummary, waterSummary);
    }

    // Call Google Gemini API
    try {
      const systemPrompt = `Eres Maya, la asistente virtual de Banorte para ayudar con el análisis de consumo de electricidad y agua. Responde en español de manera amigable y profesional.

Aquí está el resumen de datos del usuario:

ELECTRICIDAD:
- Semana actual: ${electricitySummary.currentWeek.dateRange}, Total: $${electricitySummary.currentWeek.total} MXN, Promedio: $${electricitySummary.currentWeek.average} MXN/día
- Semana pasada: ${electricitySummary.lastWeek.dateRange}, Total: $${electricitySummary.lastWeek.total} MXN, Promedio: $${electricitySummary.lastWeek.average} MXN/día
- ${electricitySummary.savings.saved ? `Ahorro: $${electricitySummary.savings.amount.toFixed(2)} MXN (${electricitySummary.savings.percentage}%)` : `Mayor consumo: $${electricitySummary.savings.amount.toFixed(2)} MXN (${electricitySummary.savings.percentage}%)`}
- Día con mayor consumo: ${electricitySummary.highestCostDay.day}, ${electricitySummary.highestCostDay.date}, $${electricitySummary.highestCostDay.cost} MXN
- Promedio diario: $${electricitySummary.averageDailyCost} MXN
- Picos detectados: ${electricitySummary.spikes.length}

AGUA:
- Semana actual: ${waterSummary.currentWeek.dateRange}, Total: $${waterSummary.currentWeek.total} MXN, Promedio: $${waterSummary.currentWeek.average} MXN/día
- Semana pasada: ${waterSummary.lastWeek.dateRange}, Total: $${waterSummary.lastWeek.total} MXN, Promedio: $${waterSummary.lastWeek.average} MXN/día
- ${waterSummary.savings.saved ? `Ahorro: $${waterSummary.savings.amount.toFixed(2)} MXN (${waterSummary.savings.percentage}%)` : `Mayor consumo: $${waterSummary.savings.amount.toFixed(2)} MXN (${waterSummary.savings.percentage}%)`}
- Día con mayor consumo: ${waterSummary.highestCostDay.day}, ${waterSummary.highestCostDay.date}, $${waterSummary.highestCostDay.cost} MXN
- Promedio diario: $${waterSummary.averageDailyCost} MXN
- Picos detectados: ${waterSummary.spikes.length}

TOTAL COMBINADO:
- Costo total esta semana: $${electricitySummary.currentWeek.total + waterSummary.currentWeek.total} MXN
- Costo total semana pasada: $${electricitySummary.lastWeek.total + waterSummary.lastWeek.total} MXN

Responde de manera concisa (máximo 3-4 oraciones) y da recomendaciones prácticas cuando sea relevante.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemPrompt + '\n\nPregunta del usuario: ' + message,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return getRuleBasedResponse(message, electricitySummary, waterSummary);
    }
  };

  interface DataSummary {
    currentWeek: { total: number; average: number; dateRange: string };
    lastWeek: { total: number; average: number; dateRange: string };
    savings: { saved: boolean; amount: number; percentage: string };
    highestCostDay: { day: string; date: string; cost: number };
    averageDailyCost: string;
    spikes: unknown[];
  }

  const getRuleBasedResponse = (message: string, electricitySummary: DataSummary, waterSummary: DataSummary): string => {
    const lowerMessage = message.toLowerCase();
    const combinedTotal = electricitySummary.currentWeek.total + waterSummary.currentWeek.total;
    const combinedLastWeek = electricitySummary.lastWeek.total + waterSummary.lastWeek.total;

    // Water-specific queries
    if (lowerMessage.includes('agua')) {
      if (lowerMessage.includes('día') && lowerMessage.includes('más')) {
        return `En agua, el día que más gastaste fue el ${waterSummary.highestCostDay.day} con $${waterSummary.highestCostDay.cost} MXN (${waterSummary.highestCostDay.date}).`;
      }
      if (lowerMessage.includes('gast') || lowerMessage.includes('consum') || lowerMessage.includes('cuánto')) {
        return `Esta semana en agua gastaste $${waterSummary.currentWeek.total} MXN, con un promedio de $${waterSummary.currentWeek.average} MXN por día. ${waterSummary.savings.saved ? `¡Ahorraste $${waterSummary.savings.amount.toFixed(2)} MXN comparado con la semana pasada!` : `Gastaste $${waterSummary.savings.amount.toFixed(2)} MXN más que la semana pasada.`}`;
      }
    }

    // Electricity-specific queries
    if (lowerMessage.includes('electricidad') || lowerMessage.includes('luz')) {
      if (lowerMessage.includes('día') && lowerMessage.includes('más')) {
        return `En electricidad, el día que más gastaste fue el ${electricitySummary.highestCostDay.day} con $${electricitySummary.highestCostDay.cost} MXN (${electricitySummary.highestCostDay.date}).`;
      }
      if (lowerMessage.includes('gast') || lowerMessage.includes('consum')) {
        return `Esta semana en electricidad gastaste $${electricitySummary.currentWeek.total} MXN, con un promedio de $${electricitySummary.currentWeek.average} MXN por día. ${electricitySummary.savings.saved ? `¡Ahorraste $${electricitySummary.savings.amount.toFixed(2)} MXN!` : `Gastaste $${electricitySummary.savings.amount.toFixed(2)} MXN más que la semana pasada.`}`;
      }
    }

    // Total/combined queries
    if (lowerMessage.includes('total') || lowerMessage.includes('ambos') || lowerMessage.includes('todo')) {
      return `Esta semana tu consumo total fue de $${combinedTotal.toFixed(2)} MXN (Electricidad: $${electricitySummary.currentWeek.total} + Agua: $${waterSummary.currentWeek.total}). La semana pasada fue de $${combinedLastWeek.toFixed(2)} MXN.`;
    }

    // General highest day
    if (lowerMessage.includes('día') && lowerMessage.includes('más')) {
      return `Tus días con mayor consumo fueron:\n- Electricidad: ${electricitySummary.highestCostDay.day} con $${electricitySummary.highestCostDay.cost} MXN\n- Agua: ${waterSummary.highestCostDay.day} con $${waterSummary.highestCostDay.cost} MXN`;
    }

    // Savings
    if (lowerMessage.includes('ahorr')) {
      const electricitySaved = electricitySummary.savings.saved;
      const waterSaved = waterSummary.savings.saved;

      if (electricitySaved && waterSaved) {
        return `¡Excelente! Ahorraste en ambos servicios: $${electricitySummary.savings.amount.toFixed(2)} MXN en electricidad y $${waterSummary.savings.amount.toFixed(2)} MXN en agua. ¡Total ahorrado: $${(electricitySummary.savings.amount + waterSummary.savings.amount).toFixed(2)} MXN!`;
      } else if (electricitySaved) {
        return `Ahorraste $${electricitySummary.savings.amount.toFixed(2)} MXN en electricidad, pero aumentaste $${waterSummary.savings.amount.toFixed(2)} MXN en agua.`;
      } else if (waterSaved) {
        return `Ahorraste $${waterSummary.savings.amount.toFixed(2)} MXN en agua, pero aumentaste $${electricitySummary.savings.amount.toFixed(2)} MXN en electricidad.`;
      } else {
        return `Esta semana aumentó tu consumo: $${electricitySummary.savings.amount.toFixed(2)} MXN en electricidad y $${waterSummary.savings.amount.toFixed(2)} MXN en agua.`;
      }
    }

    // Spikes
    if (lowerMessage.includes('pico')) {
      return `Detecté ${electricitySummary.spikes.length} picos en electricidad y ${waterSummary.spikes.length} picos en agua. Te recomiendo revisar qué actividades realizaste en esos días para reducir el consumo.`;
    }

    // Recommendations
    if (lowerMessage.includes('recomend')) {
      return `Te recomiendo:\n\nElectricidad:\n1) Evita usar electrodomésticos de alto consumo en horas pico\n2) Apaga luces y equipos que no uses\n\nAgua:\n1) Revisa que no haya fugas\n2) Cierra la llave mientras te enjabonas\n3) Usa la lavadora con cargas completas`;
    }

    // Average
    if (lowerMessage.includes('promedio')) {
      return `Tus promedios diarios son: Electricidad $${electricitySummary.averageDailyCost} MXN y Agua $${waterSummary.averageDailyCost} MXN. Total: $${(parseFloat(electricitySummary.averageDailyCost) + parseFloat(waterSummary.averageDailyCost)).toFixed(2)} MXN/día.`;
    }

    return 'Puedo ayudarte a analizar tu consumo de electricidad y agua. Pregúntame sobre tus gastos, picos de consumo, ahorros o recomendaciones para reducir tu consumo en ambos servicios.';
  };

  return (
    <div className="chatbot-page">
      {/* Header */}
      <div className="chatbot-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <div className="header-info">
          <img src={logo} alt="Maya" className="maya-header-logo" />
          <div>
            <h1 className="chatbot-title">Maya</h1>
            <p className="chatbot-subtitle">Asistente de Banorte</p>
          </div>
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <img src={logo} alt="Maya" className="message-avatar" />
            )}
            <div className="message-bubble">
              <p>{msg.content}</p>
              <span className="message-time">
                {msg.timestamp.toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <img src={logo} alt="Maya" className="message-avatar" />
            <div className="message-bubble loading">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="quick-questions">
          <p className="quick-questions-title">Preguntas rápidas:</p>
          <div className="quick-questions-grid">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => handleSend(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button
          className="send-btn"
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
        >
          ➤
        </button>
      </div>
    </div>
  );
};
