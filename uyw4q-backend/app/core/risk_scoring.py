import logging
from typing import Dict, Any, Tuple
from app.models.schemas import DNSFindings, SSLFindings, BreachFindings, RiskLevelEnum
from app.core.ai.llm_client import call_llm_prioritization

logger = logging.getLogger(__name__)

def calculate_deterministic_score(
    dns: DNSFindings,
    ssl_res: SSLFindings,
    breach: BreachFindings
) -> int:
    """
    Calcula el puntaje determinístico de riesgo (0 a 100, donde 100 es máximo riesgo).
    Ponderaciones basadas en impacto de vector de ataque:
    - DNS / Suplantación de identidad (35 pts)
    - Cifrado en tránsito SSL/TLS (35 pts)
    - Filtración de credenciales previas (30 pts)
    """
    score = 0

    # 1. DNS (SPF / DMARC / DKIM) - Max 35 pts
    if not dns.dmarc.present or dns.dmarc.policy == "none":
        # Ausencia o modo observador (no protege)
        score += 25
    elif dns.dmarc.policy not in ["reject", "quarantine"]:
        score += 15

    if not dns.spf.present or not dns.spf.valid:
        score += 10

    # 2. SSL/TLS - Max 35 pts
    if not ssl_res.valid:
        score += 35
    elif ssl_res.expires_in_days <= 7:
        score += 25
    elif ssl_res.expires_in_days <= 30:
        score += 15

    # 3. Brechas HaveIBeenPwned - Max 30 pts
    if breach.emails_breached > 0:
        score += min(30, 15 + (breach.emails_breached * 5))

    return min(100, max(0, score))

async def evaluate_full_risk(
    domain: str,
    rubro: str,
    dns_findings: DNSFindings,
    ssl_findings: SSLFindings,
    breach_findings: BreachFindings
) -> Dict[str, Any]:
    """
    Calcula el puntaje base determinístico y orquesta la interpretación contextual
    mediante la capa de Inteligencia Artificial (Bloque B).
    """
    det_score = calculate_deterministic_score(dns_findings, ssl_findings, breach_findings)

    # Invocación a capa de IA (Bloque B)
    ai_interpretation = await call_llm_prioritization(
        domain=domain,
        rubro=rubro,
        dns_findings=dns_findings.model_dump(),
        ssl_findings=ssl_findings.model_dump(),
        breach_findings=breach_findings.model_dump(),
        score=det_score
    )

    return ai_interpretation
