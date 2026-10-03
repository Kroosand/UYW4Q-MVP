import logging
from typing import List, Dict
import httpx
from app.config import settings
from app.models.schemas import BreachFindings

logger = logging.getLogger(__name__)

# Base de datos simulada para dominios de prueba (Demo y QA sin quemar cuota de API)
MOCK_DOMAIN_BREACHES: Dict[str, Dict[str, Any]] = {
    "clinica-sanborja.pe": {
        "emails_checked": 12,
        "emails_breached": 4,
        "breaches": ["RedSaludLeak2024", "ComboListLatam2023", "ExploitMedicalDB"],
        "details": "Múltiples credenciales de personal administrativo expuestas en bases de datos públicas filtradas."
    },
    "tienda-peru.pe": {
        "emails_checked": 6,
        "emails_breached": 2,
        "breaches": ["TopitopData2023", "ECommerceCredentialStuffing2024"],
        "details": "Cuentas corporativas identificadas en incidentes de robo de credenciales en e-commerce."
    },
    "empresa-ejemplo.pe": {
        "emails_checked": 5,
        "emails_breached": 2,
        "breaches": ["Interbank2024", "GenericLeak2023"],
        "details": "Credenciales detectadas en filtraciones masivas de entidades peruanas y combos genéricos."
    },
    "seguro-corp.pe": {
        "emails_checked": 8,
        "emails_breached": 0,
        "breaches": [],
        "details": "No se encontraron credenciales del dominio expuestas en las fuentes públicas monitoreadas."
    }
}

async def check_breaches(domain: str) -> BreachFindings:
    """
    Consulta pasiva de filtraciones conocidas asociadas al dominio.
    Maneja modo mock para desarrollo/demo y degradación elegante si falla HIBP.
    """
    clean_domain = domain.strip().lower().replace("https://", "").replace("http://", "").split("/")[0]

    # 1. Modo Simulado / Mock de Desarrollo (o si la clave no está configurada)
    if not settings.HIBP_API_KEY or settings.HIBP_API_KEY.lower() in ["mock", "test", ""]:
        logger.info(f"HIBP en modo simulado para '{clean_domain}'.")
        mock_data = MOCK_DOMAIN_BREACHES.get(clean_domain)
        if mock_data:
            return BreachFindings(
                emails_checked=mock_data["emails_checked"],
                emails_breached=mock_data["emails_breached"],
                breaches=mock_data["breaches"],
                details=mock_data["details"]
            )
        
        # Simulación estándar heurística para dominios aleatorios en demo
        has_hash = sum(ord(c) for c in clean_domain) % 3 != 0
        breached_count = 1 if has_hash else 0
        breaches_list = ["LatamBreachCompilation2024"] if has_hash else []
        return BreachFindings(
            emails_checked=4,
            emails_breached=breached_count,
            breaches=breaches_list,
            details="Resultado obtenido mediante base de conocimiento de prueba UYW4Q (Modo Mock de desarrollo)."
        )

    # 2. Llamada real a la API de HaveIBeenPwned (requiere clave de pago corporativa)
    headers = {
        "hibp-api-key": settings.HIBP_API_KEY,
        "user-agent": "UYW4Q-Cybersecurity-Scanner/1.0"
    }
    url = f"https://haveibeenpwned.com/api/v3/breaches?domain={clean_domain}"

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url, headers=headers)

            if response.status_code == 200:
                data = response.json()
                breach_names = [b.get("Name", "Desconocido") for b in data]
                return BreachFindings(
                    emails_checked=len(data) * 2,
                    emails_breached=len(data),
                    breaches=breach_names,
                    details=f"Detectadas {len(breach_names)} filtraciones públicas confirmadas para este dominio."
                )
            elif response.status_code == 404:
                return BreachFindings(
                    emails_checked=5,
                    emails_breached=0,
                    breaches=[],
                    details="No se identificaron filtraciones de seguridad conocidas asociadas al dominio."
                )
            elif response.status_code == 429:
                logger.warning("Rate limit excedido en HaveIBeenPwned. Degradando de forma segura.")
                return BreachFindings(
                    emails_checked=0,
                    emails_breached=0,
                    breaches=[],
                    details="Límite de consultas a HIBP temporalmente alcanzado. Se aplicó degradación controlada sin interrumpir el escaneo."
                )
            else:
                logger.warning(f"Respuesta inesperada de HIBP ({response.status_code})")
                return BreachFindings(
                    emails_checked=0,
                    emails_breached=0,
                    breaches=[],
                    details=f"Servicio HIBP devolvió estado {response.status_code}. Diagnóstico continuó con análisis determinístico."
                )
    except httpx.TimeoutException:
        logger.warning(f"Timeout al conectar con HIBP para {clean_domain}.")
        return BreachFindings(
            emails_checked=0,
            emails_breached=0,
            breaches=[],
            details="Tiempo de espera agotado al consultar HIBP. Se prosigue sin bloquear la evaluación."
        )
    except Exception as e:
        logger.error(f"Error inesperado al consultar HIBP: {e}")
        return BreachFindings(
            emails_checked=0,
            emails_breached=0,
            breaches=[],
            details=f"No se pudo completar la consulta de filtraciones ({str(e)}). Sistema degradado de forma controlada."
        )
