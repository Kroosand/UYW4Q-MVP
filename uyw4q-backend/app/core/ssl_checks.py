import ssl
import socket
import logging
from datetime import datetime, timezone
from typing import Optional
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from app.models.schemas import SSLFindings

logger = logging.getLogger(__name__)

def check_ssl(domain: str, port: int = 443, timeout: float = 4.0) -> SSLFindings:
    """
    Verifica de forma pasiva el certificado SSL/TLS de un dominio.
    Extrae emisor, días restantes de vigencia y validez.
    """
    clean_domain = domain.strip().lower().replace("https://", "").replace("http://", "").split("/")[0]

    context = ssl.create_default_context()
    context.check_hostname = True
    context.verify_mode = ssl.CERT_REQUIRED

    try:
        with socket.create_connection((clean_domain, port), timeout=timeout) as sock:
            with context.wrap_socket(sock, server_hostname=clean_domain) as ssock:
                der_cert = ssock.getpeercert(binary_form=True)
                if not der_cert:
                    return SSLFindings(
                        valid=False,
                        expires_in_days=0,
                        issuer="Desconocido",
                        details="No se pudo obtener el certificado binario en el handshake SSL."
                    )
                
                cert = x509.load_der_x509_certificate(der_cert, default_backend())
                
                # Obtener emisor legible (CN o O)
                issuer_parts = []
                for attr in cert.issuer:
                    issuer_parts.append(f"{attr.oid._name}={attr.value}")
                issuer_str = ", ".join(issuer_parts)
                # Extraer Common Name o Organization
                short_issuer = "Desconocido"
                for attr in cert.issuer:
                    if attr.oid._name in ["commonName", "organizationName"]:
                        short_issuer = str(attr.value)
                        break

                # Días de expiración
                # cryptography > 42 usa not_valid_after_utc
                not_after = getattr(cert, "not_valid_after_utc", None)
                if not not_after:
                    not_after = cert.not_valid_after.replace(tzinfo=timezone.utc)
                
                now = datetime.now(timezone.utc)
                diff = not_after - now
                expires_in_days = diff.days

                valid = expires_in_days > 0

                details = f"Certificado vigente emitido por {short_issuer}. Expira en {expires_in_days} días."
                if expires_in_days <= 15:
                    details = f"¡ALERTA!: El certificado expira pronto ({expires_in_days} días). Requiere renovación urgente."
                elif expires_in_days <= 0:
                    details = "¡CRÍTICO!: El certificado SSL/TLS se encuentra vencido. Las conexiones no son seguras."

                return SSLFindings(
                    valid=valid,
                    expires_in_days=max(0, expires_in_days),
                    issuer=short_issuer,
                    subject=str(clean_domain),
                    protocol_version=ssock.version(),
                    details=details
                )

    except ssl.SSLCertVerificationError as e:
        logger.warning(f"Error de verificación SSL para {clean_domain}: {e}")
        return SSLFindings(
            valid=False,
            expires_in_days=0,
            issuer="No verificado / Autofirmado",
            details=f"Error en la cadena de confianza SSL: Certificado autofirmado o inválido ({str(e.verify_message)})."
        )
    except socket.timeout:
        return SSLFindings(
            valid=False,
            expires_in_days=0,
            issuer="No disponible",
            details="Tiempo de espera agotado al conectar al puerto 443 del dominio."
        )
    except Exception as e:
        logger.warning(f"Error general de conexión SSL con {clean_domain}: {e}")
        return SSLFindings(
            valid=False,
            expires_in_days=0,
            issuer="Inaccesible",
            details=f"No se pudo establecer conexión segura HTTPS: {str(e)}"
        )
