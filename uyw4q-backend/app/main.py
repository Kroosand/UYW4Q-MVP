import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes_scan import router as scan_router
from app.api.routes_auth import router as auth_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("uyw4q-backend")

app = FastAPI(
    title="UYW4Q - API de Diagnóstico y Cumplimiento de Ciberseguridad",
    description="Motor de escaneo pasivo de ciberseguridad y evaluación de cumplimiento normativo bajo el D.S. 016-2024-JUS para MYPEs peruanas.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configuración de CORS para conexión con Frontend (React / Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if settings.CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar Routers
app.include_router(scan_router)
app.include_router(auth_router)

@app.get("/", summary="Endpoint raíz")
async def root():
    return {
        "project": "UYW4Q MVP",
        "description": "Motor de Diagnóstico de Ciberseguridad y Normativa D.S. 016-2024-JUS",
        "status": "online",
        "docs": "/docs",
        "legal_notice": "Solo escaneos pasivos conforme a la Ley de Delitos Informáticos del Perú."
    }

@app.get("/health", summary="Health check")
async def health_check():
    return {"status": "ok", "env": settings.APP_ENV}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.APP_HOST, port=settings.APP_PORT, reload=True)
