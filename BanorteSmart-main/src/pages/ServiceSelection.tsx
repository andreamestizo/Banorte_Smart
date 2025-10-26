import React, { useState, useEffect } from 'react';
import { ConsentModal } from '../components/ConsentModal';
import './ServiceSelection.css';

interface ServiceSelectionProps {
  onSelectElectricity: () => void;
  onSelectWater: () => void;
  onBack: () => void;
}

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  onSelectElectricity,
  onSelectWater,
  onBack,
}) => {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentDeclined, setConsentDeclined] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('servicesConsent');
    if (consent === 'accepted') {
      setConsentGiven(true);
    } else if (consent === null) {
      // First time visiting, show modal
      setShowConsentModal(true);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('servicesConsent', 'accepted');
    setConsentGiven(true);
    setShowConsentModal(false);
  };

  const handleDeclineConsent = () => {
    setConsentDeclined(true);
    setShowConsentModal(false);
  };

  const handleServiceClick = (service: 'electricity' | 'water') => {
    if (!consentGiven) {
      alert('Debes aceptar el uso de datos para continuar');
      return;
    }

    if (service === 'electricity') {
      onSelectElectricity();
    } else {
      onSelectWater();
    }
  };

  return (
    <div className="service-selection-page">
      {showConsentModal && (
        <ConsentModal
          onAccept={handleAcceptConsent}
          onDecline={handleDeclineConsent}
        />
      )}

      {/* Header */}
      <div className="service-selection-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="service-selection-title">Seleccionar Servicio</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="service-selection-content">
        {consentDeclined && !consentGiven && (
          <div className="consent-declined-message">
            <h3>Consentimiento requerido</h3>
            <p>
              Para acceder a los servicios, necesitas aceptar el uso de tus datos.
            </p>
            <button
              className="retry-consent-btn"
              onClick={() => {
                setConsentDeclined(false);
                setShowConsentModal(true);
              }}
            >
              Revisar consentimiento
            </button>
          </div>
        )}

        <div className="service-selection-intro">
          <h2>Vincula tus servicios</h2>
          <p>
            Conecta tus cuentas de servicios para visualizar tu consumo,
            recibir recomendaciones y realizar pagos desde un solo lugar.
          </p>
        </div>

        <div className="service-cards">
          <button
            className="service-card"
            onClick={() => handleServiceClick('electricity')}
            disabled={!consentGiven}
          >
            <div className="service-card-icon electricity">⚡</div>
            <h3 className="service-card-title">Electricidad</h3>
            <p className="service-card-subtitle">CFE</p>
            <p className="service-card-description">
              Analiza tu consumo eléctrico y recibe recomendaciones para ahorrar
            </p>
            <div className="service-card-status">
              {localStorage.getItem('cfeAuthenticated') === 'true' ? (
                <span className="status-connected">✓ Conectado</span>
              ) : (
                <span className="status-disconnected">Conectar →</span>
              )}
            </div>
          </button>

          <button
            className="service-card"
            onClick={() => handleServiceClick('water')}
            disabled={!consentGiven}
          >
            <div className="service-card-icon water">💧</div>
            <h3 className="service-card-title">Agua</h3>
            <p className="service-card-subtitle">Sistema de Agua</p>
            <p className="service-card-description">
              Monitorea tu consumo de agua y optimiza tu uso
            </p>
            <div className="service-card-status">
              {localStorage.getItem('waterAuthenticated') === 'true' ? (
                <span className="status-connected">✓ Conectado</span>
              ) : (
                <span className="status-disconnected">Conectar →</span>
              )}
            </div>
          </button>
        </div>

        {consentGiven && (
          <div className="service-selection-footer">
            <p className="footer-note">
              Tus datos están protegidos y encriptados. Puedes revocar el acceso
              en cualquier momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
