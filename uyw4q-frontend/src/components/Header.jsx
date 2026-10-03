import React from 'react';

export default function Header({ onReset, isOfflineMode, setIsOfflineMode, onOpenIncidentModal }) {
  return (
    <header className="bg-navy-950 text-white border-b border-navy-800 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Marca UYW4Q (Ícono entrelazado sin clichés) */}
        <div 
          onClick={onReset}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-700 flex items-center justify-center p-1.5 shadow-inner group-hover:border-terracota-500 transition-colors">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <path d="M 28 20 C 18 20 12 30 12 45 C 12 60 22 75 42 75 C 55 75 65 68 70 56" 
                    stroke="#94A3B8" strokeWidth="10" strokeLinecap="round"/>
              <path d="M 72 80 C 82 80 88 70 88 55 C 88 40 78 25 58 25 C 45 25 35 32 30 44" 
                    stroke="#E05A47" strokeWidth="10" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="6" fill="#E05A47"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-terracota-400 transition-colors">
                UYW4Q
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-terracota-950/80 text-terracota-400 border border-terracota-800/60">
                D.S. 016-2024-JUS
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Diagnóstico de Ciberseguridad & Cumplimiento Normativo MYPE
            </p>
          </div>
        </div>

        {/* Acciones y Selector de Modo Demo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Botón de Emergencia: Notificar Brecha CNSD */}
          <button
            onClick={onOpenIncidentModal}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-950/60 text-red-300 border border-red-800/80 hover:bg-red-900/60 transition-colors flex items-center space-x-1.5"
            title="Generar borrador formal para el Centro Nacional de Seguridad Digital (Plazo 48h)"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Reportar Brecha CNSD (48h)</span>
          </button>

          {/* Switch de Modo Demo / Fallback */}
          <div className="hidden md:flex items-center space-x-2 bg-navy-900/90 border border-navy-800 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-400">Modo Demo:</span>
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                isOfflineMode 
                  ? 'bg-terracota-600 text-white' 
                  : 'bg-navy-800 text-slate-300 hover:text-white'
              }`}
            >
              {isOfflineMode ? 'Activado (Offline)' : 'En Vivo (API)'}
            </button>
          </div>

          {/* Botón Nuevo Diagnóstico */}
          <button
            onClick={onReset}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 transition-colors"
          >
            Nuevo Escaneo
          </button>
        </div>

      </div>
    </header>
  );
}
