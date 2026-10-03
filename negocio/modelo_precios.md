# Modelo de Precios y Validación Financiera — UYW4Q

**Documento Consolidado post-Entrevistas de Validación** (Clínica Privada, ISP Regional, Agencia Web Alma Quinta)  
**Fecha de Consolidación:** 20 de septiembre de 2026  
**Responsable:** Bloque D — Consolidación de Negocio

---

## 1. Conclusiones de las 3 Entrevistas de Validación

| Actor Entrevistado | Hallazgo Clave | Disposición a Pagar (WTP) |
| :--- | :--- | :--- |
| **Gerente de Clínica Privada** | Tienen pánico a multas del MINJUS por historias clínicas, pero no cuentan con oficial de ciberseguridad. Valoran enormemente el borrador CNSD para cumplir las 48 horas. | Validó positivamente pagar entre **S/ 100 y S/ 150 mensuales** si incluye monitoreo continuo y alertas de vencimiento SSL/correos. |
| **Operador de Red / ISP** | Ya tienen herramientas complejas para su infraestructura, pero sus clientes empresariales (pymes) les piden soporte cuando sufren phishing. Ven a UYW4Q como un complemento de valor agregado. | Sugieren un modelo por volumen con cobro en el recibo de telecomunicaciones (**S/ 35 a S/ 50 / mes por cliente**). |
| **Director de Agencia Web (Alma Quinta)** | Desarrollan tiendas web y sitios corporativos. Cuando a un cliente se le vence el SSL o no tiene DMARC, culpan a la agencia. Quieren revender UYW4Q con su propia marca o en paquete de hosting. | Validación de margen compartido: cobrar S/ 99 al cliente final y retener un 30-40% de comisión por administración. |

---

## 2. Estructura de Planes y Precios Oficial

```
+-----------------------------------+-----------------------------------+-----------------------------------+
|            1. GRATUITO            |           2. PLAN PRO             |       3. PLAN AGENCIA / B2B       |
|             (Freemium)            |           (Monitoreo)             |         (Revendedores)            |
+-----------------------------------+-----------------------------------+-----------------------------------+
|               S/ 0                |            S/ 99 / mes            |           S/ 149 / mes            |
|          (Sin tarjeta)            |         (Facturación mensual)     |       (Hasta 5 dominios + S/25 adic.)|
+-----------------------------------+-----------------------------------+-----------------------------------+
| • 1 diagnóstico pasivo al mes.   | • Diagnósticos pasivos ilimitados. | • Panel multi-cliente centralizado.|
| • Puntaje de riesgo (0-100).      | • Monitoreo 24/7 de DMARC y SSL.   | • Informes en PDF con marca blanca.|
| • Resumen del dueño del negocio.  | • Alertas inmediatas de expiración.| • Canal prioritario para agencias |
| • Indicadores básicos perimetrales| • Asistente completo de brecha     |   (Modelo probado con Alma Quinta)|
|   (DNS, SSL, Brechas).            |   CNSD en 48 horas.               | • API access para integración con |
|                                   | • Descarga de Reportes Ejecutivos  |   sistemas de tickets.            |
|                                   |   en PDF con respaldo legal.      |                                   |
+-----------------------------------+-----------------------------------+-----------------------------------+
```

---

## 3. Economía Unitaria (Unit Economics) y Margen por Cliente

Tomando como base el **Plan Pro (S/ 99 / mes / cliente)**:

- **Ingreso Bruto Mensual:** S/ 99.00
- **Costos Variables Directos por Cliente:**
  - Costo prorrateado de API HaveIBeenPwned: S/ 1.50
  - Costo de tokens de Inteligencia Artificial (Prompt caching + respuestas estructuradas): S/ 2.20
  - Hosting e infraestructura base en nube (Supabase / Render): S/ 3.50
  - Comisión de pasarela de pago local (4.5% + IGV): S/ 5.25
- **Costo Total Variable por Cliente:** **S/ 12.45 / mes**
- **Margen de Contribución Bruto:** **S/ 86.55 / mes (87.4% de margen bruto)**

Esta estructura garantiza que el negocio sea financieramente escalable y sostenible desde las primeras decenas de clientes MYPE suscritos.
