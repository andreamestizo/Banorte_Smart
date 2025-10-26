import { useState } from 'react';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ServiceSelection } from './pages/ServiceSelection';
import { CFELogin } from './pages/CFELogin';
import { WaterLogin } from './pages/WaterLogin';
import { Servicios } from './pages/Servicios';
import { Chatbot } from './pages/Chatbot';
import './App.css';

type Screen = 'login' | 'dashboard' | 'service-selection' | 'cfe-login' | 'water-login' | 'servicios' | 'chatbot';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName] = useState('Eduardo');
  const [authSuccessMessage, setAuthSuccessMessage] = useState('');

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigateToServicios = () => {
    // Check if services are already authenticated
    const cfeAuth = localStorage.getItem('cfeAuthenticated') === 'true';
    const waterAuth = localStorage.getItem('waterAuthenticated') === 'true';

    if (cfeAuth || waterAuth) {
      // If at least one service is authenticated, go directly to servicios
      setCurrentScreen('servicios');
    } else {
      // Otherwise, show service selection
      setCurrentScreen('service-selection');
    }
  };

  const handleNavigateToChatbot = () => {
    setCurrentScreen('chatbot');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setAuthSuccessMessage('');
  };

  const handleSelectElectricity = () => {
    setCurrentScreen('cfe-login');
  };

  const handleSelectWater = () => {
    setCurrentScreen('water-login');
  };

  const handleCFELoginSuccess = () => {
    setAuthSuccessMessage('Autenticación exitosa con CFE');
    setCurrentScreen('servicios');
  };

  const handleWaterLoginSuccess = () => {
    setAuthSuccessMessage('Autenticación exitosa con Sistema de Agua');
    setCurrentScreen('servicios');
  };

  return (
    <>
      {currentScreen === 'login' && <Login onLogin={handleLogin} />}
      {currentScreen === 'dashboard' && (
        <Dashboard
          onNavigateToServicios={handleNavigateToServicios}
          onNavigateToChatbot={handleNavigateToChatbot}
          userName={userName}
        />
      )}
      {currentScreen === 'service-selection' && (
        <ServiceSelection
          onSelectElectricity={handleSelectElectricity}
          onSelectWater={handleSelectWater}
          onBack={handleBackToDashboard}
        />
      )}
      {currentScreen === 'cfe-login' && (
        <CFELogin
          onSuccess={handleCFELoginSuccess}
          onBack={() => {
            // Check if user came from servicios or service selection
            const waterAuth = localStorage.getItem('waterAuthenticated') === 'true';
            if (waterAuth) {
              // If water is already authenticated, go back to servicios
              setCurrentScreen('servicios');
            } else {
              // Otherwise go back to service selection
              setCurrentScreen('service-selection');
            }
          }}
        />
      )}
      {currentScreen === 'water-login' && (
        <WaterLogin
          onSuccess={handleWaterLoginSuccess}
          onBack={() => {
            // Check if user came from servicios or service selection
            const cfeAuth = localStorage.getItem('cfeAuthenticated') === 'true';
            if (cfeAuth) {
              // If CFE is already authenticated, go back to servicios
              setCurrentScreen('servicios');
            } else {
              // Otherwise go back to service selection
              setCurrentScreen('service-selection');
            }
          }}
        />
      )}
      {currentScreen === 'servicios' && (
        <Servicios
          onBack={handleBackToDashboard}
          successMessage={authSuccessMessage}
          onClearMessage={() => setAuthSuccessMessage('')}
          onNavigateToCFELogin={() => setCurrentScreen('cfe-login')}
          onNavigateToWaterLogin={() => setCurrentScreen('water-login')}
        />
      )}
      {currentScreen === 'chatbot' && (
        <Chatbot onBack={handleBackToDashboard} />
      )}
    </>
  );
}

export default App;
