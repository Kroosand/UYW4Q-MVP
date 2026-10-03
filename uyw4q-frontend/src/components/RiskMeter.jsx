import React from 'react';

export default function RiskMeter({ score, level }) {
  // Configuración de colores y etiquetas por nivel
  let colorClass = "text-emerald-500";
  let strokeClass = "#10B981";
  let bgBadge = "bg-emerald-950/80 text-emerald-400 border-emerald-700/60";
  let levelText = "RIESGO BAJO";
  let description = "Postura defensiva aceptable. Cumple los estándares base.";

  if (score >= 60 || level === "alto" || level === "critico") {
    colorClass = "text-terracota-500";
    strokeClass = "#E05A47";
    bgBadge = "bg-terracota-950/80 text-terracota-400 border-terracota-800/80";
    levelText = "RIESGO ALTO / CRÍTICO";
    description = "Vulnerabilidades graves detectadas. Alta probabilidad de multas bajo el D.S. 016-2024-JUS.";
  } else if (score >= 30 || level === "medio") {
    colorClass = "text-amber-500";
    strokeClass = "#F59E0B";
    bgBadge = "bg-amber-950/80 text-amber-400 border-amber-800/70";
    levelText = "RIESGO MODERADO";
    description = "Existen fallas de configuración que facilitan ataques o incumplimiento parcial.";
  }

  // Dimensiones del círculo SVG
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
      
      {/* Medidor Circular SVG de Alta Fidelidad */}
      <div className="relative flex items-center justify-center">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeClass}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Texto central del puntaje */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-extrabold tracking-tight ${colorClass}`}>
            {score}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            de 100
          </span>
        </div>
      </div>

      {/* Explicación de Negocio en Español Simple */}
      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${bgBadge}`}>
            {levelText}
          </span>
          <span className="text-xs text-slate-500">
            Escala Heurística D.S. 016-2024-JUS
          </span>
        </div>

        <h3 className="text-xl font-bold text-navy-950">
          Índice de Exposición Digital
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>

        <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 flex items-center justify-center sm:justify-start space-x-4">
          <span>0-29: Seguro</span>
          <span>•</span>
          <span>30-59: Atención</span>
          <span>•</span>
          <span className="text-terracota-600 font-semibold">60-100: Vulnerabilidad Severa</span>
        </div>
      </div>

    </div>
  );
}
