import uuid
import asyncio
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.schemas import (
    ScanRequest, 
    ScanResponse, 
    IncidentReportRequest, 
    IncidentReportResponse
)
from app.core.dns_checks import check_dns
from app.core.ssl_checks import check_ssl
from app.core.breach_check import check_breaches
from app.core.risk_scoring import evaluate_full_risk
from app.core.ai.incident_template import generate_incident_cnsd_template
from app.db.supabase_client import save_scan_result, get_scan_result

router = APIRouter(tags=["Escaneo y Diagnóstico"])

@router.post("/scan", response_model=ScanResponse, summary="Iniciar escaneo pasivo de ciberseguridad y normativa")
async def start_scan(request: ScanRequest):
    """
    Ejecuta el escaneo pasivo integral:
    1. Consultas DNS públicas (SPF, DKIM, DMARC, MX)
    2. Inspección del certificado SSL/TLS del puerto 443
    3. Verificación de filtraciones corporativas (HaveIBeenPwned)
    4. Interpretación contextual con IA bajo D.S. 016-2024-JUS
    """
    scan_id = str(uuid.uuid4())
    domain = request.domain.strip().lower()

    # Ejecutar chequeos técnicos en paralelo
    loop = asyncio.get_event_loop()
    dns_task = loop.run_in_executor(None, check_dns, domain)
    ssl_task = loop.run_in_executor(None, check_ssl, domain)
    breach_task = check_breaches(domain)

    dns_res, ssl_res, breach_res = await asyncio.gather(
        dns_task, ssl_task, breach_task
    )

    # Interpretar con IA (Bloque B)
    ai_eval = await evaluate_full_risk(
        domain=domain,
        rubro=request.rubro.value,
        dns_findings=dns_res,
        ssl_findings=ssl_res,
        breach_findings=breach_res
    )

    now_iso = datetime.now(timezone.utc).isoformat()

    response_data = {
        "scan_id": scan_id,
        "domain": domain,
        "rubro": request.rubro.value,
        "timestamp": now_iso,
        "dns_findings": dns_res.model_dump(),
        "ssl_findings": ssl_res.model_dump(),
        "breach_findings": breach_res.model_dump(),
        "risk_score": ai_eval["risk_score"],
        "risk_level": ai_eval["risk_level"],
        "priority_findings": ai_eval["priority_findings"],
        "summary_for_owner": ai_eval["summary_for_owner"],
        "legal_disclaimer": ai_eval["legal_disclaimer"],
        "status": "completed"
    }

    # Persistir resultado (Supabase / Memoria)
    save_scan_result(response_data)

    return response_data

@router.get("/scan/{scan_id}", response_model=ScanResponse, summary="Consultar resultado de escaneo por ID")
async def get_scan(scan_id: str):
    """
    Recupera el resultado de un escaneo previamente ejecutado.
    Permite polling desde el frontend durante la demo.
    """
    result = get_scan_result(scan_id)
    if not result:
        raise HTTPException(status_code=404, detail="El escaneo solicitado no existe o ha expirado.")
    return result

@router.post("/incident/draft", response_model=IncidentReportResponse, summary="Generar borrador de notificación CNSD (Art. 42 D.S. 016-2024-JUS)")
async def generate_incident_draft(request: IncidentReportRequest):
    """
    Genera el borrador formal para copiar en el formulario oficial del CNSD
    (Centro Nacional de Seguridad Digital) dentro del plazo improrrogable de 48 horas.
    """
    draft = generate_incident_cnsd_template(request)
    return draft
