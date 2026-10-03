# Guía de Demostración en Vivo y Pitch (Bloque D)

Manual de operaciones para el presentador durante las **Finales Locales** y presentaciones ante el jurado o inversionistas.

---

## 🎭 Guión de la Demostración (3 Minutos)

### Minuto 0:00 - 0:45 | El Problema y la Entrada
1. **Apertura de Impacto:**  
   *"En el Perú, el nuevo D.S. 016-2024-JUS impone multas de hasta S/ 515,000 a cualquier empresa que sufra una fuga de datos o no cuente con medidas técnicas mínimas. Sin embargo, el 85% de las MYPEs no tiene un área de sistemas ni sabe si sus correos pueden ser clonados."*
2. **Acción en Pantalla:**  
   - Mostrar la pantalla inicial de **UYW4Q**.
   - Ingresar el dominio de prueba: `clinica-sanborja.pe` y seleccionar el rubro **Clínica / Salud**.
   - Hacer clic en **"Diagnosticar mi Empresa Ahora"**.

### Minuto 0:45 - 1:15 | La Experiencia de Carga y Transparencia
- Señalar la pantalla de carga interactiva:  
  *"El sistema no es una caja negra: realiza consultas pasivas en tiempo real a registros DNS públicos, certificados SSL y bases de filtraciones, sin invadir la red del cliente."*

### Minuto 1:15 - 2:15 | El Dashboard de Resultados (La Revelación)
1. **Medidor de Riesgo:**  
   *"Inmediatamente el dueño del negocio ve su índice de riesgo: 68/100 (Riesgo Alto). No hay siglas confusas."*
2. **Traducción Contextual por IA:**  
   - Leer el resumen ejecutivo: *"Criminales pueden enviar correos falsos a nombre de la clínica pidiendo pagos o robando historiales médicos."*
3. **El Vínculo Legal:**  
   - Hacer clic en la tarjeta de **DMARC ausente**.
   - Mostrar la sanción exacta: *"Infracción Grave bajo el Art. 38 del D.S. 016-2024-JUS — hasta 50 UIT (S/ 257,500)."*

### Minuto 2:15 - 3:00 | La Solución y el Cierre
1. **Exportación PDF:**  
   - Clic en **"Descargar Reporte PDF"** para mostrar la hoja formal lista para la gerencia.
2. **El Asistente CNSD (48 Horas):**  
   - Mostrar el botón de **"Reportar Brecha CNSD (48h)"** y cómo genera el borrador formal alineado a la mesa del MINJUS en segundos.
3. **Frase de Cierre:**  
   *"UYW4Q transforma la incertidumbre legal y técnica en un plan de acción concreto y accesible para cualquier MYPE peruana."*

---

## ⚡ Dominios de Prueba Pre-Calibrados

| Dominio de Prueba | Rubro | Riesgo | Hallazgos Destacados para la Historia |
| :--- | :--- | :--- | :--- |
| **`clinica-sanborja.pe`** | Clínica | **68/100 (Alto)** | DMARC ausente (suplantación de médicos/pacientes) + 2 correos en filtraciones públicas conocidas. Ideal para mostrar impacto en datos sensibles de salud. |
| **`tienda-peru.pe`** | E-Commerce | **74/100 (Alto)** | Certificado SSL a punto de vencer (8 días) + DMARC inofensivo. Caso típico de pérdida directa de ventas y pasarelas de pago caídas. |
| **`nexus-seguro.pe`** | Agencia B2B | **12/100 (Bajo)** | Todo en verde (DMARC reject, SSL por 6 meses, cero brechas). Sirve para demostrar que el sistema no genera alarmas falsas cuando la empresa está bien configurada. |

---

## 🛡️ Protocolo de Contingencia (Plan B Sin Internet)

Si el Wi-Fi del auditorio o recinto universitario falla durante la presentación:
1. **Activar el Switch "Modo Demo (Offline)"** en la barra superior del encabezado.
2. La aplicación responderá de forma instantánea y fluida utilizando los datos calibrados locales de `src/services/mockData.js`, sin depender de conexión externa a internet ni servidores activos.
3. Respaldar en el teléfono un hotspot móvil 4G/5G configurado previamente en la laptop de la demo.
