import React from 'react';

export default function ReportView({ scanData, onClose }) {
  if (!scanData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 flex justify-center">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8 sm:p-12 shadow-2xl relative border border-slate-300 print-page my-auto">
        
        {/* Barra superior de control (Se oculta al imprimir) */}
        <div className="flex items-center justify-between border-b pb-4 mb-8 no-print">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            ← Volver al Dashboard
          </button>
          
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-terracota-600 hover:bg-terracota-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-colors"
          >
            <span>🖨️ Descargar en PDF / Imprimir</span>
          </button>
        </div>

        {/* Encabezado Formal del Informe Ejecutivo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-navy-950 pb-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-black text-navy-950 tracking-tight">UYW4Q</span>
              <span className="text-xs font-bold text-terracota-600 bg-terracota-50 px-2 py-0.5 rounded border border-terracota-200">
                AUDITORÍA PREVENTIVA
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-800">
              Informe de Ciberseguridad y Cumplimiento Normativo (D.S. 016-2024-JUS)
            </h1>
            <p className="text-xs text-slate-500">
              Evaluación Técnica Pasiva e Impacto Sancionador para MYPEs Peruanas
            </p>
          </div>
          
          <div className="text-right mt-4 sm:mt-0 text-xs text-slate-600 font-mono">
            <div><strong>ID Escaneo:</strong> {scanData.scan_id.slice(0, 16)}...</div>
            <div><strong>Fecha:</strong> {new Date(scanData.timestamp).toLocaleDateString('es-PE')}</div>
            <div><strong>Dominio:</strong> <span className="font-bold text-navy-950">{scanData.domain}</span></div>
            <div><strong>Sector:</strong> {scanData.rubro.toUpperCase()}</div>
          </div>
        </div>

        {/* Resumen del Dictamen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-200 pr-4 pb-4 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Puntaje de Riesgo
            </span>
            <div className="text-4xl font-black text-terracota-600">
              {scanData.risk_score} <span className="text-base text-slate-400 font-normal">/ 100</span>
            </div>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-800">
              Nivel {scanData.risk_level}
            </span>
          </div>

          <div className="col-span-2 space-y-1">
            <span className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
              Dictamen Ejecutivo para la Gerencia:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {scanData.summary_for_owner}
            </p>
          </div>
        </div>

        {/* Tabla de Hallazgos Priorizados */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-3 border-b pb-1">
            1. Hallazgos Priorizados e Impacto Comercial
          </h2>
          <div className="space-y-3">
            {scanData.priority_findings.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs font-bold text-navy-950">{idx + 1}. {item.finding}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-terracota-100 text-terracota-800 uppercase">
                    {item.urgency}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1.5 leading-relaxed">
                  <strong>Riesgo en {scanData.rubro}:</strong> {item.business_risk}
                </p>
                <p className="text-[11px] text-navy-800 font-semibold bg-slate-50 p-2 rounded">
                  ⚖️ <strong>Base Legal:</strong> {item.legal_reference}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Evidencia Técnica Detallada */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-3 border-b pb-1">
            2. Evidencia Técnica Recopilada (Consultas Pasivas)
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <tbody>
              <tr className="border-b bg-slate-50">
                <th className="p-2.5 font-bold text-slate-700 w-1/3">Registro SPF (Sender Policy Framework)</th>
                <td className="p-2.5 font-mono text-slate-800">{scanData.dns_findings.spf.details}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2.5 font-bold text-slate-700">Registro DMARC (Antisuplantación)</th>
                <td className="p-2.5 font-mono text-slate-800">{scanData.dns_findings.dmarc.details}</td>
              </tr>
              <tr className="border-b bg-slate-50">
                <th className="p-2.5 font-bold text-slate-700">Certificado SSL / HTTPS</th>
                <td className="p-2.5 font-mono text-slate-800">{scanData.ssl_findings.details}</td>
              </tr>
              <tr className="border-b">
                <th className="p-2.5 font-bold text-slate-700">Filtraciones Públicas de Credenciales</th>
                <td className="p-2.5 font-mono text-slate-800">{scanData.breach_findings.details}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Régimen Legal y Descargo */}
        <div className="border-t pt-4 text-[10px] text-slate-500 space-y-1">
          <p>
            <strong>Aviso Legal:</strong> {scanData.legal_disclaimer} Este documento tiene valor informativo y orientativo de autorregulación conforme al D.S. N° 016-2024-JUS.
          </p>
          <p>
            Generado automáticamente por el motor de diagnóstico UYW4Q.
          </p>
        </div>

      </div>
    </div>
  );
}
