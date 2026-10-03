import pytest
from app.core.ai.response_parser import parse_llm_risk_response
from app.core.ai.incident_template import generate_incident_cnsd_template
from app.models.schemas import IncidentReportRequest, RubroEnum, RiskLevelEnum

def test_parse_llm_valid_json():
    raw_json = """
    {
      "risk_score": 75,
      "risk_level": "alto",
      "priority_findings": [
        {
          "finding": "DMARC Ausente",
          "business_risk": "Suplantación de identidad a pacientes de la clínica",
          "legal_reference": "Art. 38 D.S. 016-2024-JUS",
          "urgency": "alta"
        }
      ],
      "summary_for_owner": "Alerta crítica para la dirección médica."
    }
    """
    parsed = parse_llm_risk_response(raw_json, fallback_score=75, rubro="clinica")
    assert parsed["risk_score"] == 75
    assert parsed["risk_level"] == RiskLevelEnum.ALTO
    assert len(parsed["priority_findings"]) == 1
    assert "D.S. 016-2024-JUS" in parsed["legal_disclaimer"]

def test_parse_llm_malformed_json_fallback():
    """Valida que ante una salida corrupta o truncada del LLM, el parser aplique fallback sin quebrar."""
    malformed_text = "Esto no es un json válido pero contiene un error..."
    parsed = parse_llm_risk_response(malformed_text, fallback_score=68, rubro="ecommerce")
    assert parsed["risk_score"] == 68
    assert parsed["risk_level"] == RiskLevelEnum.ALTO
    assert len(parsed["priority_findings"]) > 0

def test_incident_template_generation():
    req = IncidentReportRequest(
        domain="clinica-sanborja.pe",
        rubro=RubroEnum.CLINICA,
        affected_systems="Base de datos de citas y triaje",
        compromised_data_types=["DNI", "Historial clínico"],
        estimated_affected_people=850,
        incident_date="2026-10-01",
        detection_date="2026-10-02",
        chronology="Detección de descarga anómala de registros a las 11:00 am."
    )
    res = generate_incident_cnsd_template(req)
    assert res.warning_deadline_hours == 48
    assert "reporte.cnsd.gob.pe" in res.cnsd_portal_url
    assert "clinica-sanborja.pe" in res.form_fields["1_entidad_afectada"]
    assert "Art. 42" in res.legal_basis or "42" in res.legal_basis
