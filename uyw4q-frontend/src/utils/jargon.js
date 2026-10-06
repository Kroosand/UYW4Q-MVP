/**
 * Diccionario y traductor de jerga técnica para dueños de empresas (Bloque C, Sección 2).
 * Principio rector: Nada de jerga técnica sin traducir.
 * Si aparece una sigla como 'DMARC', debe ir siempre con una explicación clara en una línea.
 */

export const JARGON_DICTIONARY = {
  dmarc: {
    term: "DMARC",
    translation: "Protección contra suplantación de identidad en correos",
    oneLiner: "Evita que terceros usen tu dominio para enviar correos falsos haciéndose pasar por tu empresa a tus clientes o pacientes.",
    howToFix: "Configura una directiva DMARC con política 'quarantine' o 'reject' en la zona DNS de tu proveedor de hosting."
  },
  spf: {
    term: "SPF",
    translation: "Lista de servidores autorizados para enviar correos",
    oneLiner: "Indica a los receptores (como Gmail o Outlook) qué servidores tienen permiso oficial para enviar correos en nombre de tu empresa.",
    howToFix: "Publica un registro TXT con 'v=spf1 ... -all' en tu DNS indicando tus servidores de correo legítimos."
  },
  dkim: {
    term: "DKIM",
    translation: "Firma criptográfica de autenticidad de correos",
    oneLiner: "Firma digital que garantiza que los correos que envías no han sido alterados en el camino y no caigan en la carpeta de Spam.",
    howToFix: "Habilita el firmado DKIM en tu panel de correo (Google Workspace, Microsoft 365, cPanel) y enlaza la clave pública en tu DNS."
  },
  ssl: {
    term: "SSL / TLS",
    translation: "Certificado de cifrado y seguridad web",
    oneLiner: "Cifra los datos que tus clientes ingresan (claves, tarjetas, formularios) y evita que los navegadores muestren el cartel rojo 'Sitio No Seguro'.",
    howToFix: "Renueva o instala un certificado SSL vigente (por ejemplo, Let's Encrypt o certificado comercial) en tu servidor web."
  },
  breach: {
    term: "Filtración de Datos (Breach)",
    translation: "Credenciales corporativas expuestas públicamente",
    oneLiner: "Correos y contraseñas de personal de tu empresa que han sido divulgados en foros clandestinos de internet tras ataques a terceros.",
    howToFix: "Fuerza el cambio inmediato de contraseñas de todo el personal y activa autenticación de dos factores (2FA)."
  },
  dns: {
    term: "DNS",
    translation: "Directorio público de tu dirección en internet",
    oneLiner: "Sistema de nombres que traduce el nombre de tu empresa (ej. miempresa.pe) a la dirección técnica donde funciona tu web y correo.",
    howToFix: "Se administra desde el panel de tu registrador de dominio (ej. Punto.pe, GoDaddy, Cloudflare)."
  }
};

/**
 * Retorna la traducción en 1 línea si el texto contiene una sigla conocida
 */
export function getJargonExplanation(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (lower.includes("dmarc")) return JARGON_DICTIONARY.dmarc;
  if (lower.includes("spf")) return JARGON_DICTIONARY.spf;
  if (lower.includes("dkim")) return JARGON_DICTIONARY.dkim;
  if (lower.includes("ssl") || lower.includes("tls") || lower.includes("https")) return JARGON_DICTIONARY.ssl;
  if (lower.includes("filtraci") || lower.includes("breach") || lower.includes("credencial")) return JARGON_DICTIONARY.breach;
  if (lower.includes("dns")) return JARGON_DICTIONARY.dns;
  return null;
}
