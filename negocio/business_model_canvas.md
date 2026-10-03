# Business Model Canvas (BMC) — UYW4Q

**Versión:** 2.0 (Consolidada con entrevistas de validación a Clínicas, ISPs y Agencias Digitales)  
**Fecha:** Octubre 2026  
**Responsable:** Bloque D — Integración y Negocio

---

```
+----------------------------------------------------------------------------------------------------+
| 8. SOCIOS CLAVE          | 7. ACTIVIDADES CLAVE  | 2. PROPUESTA DE VALOR | 4. RELACIÓN CON CLIENTE | 1. SEGMENTO DE CLIENTE |
|                          |                       |                       |                         |                        |
| • Agencias de Desarrollo | • Mapeo continuo y    | • Diagnóstico de      | • Autoservicio digital  | • MYPEs y medianas     |
|   Web y Software (Canal    curación de normas      ciberseguridad pasivo   (self-service) guiado    empresas peruanas con    |
|   B2B como Alma Quinta).   (D.S. 016-2024-JUS).    en menos de 1 minuto    sin tecnicismos.         activos digitales        |
| • Proveedores de APIs    • Mantenimiento del     • Traducción a impacto  • Alertas automáticas de   (clínicas, e-commerce,   |
|   especializadas:          motor de escaneo        de negocio y multas     vencimiento de SSL y     academias, delivery,     |
|   HaveIBeenPwned y         DNS/SSL/HIBP.           en Soles (UIT) con IA.  brechas detectadas.      agencias).               |
|   proveedor LLM          • Soporte y generación  • Asistente de borrador • Soporte especializado   • Titulares de bancos de |
|   (Gemini/OpenAI).         de borradores CNSD.     oficial CNSD en 48h.    para planes corporativos.  datos obligados por ley.|
| • Cámaras de comercio y  +-----------------------+                       +-------------------------+                        |
|   gremios MYPE.          | 6. RECURSOS CLAVE     |                       | 3. CANALES              |                        |
|                          |                       |                       |                         |                        |
|                          | • Motor algorítmico   |                       | • Modelo Freemium       |                        |
|                          |   de escaneo pasivo.  |                       |   directo vía web.      |                        |
|                          | • Base de conocimiento|                       | • Alianza con agencias  |                        |
|                          |   jurídica curada.    |                       |   web (Revendedores     |                        |
|                          | • Claves API de datos |                       |   como Alma Quinta).    |                        |
|                          |   y modelos de IA.    |                       | • Campañas B2B en       |                        |
|                          | • Repositorio y stack |                       |   LinkedIn y gremios.   |                        |
|                          |   FastAPI + React.    |                       |                         |                        |
+--------------------------+-----------------------+-----------------------+-------------------------+------------------------+
| 9. ESTRUCTURA DE COSTOS                                                  | 5. FUENTES DE INGRESOS                           |
|                                                                          |                                                  |
| • Costos de Infraestructura Cloud y Hosting (Supabase / Render / Vercel): ~S/ 120/mes.| • Plan Pro Monitoreo Continuo: S/ 99 / mes.      |
| • Licencia comercial API HaveIBeenPwned (Breaches): ~S/ 150/mes ($3.50/mo base/tier). | • Plan Corporativo / Multi-dominio: S/ 149 / mes. |
| • Consumo de Tokens LLM (Prompt caching + respuestas estructuradas): ~S/ 80/mes.      | • Comisión por cuenta revendedora (Alma Quinta): |
| • Dominio, certificados y pasarela de cobro (MercadoPago/Culqi 4.5% + IGV).           |   S/ 45 / mes por dominio gestionado.            |
+----------------------------------------------------------------------------------------------------+
```

---

## Detalle Estratégico por Bloque

### 1. Segmentos de Clientes
- **Sector Salud Privado (Clínicas, Consultorios, Laboratorios):** Manejan datos altamente sensibles (historias clínicas, diagnósticos). Exposición máxima a multas muy graves de la ANPPD.
- **E-Commerce y Retail:** Empresas que procesan tarjetas de crédito y datos de contacto de compradores. El vencimiento de un certificado SSL o la suplantación de identidad por correo (spoofing) destruye sus ventas de forma inmediata.
- **Instituciones Educativas y Academias:** Custodian información personal de estudiantes y menores de edad.

### 2. Propuesta de Valor Diferencial
- **Cero Jerga Incomprensible:** Los reportes tradicionales de ciberseguridad entregan 80 páginas de vulnerabilidades CVE que un dueño de clínica no entiende. UYW4Q responde: *"¿Qué tan expuesto estoy, cómo afecta mis ventas y cuánto me puede costar en multas?"*.
- **Mapeo Jurídico Exacto:** Vinculación directa con los artículos 38, 39, 42 y 45 del nuevo D.S. 016-2024-JUS.
- **Salvavidas Regulatorio de 48 Horas:** Borrador instantáneo para la mesa del Centro Nacional de Seguridad Digital (CNSD).

### 3. Canales y Estrategia Go-To-Market
- **Adquisición Orgánica Freemium:** El usuario prueba su dominio gratis y obtiene un diagnóstico preliminar. Para ver el plan de remediación paso a paso, monitoreo recurrente y soporte CNSD, desbloquea el Plan Pro.
- **Canal B2B (Agencias de Desarrollo Web):** Caso de validación con **Alma Quinta**. Las agencias que crean sitios web integran UYW4Q como un servicio mensual de mantenimiento de seguridad para sus clientes, compartiendo margen de ingresos.
