import React, { useState } from 'react';

export default function LandingPage({ onStartScan, defaultDomain = '', defaultRubro = 'clinica' }) {
  const [domain, setDomain] = useState(defaultDomain);
  const [rubro, setRubro] = useState(defaultRubro);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;
    onStartScan(domain.trim(), rubro);
  };

  const handleSelectPreset = (presetDomain, presetRubro) => {
    setDomain(presetDomain);
    setRubro(presetRubro);
    onStartScan(presetDomain, presetRubro);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        {/* Badge Institucional */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-900/5 border border-navy-800/10 text-navy-800 text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-terracota-500 animate-pulse"></span>
          <span>Reglamento D.S. N° 016-2024-JUS (Perú) en vigencia</span>
        </div>

        {/* Título Principal de Alto Impacto */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight sm:leading-none">
            ¿Qué tan expuesto está tu negocio a <span className="text-terracota-600 underline decoration-terracota-300">ciberataques y multas</span>?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Evaluamos en segundos la postura de seguridad de tu empresa, si tus correos pueden ser suplantados para estafar a tus clientes y a qué sanciones de la ANPPD te enfrentas.
          </p>
        </div>

        {/* Formulario Principal de Entrada */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Dominio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Ingresa el sitio web o dominio de tu empresa
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="ejemplo: tuempresa.pe o clinica.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-300 text-navy-950 placeholder-slate-400 font-medium focus:bg-white focus:ring-2 focus:ring-terracota-500 focus:border-terracota-500 outline-none text-base transition-all"
                />
                <span className="absolute left-3.5 top-3.5 text-slate-400 text-lg">🌐</span>
              </div>
            </div>

            {/* Selector de Rubro */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Selecciona el rubro de tu actividad comercial
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'clinica', label: 'Clínica / Salud', icon: '🩺' },
                  { id: 'ecommerce', label: 'E-Commerce / Tienda', icon: '🛒' },
                  { id: 'academia', label: 'Educación / Academia', icon: '🎓' },
                  { id: 'agencia', label: 'Agencia / B2B', icon: '💼' },
                  { id: 'delivery', label: 'Delivery / Logística', icon: '🛵' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setRubro(item.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all ${
                      rubro === item.id
                        ? 'bg-navy-950 text-white border-navy-950 shadow-md ring-2 ring-terracota-500/50'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-center">{item.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                💡 Este dato permite a la IA contextualizar los riesgos según el tipo de datos que manejas (pacientes, compras, alumnos).
              </p>
            </div>

            {/* Botón CTA */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-terracota-600 hover:bg-terracota-700 active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-terracota-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Diagnosticar mi Empresa Ahora</span>
              <span>→</span>
            </button>
          </form>

          {/* Presets para Demostración en Vivo frente al Jurado */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ Dominios de Prueba Verificados para la Demo:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset('clinica-sanborja.pe', 'clinica')}
                className="px-3 py-1.5 rounded-lg text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-medium transition-colors"
              >
                🩺 Clínica San Borja (Alto Riesgo)
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('tienda-peru.pe', 'ecommerce')}
                className="px-3 py-1.5 rounded-lg text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 font-medium transition-colors"
              >
                🛒 Tienda Perú (Sin DMARC)
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('nexus-seguro.pe', 'agencia')}
                className="px-3 py-1.5 rounded-lg text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-medium transition-colors"
              >
                💼 Nexus Seguro (Todo en Verde)
              </button>
            </div>
          </div>

        </div>

        {/* Pilares Clave */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-xl mb-1">⚖️</div>
            <h4 className="font-bold text-xs uppercase text-navy-950 mb-1">100% Pasivo y Legal</h4>
            <p className="text-xs text-slate-600">
              Solo consultas públicas DNS, certificados y bases abiertas. Cumple con la Ley de Delitos Informáticos.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-xl mb-1">💡</div>
            <h4 className="font-bold text-xs uppercase text-navy-950 mb-1">Lenguaje de Negocio</h4>
            <p className="text-xs text-slate-600">
              Sin tecnicismos abrumadores. Explicamos qué pasa si te atacan y cuánto te costaría en soles.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200">
            <div className="text-xl mb-1">📋</div>
            <h4 className="font-bold text-xs uppercase text-navy-950 mb-1">Asistencia CNSD 48h</h4>
            <p className="text-xs text-slate-600">
              Generador de borrador oficial para cumplir la notificación obligatoria ante el MINJUS.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
