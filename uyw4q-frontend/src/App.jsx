import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './pages/LoadingScreen';
import DashboardPage from './pages/DashboardPage';
import IncidentNotificationModal from './components/IncidentNotificationModal';
import { executeScan } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'loading' | 'dashboard'
  const [scanData, setScanData] = useState(null);
  const [activeDomain, setActiveDomain] = useState('');
  const [activeRubro, setActiveRubro] = useState('clinica');
  const [isOfflineMode, setIsOfflineMode] = useState(true); // Default true para garantizar demo infalible sin setup extra
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartScan = async (domain, rubro) => {
    setActiveDomain(domain);
    setActiveRubro(rubro);
    setCurrentView('loading');
    setErrorMsg('');

    try {
      // Simulación de tiempo de carga mínimo (3.2s) para que el usuario/jurado
      // aprecie la pantalla de carga interactiva y sus mensajes cambiantes (Bloque C, Secc. 3.2)
      const [result] = await Promise.all([
        executeScan(domain, rubro, isOfflineMode),
        new Promise((resolve) => setTimeout(resolve, 3400))
      ]);

      setScanData(result);
      setCurrentView('dashboard');
    } catch (err) {
      console.error("Fallo durante el diagnóstico:", err);
      setErrorMsg("Ocurrió un problema al conectar con los servicios de escaneo. Verifique el dominio ingresado.");
      setCurrentView('landing');
    }
  };

  const handleReset = () => {
    setCurrentView('landing');
    setScanData(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 text-navy-950 font-sans selection:bg-terracota-100 selection:text-terracota-900">
      
      {/* Header Institucional con Logo Entrelazado */}
      <Header
        onReset={handleReset}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
        onOpenIncidentModal={() => setShowIncidentModal(true)}
        activeDomain={activeDomain}
        activeRubro={activeRubro}
        currentView={currentView}
      />

      {/* Alerta de Error Controlada si ocurre algún problema */}
      {errorMsg && (
        <div className="max-w-3xl mx-auto mt-4 px-4 w-full animate-fadeIn">
          <div className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-3 rounded-2xl text-xs font-bold flex justify-between items-center shadow-sm">
            <span>⚠️ {errorMsg}</span>
            <button onClick={() => setErrorMsg('')} className="font-black text-base ml-2">✕</button>
          </div>
        </div>
      )}

      {/* Contenido Principal de las 6 Pantallas */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartScan={handleStartScan}
            defaultDomain={activeDomain}
            defaultRubro={activeRubro}
          />
        )}

        {currentView === 'loading' && (
          <LoadingScreen
            domain={activeDomain}
            rubro={activeRubro}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            scanData={scanData}
            onReset={handleReset}
            onOpenIncidentModal={() => setShowIncidentModal(true)}
          />
        )}
      </main>

      {/* Modal Global de Notificación de Brecha CNSD (48 Horas) */}
      {showIncidentModal && (
        <IncidentNotificationModal
          initialDomain={activeDomain || 'empresa-ejemplo.pe'}
          initialRubro={activeRubro || 'clinica'}
          onClose={() => setShowIncidentModal(false)}
        />
      )}

      {/* Footer con Descargo de Responsabilidad y Ley de Delitos Informáticos */}
      <Footer />

    </div>
  );
}
