import React from 'react';

export default function FindingDetailModal({ finding, scanData, onClose }) {
  if (!finding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-navy-950 text-xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-terracota-600 bg-terracota-50 px-2.5 py-1 rounded border border-terracota-200 inline-block mb-2">
            Detalle Técnico y Jurídico
          </span>
          <h3 className="text-2xl font-extrabold text-navy-950 leading-tight">
            {finding.finding}
          </h3>
        </div>

        {/* Sección 1: Riesgo Comercial Directo */}
        <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            💼 Impacto Real en el Negocio ({scanData?.rubro?.toUpperCase() || "EMPRESA"})
          </h4>
          <p className="text-sm text-navy-900 leading-relaxed font-medium">
            {finding.business_risk}
          </p>
        </div>

        {/* Sección 2: Marco Normativo Peruano */}
        <div className="mb-6 bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            ⚖️ Referencia Legal y Régimen Sancionador
          </h4>
          <p className="text-sm font-semibold text-navy-900 mb-2">
            {finding.legal_reference}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conforme al <strong>D.S. 016-2024-JUS</strong>, el incumplimiento de las directivas mínimas de seguridad informática para la protección de bancos de datos personales puede acarrear sanciones de la Autoridad Nacional de Protección de Datos Personales (ANPPD) que oscilan entre <strong>0.5 UIT hasta 100 UIT</strong> (equivalente a más de S/ 500,000).
          </p>
        </div>

        {/* Sección 3: Evidencia Técnica Determinística */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            🔍 Evidencia Técnica Recopilada
          </h4>
          <div className="bg-navy-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
            <div><strong>Dominio:</strong> {scanData?.domain}</div>
            <div><strong>DMARC:</strong> {scanData?.dns_findings?.dmarc?.details || "No configurado"}</div>
            <div><strong>SPF:</strong> {scanData?.dns_findings?.spf?.details || "No configurado"}</div>
            <div><strong>SSL Emisor:</strong> {scanData?.ssl_findings?.issuer || "No disponible"} ({scanData?.ssl_findings?.expires_in_days} días restantes)</div>
            <div><strong>Filtraciones detectadas:</strong> {scanData?.breach_findings?.emails_breached || 0} cuentas</div>
          </div>
        </div>

        {/* Qué hacer ahora */}
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            🛠️ Acción Recomendada Inmediata
          </h4>
          <p className="text-xs text-emerald-950 leading-relaxed">
            Contacte a su proveedor de correo institucional o hosting web y solicite la activación de una directiva <code>DMARC p=quarantine</code> o <code>p=reject</code> en sus registros de zona DNS, así como la actualización y reseteo de claves del personal corporativo.
          </p>
        </div>

        {/* Botón Cerrar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-sm transition-colors"
          >
            Entendido, volver al informe
          </button>
        </div>

      </div>
    </div>
  );
}
