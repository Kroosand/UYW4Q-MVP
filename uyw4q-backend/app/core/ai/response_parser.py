import json
import re
import logging
from typing import Dict, Any, List
from app.models.schemas import PriorityFinding, RiskLevelEnum

logger = logging.getLogger(__name__)

DISCLAIMER = "Diagnóstico orientativo, no dictamen legal vinculante conforme al D.S. 016-2024-JUS."

def clean_json_string(raw_text: str) -> str:
    """Elimina delimitadores markdown ```json o texto residual."""
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
    # Extraer el primer bloque {...}
    match = re.search(r"(\{.*\})", text, re.DOTALL)
    if match:
        return match.group(1)
    return text

def parse_llm_risk_response(
    raw_response: str,
    fallback_score: int,
    rubro: str
) -> Dict[str, Any]:
    """
    Parsea y valida la respuesta del LLM. Si falla o está incompleta,
    degrada a una respuesta estructurada segura y consistente sin quebrar el sistema.
    """
    try:
        cleaned = clean_json_string(raw_response)
        data = json.loads(cleaned)

        risk_score = int(data.get("risk_score", fallback_score))
        risk_score = max(0, min(100, risk_score))

        # Determinar nivel si falta
        raw_level = str(data.get("risk_level", "")).lower()
        if raw_level in ["alto", "high", "critico"]:
            risk_level = RiskLevelEnum.ALTO
        elif raw_level in ["medio", "medium"]:
            risk_level = RiskLevelEnum.MEDIO
        elif raw_level in ["bajo", "low"]:
            risk_level = RiskLevelEnum.BAJO
        else:
            if risk_score >= 60:
                risk_level = RiskLevelEnum.ALTO
            elif risk_score >= 30:
                risk_level = RiskLevelEnum.MEDIO
            else:
                risk_level = RiskLevelEnum.BAJO

        raw_findings = data.get("priority_findings", [])
        priority_findings = []
        for f in raw_findings:
            if isinstance(f, dict):
                priority_findings.append({
                    "finding": str(f.get("finding", "Hallazgo de seguridad")),
                    "business_risk": str(f.get("business_risk", "Riesgo potencial para las operaciones del negocio.")),
                    "legal_reference": str(f.get("legal_reference", "D.S. 016-2024-JUS — Medidas de seguridad")),
                    "urgency": str(f.get("urgency", "media")).lower()
                })

        summary = data.get("summary_for_owner", "")
        if not summary or len(summary) < 10:
            summary = f"El diagnóstico identificó vulnerabilidades críticas en la identidad digital de su negocio ({rubro}). Requiere atención inmediata para prevenir multas administrativas bajo el D.S. 016-2024-JUS y proteger a sus clientes."

        return {
            "risk_score": risk_score,
            "risk_level": risk_level,
            "priority_findings": priority_findings,
            "summary_for_owner": summary,
            "legal_disclaimer": DISCLAIMER
        }

    except Exception as e:
        logger.error(f"Error parseando salida LLM: {e}. Generando fallback seguro estructurado.")
        # Fallback determinístico seguro
        risk_level = RiskLevelEnum.ALTO if fallback_score >= 60 else (RiskLevelEnum.MEDIO if fallback_score >= 30 else RiskLevelEnum.BAJO)
        return {
            "risk_score": fallback_score,
            "risk_level": risk_level,
            "priority_findings": [
                {
                    "finding": "Revisión preventiva de configuración perimetral",
                    "business_risk": f"Protege la reputación comercial y los datos de clientes en el sector '{rubro}'.",
                    "legal_reference": "Art. 38 del D.S. 016-2024-JUS — Medidas técnicas de seguridad",
                    "urgency": "alta" if fallback_score >= 60 else "media"
                }
            ],
            "summary_for_owner": f"Su empresa ({rubro}) presenta un nivel de riesgo {risk_level.value} ({fallback_score}/100). Es indispensable corregir las brechas de configuración para cumplir con las disposiciones del reglamento de datos personales vigente.",
            "legal_disclaimer": DISCLAIMER
        }
