import React from 'react';
import { getJargonExplanation } from '../utils/jargon';

export default function FindingDetailModal({ finding, scanData, onClose }) {
  if (!finding) return null;

  const jargon = getJargonExplanation(finding.finding + " " + (finding.business_risk || ""));
  const urgency = (finding.urgency || "media").toLowerCase();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-9 shadow-2xl border-2 border-slate-200 relative max-h-[92vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-navy-950 text-xl font-black p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-terracota-700 bg-terracota-100 px-3 py-1 rounded-full border border-terracota-300">
              Profundización Técnica y Jurídica
            </span>
            <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
              urgency === 'alta' ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              Urgencia {finding.urgency}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-navy-950 leading-tight">
            {finding.finding}
          </h3>
        </div>

        {/* Traducción de siglas técnicas si aplica */}
        {jargon && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-navy-950 space-y-1">
            <span className="font-extrabold text-terracota-600 uppercase tracking-wider block">
              Traducción técnica para la gerencia ({jargon.term})
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {jargon.oneLiner}
            </p>
          </div>
        )}

        {/* 1. Impacto comercial y de reputación en el rubro */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Riesgo Real para su Empresa ({scanData?.rubro?.toUpperCase() || "MYPE"})
          </h4>
          <p className="text-sm font-semibold text-navy-950 leading-relaxed">
            {finding.business_risk}
          </p>
        </div>

        {/* 2. Régimen Legal Peruano y Sanciones (D.S. 016-2024-JUS) */}
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
          <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
            <span>Régimen Sancionador bajo D.S. N° 016-2024-JUS</span>
          </div>
          
          <p className="text-sm font-extrabold text-navy-950">
            {finding.legal_reference}
          </p>

          <div className="text-xs text-slate-700 space-y-2 pt-2 border-t border-amber-200/80 leading-relaxed font-medium">
            <p>
              El reglamento establece que la omisión de medidas técnicas idóneas de autenticación y cifrado constituye una infracción sujeta a fiscalización por la Autoridad Nacional de Protección de Datos Personales (ANPPD):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-800">
              <li><strong>Infracción Grave:</strong> Multas superiores a 5 UIT y hasta 50 UIT (<strong>S/ 25,750 a S/ 257,500</strong>).</li>
              <li><strong>Infracción Muy Grave:</strong> Multas de más de 50 UIT hasta 100 UIT (<strong>S/ 257,500 a S/ 515,000</strong>) en caso de exposición negligente de datos sensibles.</li>
            </ul>
          </div>
        </div>

        {/* 3. Evidencia Técnica Específica y Determinística */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Evidencia Técnica Determinística Recopilada
          </h4>
          <div className="bg-navy-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto space-y-1.5 border border-navy-800">
            <div className="text-slate-400"># Dominio evaluado: {scanData?.domain}</div>
            {scanData?.dns_findings?.dmarc && (
              <div>
                <span className="text-terracota-400">DMARC Record:</span> {scanData.dns_findings.dmarc.raw || "No publicado en _dmarc"} 
                <span className="text-slate-400"> (Política: {scanData.dns_findings.dmarc.policy || 'ninguna'})</span>
              </div>
            )}
            {scanData?.dns_findings?.spf && (
              <div>
                <span className="text-terracota-400">SPF Record:</span> {scanData.dns_findings.spf.raw || "No publicado en zona TXT"}
              </div>
            )}
            {scanData?.ssl_findings && (
              <div>
                <span className="text-terracota-400">SSL Emisor:</span> {scanData.ssl_findings.issuer} 
                <span className="text-slate-400"> (Expira en: {scanData.ssl_findings.expires_in_days} días)</span>
              </div>
            )}
            {scanData?.breach_findings && (
              <div>
                <span className="text-terracota-400">Breaches Públicos:</span> {scanData.breach_findings.emails_breached} cuentas comprometidas en fuentes abiertas
              </div>
            )}
          </div>
        </div>

        {/* 4. Plan de Acción y Remediación Inmediata */}
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
            Plan de Remediación Sugerido
          </h4>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
            {jargon?.howToFix || "Coordine con el administrador de sus servicios web la actualización inmediata de los registros perimetrales y asegure el cumplimiento de las salvaguardas legales."}
          </p>
        </div>

        {/* Botón de cierre */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-extrabold text-xs transition-colors shadow-sm"
          >
            Entendido, volver al informe
          </button>
        </div>

      </div>
    </div>
  );
}
