import json
from typing import Dict, Any, List
from pathlib import Path

# Carga de bases de conocimiento curadas
CURRENT_DIR = Path(__file__).parent.parent / "knowledge"

def load_normativa() -> Dict[str, Any]:
    normativa_path = CURRENT_DIR / "normativa_ds016.json"
    if normativa_path.exists():
        with open(normativa_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def load_casos() -> Dict[str, Any]:
    casos_path = CURRENT_DIR / "casos_peru.json"
    if casos_path.exists():
        with open(casos_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def get_relevant_articles(dns_findings: Dict[str, Any], ssl_findings: Dict[str, Any], breach_findings: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Filtra únicamente los artículos del D.S. 016-2024-JUS pertinentes a los hallazgos técnicos detectados."""
    normativa = load_normativa()
    articulos = normativa.get("articulos", [])
    relevant = []

    # Condición DMARC / SPF
    spf_missing_or_invalid = not dns_findings.get("spf", {}).get("present") or not dns_findings.get("spf", {}).get("valid")
    dmarc_missing_or_none = not dns_findings.get("dmarc", {}).get("present") or dns_findings.get("dmarc", {}).get("policy") == "none"

    if spf_missing_or_invalid or dmarc_missing_or_none:
        for art in articulos:
            if art["id"] == "art-38":
                relevant.append(art)

    # Condición SSL
    ssl_invalid = not ssl_findings.get("valid") or ssl_findings.get("expires_in_days", 999) < 15
    if ssl_invalid:
        for art in articulos:
            if art["id"] == "art-39":
                relevant.append(art)

    # Condición Brechas
    breaches_present = breach_findings.get("emails_breached", 0) > 0
    if breaches_present:
        for art in articulos:
            if art["id"] in ["art-42", "art-45"]:
                relevant.append(art)

    # Si todo está perfecto, adjuntar Art. 38 como marco preventivo
    if not relevant:
        for art in articulos:
            if art["id"] == "art-38":
                relevant.append(art)

    return relevant

def build_risk_prioritization_prompt(
    domain: str,
    rubro: str,
    dns_findings: Dict[str, Any],
    ssl_findings: Dict[str, Any],
    breach_findings: Dict[str, Any],
    deterministic_score: int
) -> str:
    """
    Construye el prompt estricto según la especificación del Bloque B.
    Regla de oro: No inventar hallazgos técnicos; traducir y priorizar en lenguaje de negocio.
    """
    relevant_articles = get_relevant_articles(dns_findings, ssl_findings, breach_findings)
    casos = load_casos().get("casos_documentados", [])

    prompt = f"""Eres el motor de priorización de riesgo y cumplimiento legal de UYW4Q, especializado en ciberseguridad para MYPEs peruanas bajo el D.S. 016-2024-JUS.

Tu tarea es recibir los hallazgos técnicos DETERMINÍSTICOS ya detectados por el motor de escaneo, y traducirlos en explicaciones directas, sencillas y de impacto comercial para el DUEÑO DEL NEGOCIO (quien no es técnico).

REGLAS DE ORO:
1. NUNCA inventes un hallazgo técnico. Solo interpreta lo que se te proporciona.
2. Explica en 2 a 3 líneas por qué le importa a SU rubro específico ('{rubro}').
3. Cita textualmente la referencia al D.S. 016-2024-JUS provista.
4. Responde ÚNICAMENTE en formato JSON válido, sin texto adicional, sin backticks de markdown antes ni después.

DATOS DEL CLIENTE:
- Dominio: {domain}
- Rubro: {rubro}
- Puntaje de Riesgo Heurístico Base (0 a 100, donde 100 es riesgo crítico): {deterministic_score}

HALLAZGOS TÉCNICOS DETECTADOS (DETERMINÍSTICOS):
- DNS (SPF / DKIM / DMARC):
{json.dumps(dns_findings, indent=2)}

- Certificado SSL/TLS:
{json.dumps(ssl_findings, indent=2)}

- Filtraciones Públicas Conocidas (HaveIBeenPwned):
{json.dumps(breach_findings, indent=2)}

CONTEXTO NORMATIVO PERUANO APLICABLE:
{json.dumps(relevant_articles, indent=2, ensure_ascii=False)}

CASOS REALES PERUANOS DE REFERENCIA:
{json.dumps(casos, indent=2, ensure_ascii=False)}

FORMATO DE RESPUESTA REQUERIDO (JSON puro):
{{
  "risk_score": {deterministic_score},
  "risk_level": "alto | medio | bajo",
  "priority_findings": [
    {{
      "finding": "Nombre breve del hallazgo (ej. DMARC ausente o permisivo)",
      "business_risk": "Explicación directa de cómo perjudica a un negocio del rubro '{rubro}' (ej. suplantación para estafar a pacientes o clientes)",
      "legal_reference": "Art. XX del D.S. 016-2024-JUS — [tipo de infracción y rango de multas en UIT/Soles]",
      "urgency": "alta | media | baja"
    }}
  ],
  "summary_for_owner": "Resumen ejecutivo en español cotidiano de 2 a 3 líneas para el gerente o dueño, sin tecnicismos innecesarios."
}}
"""
    return prompt
