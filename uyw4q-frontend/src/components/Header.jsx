import React from 'react';

export default function Header({ 
  onReset, 
  isOfflineMode, 
  setIsOfflineMode, 
  onOpenIncidentModal, 
  activeDomain, 
  activeRubro,
  currentView 
}) {
  return (
    <header className="bg-navy-950 text-white border-b border-navy-800 shadow-md sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo UYW4Q: Ícono entrelazado (sin ojos, escudos ni candados clichés) */}
        <div 
          onClick={onReset}
          className="flex items-center space-x-3.5 cursor-pointer group"
          title="Ir al inicio de UYW4Q"
        >
          {/* Símbolo Entrelazado Geométrico */}
          <div className="w-11 h-11 rounded-xl bg-navy-900 border border-navy-700/80 flex items-center justify-center p-2 shadow-inner group-hover:border-terracota-500 transition-all">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <path 
                d="M 28 20 C 18 20 12 30 12 45 C 12 60 22 75 42 75 C 55 75 65 68 70 56" 
                stroke="#CBD5E1" 
                strokeWidth="11" 
                strokeLinecap="round"
              />
              <path 
                d="M 72 80 C 82 80 88 70 88 55 C 88 40 78 25 58 25 C 45 25 35 32 30 44" 
                stroke="#E05A47" 
                strokeWidth="11" 
                strokeLinecap="round"
              />
              <circle cx="50" cy="50" r="6" fill="#E05A47"/>
            </svg>
          </div>

          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-terracota-400 transition-colors">
                UYW4Q
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-terracota-950/80 text-terracota-400 border border-terracota-800/80">
                D.S. 016-2024-JUS
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Diagnóstico de Ciberseguridad & Impacto Normativo MYPE
            </p>
          </div>
        </div>

        {/* Información contextual del cliente activo durante la navegación */}
        {currentView === 'dashboard' && activeDomain && (
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-navy-900/80 rounded-lg border border-navy-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">Analizando:</span>
            <span className="font-bold text-white font-mono">{activeDomain}</span>
            <span className="text-slate-500">•</span>
            <span className="text-terracota-400 uppercase font-semibold">{activeRubro}</span>
          </div>
        )}

        {/* Acciones principales y controles */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Botón de Asistencia de Brecha CNSD (48 horas) */}
          <button
            onClick={onOpenIncidentModal}
            className="text-xs font-bold px-3 py-2 rounded-xl bg-red-950/70 text-red-300 border border-red-800/80 hover:bg-red-900/70 transition-all flex items-center space-x-2 shadow-sm"
            title="Generar borrador formal para el Centro Nacional de Seguridad Digital dentro de las 48h"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Reportar Incidente CNSD (48h)</span>
          </button>

          {/* Switch de Modo Demo / Fallback Offline para Pitch */}
          <div className="hidden md:flex items-center space-x-2 bg-navy-900 border border-navy-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400">Modo Demo:</span>
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                isOfflineMode 
                  ? 'bg-terracota-600 text-white shadow-sm' 
                  : 'bg-navy-800 text-slate-300 hover:text-white'
              }`}
            >
              {isOfflineMode ? 'Activado (Offline)' : 'En Vivo (API)'}
            </button>
          </div>

          {/* Botón Nuevo Diagnóstico */}
          {currentView !== 'landing' && (
            <button
              onClick={onReset}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 transition-colors"
            >
              Nuevo Escaneo
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
