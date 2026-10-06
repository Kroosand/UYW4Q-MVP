import React, { useState } from 'react';
import RiskMeter from '../components/RiskMeter';
import FindingCard from '../components/FindingCard';
import FindingDetailModal from '../components/FindingDetailModal';
import ReportView from '../components/ReportView';

export default function DashboardPage({ scanData, onReset, onOpenIncidentModal }) {
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  if (!scanData) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* 1. Barra de Contexto del Cliente y Acciones Rápidas */}
      <section 
        aria-label="Información del cliente diagnosticado"
        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 font-mono tracking-tight">
              {scanData.domain}
            </h2>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-navy-950 text-white shadow-xs">
              Sector: {scanData.rubro}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Diagnóstico pasivo ejecutado el {new Date(scanData.timestamp).toLocaleDateString('es-PE')} a las {new Date(scanData.timestamp).toLocaleTimeString('es-PE')}
          </p>
        </div>

        {/* Acciones del Pitch y Reportes */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowReport(true)}
            className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Descargar Reporte PDF</span>
            <span>↓</span>
          </button>

          <button
            onClick={onOpenIncidentModal}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-extrabold text-xs transition-colors flex items-center justify-center space-x-1.5"
            title="Formulario para el Centro Nacional de Seguridad Digital (MINJUS)"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Notificar Brecha CNSD (48h)</span>
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
          >
            Otro Dominio
          </button>
        </div>
      </section>

      {/* 2. El Puntaje de Riesgo Visible de Inmediato, Arriba de Todo (Bloque C, Secc. 3) */}
      <RiskMeter 
        score={scanData.risk_score} 
        level={scanData.risk_level} 
      />

      {/* 3. Dictamen en Español Simple para el Dueño del Negocio (Sin tecnicismos) */}
      <section 
        aria-label="Resumen ejecutivo para la gerencia"
        className="bg-navy-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-navy-800 space-y-2.5"
      >
        <div className="flex items-center space-x-2 text-terracota-400 text-xs font-black uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-terracota-500"></span>
          <span>Dictamen Ejecutivo para la Gerencia ({scanData.rubro.toUpperCase()}):</span>
        </div>
        <p className="text-base sm:text-xl text-slate-100 font-bold leading-relaxed">
          "{scanData.summary_for_owner}"
        </p>
      </section>

      {/* 4. Hallazgos Priorizados en Tarjetas Simples por Color (Bloque C, Secc. 3) */}
      <section aria-label="Hallazgos priorizados" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-navy-950">
              Hallazgos Priorizados & Riesgo Legal (D.S. 016-2024-JUS)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Ordenados por severidad. Haga clic en cualquier tarjeta para ver el plan de remediación y la multa en soles aplicable.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {scanData.priority_findings.length} puntos prioritarios
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {scanData.priority_findings.map((finding, idx) => (
            <FindingCard
              key={idx}
              finding={finding}
              onSelect={setSelectedFinding}
            />
          ))}
        </div>
      </section>

      {/* 5. Comprobación Técnica Pasiva (Desplegable secundario, sin saturar la primera impresión) */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-navy-950 uppercase tracking-wider">
              Comprobaciones Técnicas Pasivas (Sin Intrusión)
            </h4>
            <p className="text-xs text-slate-500">
              Datos verificables obtenidos exclusivamente de registros públicos.
            </p>
          </div>
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="text-xs font-bold text-terracota-600 hover:text-terracota-700 underline"
          >
            {showTechnicalDetails ? 'Ocultar detalles' : 'Mostrar registros técnicos'}
          </button>
        </div>

        {showTechnicalDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            {/* Correo y DNS */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Canal de Correo Electrónico
              </span>
              <div className="text-xs font-extrabold text-navy-950">
                DMARC: {scanData.dns_findings.dmarc.present ? `Activo (${scanData.dns_findings.dmarc.policy})` : 'No configurado'}
              </div>
              <div className="text-xs text-slate-600">
                SPF: {scanData.dns_findings.spf.present ? 'Válido' : 'No configurado'}
              </div>
            </div>

            {/* SSL / Cifrado Web */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Cifrado Web (SSL/TLS)
              </span>
              <div className="text-xs font-extrabold text-navy-950">
                {scanData.ssl_findings.valid ? 'Certificado Válido' : 'Certificado Vencido / Inválido'}
              </div>
              <div className="text-xs text-slate-600">
                {scanData.ssl_findings.expires_in_days} días de vigencia restante
              </div>
            </div>

            {/* Filtraciones HIBP */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Exposición en Filtraciones
              </span>
              <div className="text-xs font-extrabold text-navy-950">
                {scanData.breach_findings.emails_breached > 0 
                  ? `${scanData.breach_findings.emails_breached} credenciales detectadas` 
                  : 'Sin credenciales expuestas'}
              </div>
              <div className="text-xs text-slate-600">
                Monitoreo pasivo en bases abiertas
              </div>
            </div>
          </div>
        )}
      </section>

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
