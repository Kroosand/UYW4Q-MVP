import React, { useState } from 'react';
import RiskMeter from '../components/RiskMeter';
import FindingCard from '../components/FindingCard';
import FindingDetailModal from '../components/FindingDetailModal';
import ReportView from '../components/ReportView';

export default function DashboardPage({ scanData, onReset, onOpenIncidentModal }) {
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [showReport, setShowReport] = useState(false);

  if (!scanData) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Barra de Contexto del Dominio Escaneado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-navy-950">
              {scanData.domain}
            </h2>
            <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300">
              {scanData.rubro}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Diagnóstico ejecutado el {new Date(scanData.timestamp).toLocaleDateString('es-PE')} a las {new Date(scanData.timestamp).toLocaleTimeString('es-PE')}
          </p>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowReport(true)}
            className="px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <span>📄</span>
            <span>Descargar Reporte PDF</span>
          </button>

          <button
            onClick={onOpenIncidentModal}
            className="px-3.5 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold text-xs transition-colors"
          >
            ⚠️ Reportar Incidente (CNSD)
          </button>

          <button
            onClick={onReset}
            className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors"
          >
            Otro Dominio
          </button>
        </div>
      </div>

      {/* 1. Medidor de Riesgo Circular Principal */}
      <RiskMeter 
        score={scanData.risk_score} 
        level={scanData.risk_level} 
      />

      {/* 2. Dictamen para el Dueño del Negocio (Sin tecnicismos) */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-navy-800 space-y-2">
        <div className="flex items-center space-x-2 text-terracota-400 text-xs font-bold uppercase tracking-wider">
          <span>💡 Resumen Ejecutivo para la Gerencia:</span>
        </div>
        <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          "{scanData.summary_for_owner}"
        </p>
      </div>

      {/* 3. Indicadores de Postura Técnica (Resumen visual) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* DNS Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
            {scanData.dns_findings.dmarc.present ? '🛡️' : '⚠️'}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Protección de Correo
            </span>
            <span className="text-sm font-bold text-navy-950">
              {scanData.dns_findings.dmarc.present 
                ? `DMARC Activo (${scanData.dns_findings.dmarc.policy})` 
                : 'Sin DMARC (Vulnerable)'}
            </span>
            <span className="text-xs text-slate-500 block truncate max-w-[200px]">
              SPF: {scanData.dns_findings.spf.present ? 'Configurado' : 'Ausente'}
            </span>
          </div>
        </div>

        {/* SSL Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
            {scanData.ssl_findings.valid ? '🔒' : '❌'}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Cifrado Web (SSL/TLS)
            </span>
            <span className="text-sm font-bold text-navy-950">
              {scanData.ssl_findings.valid ? 'Certificado Válido' : 'Certificado Inválido'}
            </span>
            <span className="text-xs text-slate-500 block">
              {scanData.ssl_findings.expires_in_days} días de vigencia restante
            </span>
          </div>
        </div>

        {/* Breaches Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
            {scanData.breach_findings.emails_breached > 0 ? '🚨' : '✅'}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Credenciales Filtradas
            </span>
            <span className="text-sm font-bold text-navy-950">
              {scanData.breach_findings.emails_breached > 0 
                ? `${scanData.breach_findings.emails_breached} Expuestas` 
                : 'Sin Filtraciones Detectadas'}
            </span>
            <span className="text-xs text-slate-500 block">
              Monitoreo HaveIBeenPwned
            </span>
          </div>
        </div>
      </div>

      {/* 4. Tarjetas de Hallazgos Priorizados (Bloque B) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-extrabold text-navy-950">
              Hallazgos Priorizados e Impacto Legal (D.S. 016-2024-JUS)
            </h3>
            <p className="text-xs text-slate-500">
              Haga clic sobre cualquier tarjeta para ver el sustento técnico y la escala de multas aplicable.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {scanData.priority_findings.length} hallazgo(s)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanData.priority_findings.map((finding, idx) => (
            <FindingCard
              key={idx}
              finding={finding}
              onSelect={setSelectedFinding}
            />
          ))}
        </div>
      </div>

      {/* Modal de Detalle al Expandir Tarjeta */}
      {selectedFinding && (
        <FindingDetailModal
          finding={selectedFinding}
          scanData={scanData}
          onClose={() => setSelectedFinding(null)}
        />
      )}

      {/* Modal de Reporte Descargable / Imprimible */}
      {showReport && (
        <ReportView
          scanData={scanData}
          onClose={() => setShowReport(false)}
        />
      )}

    </div>
  );
}
