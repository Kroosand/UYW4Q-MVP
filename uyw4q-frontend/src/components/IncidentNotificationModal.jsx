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
    chronology: 'Se detectó tráfico anómalo y extracción de credenciales a las 09:30 am.'
  }) ;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-navy-950 text-xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Obligación Legal Perentoria (48 Horas)
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950">
            Asistente de Notificación de Brechas CNSD
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Conforme al Art. 42 del D.S. 016-2024-JUS, toda fuga o vulneración de datos personales debe ser notificada en un plazo no mayor a 48 horas al Centro Nacional de Seguridad Digital (MINJUS).
          </p>
        </div>

        {!generatedDraft ? (
          /* Formulario de Captura de Datos del Incidente */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dominio / Razón Social</label>
                <input
                  type="text"
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rubro de la Empresa</label>
                <select
                  value={formData.rubro}
                  onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
                >
                  <option value="clinica">Clínica / Salud</option>
                  <option value="ecommerce">E-Commerce / Tienda Virtual</option>
                  <option value="academia">Academia / Educación</option>
                  <option value="agencia">Agencia / Servicios B2B</option>
                  <option value="delivery">Delivery / Logística</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sistemas Tecnológicos Afectados</label>
              <input
                type="text"
                required
                value={formData.affected_systems}
                onChange={(e) => setFormData({ ...formData, affected_systems: e.target.value })}
                placeholder="Ej. Servidor de correo, base de datos de pacientes, etc."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha de Ocurrencia</label>
                <input
                  type="date"
                  required
                  value={formData.incident_date}
                  onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha y Hora de Confirmación</label>
                <input
                  type="date"
                  required
                  value={formData.detection_date}
                  onChange={(e) => setFormData({ ...formData, detection_date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Personas Afectadas Estimadas</label>
              <input
                type="number"
                min="1"
                required
                value={formData.estimated_affected_people}
                onChange={(e) => setFormData({ ...formData, estimated_affected_people: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Cronología Sucinta de los Hechos</label>
              <textarea
                rows={3}
                required
                value={formData.chronology}
                onChange={(e) => setFormData({ ...formData, chronology: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracota-500 outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition-colors flex items-center space-x-2"
              >
                {loading ? <span>Generando borrador...</span> : <span>Generar Borrador Oficial CNSD</span>}
              </button>
            </div>
          </form>
        ) : (
          /* Pantalla de Resultado con Borrador y Enlace al Estado */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-950 text-xs">
              <h4 className="font-bold mb-1">✅ Borrador generado exitosamente</h4>
              <p>
                UYW4Q prepara este documento para agilizar su respuesta. Recuerde que el titular de la empresa debe radicarlo formalmente en la mesa virtual del Estado.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs max-h-60 overflow-y-auto whitespace-pre-wrap">
              {generatedDraft.generated_draft_text}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <span>{copied ? '✅ ¡Copiado al portapapeles!' : '📋 Copiar Borrador'}</span>
              </button>

              <a
                href={generatedDraft.cnsd_portal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors text-center shadow flex items-center justify-center space-x-1.5"
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
