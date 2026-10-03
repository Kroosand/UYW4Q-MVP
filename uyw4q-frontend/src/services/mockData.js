// Datos de prueba curados y pre-calibrados para la demo en vivo (Plan B Offline)
export const MOCK_SCENARIOS = {
  "clinica-sanborja.pe": {
    scan_id: "demo-clinica-sanborja-uuid",
    domain: "clinica-sanborja.pe",
    rubro: "clinica",
    timestamp: new Date().toISOString(),
    dns_findings: {
      spf: { present: true, valid: true, raw: "v=spf1 include:_spf.google.com ~all", details: "Registro SPF configurado con inclusión válida." },
      dkim: { present: false, selector: null, raw: null, details: "No se identificaron selectores DKIM públicos en los registros estándar." },
      dmarc: { present: false, policy: null, raw: null, details: "Ausencia crítica de registro DMARC en _dmarc.clinica-sanborja.pe" },
      mx_records: ["aspmx.l.google.com", "alt1.aspmx.l.google.com"]
    },
    ssl_findings: {
      valid: true,
      expires_in_days: 45,
      issuer: "Let's Encrypt Authority X3",
      subject: "clinica-sanborja.pe",
      protocol_version: "TLSv1.3",
      details: "Certificado SSL vigente por 45 días más. Conexión web cifrada."
    },
    breach_findings: {
      emails_checked: 8,
      emails_breached: 2,
      breaches: ["RedSaludLeak2024", "ComboListLatam2023"],
      details: "2 cuentas corporativas detectadas en filtraciones públicas de entidades sanitarias peruanas."
    },
    risk_score: 68,
    risk_level: "alto",
    priority_findings: [
      {
        finding: "DMARC ausente (Riesgo Crítico de Suplantación)",
        business_risk: "Cualquier persona puede enviar correos falsos haciéndose pasar por @clinica-sanborja.pe para solicitar pagos de consultas o engañar a pacientes con resultados médicos fraudulentos.",
        legal_reference: "Art. 38 del D.S. 016-2024-JUS — Infracción Grave por falta de medidas técnicas contra la suplantación (Multas de hasta 50 UIT: S/ 257,500).",
        urgency: "alta"
      },
      {
        finding: "Credenciales de personal médico expuestas en filtraciones",
        business_risk: "Existen contraseñas corporativas de dos colaboradores disponibles en bases de datos de ciberdelincuentes, facilitando el acceso no autorizado al sistema de citas.",
        legal_reference: "Art. 42 del D.S. 016-2024-JUS — Obligación de notificación de brechas en un plazo máximo de 48 horas ante la ANPPD y CNSD.",
        urgency: "alta"
      },
      {
        finding: "Registro DKIM no verificado",
        business_risk: "Los correos legítimos enviados por la clínica pueden ser clasificados como spam por Gmail y Outlook de los pacientes.",
        legal_reference: "Art. 38 del D.S. 016-2024-JUS — Buenas prácticas de integridad en comunicaciones electrónicas.",
        urgency: "media"
      }
    ],
    summary_for_owner: "Su clínica presenta un nivel de riesgo ALTO (68/100). Lo más urgente es activar DMARC para evitar que criminales estafen a sus pacientes con correos falsos a su nombre, y actualizar las contraseñas del personal expuesto para cumplir con el D.S. 016-2024-JUS.",
    legal_disclaimer: "Diagnóstico orientativo, no dictamen legal vinculante conforme al D.S. 016-2024-JUS.",
    status: "completed"
  },

  "tienda-peru.pe": {
    scan_id: "demo-tienda-peru-uuid",
    domain: "tienda-peru.pe",
    rubro: "ecommerce",
    timestamp: new Date().toISOString(),
    dns_findings: {
      spf: { present: false, valid: false, raw: null, details: "No tiene ningún registro SPF publicado." },
      dkim: { present: false, selector: null, raw: null, details: "Sin registros DKIM configurados." },
      dmarc: { present: true, policy: "none", raw: "v=DMARC1; p=none;", details: "DMARC presente pero en modo 'none' (monitoreo inofensivo; no bloquea ataques)." },
      mx_records: ["mail.tienda-peru.pe"]
    },
    ssl_findings: {
      valid: true,
      expires_in_days: 8,
      issuer: "cPanel, Inc. Certification Authority",
      subject: "tienda-peru.pe",
      protocol_version: "TLSv1.2",
      details: "¡ALERTA!: El certificado SSL caduca en 8 días. Si no se renueva, la tienda dejará de recibir pagos con tarjeta."
    },
    breach_findings: {
      emails_checked: 4,
      emails_breached: 1,
      breaches: ["TopitopData2023"],
      details: "1 cuenta administrativa involucrada en filtraciones de credenciales del sector e-commerce local."
    },
    risk_score: 74,
    risk_level: "alto",
    priority_findings: [
      {
        finding: "Certificado SSL por vencer en 8 días",
        business_risk: "En una semana los clientes verán pantalla roja de advertencia 'Sitio No Seguro' y abandonarán las compras, además de invalidar la pasarela de pagos.",
        legal_reference: "Art. 39 del D.S. 016-2024-JUS — Falta de cifrado confiable en tránsito de datos bancarios.",
        urgency: "alta"
      },
      {
        finding: "DMARC en modo permisivo y ausencia total de SPF",
        business_risk: "Estafadores pueden enviar cupones falsos de compra a su nombre cobrando por Yape/Plin a cuentas fraudulentas.",
        legal_reference: "Art. 38 del D.S. 016-2024-JUS — Infracción Grave en protección de identidad de clientes.",
        urgency: "alta"
      }
    ],
    summary_for_owner: "Su tienda online tiene riesgo ALTO (74/100). El certificado de seguridad SSL vencerá en solo 8 días bloqueando las compras de sus clientes, y su correo no tiene defensas contra suplantadores que usen su marca.",
    legal_disclaimer: "Diagnóstico orientativo, no dictamen legal vinculante conforme al D.S. 016-2024-JUS.",
    status: "completed"
  },

  "nexus-seguro.pe": {
    scan_id: "demo-nexus-seguro-uuid",
    domain: "nexus-seguro.pe",
    rubro: "agencia",
    timestamp: new Date().toISOString(),
    dns_findings: {
      spf: { present: true, valid: true, raw: "v=spf1 include:_spf.google.com -all", details: "SPF estricto con directiva -all de rechazo total." },
      dkim: { present: true, selector: "google", raw: "v=DKIM1; k=rsa; p=MIIBI...", details: "Firma criptográfica DKIM correctamente enlazada." },
      dmarc: { present: true, policy: "reject", raw: "v=DMARC1; p=reject; rua=mailto:seguridad@nexus-seguro.pe", details: "DMARC en máxima protección 'reject'. Bloquea cualquier correo falso." },
      mx_records: ["aspmx.l.google.com"]
    },
    ssl_findings: {
      valid: true,
      expires_in_days: 195,
      issuer: "Google Trust Services LLC",
      subject: "nexus-seguro.pe",
      protocol_version: "TLSv1.3",
      details: "Certificado SSL de alta seguridad vigente por más de 6 meses."
    },
    breach_findings: {
      emails_checked: 6,
      emails_breached: 0,
      breaches: [],
      details: "Cero credenciales filtradas identificadas en el monitoreo público."
    },
    risk_score: 12,
    risk_level: "bajo",
    priority_findings: [
      {
        finding: "Excelente blindaje de correo y web",
        business_risk: "Su infraestructura protege la integridad de sus contratos y comunicaciones con clientes corporativos.",
        legal_reference: "Cumplimiento satisfactorio de las medidas de seguridad del Art. 38 y 39 del D.S. 016-2024-JUS.",
        urgency: "baja"
      }
    ],
    summary_for_owner: "Excelente nivel de protección (Riesgo BAJO: 12/100). Su empresa cuenta con las medidas preventivas exigidas por el reglamento peruano, salvaguardando los datos de sus clientes corporativos.",
    legal_disclaimer: "Diagnóstico orientativo, no dictamen legal vinculante conforme al D.S. 016-2024-JUS.",
    status: "completed"
  }
};
