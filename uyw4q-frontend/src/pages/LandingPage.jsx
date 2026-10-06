import React, { useState } from 'react';

export default function LandingPage({ onStartScan, defaultDomain = '' }) {
  const [domain, setDomain] = useState(defaultDomain);
  const [inputError, setInputError] = useState('');

  const cleanDomainInput = (raw) => {
    return raw
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .split('/')[0]
      .split('?')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = cleanDomainInput(domain);
    if (!clean) {
      setInputError('Por favor ingrese un dominio o dirección web válida.');
      return;
    }
    setInputError('');
    onStartScan(clean, 'auto');
  };

  const handleSelectPreset = (presetDomain, presetRubro) => {
    setDomain(presetDomain);
    onStartScan(presetDomain, presetRubro);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full text-center space-y-8 animate-fadeIn">
        
        {/* Badge Institucional Oficial */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-navy-950/5 border border-navy-900/10 text-navy-900 text-xs font-black shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-terracota-600 animate-pulse"></span>
          <span>Reglamento D.S. N° 016-2024-JUS (Perú) — Fiscalización Activa</span>
        </div>

        {/* Título y Subtítulo de Alto Impacto para Proyección */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 tracking-tight leading-tight">
            ¿Qué tan expuesta está su empresa a <span className="text-terracota-600 underline decoration-terracota-300">ciberataques y multas</span>?
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Diagnóstico pasivo en menos de 1 minuto: detecta si su dominio puede ser suplantado para estafar a sus clientes y calcula su riesgo legal en Soles y UIT ante la ANPPD.
          </p>
        </div>

        {/* Formulario de Entrada Principal */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border-2 border-slate-200 text-left">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo: Dominio del Negocio */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <label 
                  htmlFor="domain-input"
                  className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
                >
                  Ingrese el sitio web o dominio de su empresa
                </label>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center space-x-1">
                  <span>⚡ Detección automática de sector y rubro activa</span>
                </span>
              </div>
              
              <div className="relative">
                <input
                  id="domain-input"
                  type="text"
                  required
                  placeholder="ejemplo: suempresa.pe o clinica.com"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 font-mono text-base sm:text-lg text-navy-950 placeholder-slate-400 font-bold focus:bg-white outline-none transition-all ${
                    inputError ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-300 focus:border-terracota-500 focus:ring-4 focus:ring-terracota-500/15'
                  }`}
                />
              </div>
              {inputError && (
                <p className="text-xs text-red-600 font-bold mt-1.5">{inputError}</p>
              )}
            </div>

            {/* Botón CTA Principal */}
            <button
              type="submit"
              className="w-full py-4 px-8 rounded-2xl bg-terracota-600 hover:bg-terracota-700 active:scale-[0.99] text-white font-black text-base sm:text-lg shadow-xl shadow-terracota-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Diagnosticar mi Empresa Ahora</span>
              <span>→</span>
            </button>
          </form>

          {/* Presets Verificados para Demostración en Vivo frente al Jurado */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-3">
              ⚡ Dominios de Prueba Verificados para la Demostración (Plan de Pitch):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectPreset('clinica-sanborja.pe', 'clinica')}
                className="p-3 rounded-xl text-left bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <div className="text-xs font-black text-red-900">Clínica San Borja</div>
                <div className="text-[11px] text-red-700">Sector Salud (Alto Riesgo: DMARC + Brechas)</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleSelectPreset('tienda-peru.pe', 'ecommerce')}
                className="p-3 rounded-xl text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <div className="text-xs font-black text-amber-900">Tienda Perú</div>
                <div className="text-[11px] text-amber-700">E-Commerce (Alto Riesgo: SSL caduca en 8d)</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('nexus-seguro.pe', 'agencia')}
                className="p-3 rounded-xl text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <div className="text-xs font-black text-emerald-900">Nexus Seguro</div>
                <div className="text-[11px] text-emerald-700">Servicios B2B (Bajo Riesgo: Seguro)</div>
              </button>
            </div>
          </div>

        </div>

        {/* 3 Pilares del Enfoque Técnico */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 text-left">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-navy-950 block">
              1. Escaneo 100% Pasivo
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Consultas estrictamente públicas a DNS, certificados SSL y filtraciones abiertas. Cumple rigurosamente con la Ley de Delitos Informáticos del Perú.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-navy-950 block">
              2. Lenguaje para el Dueño
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Sin jerga técnica incomprensible. Cada sigla (DMARC, SPF, SSL) se traduce en una línea explicando el riesgo comercial y las posibles sanciones en soles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-navy-950 block">
              3. Cumplimiento CNSD 48h
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Asistente para generar el borrador obligatorio de notificación de incidentes ante el Centro Nacional de Seguridad Digital dentro del plazo legal.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
