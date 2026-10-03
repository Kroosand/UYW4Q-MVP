from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class RubroEnum(str, Enum):
    CLINICA = "clinica"
    ECOMMERCE = "ecommerce"
    ACADEMIA = "academia"
    AGENCIA = "agencia"
    DELIVERY = "delivery"
    OTRO = "otro"

class RiskLevelEnum(str, Enum):
    BAJO = "bajo"
    MEDIO = "medio"
    ALTO = "alto"
    CRITICO = "critico"

class SPFFinding(BaseModel):
    present: bool
    valid: bool
    raw: Optional[str] = None
    details: Optional[str] = None

class DKIMFinding(BaseModel):
    present: bool
    selector: Optional[str] = None
    raw: Optional[str] = None
    details: Optional[str] = None

class DMARCFinding(BaseModel):
    present: bool
    policy: Optional[str] = None  # none, quarantine, reject
    raw: Optional[str] = None
    details: Optional[str] = None

class DNSFindings(BaseModel):
    spf: SPFFinding
    dkim: DKIMFinding
    dmarc: DMARCFinding
    mx_records: Optional[List[str]] = Field(default_factory=list)

class SSLFindings(BaseModel):
    valid: bool
    expires_in_days: int
    issuer: str
    subject: Optional[str] = None
    protocol_version: Optional[str] = None
    details: Optional[str] = None

class BreachFindings(BaseModel):
    emails_checked: int
    emails_breached: int
    breaches: List[str]
    details: Optional[str] = None

class PriorityFinding(BaseModel):
    finding: str
    business_risk: str
    legal_reference: str
    urgency: str  # alta, media, baja

class ScanRequest(BaseModel):
    domain: str = Field(..., example="clinica-sanborja.pe", description="Dominio público a diagnosticar")
    rubro: RubroEnum = Field(default=RubroEnum.CLINICA, description="Tipo de negocio para contextualizar el riesgo")

class ScanResponse(BaseModel):
    scan_id: str
    domain: str
    rubro: str
    timestamp: str
    dns_findings: DNSFindings
    ssl_findings: SSLFindings
    breach_findings: BreachFindings
    risk_score: int = Field(..., ge=0, le=100)
    risk_level: RiskLevelEnum
    priority_findings: List[PriorityFinding]
    summary_for_owner: str
    legal_disclaimer: str = "Diagnóstico orientativo, no dictamen legal vinculante conforme al D.S. 016-2024-JUS."
    status: str = "completed"

# Autenticación delegada a Supabase
class AuthSignUpRequest(BaseModel):
    email: str
    password: str
    company_name: Optional[str] = None

class AuthLoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# Notificación de Brecha (CNSD)
class IncidentReportRequest(BaseModel):
    domain: str
    rubro: RubroEnum
    affected_systems: str = Field(..., example="Servidor de base de datos MySQL de pacientes")
    compromised_data_types: List[str] = Field(..., example=["DNI", "Historial clínico", "Nombres completos"])
    estimated_affected_people: int = Field(..., example=1200)
    incident_date: str = Field(..., example="2026-10-01")
    detection_date: str = Field(..., example="2026-10-02")
    chronology: str = Field(..., example="Acceso no autorizado mediante credenciales filtradas detectado a las 14:00 horas.")

class IncidentReportResponse(BaseModel):
    cnsd_portal_url: str = "https://reporte.cnsd.gob.pe/home/minjus"
    report_title: str
    form_fields: Dict[str, Any]
    legal_basis: str
    warning_deadline_hours: int = 48
    generated_draft_text: str
