import React, { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import cfeLogo from '../assets/cfe-logo.png';
import './ServiceLogin.css';

interface CFELoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const CFELogin: React.FC<CFELoginProps> = ({ onSuccess, onBack }) => {
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
      localStorage.setItem('cfeAuthenticated', 'true');
      onSuccess();
    }, 2000);
  };

  return (
    <div className="service-login-page">
      <div className="service-login-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <h1 className="service-login-title">CFE</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="service-login-content">
        <div className="service-login-logo-container">
          <img
            src={cfeLogo}
            alt="CFE"
            className="service-login-logo"
          />
        </div>

        <div className="service-login-card">
          <h2 className="service-login-welcome">Acceso CFE</h2>
          <p className="service-login-subtitle">
            Ingresa tus credenciales de CFE para vincular tu cuenta
          </p>

          <form onSubmit={handleSubmit} className="service-login-form">
            <TextField
              label="Correo electrónico o usuario"
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
            de consumo de CFE para análisis y pagos.
          </p>
        </div>
      </div>
    </div>
  );
};
