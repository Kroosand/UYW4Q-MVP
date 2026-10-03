# UYW4Q Frontend — Interfaz de Usuario y Experiencia (Bloque C)

Interfaz moderna desarrollada en **React + Vite + Tailwind CSS** para **UYW4Q**, orientada a dueños de negocio y gerentes de MYPEs peruanas.

---

## 🎨 Identidad Visual del Proyecto

- **Paleta de Colores:**
  - **Navy Corporativo Profundo:** `#070D1E` / `#0D172E` (solidez, seriedad, protección perimetral).
  - **Acento Terracota:** `#D4513B` / `#E05A47` (urgencia regulada, atención a riesgos sin estridencias cian cliché).
  - **Fondos Arena / Slate Neutro:** `#FBFBFA` para evitar fatiga visual durante revisiones de informes.
- **Tipografía:** Sans-serif geométrica (*Plus Jakarta Sans* / *Inter*).
- **Iconografía:** Logotipo entrelazado propio en SVG sin clichés visuales (sin candados, escudos genéricos ni ojos).

---

## 📱 Flujo de Pantallas Implementado

1. **Landing Page / Ingreso:**
   - Entrada de dominio web.
   - Selector de rubro (`clínica`, `e-commerce`, `academia`, `agencia`, `delivery`).
   - Acceso directo a casos de prueba pre-verificados para demos frente al jurado.
2. **Pantalla de Carga Interactiva:**
   - Barra de progreso dinámica con mensajes secuenciales ("Consultando DNS...", "Comprobando certificado SSL...", "Evaluando impacto bajo D.S. 016-2024-JUS...").
3. **Dashboard de Resultados:**
   - Medidor de riesgo circular (`risk_score` de 0 a 100).
   - Resumen ejecutivo para el dueño sin tecnicismos complejos.
   - Tarjetas de estado perimetral (DNS, SSL, Filtraciones).
4. **Detalle de cada Hallazgo (Modal Expandible):**
   - Impacto directo en el negocio según el rubro.
   - Referencia al artículo específico del D.S. 016-2024-JUS y rango de multas en UIT/Soles.
   - Evidencia técnica detallada y pasos de remediación.
5. **Reporte Descargable / Imprimible (PDF):**
   - Hoja ejecutiva formal optimizada con directivas CSS `@media print` para exportar a PDF o imprimir con un clic.
6. **Módulo de Notificación de Brecha CNSD:**
   - Asistente de captura de incidentes que genera un borrador formal alineado a los campos del portal del MINJUS dentro del plazo obligatorio de 48 horas.

---

## 🚀 Puesta en Marcha Rápida

### 1. Instalación de Dependencias
```bash
npm install
```

### 2. Ejecución en Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible de inmediato en: `http://localhost:5173`.

### 3. Modo Demo Offline (Plan B para Pitch)
En la esquina superior derecha del encabezado se encuentra el selector de **Modo Demo (Offline)**. Al estar activado, la aplicación puede realizar diagnósticos y demostraciones completas incluso si el auditorio no dispone de conexión Wi-Fi, consumiendo datos calibrados de prueba.
