import logging
from typing import Dict, Any, List
import dns.resolver
from app.models.schemas import DNSFindings, SPFFinding, DKIMFinding, DMARCFinding

logger = logging.getLogger(__name__)

def check_dns(domain: str) -> DNSFindings:
    """
    Realiza análisis pasivo de registros DNS (SPF, DKIM, DMARC, MX).
    Cumplimiento estricto: Solo consultas públicas DNS, sin escaneo invasivo de puertos.
    """
    clean_domain = domain.strip().lower().replace("https://", "").replace("http://", "").split("/")[0]

    # 1. Analizar MX records
    mx_records: List[str] = []
    try:
        mx_answers = dns.resolver.resolve(clean_domain, 'MX', lifetime=4.0)
        for rdata in mx_answers:
            mx_records.append(str(rdata.exchange).rstrip('.'))
    except Exception as e:
        logger.debug(f"No se pudieron resolver registros MX para {clean_domain}: {e}")

    # 2. Analizar SPF (TXT)
    spf_finding = SPFFinding(present=False, valid=False, raw=None, details="No se encontró registro SPF publicado.")
    try:
        txt_answers = dns.resolver.resolve(clean_domain, 'TXT', lifetime=4.0)
        for rdata in txt_answers:
            txt_str = b"".join(rdata.strings).decode('utf-8', errors='ignore')
            if txt_str.startswith("v=spf1"):
                spf_finding.present = True
                spf_finding.raw = txt_str
                # Validar contenido básico
                if "-all" in txt_str or "~all" in txt_str or "?all" in txt_str:
                    spf_finding.valid = True
                    spf_finding.details = "Registro SPF válido y correctamente estructurado."
                else:
                    spf_finding.valid = False
                    spf_finding.details = "Registro SPF incompleto o con directiva permisiva sin delimitador de cierre (-all/~all)."
                break
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
        spf_finding.details = "El dominio no tiene registros TXT configurados."
    except Exception as e:
        spf_finding.details = f"Consulta DNS TXT no concluyente: {str(e)}"

    # 3. Analizar DMARC (_dmarc.domain)
    dmarc_domain = f"_dmarc.{clean_domain}"
    dmarc_finding = DMARCFinding(present=False, policy=None, raw=None, details="No se encontró registro DMARC en _dmarc.")
    try:
        dmarc_answers = dns.resolver.resolve(dmarc_domain, 'TXT', lifetime=4.0)
        for rdata in dmarc_answers:
            txt_str = b"".join(rdata.strings).decode('utf-8', errors='ignore')
            if "v=DMARC1" in txt_str:
                dmarc_finding.present = True
                dmarc_finding.raw = txt_str
                # Extraer política p=
                parts = [p.strip() for p in txt_str.split(";")]
                for part in parts:
                    if part.startswith("p="):
                        dmarc_finding.policy = part.split("=")[1].strip().lower()
                
                if dmarc_finding.policy in ["reject", "quarantine"]:
                    dmarc_finding.details = f"DMARC activo y protector con política 'p={dmarc_finding.policy}'."
                elif dmarc_finding.policy == "none":
                    dmarc_finding.details = "DMARC presente pero en modo 'none' (solo monitoreo, no bloquea correos fraudulentos)."
                else:
                    dmarc_finding.details = "DMARC presente sin política de protección válida definida."
                break
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
        dmarc_finding.details = "Ausencia total de registro DMARC; alta vulnerabilidad a suplantación de identidad (spoofing)."
    except Exception as e:
        dmarc_finding.details = f"Error al consultar _dmarc: {str(e)}"

    # 4. Analizar DKIM (selectores conocidos frecuentes: google, default, k1, selector1)
    dkim_finding = DKIMFinding(present=False, selector=None, raw=None, details="No se detectó registro DKIM en selectores comunes.")
    common_selectors = ["default", "google", "k1", "selector1", "mail"]
    for selector in common_selectors:
        dkim_domain = f"{selector}._domainkey.{clean_domain}"
        try:
            dkim_answers = dns.resolver.resolve(dkim_domain, 'TXT', lifetime=2.0)
            for rdata in dkim_answers:
                txt_str = b"".join(rdata.strings).decode('utf-8', errors='ignore')
                if "v=DKIM1" in txt_str or "p=" in txt_str:
                    dkim_finding.present = True
                    dkim_finding.selector = selector
                    dkim_finding.raw = txt_str[:120] + "..." if len(txt_str) > 120 else txt_str
                    dkim_finding.details = f"Registro DKIM detectado con selector '{selector}'."
                    break
            if dkim_finding.present:
                break
        except Exception:
            continue

    return DNSFindings(
        spf=spf_finding,
        dkim=dkim_finding,
        dmarc=dmarc_finding,
        mx_records=mx_records
    )
