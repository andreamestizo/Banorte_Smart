import React from 'react';
import logo from '../assets/Logo.png';
import notificationIcon from '../assets/notification-icon.png';
import accountsIcon from '../assets/accounts-icon.png';
import transferIcon from '../assets/transfer-icon.png';
import withdrawIcon from '../assets/withdraw-icon.png';
import digitalCardIcon from '../assets/digital-card-icon.png';
import tokenIcon from '../assets/token-icon.png';
import servicesIcon from '../assets/services-icon.png';
import './Dashboard.css';

interface DashboardProps {
  onNavigateToServicios: () => void;
  onNavigateToChatbot: () => void;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigateToServicios,
  onNavigateToChatbot,
  userName = 'Usuario',
}) => {
  const menuItems = [
    { icon: accountsIcon, label: 'Mis cuentas', onClick: () => {} },
    { icon: transferIcon, label: 'Transferir o pagar', onClick: () => {} },
    { icon: withdrawIcon, label: 'Retirar dinero', onClick: () => {} },
    { icon: digitalCardIcon, label: 'Tarjeta Digital', onClick: () => {} },
    { icon: tokenIcon, label: 'Token Celular', onClick: () => {} },
    { icon: servicesIcon, label: 'Servicios', onClick: onNavigateToServicios },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <img src={logo} alt="Banorte" className="dashboard-logo" />
        <button className="notification-btn">
          <img src={notificationIcon} alt="Notifications" className="notification-icon" />
          <span className="notification-badge">3</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="currency-icons">
          <span className="currency-icon">$</span>
          <span className="currency-icon">€</span>
          <span className="currency-icon">£</span>
        </div>
      </div>

      {/* Maya Chat Assistant */}
      <button className="maya-chat" onClick={onNavigateToChatbot}>
        <div className="maya-avatar">
          <img src={logo} alt="Maya" className="maya-logo" />
        </div>
        <div className="maya-bubble">
          <p className="maya-greeting">¡Chatea conmigo!</p>
          <div className="maya-features">
            <span className="maya-feature-primary">Analiza tu consumo</span>
            <span className="maya-feature-secondary">
              Obtén recomendaciones personalizadas para ahorrar
            </span>
          </div>
        </div>
      </button>

      {/* Greeting Card */}
      <div className="greeting-card">
        <h2 className="greeting-title">Hola, {userName}</h2>
        <p className="greeting-subtitle">¿Qué vamos a hacer?</p>
      </div>

      {/* Menu Grid */}
      <div className="menu-container">
        <h3 className="menu-title">Menú</h3>
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.onClick}>
              <div className="menu-icon">
                <img src={item.icon} alt={item.label} className="menu-icon-img" />
              </div>
              <span className="menu-label gotham-book-12">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
