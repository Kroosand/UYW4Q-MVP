# Registro Formal de Autoría de Código y Propiedad Intelectual

**Proyecto:** UYW4Q — Plataforma de Diagnóstico de Ciberseguridad y Cumplimiento Normativo (D.S. 016-2024-JUS)  
**Marco de Cumplimiento:** Taller de Propiedad Intelectual del Programa (10 de septiembre de 2026)  
**Propósito:** Acreditar documentalmente la autoría, contribuciones técnicas y distribución de responsabilidades sobre los componentes del repositorio.

---

## 👥 Matriz de Responsabilidades y Asignación de Bloques

| Bloque | Componente Técnico | Rol Principal | Entregables Clave |
| :--- | :--- | :--- | :--- |
| **Bloque A** | **Backend y Motor de Escaneo** | Líder de Backend | `app/main.py`, `app/core/dns_checks.py`, `app/core/ssl_checks.py`, `app/core/breach_check.py`, `app/api/routes_scan.py`, conector Supabase, tests unitarios (`test_dns_checks.py`, etc.). |
| **Bloque B** | **Inteligencia Artificial y Normativa** | Especialista en IA y Legaltech | Curación de `normativa_ds016.json`, tabla de casos `casos_peru.json`, `app/core/ai/prompt_builder.py`, `llm_client.py`, `response_parser.py`, `incident_template.py`, tests de scoring (`test_ai_risk_scoring.py`). |
| **Bloque C** | **Frontend y Experiencia de Usuario** | Diseñador UI/UX & Frontend Dev | Flujo de 6 pantallas React/Tailwind, medidor circular SVG, tarjetas de hallazgos, modal interactivo, diseño de reporte PDF imprimible, slides institucionales en Canva. |
| **Bloque D** | **Integración, QA y Negocio** | Líder de Proyecto & QA | Pruebas E2E (`test_flujo_completo.py`, `test_casos_fallo.py`), entorno resiliente de demo offline, Business Model Canvas (`negocio/business_model_canvas.md`), modelo de precios validado (`negocio/modelo_precios.md`), documentación general. |

---

## 📅 Cronograma de Contribuciones Técnicas

| Fecha | Bloque / Módulo | Descripción del Aporte | Estado |
| :--- | :--- | :--- | :--- |
| **10/09/2026** | **Gobernanza / Legal** | Asistencia al Taller de Propiedad Intelectual. Definición de la política de no intrusión (solo consultas pasivas conforme a Ley de Delitos Informáticos). | Completado |
| **11/09/2026** | **Bloque A & B** | Redacción y congelamiento de las especificaciones técnicas v2 de los Bloques A, B, C y D. Definición del contrato de API JSON (`POST /scan`). | Completado |
| **14/09/2026** | **Bloque A** | Implementación del motor de consultas DNS (`dnspython`), validador SSL/TLS (`cryptography`) y cliente HaveIBeenPwned con soporte asíncrono. | Completado |
| **18/09/2026** | **Bloque B** | Curación exhaustiva de los artículos 38, 39, 42 y 45 del D.S. 016-2024-JUS y escala de multas en UIT/Soles. Implementación del prompt builder y parser JSON estructurado. | Completado |
| **23/09/2026** | **Bloque C** | Maquetación del frontend en React + Tailwind con identidad Navy & Terracota. Construcción del medidor circular y reporte ejecutivo imprimible. | Completado |
| **28/09/2026** | **Bloque D** | Integración del flujo completo A + B + C. Configuración del set de pruebas automatizadas y calibración de los 3 casos demo para el pitch. | Completado |
| **02/10/2026** | **Consolidación** | Montaje del repositorio integral en GitHub, docker-compose y preparación para la presentación de Entregables. | Completado |

---

## 🔒 Declaración de Originalidad y Licenciamiento

Los autores declaran que el código fuente desarrollado en este proyecto es original, haciendo uso únicamente de librerías de código abierto compatibles (MIT, Apache 2.0, BSD) y respetando las limitaciones comerciales de las APIs de terceros utilizadas.
Queda expresamente establecido que el material legal curado corresponde al texto de acceso público del Decreto Supremo N° 016-2024-JUS del Estado Peruano, utilizado con propósitos de cumplimiento normativo y concientización empresarial.
