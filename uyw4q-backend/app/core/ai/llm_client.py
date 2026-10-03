import logging
import json
import httpx
from typing import Dict, Any
from app.config import settings
from app.core.ai.prompt_builder import build_risk_prioritization_prompt
from app.core.ai.response_parser import parse_llm_risk_response

logger = logging.getLogger(__name__)

def generate_mock_ai_response(
    domain: str,
    rubro: str,
    dns_findings: Dict[str, Any],
    ssl_findings: Dict[str, Any],
    breach_findings: Dict[str, Any],
    score: int
) -> str:
    """
    Generador simulado de alta fidelidad para desarrollo y demo en vivo sin conexión.
    Garantiza respuestas consistentes, certeras y contextualizadas al rubro.
    """
    priority_findings = []

    # Hallazgo 1: DMARC / SPF
    spf_ok = dns_findings.get("spf", {}).get("present") and dns_findings.get("spf", {}).get("valid")
    dmarc_ok = dns_findings.get("dmarc", {}).get("present") and dns_findings.get("dmarc", {}).get("policy") in ["reject", "quarantine"]

    if not dmarc_ok:
        rubro_risk = {
            "clinica": "Cibercriminales pueden suplantar el correo de la clínica para enviar falsas órdenes de pago o robar historias médicas de pacientes.",
            "ecommerce": "Terceros pueden falsificar correos con el dominio de su tienda ofreciendo promociones falsas o capturando tarjetas.",
            "academia": "Riesgo de phishing dirigido a alumnos y padres de familia simulando cobranzas de matrículas.",
            "agencia": "Suplantación de identidad en comunicaciones con clientes corporativos de alto valor.",
            "delivery": "Correos fraudulentos a repartidores y usuarios prometiendo reembolsos falsos."
        }.get(rubro.lower(), f"Tu dominio puede ser suplantado en correos de phishing dirigidos a los clientes de tu {rubro}.")

        priority_findings.append({
            "finding": "DMARC ausente o permisivo (Riesgo de Suplantación)",
            "business_risk": rubro_risk,
            "legal_reference": "Art. 38 del D.S. 016-2024-JUS — Infracción Grave (Multa de hasta 50 UIT: S/ 257,500)",
            "urgency": "alta"
        })

    # Hallazgo 2: SSL/TLS
    ssl_valid = ssl_findings.get("valid", False)
    ssl_exp = ssl_findings.get("expires_in_days", 0)
    if not ssl_valid or ssl_exp < 15:
        priority_findings.append({
            "finding": f"Certificado SSL/TLS {'vencido o inválido' if not ssl_valid else 'próximo a caducar (' + str(ssl_exp) + ' días)'}",
            "business_risk": "Los navegadores advertirán 'Sitio No Seguro' a tus visitantes y la información viaja sin protección criptográfica.",
            "legal_reference": "Art. 39 del D.S. 016-2024-JUS — Infracción Grave por falta de cifrado en tránsito",
            "urgency": "alta" if not ssl_valid else "media"
        })

    # Hallazgo 3: Brechas HIBP
    breaches_count = breach_findings.get("emails_breached", 0)
    if breaches_count > 0:
        breach_names = ", ".join(breach_findings.get("breaches", [])[:2])
        priority_findings.append({
            "finding": f"Credenciales corporativas expuestas ({breaches_count} cuentas en {breach_names})",
            "business_risk": "Contraseñas de personal de la empresa están en bases de datos públicas de piratas informáticos.",
            "legal_reference": "Art. 42 del D.S. 016-2024-JUS — Notificación obligatoria de brechas en plazo de 48 horas",
            "urgency": "alta"
        })

    if not priority_findings:
        priority_findings.append({
            "finding": "Configuración de seguridad perimetral adecuada",
            "business_risk": f"Tu empresa ({rubro}) cuenta con las protecciones técnicas básicas activas.",
            "legal_reference": "Conforme a las recomendaciones del D.S. 016-2024-JUS",
            "urgency": "baja"
        })

    # Resumen para el dueño
    if score >= 60:
        risk_level = "alto"
        summary = f"Su negocio ({rubro}) presenta un nivel de riesgo ALTO ({score}/100). Es urgente implementar DMARC y verificar accesos para evitar multas de la ANPPD y proteger a sus clientes."
    elif score >= 30:
        risk_level = "medio"
        summary = f"Su negocio ({rubro}) cuenta con controles parciales (Riesgo MEDIO {score}/100). Corrija las directivas señaladas para blindar su reputación digital."
    else:
        risk_level = "bajo"
        summary = f"Excelente postura de seguridad para su {rubro} (Riesgo BAJO {score}/100). Continúe realizando revisiones periódicas."

    payload = {
        "risk_score": score,
        "risk_level": risk_level,
        "priority_findings": priority_findings,
        "summary_for_owner": summary
    }
    return json.dumps(payload, ensure_ascii=False)

async def call_llm_prioritization(
    domain: str,
    rubro: str,
    dns_findings: Dict[str, Any],
    ssl_findings: Dict[str, Any],
    breach_findings: Dict[str, Any],
    score: int
) -> Dict[str, Any]:
    """
    Invoca el proveedor de LLM configurado o recurre al generador de alta fidelidad.
    """
    provider = settings.LLM_PROVIDER.lower()

    # Si es mock o falta clave, usar mock directamente
    if provider == "mock" or (provider == "gemini" and not settings.GEMINI_API_KEY) or (provider == "openai" and not settings.OPENAI_API_KEY):
        mock_raw = generate_mock_ai_response(domain, rubro, dns_findings, ssl_findings, breach_findings, score)
        return parse_llm_risk_response(mock_raw, score, rubro)

    prompt = build_risk_prioritization_prompt(domain, rubro, dns_findings, ssl_findings, breach_findings, score)

    # 1. Llamada a Gemini
    if provider == "gemini":
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
            body = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.1, "responseMimeType": "application/json"}
            }
            async with httpx.AsyncClient(timeout=12.0) as client:
                res = await client.post(url, json=body)
                if res.status_code == 200:
                    text_content = res.json()["candidates"][0]["content"]["parts"][0]["text"]
                    return parse_llm_risk_response(text_content, score, rubro)
                else:
                    logger.warning(f"Error de Gemini API: {res.status_code}. Activando fallback.")
        except Exception as e:
            logger.error(f"Fallo llamada Gemini: {e}")

    # Fallback si el LLM externo falló
    mock_raw = generate_mock_ai_response(domain, rubro, dns_findings, ssl_findings, breach_findings, score)
    return parse_llm_risk_response(mock_raw, score, rubro)
