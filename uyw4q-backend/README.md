# UYW4Q Backend — Motor de Escaneo Pasivo y Cumplimiento Normativo

Backend oficial para **UYW4Q**, plataforma de diagnóstico de ciberseguridad y evaluación de cumplimiento del **Decreto Supremo N° 016-2024-JUS** (Reglamento de la Ley N° 29733 de Protección de Datos Personales del Perú) orientada a MYPEs y empresas medianas.

---

## 🎯 Alcance (Bloques A y B)

1. **Bloque A (Motor Técnico Determinístico):**
   - **Análisis DNS Pasivo:** Inspección de registros SPF, DKIM, DMARC y MX mediante `dnspython`.
   - **Verificación SSL/TLS:** Análisis de vigencia, emisor, protocolos e integridad de certificados mediante `ssl` y `cryptography`.
   - **Monitoreo de Brechas (HaveIBeenPwned):** Detección pasiva de credenciales expuestas en filtraciones con degradación controlada y modo mock para desarrollo.
   - **Postura Legal:** Cumplimiento riguroso de la Ley de Delitos Informáticos del Perú. *Únicamente consultas pasivas de fuentes públicas.* NUNCA escaneo de puertos intrusivo ni pruebas de penetración no autorizadas.

2. **Bloque B (Inteligencia Artificial y Mapeo Normativo):**
   - **Base de Conocimiento Curada:** Artículos clave del D.S. 016-2024-JUS (Arts. 38, 39, 42, 45) y escala de sanciones (Leves, Graves, Muy Graves en UIT y Soles).
   - **Casos Peruanos Reales:** Mapeo contextual con precedentes documentados (Interbank, Topitop, UPC).
   - **Priorización por Rubro:** Traducción de riesgos técnicos al impacto de negocio para clínicas, e-commerce, academias, agencias y delivery.
   - **Generador de Plantilla CNSD:** Asistencia para el reporte obligatorio de incidentes ante el Centro Nacional de Seguridad Digital en el plazo perentorio de 48 horas.
   - **Descargo de Responsabilidad:** *"Diagnóstico orientativo, no dictamen legal vinculante."*

---

## 📂 Estructura de Directorios

```
uyw4q-backend/
├── app/
│   ├── main.py                  # Entrada principal FastAPI, middlewares y CORS
│   ├── config.py                # Variables de entorno y configuración
│   ├── api/
│   │   ├── routes_scan.py       # Endpoints de diagnóstico y notificación CNSD
│   │   └── routes_auth.py       # Endpoints de autenticación (Supabase Auth)
│   ├── core/
│   │   ├── dns_checks.py        # SPF / DKIM / DMARC
│   │   ├── ssl_checks.py        # Verificación SSL/TLS
│   │   ├── breach_check.py      # Integración HaveIBeenPwned / Mock
│   │   ├── risk_scoring.py      # Ponderación determinística + IA
│   │   ├── ai/
│   │   │   ├── prompt_builder.py     # Prompt engineering con inyección de ley
│   │   │   ├── response_parser.py    # Validación y parsing JSON estructurado
│   │   │   ├── llm_client.py         # Cliente LLM (Gemini / OpenAI / Mock)
│   │   │   └── incident_template.py  # Plantilla formal CNSD (48 horas)
│   │   └── knowledge/
│   │       ├── normativa_ds016.json   # Base legal curada D.S. 016-2024-JUS
│   │       └── casos_peru.json        # Casos reales documentados
│   ├── models/
│   │   └── schemas.py           # Esquemas Pydantic
│   └── db/
│       └── supabase_client.py   # Conector Supabase / Fallback in-memory
├── tests/
│   ├── test_dns_checks.py
│   ├── test_ssl_checks.py
│   ├── test_breach_check.py
│   ├── test_ai_risk_scoring.py
│   └── test_e2e/
│       ├── test_flujo_completo.py
│       └── test_casos_fallo.py
├── .env.example
├── requirements.txt
└── README.md
```

---

## 🚀 Puesta en Marcha Rápida

### 1. Requisitos Previos
- Python 3.11 o superior.
- Git.

### 2. Instalación de Dependencias
```bash
# Crear y activar entorno virtual
python -m venv venv
# En Windows:
.\venv\Scripts\activate
# En Linux/macOS:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configuración de Variables
```bash
cp .env.example .env
```
Por defecto, el backend corre en modo `mock` para el proveedor LLM y HIBP, lo que permite ejecutar pruebas locales y demos completas sin incurrir en costos ni depender de conectividad a terceros.

### 4. Ejecución del Servidor
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
La documentación interactiva de Swagger estará disponible en: `http://localhost:8000/docs`.

### 5. Ejecución de Pruebas Unitarias y E2E
```bash
pytest -v
```
