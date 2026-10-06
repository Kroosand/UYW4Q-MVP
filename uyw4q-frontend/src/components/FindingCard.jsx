import React from 'react';
import { getJargonExplanation } from '../utils/jargon';

export default function FindingCard({ finding, onSelect }) {
  const urgency = (finding.urgency || "media").toLowerCase();

  // Traducción automática de jerga técnica en una sola línea (Bloque C, Sección 2)
  const jargonInfo = getJargonExplanation(finding.finding + " " + (finding.business_risk || ""));

  let cardBorder = "border-l-amber-500";
  let badgeStyle = "bg-amber-100 text-amber-950 border border-amber-300";
  let urgencyLabel = "Riesgo Moderado";

  if (urgency === "alta" || urgency === "critica") {
    cardBorder = "border-l-terracota-600";
    badgeStyle = "bg-terracota-100 text-terracota-950 border border-terracota-400 font-extrabold";
    urgencyLabel = "Riesgo Alto / Urgente";
  } else if (urgency === "baja") {
    cardBorder = "border-l-emerald-500";
    badgeStyle = "bg-emerald-100 text-emerald-950 border border-emerald-300";
    urgencyLabel = "Riesgo Bajo / Preventivo";
  }

  return (
    <article
      onClick={() => onSelect(finding)}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-[6px] ${cardBorder} hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between space-y-4`}
    >
      <div>
        {/* Cabecera de la tarjeta: Título claro y etiqueta de urgencia */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-base sm:text-lg font-extrabold text-navy-950 group-hover:text-terracota-600 transition-colors leading-snug">
            {finding.finding}
          </h4>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-xs ${badgeStyle}`}>
            {urgencyLabel}
          </span>
        </div>

        {/* Traducción obligatoria de jerga técnica en 1 línea (Requisito estricto Bloque C) */}
        {jargonInfo && (
          <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 flex items-start space-x-2">
            <span className="font-extrabold text-terracota-600 shrink-0">💡 {jargonInfo.term}:</span>
            <span className="text-slate-600 leading-relaxed font-medium">
              {jargonInfo.oneLiner}
            </span>
          </div>
        )}

        {/* Impacto real en las operaciones del cliente */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Impacto directo en su empresa:
          </span>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {finding.business_risk}
          </p>
        </div>
      </div>

      {/* Pie de tarjeta con cita legal y botón de profundizar */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="text-navy-900 font-semibold truncate pr-2 flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-navy-700 shrink-0"></span>
          <span className="truncate">{finding.legal_reference}</span>
        </div>
        
        <span className="text-terracota-600 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-1 shrink-0">
          <span>Ver detalle y multas</span>
          <span>→</span>
        </span>
      </div>
    </article>
  );
}
