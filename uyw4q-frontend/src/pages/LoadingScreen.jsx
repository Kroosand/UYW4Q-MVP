import React, { useState, useEffect } from 'react';

const PROGRESS_MESSAGES = [
  { step: 1, text: "Iniciando consultas pasivas en registros DNS públicos...", icon: "🌐" },
  { step: 2, text: "Verificando directivas de autenticación de correo (SPF, DKIM, DMARC)...", icon: "✉️" },
  { step: 3, text: "Inspeccionando certificado criptográfico SSL/TLS y vigencia en días...", icon: "🔒" },
  { step: 4, text: "Consultando bases de datos de filtraciones conocidas (HaveIBeenPwned)...", icon: "🔍" },
  { step: 5, text: "Conectando con motor de IA para correlación con D.S. 016-2024-JUS...", icon: "⚖️" },
  { step: 6, text: "Generando recomendaciones y cuantificando impacto en soles/UIT...", icon: "📊" }
];

export default function LoadingScreen({ domain, rubro }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < PROGRESS_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / PROGRESS_MESSAGES.length) * 100));

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
        
        {/* Spinner animado personalizado con los colores del proyecto */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-terracota-500 border-t-transparent animate-spin"></div>
          <span className="text-2xl animate-pulse">
            {PROGRESS_MESSAGES[currentStep].icon}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-navy-950">
            Escaneando <span className="text-terracota-600">{domain}</span>
          </h3>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sector: {rubro.toUpperCase()}
          </p>
        </div>

        {/* Barra de Progreso Dinámica */}
        <div className="space-y-2">
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-terracota-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Paso {currentStep + 1} de {PROGRESS_MESSAGES.length}</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Mensaje de Paso Actual */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 min-h-[60px] flex items-center justify-center">
          <p className="text-xs text-navy-900 font-medium leading-relaxed animate-fadeIn">
            {PROGRESS_MESSAGES[currentStep].text}
          </p>
        </div>

        <p className="text-[10px] text-slate-400 italic">
          * Todas las consultas son pasivas y no interfieren con la operación del sitio.
        </p>

      </div>
    </div>
  );
}
