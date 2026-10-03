import pytest
from app.core.breach_check import check_breaches

@pytest.mark.asyncio
async def test_breach_check_mock_mode():
    """Verifica que el modo mock de breach check opere correctamente para los dominios demo."""
    res = await check_breaches("clinica-sanborja.pe")
    assert res.emails_checked > 0
    assert res.emails_breached > 0
    assert len(res.breaches) > 0

@pytest.mark.asyncio
async def test_breach_check_safe_domain():
    """Verifica un dominio sin brechas reportadas."""
    res = await check_breaches("seguro-corp.pe")
    assert res.emails_breached == 0
    assert len(res.breaches) == 0
