import uuid
import logging
from fastapi import APIRouter, HTTPException
from app.models.schemas import AuthSignUpRequest, AuthLoginRequest, AuthResponse
from app.db.supabase_client import supabase_client

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["Autenticación (Supabase)"])

@router.post("/signup", response_model=AuthResponse, summary="Registro de usuario (delegado a Supabase)")
async def signup(request: AuthSignUpRequest):
    """
    Registra una cuenta de usuario/empresa delegando directamente a Supabase Auth.
    """
    if supabase_client:
        try:
            res = supabase_client.auth.sign_up({
                "email": request.email,
                "password": request.password,
                "options": {
                    "data": {
                        "company_name": request.company_name or ""
                    }
                }
            })
            if res.user:
                return {
                    "access_token": res.session.access_token if res.session else f"token_{uuid.uuid4()}",
                    "token_type": "bearer",
                    "user": {
                        "id": res.user.id,
                        "email": res.user.email,
                        "company_name": request.company_name
                    }
                }
        except Exception as e:
            logger.error(f"Error en sign_up de Supabase: {e}")
            raise HTTPException(status_code=400, detail=str(e))

    # Mock Auth para desarrollo local y demo offline
    user_id = str(uuid.uuid4())
    return {
        "access_token": f"mock_token_{uuid.uuid4()}",
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": request.email,
            "company_name": request.company_name or "Empresa Demo"
        }
    }

@router.post("/login", response_model=AuthResponse, summary="Inicio de sesión (delegado a Supabase)")
async def login(request: AuthLoginRequest):
    """
    Autentica credenciales delegando directamente a Supabase Auth.
    """
    if supabase_client:
        try:
            res = supabase_client.auth.sign_in_with_password({
                "email": request.email,
                "password": request.password
            })
            if res.user and res.session:
                return {
                    "access_token": res.session.access_token,
                    "token_type": "bearer",
                    "user": {
                        "id": res.user.id,
                        "email": res.user.email,
                        "created_at": str(res.user.created_at)
                    }
                }
        except Exception as e:
            logger.error(f"Error en sign_in de Supabase: {e}")
            raise HTTPException(status_code=401, detail="Credenciales incorrectas o usuario no registrado.")

    # Mock Auth
    return {
        "access_token": f"mock_token_{uuid.uuid4()}",
        "token_type": "bearer",
        "user": {
            "id": str(uuid.uuid4()),
            "email": request.email,
            "company_name": "Usuario Demo UYW4Q"
        }
    }
