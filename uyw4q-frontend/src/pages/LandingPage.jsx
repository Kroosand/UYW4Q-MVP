import React, { useState } from 'react';

const RUBRO_OPTIONS = [
  { 
    id: 'clinica', 
    label: 'Clínica / Salud', 
    iconText: 'Salud', 
    description: 'Historias clínicas, diagnósticos y datos médicos altamente sensibles (Art. 45)' 
  },
  { 
    id: 'ecommerce', 
    label: 'E-Commerce / Tienda', 
    iconText: 'Comercio', 
    description: 'Tarjetas de crédito, pasarelas de pago, direcciones y cuentas de compradores' 
  },
  { 
    id: 'academia', 
    label: 'Educación / Academia', 
    iconText: 'Educación', 
    description: 'Calificaciones, datos de menores de edad, matrículas y registros de postulantes' 
  },
  { 
    id: 'agencia', 
    label: 'Agencia / B2B', 
    iconText: 'Servicios', 
    description: 'Contratos corporativos, acuerdos confidenciales y bancos de datos de clientes' 
  },
  { 
    id: 'delivery', 
    label: 'Delivery / Logística', 
    iconText: 'Logística', 
    description: 'Geolocalización en tiempo real, teléfonos de clientes y pagos contraentrega' 
  },
];

export default function LandingPage({ onStartScan, defaultDomain = '', defaultRubro = 'clinica' }) {
  const [domain, setDomain] = useState(defaultDomain);
  const [rubro, setRubro] = useState(defaultRubro);
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
    onStartScan(clean, rubro);
  };

  const handleSelectPreset = (presetDomain, presetRubro) => {
    setDomain(presetDomain);
    setRubro(presetRubro);
    onStartScan(presetDomain, presetRubro);
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
        
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
          <form onSubmit={handleSubmit} className="space-y-7">
            
            {/* Campo 1: Dominio del Negocio */}
            <div>
              <label 
                htmlFor="domain-input"
                className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2"
              >
                1. Ingrese el dominio web de su empresa
              </label>
              
              <div className="relative">
                <input
                  id="domain-input"
                  type="text"
                  required
                  placeholder="ejemplo: suempresa.pe o miclinica.com"
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

            {/* Campo 2: Selector de Rubro (Alimenta el motor del Bloque B) */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  2. Seleccione el rubro de su actividad comercial
                </label>
                <span className="text-[11px] font-bold text-terracota-600">
                  * Alimenta la priorización de riesgo del Bloque B
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RUBRO_OPTIONS.map((item) => {
                  const isSelected = rubro === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setRubro(item.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'bg-navy-950 text-white border-navy-950 shadow-md ring-2 ring-terracota-500/50'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-terracota-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {item.iconText}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-500 mt-2 font-medium">
                💡 Este dato no es decorativo: le permite al motor de IA determinar si su banco de datos contiene información sensible y calcular el rango exacto de multas aplicable bajo el D.S. 016-2024-JUS.
              </p>
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
                className="p-2.5 rounded-xl text-left bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <div className="text-xs font-black text-red-900">Clínica San Borja</div>
                <div className="text-[11px] text-red-700">Alto Riesgo: DMARC ausente + Brechas</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleSelectPreset('tienda-peru.pe', 'ecommerce')}
                className="p-2.5 rounded-xl text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <div className="text-xs font-black text-amber-900">Tienda Perú</div>
                <div className="text-[11px] text-amber-700">Alto Riesgo: SSL caduca en 8 días</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('nexus-seguro.pe', 'agencia')}
                className="p-2.5 rounded-xl text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <div className="text-xs font-black text-emerald-900">Nexus Seguro</div>
                <div className="text-[11px] text-emerald-700">Bajo Riesgo: Protección completa</div>
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
