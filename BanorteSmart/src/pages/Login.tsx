import React, { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import logo from '../assets/Logo.png';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src={logo} alt="Banorte" className="login-logo" />
      </div>

      <div className="login-content">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Ingresa tus datos para continuar</p>

        <form onSubmit={handleLogin} className="login-form">
          <TextField
            label="Usuario"
            value={username}
            onChange={setUsername}
            placeholder="Ingresa tu usuario"
            showClear
          />

          <TextField
            label="Contraseña"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="Ingresa tu contraseña"
          />

          <div className="login-actions">
            <Button
              type="submit"
              fullWidth
              disabled={!username || !password}
            >
              Ingresar
            </Button>

            <Button variant="tertiary" fullWidth>
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
        </form>

        <div className="login-footer">
          <p className="gotham-book-12">¿Eres nuevo?</p>
          <Button variant="secondary" fullWidth>
            Regístrate aquí
          </Button>
        </div>
      </div>
    </div>
  );
};
