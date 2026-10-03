import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_flujo_completo_scan():
    """
    Test E2E: Ejecuta el flujo completo tal como lo experimenta el usuario en el frontend:
    1. POST /scan para iniciar diagnóstico
    2. Validación de estructura completa de hallazgos y score
    3. GET /scan/{id} para polling de resultados
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. Enviar escaneo
        response = await ac.post("/scan", json={
            "domain": "clinica-sanborja.pe",
            "rubro": "clinica"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert "scan_id" in data
        assert data["domain"] == "clinica-sanborja.pe"
        assert data["rubro"] == "clinica"
        assert "dns_findings" in data
        assert "ssl_findings" in data
        assert "breach_findings" in data
        assert 0 <= data["risk_score"] <= 100
        assert data["risk_level"] in ["bajo", "medio", "alto", "critico"]
        assert len(data["priority_findings"]) > 0
        assert len(data["summary_for_owner"]) > 10

        scan_id = data["scan_id"]

        # 2. Polling por ID
        get_res = await ac.get(f"/scan/{scan_id}")
        assert get_res.status_code == 200
        fetched = get_res.json()
        assert fetched["scan_id"] == scan_id
