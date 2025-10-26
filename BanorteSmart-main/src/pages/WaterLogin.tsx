import React, { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import waterLogo from '../assets/water-logo.png';
import './ServiceLogin.css';

interface WaterLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const WaterLogin: React.FC<WaterLoginProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store authentication status
      localStorage.setItem('waterAuthenticated', 'true');
      onSuccess();
    }, 2000);
  };

  return (
    <div className="service-login-page">
      <div className="service-login-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="service-login-title">Sistema de Agua</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="service-login-content">
        <div className="service-login-logo-container">
          <img
            src={waterLogo}
            alt="Sistema de Agua"
            className="service-login-logo"
          />
        </div>

        <div className="service-login-card">
          <h2 className="service-login-welcome">Acceso Sistema de Agua</h2>
          <p className="service-login-subtitle">
            Ingresa tus credenciales para vincular tu cuenta de agua
          </p>

          <form onSubmit={handleSubmit} className="service-login-form">
            <TextField
              label="Correo electrónico o número de cuenta"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="ejemplo@correo.com"
              disabled={isLoading}
            />

            <TextField
              label="Contraseña"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="Ingresa tu contraseña"
              disabled={isLoading}
            />

            <Button
              type="submit"
              fullWidth
              disabled={!email || !password || isLoading}
            >
              {isLoading ? 'Autenticando...' : 'Iniciar Sesión'}
            </Button>

            <button
              type="button"
              className="service-login-forgot"
              disabled={isLoading}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        </div>

        <div className="service-login-footer">
          <p>
            Al iniciar sesión, autorizas a Banorte a acceder a tu información
            de consumo de agua para análisis y pagos.
          </p>
        </div>
      </div>
    </div>
  );
};
