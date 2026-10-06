import React, { useState } from 'react';
import { submitIncidentDraft } from '../services/api';

export default function IncidentNotificationModal({ initialDomain, initialRubro, onClose }) {
  const [formData, setFormData] = useState({
    domain: initialDomain || 'empresa-ejemplo.pe',
    rubro: initialRubro || 'clinica',
    affected_systems: 'Servidor web y base de datos de clientes',
    compromised_data_types: ['DNI', 'Nombres', 'Correos'],
    estimated_affected_people: 500,
    incident_date: new Date().toISOString().split('T')[0],
    detection_date: new Date().toISOString().split('T')[0],
    chronology: 'Se detectó tráfico anómalo y posible acceso no autorizado a las 09:30 am.'
  });

  const [loading, setLoading] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitIncidentDraft(formData);
      setGeneratedDraft(res);
    } catch (err) {
      console.error("Error al generar borrador de incidente:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedDraft?.generated_draft_text) {
      navigator.clipboard.writeText(generatedDraft.generated_draft_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border-2 border-slate-200 relative max-h-[92vh] overflow-y-auto space-y-6"
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

        {/* Encabezado con Alerta Perentoria de 48 Horas */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider text-red-700 bg-red-100 px-3 py-0.5 rounded-full border border-red-300">
              Obligación Legal Perentoria — Plazo de 48 Horas
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-navy-950">
            Asistente de Notificación CNSD / MINJUS
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Conforme al <strong>Artículo 42 del D.S. N° 016-2024-JUS</strong>, toda empresa que sufra una brecha de seguridad debe notificarla al <strong>Centro Nacional de Seguridad Digital (CNSD)</strong> dentro de las 48 horas siguientes a su confirmación. UYW4Q prepara su borrador oficial listo para radicar.
          </p>
        </div>

        {!generatedDraft ? (
          /* Formulario de Captura de Datos del Incidente */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Dominio / Empresa Titular
                </label>
                <input
                  type="text"
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl font-mono font-bold focus:border-terracota-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sector o Rubro
                </label>
                <select
                  value={formData.rubro}
                  onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                  className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl font-bold focus:border-terracota-500 outline-none"
                >
                  <option value="clinica">Clínica / Salud</option>
                  <option value="ecommerce">E-Commerce / Tienda Virtual</option>
                  <option value="academia">Educación / Academia</option>
                  <option value="agencia">Agencia / Servicios B2B</option>
                  <option value="delivery">Delivery / Logística</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Sistemas Tecnológicos Afectados
              </label>
              <input
                type="text"
                required
                value={formData.affected_systems}
                onChange={(e) => setFormData({ ...formData, affected_systems: e.target.value })}
                placeholder="Ej. Servidor de base de datos MySQL, panel administrativo, web"
                className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl focus:border-terracota-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fecha Estimada del Incidente
                </label>
                <input
                  type="date"
                  required
                  value={formData.incident_date}
                  onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl focus:border-terracota-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Fecha y Hora de Confirmación
                </label>
                <input
                  type="date"
                  required
                  value={formData.detection_date}
                  onChange={(e) => setFormData({ ...formData, detection_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl focus:border-terracota-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Número Estimado de Personas / Titulares Afectados
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.estimated_affected_people}
                onChange={(e) => setFormData({ ...formData, estimated_affected_people: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl font-bold focus:border-terracota-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Cronología Sucinta de los Hechos
              </label>
              <textarea
                rows={3}
                required
                value={formData.chronology}
                onChange={(e) => setFormData({ ...formData, chronology: e.target.value })}
                placeholder="Describa brevemente cómo se originó el incidente y qué acciones de contención inmediata adoptó."
                className="w-full px-3.5 py-2.5 border-2 border-slate-300 rounded-xl focus:border-terracota-500 outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                {loading ? <span>Generando borrador...</span> : <span>Generar Borrador Oficial CNSD</span>}
              </button>
            </div>
          </form>
        ) : (
          /* Pantalla con el Borrador Generado y Enlace Directo al Portal Oficial */
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-950 text-xs space-y-1">
              <h4 className="font-black text-sm">✅ Borrador Formulado Exitosamente</h4>
              <p className="font-medium">
                Copie el texto estructurado a continuación y péguelo en el formulario oficial del Estado. Por disposiciones de ley, el titular del banco de datos es quien confirma y firma la notificación final.
              </p>
            </div>

            <div className="bg-navy-950 text-slate-200 p-5 rounded-2xl font-mono text-xs max-h-64 overflow-y-auto whitespace-pre-wrap border border-navy-800 leading-relaxed">
              {generatedDraft.generated_draft_text}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-extrabold text-xs transition-colors flex items-center justify-center space-x-2 border border-navy-700"
              >
                <span>{copied ? '✅ ¡Copiado al Portapapeles!' : '📋 Copiar Borrador al Portapapeles'}</span>
              </button>

              <a
                href={generatedDraft.cnsd_portal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition-all text-center shadow-lg flex items-center justify-center space-x-1.5"
              >
                <span>Ir al Portal Oficial CNSD (MINJUS) →</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
