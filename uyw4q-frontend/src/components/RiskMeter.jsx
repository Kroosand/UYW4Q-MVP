import React from 'react';

export default function RiskMeter({ score, level }) {
  // Configuración de colores, contraste y textos por nivel (Alta legibilidad para proyectores)
  let strokeColor = "#059669"; // Emerald 600
  let textColor = "text-emerald-700";
  let badgeStyle = "bg-emerald-100 text-emerald-900 border-2 border-emerald-400";
  let levelTitle = "RIESGO BAJO";
  let queTanMalEstoy = "Su negocio cuenta con las protecciones técnicas fundamentales activas. No se detectan brechas críticas de suplantación ni multas inminentes.";
  let queHagoAhora = "Mantenga revisiones periódicas y verifique que las renovaciones de certificados no se venzan.";

  if (score >= 60 || level === "alto" || level === "critico") {
    strokeColor = "#C2410C"; // Terracota 700
    textColor = "text-terracota-700";
    badgeStyle = "bg-terracota-100 text-terracota-950 border-2 border-terracota-500";
    levelTitle = "RIESGO ALTO / CRÍTICO";
    queTanMalEstoy = "Su empresa presenta vulnerabilidades severas que permiten a terceros suplantar su identidad y exponer datos de clientes, con riesgo de multas de hasta 50 UIT (S/ 257,500) según el D.S. 016-2024-JUS.";
    queHagoAhora = "Atienda de inmediato los hallazgos en color terracota que figuran abajo. Cada tarjeta detalla la solución técnica en una línea.";
  } else if (score >= 30 || level === "medio") {
    strokeColor = "#D97706"; // Amber 600
    textColor = "text-amber-700";
    badgeStyle = "bg-amber-100 text-amber-950 border-2 border-amber-500";
    levelTitle = "RIESGO MODERADO";
    queTanMalEstoy = "Existen configuraciones incompletas o en modo pasivo que reducen la seguridad de sus comunicaciones y pueden infringir directivas básicas de datos personales.";
    queHagoAhora = "Actualice las directivas de correo o certificados señalados en las tarjetas amarillas antes de que escalen a incidentes reales.";
  }

  // Dimensiones del círculo SVG para máxima claridad
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <section 
      aria-label="Puntaje de riesgo"
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8"
    >
      
      {/* 1. Medidor Circular SVG de Gran Escala (Legible en pantalla proyectada) */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-48 h-48 sm:w-52 sm:h-52 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="14"
            fill="transparent"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={strokeColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Cifra central de alto impacto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-5xl sm:text-6xl font-black tracking-tight ${textColor}`}>
            {score}
          </span>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest mt-0.5">
            de 100
          </span>
        </div>
      </div>

      {/* 2. Respuestas Directas al Dueño del Negocio: "¿Qué tan mal estoy y qué hago ahora?" */}
      <div className="flex-1 space-y-4 text-center lg:text-left">
        
        {/* Badge de Nivel */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <span className={`px-4 py-1.5 text-xs font-black uppercase rounded-full shadow-sm ${badgeStyle}`}>
            {levelTitle}
          </span>
          <span className="text-xs font-bold text-slate-500">
            Escala Regulatoria D.S. N° 016-2024-JUS
          </span>
        </div>

        {/* Respuesta 1: ¿Qué tan mal estoy? */}
        <div className="space-y-1">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            ¿Qué tan expuesto está mi negocio?
          </h3>
          <p className="text-base sm:text-lg font-bold text-navy-950 leading-snug">
            {queTanMalEstoy}
          </p>
        </div>

        {/* Respuesta 2: ¿Qué hago ahora? */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-1">
          <span className="text-xs font-extrabold text-navy-900 uppercase tracking-wider block">
            ¿Qué tengo que hacer ahora?
          </span>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {queHagoAhora}
          </p>
        </div>

        {/* Escala de referencia visual */}
        <div className="pt-2 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500 font-medium border-t border-slate-100">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>0-29: Bajo</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>30-59: Medio</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-terracota-600"></span>
            <span className="font-bold text-terracota-700">60-100: Alto / Crítico</span>
          </div>
        </div>

      </div>

    </section>
  );
}
