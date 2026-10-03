from typing import Dict, Any
from app.models.schemas import IncidentReportRequest, IncidentReportResponse

CNSD_PORTAL_URL = "https://reporte.cnsd.gob.pe/home/minjus"

def generate_incident_cnsd_template(req: IncidentReportRequest) -> IncidentReportResponse:
    """
    Construye el borrador oficial para ser presentado manualmente por el titular
    en el portal del Centro Nacional de Seguridad Digital (CNSD / MINJUS).
    Cumplimiento de obligación legal de 48 horas conforme al Art. 42 del D.S. 016-2024-JUS.
    """
    compromised_str = ", ".join(req.compromised_data_types)

    form_fields = {
        "1_entidad_afectada": req.domain,
        "2_rubro_actividad": req.rubro.value.capitalize(),
        "3_fecha_incidente": req.incident_date,
        "4_fecha_deteccion": req.detection_date,
        "5_sistemas_involucrados": req.affected_systems,
        "6_categoria_datos_personales": compromised_str,
        "7_numero_estimado_afectados": req.estimated_affected_people,
        "8_descripcion_cronologica": req.chronology,
        "9_medidas_contencion_inmediata": "Aislamiento de sistemas afectados, revocación preventiva de credenciales y activación de registros DNS SPF/DMARC.",
        "10_plazo_legal_horas": 48
    }

    markdown_draft = f"""# BORRADOR OFICIAL DE NOTIFICACIÓN DE INCIDENTE DE SEGURIDAD DIGITAL
**Destinatario:** Centro Nacional de Seguridad Digital (CNSD) / Autoridad Nacional de Protección de Datos Personales (ANPPD)
**Base Legal:** Artículo 42 del Reglamento de la Ley N° 29733 (D.S. N° 016-2024-JUS)
**Plazo de presentación:** Dentro de las 48 horas siguientes a la confirmación del incidente.
**Portal Oficial de Radicación:** {CNSD_PORTAL_URL}

---

### DATOS PARA COPIAR EN EL FORMULARIO VIRTUAL CNSD

1. **Entidad / Dominio Titular:** {req.domain}
2. **Sector o Rubro:** {req.rubro.value.upper()}
3. **Fecha estimada de ocurrencia:** {req.incident_date}
4. **Fecha y hora de detección:** {req.detection_date}
5. **Sistemas tecnológicos afectados:** {req.affected_systems}
6. **Naturaleza de datos personales comprometidos:** {compromised_str}
7. **Cantidad estimada de titulares afectados:** {req.estimated_affected_people:,} personas
8. **Cronología sucinta de los hechos:**
{req.chronology}

9. **Medidas inmediatas de mitigación adoptadas:**
Se procedió a la contención perimetral, reseteo de claves corporativas, revisión de registros de auditoría y activación del protocolo de diagnóstico preventivo UYW4Q.

---
*Nota legal: UYW4Q genera este borrador de asistencia. El titular del banco de datos es el responsable exclusivo de la radicación final en la plataforma del Estado.*
"""

    return IncidentReportResponse(
        cnsd_portal_url=CNSD_PORTAL_URL,
        report_title=f"Borrador CNSD - Incidente en {req.domain}",
        form_fields=form_fields,
        legal_basis="Artículo 42 del D.S. N° 016-2024-JUS (Plazo improrrogable de 48 horas)",
        warning_deadline_hours=48,
        generated_draft_text=markdown_draft
    )
