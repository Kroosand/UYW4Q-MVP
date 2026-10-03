import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 text-xs py-8 border-t border-navy-900 no-print mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Descargo de Responsabilidad y Advertencia Legal Obligatoria */}
        <div className="bg-navy-900/60 p-4 rounded-xl border border-navy-800 text-slate-300 leading-relaxed text-center sm:text-left">
          <p className="font-semibold text-slate-200 mb-1">
            ⚖️ Descargo de Responsabilidad y Marco Legal:
          </p>
          <p className="text-slate-400">
            Los resultados generados por <strong>UYW4Q</strong> constituyen un <span className="text-slate-200 underline">diagnóstico técnico-normativo orientativo</span> y no reemplazan una auditoría jurídica ni un dictamen legal vinculante ante el Ministerio de Justicia y Derechos Humanos (MINJUS).
            Todas las pruebas ejecutadas corresponden exclusivamente a <strong>consultas técnicas pasivas</strong> (DNS público, certificados SSL y filtraciones reportadas), respetando escrupulosamente los límites establecidos por la Ley N° 30096 (Ley de Delitos Informáticos del Perú).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-2 text-slate-500">
          <div>
            © {new Date().getFullYear()} UYW4Q — Plataforma de Seguridad y Cumplimiento Digital para MYPEs.
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-[11px]">
            <span>Reglamento D.S. 016-2024-JUS</span>
            <span>•</span>
            <a 
              href="https://reporte.cnsd.gob.pe/home/minjus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-terracota-400 hover:underline"
            >
              Portal Oficial CNSD / MINJUS
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
