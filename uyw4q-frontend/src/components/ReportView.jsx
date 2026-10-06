import React from 'react';

export default function ReportView({ scanData, onClose }) {
  if (!scanData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm p-4 sm:p-6 flex justify-center animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 sm:p-12 shadow-2xl relative border border-slate-300 print-page my-auto space-y-6">
        
        {/* Barra superior de control (Oculta al imprimir) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 no-print">
          <button
            onClick={onClose}
            className="text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            ← Volver al Dashboard
          </button>
          
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-terracota-600 hover:bg-terracota-700 text-white font-black text-xs flex items-center space-x-2 shadow-md transition-all active:scale-95"
          >
            <span>Guardar como PDF / Imprimir</span>
            <span>🖨️</span>
          </button>
        </div>

        {/* Encabezado Formal del Informe Ejecutivo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-navy-950 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-950 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <path d="M 28 20 C 18 20 12 30 12 45 C 12 60 22 75 42 75 C 55 75 65 68 70 56" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round"/>
                  <path d="M 72 80 C 82 80 88 70 88 55 C 88 40 78 25 58 25 C 45 25 35 32 30 44" stroke="#E05A47" strokeWidth="12" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-2xl font-black text-navy-950 tracking-tight">UYW4Q</span>
              <span className="text-[10px] font-black uppercase text-terracota-700 bg-terracota-100 px-2.5 py-0.5 rounded border border-terracota-300">
                AUDITORÍA PREVENTIVA ORIENTATIVA
              </span>
            </div>
            
            <h1 className="text-lg sm:text-xl font-black text-navy-950">
              Informe de Ciberseguridad & Impacto Normativo (D.S. N° 016-2024-JUS)
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Evaluación Técnica Pasiva y Régimen Sancionador para MYPEs Peruanas
            </p>
          </div>
          
          <div className="text-right text-xs text-slate-600 font-mono space-y-0.5">
            <div><strong>Dominio:</strong> <span className="font-black text-navy-950">{scanData.domain}</span></div>
            <div><strong>Sector:</strong> {scanData.rubro.toUpperCase()}</div>
            <div><strong>Fecha:</strong> {new Date(scanData.timestamp).toLocaleDateString('es-PE')}</div>
            <div className="text-[10px] text-slate-400">ID: {scanData.scan_id.slice(0, 16)}...</div>
          </div>
        </div>

        {/* Resumen del Dictamen y Nivel de Riesgo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-slate-200 pr-4 pb-4 sm:pb-0 space-y-1">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
              Puntaje de Riesgo
            </span>
            <div className="text-5xl font-black text-terracota-600">
              {scanData.risk_score} <span className="text-sm text-slate-400 font-medium">/ 100</span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase bg-red-100 text-red-900 border border-red-300">
              NIVEL {scanData.risk_level.toUpperCase()}
            </span>
          </div>

          <div className="col-span-2 space-y-2">
            <span className="text-xs font-black text-navy-950 uppercase tracking-wider block">
              Dictamen Ejecutivo para la Gerencia:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              "{scanData.summary_for_owner}"
            </p>
          </div>
        </div>

        {/* 1. Hallazgos Priorizados y Régimen de Multas */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-navy-950 uppercase tracking-wider border-b border-slate-200 pb-2">
            1. Hallazgos Priorizados e Impacto en Operaciones
          </h2>
          <div className="space-y-3">
            {scanData.priority_findings.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-navy-950">
                    {idx + 1}. {item.finding}
                  </h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded uppercase bg-terracota-100 text-terracota-900 border border-terracota-300">
                    Urgencia {item.urgency}
                  </span>
                </div>
                
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  <strong>Riesgo en {scanData.rubro}:</strong> {item.business_risk}
                </p>

                <div className="text-[11px] text-navy-950 font-bold bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  ⚖️ Base Legal: {item.legal_reference}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Tabla de Evidencia Técnica Determinística */}
        <div className="space-y-3">
          <h2 className="text-sm font-black text-navy-950 uppercase tracking-wider border-b border-slate-200 pb-2">
            2. Evidencia Técnica Pasiva Recopilada
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <tbody>
              <tr className="border-b bg-slate-50">
                <th className="p-3 font-bold text-slate-700 w-1/3">Autenticación de Correo (SPF)</th>
                <td className="p-3 font-mono text-slate-800">{scanData.dns_findings.spf.details}</td>
              </tr>
              <tr className="border-b">
                <th className="p-3 font-bold text-slate-700">Control de Suplantación (DMARC)</th>
                <td className="p-3 font-mono text-slate-800">{scanData.dns_findings.dmarc.details}</td>
              </tr>
              <tr className="border-b bg-slate-50">
                <th className="p-3 font-bold text-slate-700">Cifrado Web (SSL/TLS)</th>
                <td className="p-3 font-mono text-slate-800">{scanData.ssl_findings.details}</td>
              </tr>
              <tr className="border-b">
                <th className="p-3 font-bold text-slate-700">Monitoreo de Filtraciones (HaveIBeenPwned)</th>
                <td className="p-3 font-mono text-slate-800">{scanData.breach_findings.details}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Descargo Legal y Normativo Obligatorio */}
        <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-500 space-y-1">
          <p>
            <strong>Descargo de Responsabilidad:</strong> {scanData.legal_disclaimer} Este reporte es de carácter preventivo y orientativo bajo el D.S. 016-2024-JUS y no sustituye un peritaje legal vinculante.
          </p>
          <p>
            Emitido por el motor de diagnóstico UYW4Q respetando la Ley N° 30096 (Ley de Delitos Informáticos del Perú).
          </p>
        </div>

      </div>
    </div>
  );
}
