import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_caso_fallo_scan_id_inexistente():
    """Valida respuesta 404 controlada cuando se solicita un escaneo inexistente."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/scan/uuid-inexistente-12345")
        assert res.status_code == 404
        assert "no existe" in res.json()["detail"].lower()

@pytest.mark.asyncio
async def test_caso_fallo_dominio_sin_configuracion():
    """
    Valida el caso más común en MYPEs peruanas: dominio sin SPF, DMARC ni SSL configurado.
    El sistema no debe quebrarse, sino retornar un riesgo alto con recomendaciones precisas.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.post("/scan", json={
            "domain": "dominio-mype-sin-configuracion-real.pe",
            "rubro": "ecommerce"
        })
        assert res.status_code == 200
        data = res.json()
        assert data["dns_findings"]["spf"]["present"] is False
        assert data["dns_findings"]["dmarc"]["present"] is False
        assert data["risk_score"] >= 25 # Debe penalizar la falta de seguridad
        assert data["status"] == "completed"

@pytest.mark.asyncio
async def test_caso_fallo_cuerpo_invalido():
    """Valida rechazo 422 de Pydantic ante solicitud sin campo obligatorio."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.post("/scan", json={"rubro": "clinica"})
        assert res.status_code == 422
