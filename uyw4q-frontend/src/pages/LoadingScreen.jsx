import React, { useState, useEffect } from 'react';

const PROGRESS_STEPS = [
  { 
    id: 1, 
    label: "Verificando configuración de correo...", 
    detail: "Consultando registros SPF, directivas DMARC y selectores DKIM en servidores DNS públicos." 
  },
  { 
    id: 2, 
    label: "Verificando certificado criptográfico SSL/TLS...", 
    detail: "Analizando vigencia, emisor de confianza y cifrado de conexión en el puerto estándar 443." 
  },
  { 
    id: 3, 
    label: "Consultando filtraciones conocidas...", 
    detail: "Verificando exposición pasiva de credenciales corporativas en bases de datos públicas de incidentes." 
  },
  { 
    id: 4, 
    label: "Correlacionando con normativa D.S. 016-2024-JUS...", 
    detail: "Mapeando hallazgos con los artículos 38, 39, 42 y la escala de sanciones de la ANPPD." 
  },
  { 
    id: 5, 
    label: "Procesando interpretación con Inteligencia Artificial...", 
    detail: "Traduciendo el impacto técnico al tipo de negocio específico y redactando resumen para la gerencia." 
  }
];

export default function LoadingScreen({ domain, rubro }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Contador de segundos para demostrar actividad continua
    const secTimer = setInterval(() => {
      setSeconds(prev => +(prev + 0.1).toFixed(1));
    }, 100);

    // Rotación secuencial de mensajes para que nunca se sienta congelado
    const stepTimer = setInterval(() => {
      setCurrentStepIndex(prev => (prev < PROGRESS_STEPS.length - 1 ? prev + 1 : prev));
    }, 750);

    return () => {
      clearInterval(secTimer);
      clearInterval(stepTimer);
    };
  }, []);

  const progressPercent = Math.min(95, Math.round(((currentStepIndex + 1) / PROGRESS_STEPS.length) * 100));

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-slate-200 text-center space-y-7">
        
        {/* Indicador de Escaneo Activo (Sin candados ni clichés) */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          {/* Anillos concéntricos giratorios */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-terracota-500 border-t-transparent animate-spin"></div>
          
          {/* Símbolo central entrelazado minimalista */}
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8 animate-pulse" fill="none">
              <path 
                d="M 28 20 C 18 20 12 30 12 45 C 12 60 22 75 42 75 C 55 75 65 68 70 56" 
                stroke="#1E293B" 
                strokeWidth="12" 
                strokeLinecap="round"
              />
              <path 
                d="M 72 80 C 82 80 88 70 88 55 C 88 40 78 25 58 25 C 45 25 35 32 30 44" 
                stroke="#E05A47" 
                strokeWidth="12" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Encabezado del Dominio */}
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Diagnóstico Pasivo en Progreso
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-navy-950 font-mono">
            {domain}
          </h3>
          <p className="text-xs font-bold text-terracota-600 uppercase tracking-wider">
            Sector Evaluado: {rubro.toUpperCase()}
          </p>
        </div>

        {/* Barra de Progreso Dinámica con Cronómetro Activo */}
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 font-bold">
            <span>Paso {currentStepIndex + 1} de {PROGRESS_STEPS.length}</span>
            <span className="text-navy-950">{seconds}s transcurridos ({progressPercent}%)</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div 
              className="bg-gradient-to-r from-terracota-600 to-terracota-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Lista visual de etapas con estado */}
        <div className="space-y-2.5 text-left border-t border-slate-100 pt-5">
          {PROGRESS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={step.id}
                className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  isCurrent 
                    ? 'bg-slate-50 border-terracota-300 ring-1 ring-terracota-400/30' 
                    : isCompleted 
                      ? 'bg-white border-slate-200 opacity-90' 
                      : 'bg-white border-slate-100 opacity-40'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                        ? 'bg-terracota-600 text-white animate-pulse' 
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <span className={`font-bold truncate ${isCurrent ? 'text-navy-950 font-extrabold' : 'text-slate-700'}`}>
                    {step.label}
                  </span>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-black text-terracota-600 animate-pulse shrink-0 ml-2">
                    Ejecutando...
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          ⚖️ Consultas pasivas autorizadas conforme a la Ley de Delitos Informáticos del Perú.
        </p>

      </div>
    </div>
  );
}
