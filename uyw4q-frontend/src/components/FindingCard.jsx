import React from 'react';

export default function FindingCard({ finding, onSelect }) {
  const urgency = (finding.urgency || "media").toLowerCase();

  let badgeClass = "bg-amber-100 text-amber-800 border-amber-300";
  let borderLeft = "border-l-amber-500";
  let urgencyLabel = "Urgencia Media";

  if (urgency === "alta" || urgency === "critica") {
    badgeClass = "bg-terracota-100 text-terracota-800 border-terracota-300";
    borderLeft = "border-l-terracota-500";
    urgencyLabel = "Urgencia Alta";
  } else if (urgency === "baja") {
    badgeClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
    borderLeft = "border-l-emerald-500";
    urgencyLabel = "Riesgo Bajo";
  }

  return (
    <div 
      onClick={() => onSelect(finding)}
      className={`bg-white rounded-xl p-5 shadow-sm border border-slate-200 border-l-4 ${borderLeft} hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-base font-bold text-navy-950 group-hover:text-terracota-600 transition-colors">
            {finding.finding}
          </h4>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${badgeClass}`}>
            {urgencyLabel}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
          {finding.business_risk}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-navy-700 truncate pr-2">
          📜 {finding.legal_reference}
        </span>
        <span className="text-terracota-600 font-semibold group-hover:underline flex items-center gap-1 shrink-0">
          Ver detalle →
        </span>
      </div>
    </div>
  );
}
