import pytest
from unittest.mock import patch, MagicMock
from app.core.dns_checks import check_dns

def test_dns_checks_structure():
    """Verifica que check_dns retorne la estructura completa esperada sin fallar."""
    # Probar con un dominio real público conocido
    result = check_dns("google.com")
    assert result.spf is not None
    assert result.dmarc is not None
    assert result.dkim is not None
    assert isinstance(result.mx_records, list)

def test_dns_checks_non_existent_domain():
    """Verifica que un dominio inexistente no cause excepciones no controladas."""
    result = check_dns("este-dominio-definitivamente-no-existe-12345xyz.pe")
    assert result.spf.present is False
    assert result.dmarc.present is False
    assert result.dkim.present is False

def test_dmarc_parsing_none_policy():
    """Valida la detección de políticas DMARC permisivas (p=none)."""
    with patch("dns.resolver.resolve") as mock_resolve:
        mock_rdata = MagicMock()
        mock_rdata.strings = [b"v=DMARC1; p=none; rua=mailto:dmarc@ejemplo.pe"]
        mock_resolve.return_value = [mock_rdata]
        
        result = check_dns("ejemplo.pe")
        assert result.dmarc.present is True
        assert result.dmarc.policy == "none"
        assert "monitoreo" in result.dmarc.details.lower()
