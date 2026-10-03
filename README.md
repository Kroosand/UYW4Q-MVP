# UYW4Q — Diagnóstico de Ciberseguridad & Cumplimiento Normativo (D.S. 016-2024-JUS)

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Compliance](https://img.shields.io/badge/Normativa-D.S._016--2024--JUS-C2410C?style=for-the-badge)

> **UYW4Q** es una plataforma integral que permite a las MYPEs y medianas empresas peruanas evaluar en menos de un minuto su nivel de exposición a ciberataques, verificar si sus correos pueden ser clonados para estafar a sus clientes y conocer a qué multas de la Autoridad Nacional de Protección de Datos Personales (ANPPD) se enfrentan bajo el nuevo **Decreto Supremo N° 016-2024-JUS**.

---

## 🏛️ Estructura del Proyecto por Bloques de Especificación Técnica

Este repositorio consolida los 4 bloques técnicos definidos para el MVP:

| Bloque | Módulo | Descripción & Tecnologías Clave | Carpeta / Documentación |
| :--- | :--- | :--- | :--- |
| **Bloque A** | **Backend & Motor de Escaneo Pasivo** | Consultas DNS públicas (SPF, DKIM, DMARC, MX) con `dnspython`, análisis SSL/TLS con `cryptography`, verificación asíncrona de filtraciones (HaveIBeenPwned) con `httpx`, persistencia en `Supabase` y API REST con `FastAPI`. | [`/uyw4q-backend`](./uyw4q-backend) |
| **Bloque B** | **Inteligencia Artificial & Normativa** | Base curada de artículos del D.S. 016-2024-JUS y precedentes peruanos (Interbank, Topitop, UPC). Traducción contextual de hallazgos determinísticos al rubro del cliente, cálculo de sanciones en Soles/UIT y generador de borrador formal para el Centro Nacional de Seguridad Digital (**CNSD**) en plazo perentorio de 48h. | [`/uyw4q-backend/app/core/ai`](./uyw4q-backend/app/core/ai) |
| **Bloque C** | **Frontend & Experiencia de Usuario** | Flujo de 6 pantallas en `React + Vite + Tailwind CSS` con la identidad visual corporativa **Navy (`#0D172E`) + Terracota (`#E05A47`)**. Medidor circular de riesgo SVG, tarjetas interactivas, generador de reportes imprimibles en PDF y asistente CNSD. | [`/uyw4q-frontend`](./uyw4q-frontend) |
| **Bloque D** | **Integración, QA & Consolidación de Negocio** | Pruebas end-to-end automatizadas con `pytest`, entorno resiliente para demostración en vivo (Plan B Offline), Business Model Canvas validado con clientes reales y matriz de propiedad intelectual. | [`/docs`](./docs) & [`/negocio`](./negocio) |

---

## 🛡️ Principio Legal Rector: Escaneo 100% Pasivo

En riguroso cumplimiento de la **Ley N° 30096 (Ley de Delitos Informáticos del Perú)**:
- **Sin Intrusión:** UYW4Q realiza única y exclusivamente **consultas pasivas de registros públicos** (DNS, cabeceras de certificados web y bases de filtraciones públicas).
- **Cero Escaneo Activo:** No se ejecutan ataques de denegación de servicio, inyecciones de paquetes, exploits ni escaneos invasivos de puertos (no-nmap).
- **Descargo Explícito:** Todos los resultados tienen valor de *diagnóstico orientativo y preventivo*, no constituyendo dictamen jurídico vinculante.

---

## 🚀 Puesta en Marcha Rápida (Local)

### Opción 1: Con Docker Compose (Recomendado)
```bash
# Levanta frontend y backend simultáneamente en 1 comando
docker-compose up --build
```
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **API Swagger Backend:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Opción 2: Ejecución Manual por Módulo

#### 1. Backend (FastAPI)
```bash
cd uyw4q-backend

# Crear entorno virtual
python -m venv venv
.\venv\Scripts\activate      # En Windows
# source venv/bin/activate  # En Linux/macOS

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables (viene listo para modo mock de desarrollo)
cp .env.example .env

# Iniciar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 2. Frontend (React + Vite)
```bash
cd uyw4q-frontend

# Instalar paquetes
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 🧪 Ejecución de Pruebas Automatizadas (QA Bloque D)

Para verificar el cumplimiento de pruebas unitarias y flujos end-to-end:

```bash
cd uyw4q-backend
pytest -v
```

Casos cubiertos en el set de pruebas:
- ✅ Análisis y validación de registros SPF y directivas de control DMARC.
- ✅ Extracción y cálculo de caducidad de certificados SSL/TLS.
- ✅ Manejo controlado de fallos y límites de cuota de HaveIBeenPwned.
- ✅ Resiliencia del parser de IA ante respuestas truncadas o malformadas.
- ✅ Flujo E2E completo (`POST /scan` -> polling -> generación de borrador CNSD).
- ✅ Manejo de casos límite: dominio sin ninguna configuración configurada (caso más común en MYPEs).

---

## 🎭 Dominios de Prueba para Demostración en Vivo (Pitch)

Para garantizar una presentación en vivo infalible y fluida frente al jurado:

1. **`clinica-sanborja.pe` (Sector Salud):**
   - **Riesgo:** 68/100 (Alto).
   - **Hallazgo:** DMARC ausente (permite suplantar al director médico) + 2 correos en filtraciones públicas. Alerta de notificación obligatoria al CNSD en 48h.
2. **`tienda-peru.pe` (E-Commerce):**
   - **Riesgo:** 74/100 (Alto).
   - **Hallazgo:** Certificado SSL por expirar en 8 días (bloqueo inminente de ventas y pasarelas de pago) y SPF inexistente.
3. **`nexus-seguro.pe` (Agencia B2B):**
   - **Riesgo:** 12/100 (Bajo).
   - **Hallazgo:** Blindaje completo (DMARC reject, SSL vigente, cero brechas). Demuestra que la plataforma no produce falsos positivos.

> 💡 **Plan B Offline:** En el encabezado del frontend se encuentra disponible el switch **Modo Demo (Offline)** para operar de forma 100% autónoma si falla la conexión Wi-Fi del auditorio.

---

## 📑 Índice de Documentación del Repositorio

- 📐 [**Documento de Arquitectura y Conectividad**](./docs/ARQUITECTURA.md) — Diagramas Mermaid de flujo de datos y modelo de capas.
- ✍️ [**Registro de Autoría y Propiedad Intelectual**](./docs/AUTORIA.md) — Matriz de responsabilidades conforme al Taller de PI del 10 de septiembre.
- 🎤 [**Guía de Pitch y Demostración en Vivo**](./docs/GUIA_DEMO_PITCH.md) — Minutero paso a paso y guión para el presentador.
- 📊 [**Business Model Canvas (BMC)**](./negocio/business_model_canvas.md) — Los 9 bloques estratégicos con datos validados de entrevistas.
- 💰 [**Modelo de Precios y Validación Financiera**](./negocio/modelo_precios.md) — Estructura de planes (Freemium, Pro S/ 99, Agencia S/ 149) y unit economics con 87% de margen bruto.

---

## ⚖️ Licencia y Reconocimientos

Proyecto desarrollado bajo marco académico y de emprendimiento tecnológico. El material normativo referenciado corresponde a las leyes de acceso público del Estado Peruano (Decreto Supremo N° 016-2024-JUS y Ley N° 29733).
