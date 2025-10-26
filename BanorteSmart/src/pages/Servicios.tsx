import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { electricityData, calculateSavings as calculateElectricitySavings, getLastWeek as getElectricityLastWeek } from '../data/electricityData';
import { waterData, calculateSavings as calculateWaterSavings, getLastWeek as getWaterLastWeek } from '../data/waterData';
import savingsIcon from '../assets/savings-icon.png';
import increaseIcon from '../assets/increase-icon.png';
import warningIcon from '../assets/warning-icon.png';
import paymentFullIcon from '../assets/payment-full-icon.png';
import paymentPartsIcon from '../assets/payment-parts-icon.png';
import paymentDeferIcon from '../assets/payment-defer-icon.png';
import paymentCustomIcon from '../assets/payment-custom-icon.png';
import checkmarkIcon from '../assets/checkmark-icon.png';
import infoIcon from '../assets/info-icon.png';
import clockIcon from '../assets/clock-icon.png';
import investmentIcon from '../assets/investment-icon.png';
import './Servicios.css';

interface ServiciosProps {
  onBack: () => void;
  successMessage?: string;
  onClearMessage?: () => void;
  onNavigateToCFELogin?: () => void;
  onNavigateToWaterLogin?: () => void;
}

const dailyElectricityData = [
  { hour: '00:00', cost: 8, kwh: 2.2 },
  { hour: '04:00', cost: 6, kwh: 1.7 },
  { hour: '08:00', cost: 15, kwh: 4.2 },
  { hour: '12:00', cost: 35, kwh: 9.7 }, // Spike!
  { hour: '16:00', cost: 45, kwh: 12.5 }, // Spike!
  { hour: '20:00', cost: 22, kwh: 6.1 },
  { hour: '23:59', cost: 12, kwh: 3.3 },
];

const dailyWaterData = [
  { hour: '00:00', cost: 5, m3: 0.06 },
  { hour: '04:00', cost: 4, m3: 0.05 },
  { hour: '08:00', cost: 10, m3: 0.12 },
  { hour: '12:00', cost: 22, m3: 0.27 }, // Spike!
  { hour: '16:00', cost: 28, m3: 0.35 }, // Spike!
  { hour: '20:00', cost: 14, m3: 0.17 },
  { hour: '23:59', cost: 8, m3: 0.10 },
];

export const Servicios: React.FC<ServiciosProps> = ({ onBack, successMessage, onClearMessage, onNavigateToCFELogin, onNavigateToWaterLogin }) => {
  // Check authentication status
  const cfeAuth = localStorage.getItem('cfeAuthenticated') === 'true';
  const waterAuth = localStorage.getItem('waterAuthenticated') === 'true';

  // Set initial service type based on what's authenticated
  const [serviceType, setServiceType] = useState<'electricity' | 'water'>(cfeAuth ? 'electricity' : 'water');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [paymentMode, setPaymentMode] = useState<'full' | 'parts' | 'debt' | 'custom'>('full');
  const [customAmount, setCustomAmount] = useState('');

  // Handler for service type change with auth check
  const handleServiceTypeChange = (type: 'electricity' | 'water') => {
    if (type === 'electricity' && !cfeAuth) {
      // Redirect to CFE login
      if (onNavigateToCFELogin) {
        onNavigateToCFELogin();
      }
      return;
    }
    if (type === 'water' && !waterAuth) {
      // Redirect to water login
      if (onNavigateToWaterLogin) {
        onNavigateToWaterLogin();
      }
      return;
    }
    setServiceType(type);
    setSelectedWeekIndex(0);
  };

  // Get data based on service type
  const serviceData = serviceType === 'electricity' ? electricityData : waterData;
  const selectedWeek = serviceData[selectedWeekIndex];
  const lastWeek = serviceType === 'electricity' ? getElectricityLastWeek() : getWaterLastWeek();
  const calculateSavings = serviceType === 'electricity' ? calculateElectricitySavings : calculateWaterSavings;
  const savings = calculateSavings(selectedWeek, lastWeek);
  const serviceLabel = serviceType === 'electricity' ? 'Electricidad' : 'Agua';
  const serviceUnit = serviceType === 'electricity' ? 'kWh' : 'm³';

  // Calculate combined total for both services
  const electricityWeek = electricityData[selectedWeekIndex];
  const waterWeek = waterData[selectedWeekIndex];
  const combinedTotal = electricityWeek.total + waterWeek.total;

  const dailyData = serviceType === 'electricity' ? dailyElectricityData : dailyWaterData;
  const data = viewMode === 'week' ? selectedWeek.days : dailyData;
  const totalCost = selectedWeek.total;
  const averageCost = Math.round(totalCost / selectedWeek.days.length);

  // Detect spikes (more than 2x average)
  const spikes = data.filter((item) => item.cost > averageCost * 2);

  const getPaymentAmount = () => {
    switch (paymentMode) {
      case 'full':
        return totalCost;
      case 'parts':
        return Math.round(totalCost / 3); // 3 parts
      case 'debt':
        return 0; // No immediate payment
      case 'custom':
        return parseFloat(customAmount) || 0;
      default:
        return totalCost;
    }
  };

  const handlePayment = () => {
    const amount = getPaymentAmount();
    if (paymentMode === 'custom' && amount < 50) {
      alert('El pago mínimo es de $50 MXN');
      return;
    }
    alert(`Pago procesado: $${amount.toFixed(2)} MXN`);
  };

  const handleCombinedPayment = () => {
    alert(`Pago procesado de ambos servicios:\n\nElectricidad: $${electricityWeek.total.toFixed(2)} MXN\nAgua: $${waterWeek.total.toFixed(2)} MXN\n\nTotal: $${combinedTotal.toFixed(2)} MXN`);
  };

  return (
    <div className="servicios-page">
      {/* Header */}
      <div className="servicios-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="servicios-title">Servicios</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="servicios-content">
        {/* Success Message */}
        {successMessage && (
          <div className="auth-success-message">
            <span className="success-icon">✓</span>
            <span>{successMessage}</span>
            <button
              className="close-message-btn"
              onClick={onClearMessage}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        )}

        {/* Service Type Selector */}
        <div className="service-selector">
          <button
            className={`service-option ${serviceType === 'electricity' ? 'active' : ''} ${!cfeAuth ? 'locked' : ''}`}
            onClick={() => handleServiceTypeChange('electricity')}
          >
            {!cfeAuth ? 'Electricidad (No vinculado)' : 'Electricidad'}
          </button>
          <button
            className={`service-option ${serviceType === 'water' ? 'active' : ''} ${!waterAuth ? 'locked' : ''}`}
            onClick={() => handleServiceTypeChange('water')}
          >
            {!waterAuth ? 'Agua (No vinculado)' : 'Agua'}
          </button>
        </div>

        {/* Week Selector */}
        <div className="week-selector">
          <label className="gotham-book-12">Seleccionar semana</label>
          <select
            value={selectedWeekIndex}
            onChange={(e) => setSelectedWeekIndex(parseInt(e.target.value))}
            className="week-dropdown gotham-medium-15"
          >
            {serviceData.map((week, index) => (
              <option key={index} value={index}>
                {week.dateRange}
              </option>
            ))}
          </select>
        </div>

        {/* Savings Comparison */}
        {selectedWeekIndex === 0 && (
          <div className={`savings-card ${savings.saved ? 'positive' : 'negative'}`}>
            <div className="savings-icon">
              <img
                src={savings.saved ? savingsIcon : increaseIcon}
                alt={savings.saved ? 'Ahorro' : 'Incremento'}
                className="savings-icon-img"
              />
            </div>
            <div className="savings-content">
              {savings.saved ? (
                <>
                  <strong>¡Ahorraste esta semana!</strong>
                  <p>
                    ${savings.amount.toFixed(2)} MXN menos que la semana pasada (
                    {savings.percentage}%)
                  </p>
                  <div className="investment-opportunity">
                    <img src={investmentIcon} alt="Inversión" className="investment-icon-img" />
                    <span>¡Haz que tu dinero tenga propósito! Consulta nuestras ofertas de inversión.</span>
                  </div>
                </>
              ) : (
                <>
                  <strong>Mayor consumo esta semana</strong>
                  <p>
                    ${savings.amount.toFixed(2)} MXN más que la semana pasada (
                    {savings.percentage}%)
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* View Tabs */}
        <div className="view-tabs">
          <button
            className={`tab ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Semanal
          </button>
          <button
            className={`tab ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Diario
          </button>
        </div>

        {/* Consumption Title */}
        <h2 className="section-title">Consumo de {serviceLabel}</h2>

        {/* Spike Alert */}
        {spikes.length > 0 && (
          <div className="spike-alert">
            <div className="alert-icon">
              <img src={warningIcon} alt="Alerta" className="alert-icon-img" />
            </div>
            <div className="alert-content">
              <strong>Picos de consumo detectados</strong>
              <p>
                Se detectaron {spikes.length} picos de consumo{' '}
                {viewMode === 'week' ? 'esta semana' : 'hoy'}
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={viewMode === 'week' ? 'day' : 'hour'}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number, name: string, props: { payload: Record<string, number> }) => {
                  if (name === 'cost') {
                    const consumptionKey = serviceType === 'electricity' ? 'kwh' : 'm3';
                    const consumption = props.payload[consumptionKey];
                    return [
                      `$${value} MXN (${consumption} ${serviceUnit})`,
                      'Costo'
                    ];
                  }
                  return [`$${value} MXN`, 'Costo'];
                }}
                contentStyle={{
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                }}
              />
              <Bar
                dataKey="cost"
                fill="#EB0029"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total esta semana</p>
            <p className="stat-value">${totalCost.toFixed(2)} MXN</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Promedio diario</p>
            <p className="stat-value">${averageCost.toFixed(2)} MXN</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <h3 className="payment-title">Opciones de Pago</h3>

          <div className="payment-options">
            <button
              className={`payment-option ${paymentMode === 'full' ? 'selected' : ''}`}
              onClick={() => setPaymentMode('full')}
            >
              <div className="option-icon">
                <img src={paymentFullIcon} alt="Pagar todo" className="option-icon-img" />
              </div>
              <div className="option-text">
                <strong>Pagar todo</strong>
                <span>${totalCost.toFixed(2)} MXN</span>
              </div>
            </button>

            <button
              className={`payment-option ${paymentMode === 'parts' ? 'selected' : ''}`}
              onClick={() => setPaymentMode('parts')}
            >
              <div className="option-icon">
                <img src={paymentPartsIcon} alt="Pagar en partes" className="option-icon-img" />
              </div>
              <div className="option-text">
                <strong>Pagar en partes</strong>
                <span>3 pagos de ${Math.round(totalCost / 3).toFixed(2)} MXN</span>
              </div>
            </button>

            <button
              className={`payment-option ${paymentMode === 'debt' ? 'selected' : ''}`}
              onClick={() => setPaymentMode('debt')}
            >
              <div className="option-icon">
                <img src={paymentDeferIcon} alt="Diferir pago" className="option-icon-img" />
              </div>
              <div className="option-text">
                <strong>Diferir pago</strong>
                <span>Pagar después</span>
              </div>
            </button>

            <button
              className={`payment-option ${paymentMode === 'custom' ? 'selected' : ''}`}
              onClick={() => setPaymentMode('custom')}
            >
              <div className="option-icon">
                <img src={paymentCustomIcon} alt="Monto personalizado" className="option-icon-img" />
              </div>
              <div className="option-text">
                <strong>Monto personalizado</strong>
                <span>Mínimo $50 MXN</span>
              </div>
            </button>
          </div>

          {paymentMode === 'custom' && (
            <div className="custom-amount-input">
              <TextField
                label="Monto a pagar"
                value={customAmount}
                onChange={setCustomAmount}
                type="number"
                placeholder="Ingresa el monto (mín. $50)"
                helperText="El monto mínimo es de $50 MXN"
              />
            </div>
          )}

          <div className="payment-summary">
            <div className="summary-row">
              <span>Monto a pagar:</span>
              <strong>${getPaymentAmount().toFixed(2)} MXN</strong>
            </div>
            {paymentMode === 'full' && (
              <div className="summary-row success">
                <img src={checkmarkIcon} alt="Check" className="summary-icon" />
                <span>Pago total</span>
              </div>
            )}
            {paymentMode === 'parts' && (
              <div className="summary-row info">
                <img src={infoIcon} alt="Info" className="summary-icon" />
                <span>Pago 1 de 3</span>
              </div>
            )}
            {paymentMode === 'debt' && (
              <div className="summary-row warning">
                <img src={clockIcon} alt="Reloj" className="summary-icon" />
                <span>Pago diferido</span>
              </div>
            )}
          </div>

          <Button
            fullWidth
            onClick={handlePayment}
            disabled={paymentMode === 'custom' && parseFloat(customAmount) < 50}
          >
            Procesar pago
          </Button>

          <button className="credit-offer-btn" onClick={() => {}}>
            ¿Presupuesto complicado? Mantén tus servicios al día con un crédito.
          </button>
        </div>

        {/* Combined Payment Section - Only show if both services are authenticated */}
        {cfeAuth && waterAuth && (
          <div className="combined-payment-section">
            <div className="combined-header">
              <h3 className="combined-title">Pagar Ambos Servicios</h3>
              <p className="combined-subtitle">Electricidad + Agua</p>
            </div>

            <div className="combined-breakdown">
              <div className="breakdown-row">
                <span className="breakdown-label">Electricidad</span>
                <span className="breakdown-amount">${electricityWeek.total.toFixed(2)} MXN</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">Agua</span>
                <span className="breakdown-amount">${waterWeek.total.toFixed(2)} MXN</span>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-row total">
                <span className="breakdown-label">Total</span>
                <span className="breakdown-amount">${combinedTotal.toFixed(2)} MXN</span>
              </div>
            </div>

            <Button
              fullWidth
              onClick={handleCombinedPayment}
              variant="primary"
            >
              Pagar ${combinedTotal.toFixed(2)} MXN
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
