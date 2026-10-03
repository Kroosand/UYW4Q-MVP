import pytest
from app.core.ssl_checks import check_ssl

def test_ssl_valid_domain():
    """Verifica la inspección SSL para un dominio con certificado válido."""
    res = check_ssl("google.com", timeout=5.0)
    # google.com debe tener un certificado válido
    assert res.valid is True
    assert res.expires_in_days > 0
    assert len(res.issuer) > 0

def test_ssl_unreachable_domain():
    """Verifica degradación controlada ante dominio inaccesible sin lanzar excepciones no controladas."""
    res = check_ssl("192.0.2.1", timeout=1.0) # IP de documentación TEST-NET-1 inaccesible
    assert res.valid is False
    assert res.expires_in_days == 0
