import React from 'react';
import { Button } from './Button';
import './ConsentModal.css';

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="consent-modal-overlay">
      <div className="consent-modal">
        <div className="consent-modal-header">
          <h2>Consentimiento de Uso de Datos</h2>
        </div>

        <div className="consent-modal-content">
          <p>
            Para continuar con el análisis de tus servicios y realizar pagos,
            necesitamos tu autorización para acceder y procesar los datos de consumo
            de tus servicios de electricidad y agua.
          </p>

          <div className="consent-details">
            <h3>¿Qué datos utilizaremos?</h3>
            <ul>
              <li>Histórico de consumo de electricidad (CFE)</li>
              <li>Histórico de consumo de agua</li>
              <li>Datos de facturación y pagos</li>
              <li>Información de tu cuenta</li>
            </ul>

            <h3>¿Para qué los usaremos?</h3>
            <ul>
              <li>Análisis de patrones de consumo</li>
              <li>Recomendaciones personalizadas de ahorro</li>
              <li>Procesamiento de pagos</li>
              <li>Alertas de consumo elevado</li>
            </ul>
          </div>

          <p className="consent-note">
            Tus datos estarán protegidos y solo se utilizarán para los fines descritos.
            Puedes revocar este consentimiento en cualquier momento desde la configuración.
          </p>
        </div>

        <div className="consent-modal-actions">
          <Button variant="secondary" onClick={onDecline} fullWidth>
            No Acepto
          </Button>
          <Button variant="primary" onClick={onAccept} fullWidth>
            Acepto
          </Button>
        </div>
      </div>
    </div>
  );
};
