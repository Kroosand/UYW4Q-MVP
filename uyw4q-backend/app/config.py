import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    APP_NAME: str = "UYW4Q API - Motor de Escaneo y Cumplimiento Normativo"
    APP_ENV: str = "development"
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    # Supabase Credentials
    SUPABASE_URL: str = Field(default="https://example.supabase.co")
    SUPABASE_KEY: str = Field(default="mock-key")
    SUPABASE_SERVICE_ROLE_KEY: str = Field(default="")

    # HaveIBeenPwned API
    HIBP_API_KEY: str = Field(default="mock")

    # LLM Settings
    LLM_PROVIDER: str = Field(default="mock")  # mock | gemini | openai
    GEMINI_API_KEY: str = Field(default="")
    OPENAI_API_KEY: str = Field(default="")

    # Safety
    STRICT_PASSIVE_SCAN: bool = True

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "ignore"
    }

settings = Settings()
