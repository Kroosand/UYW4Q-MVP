import logging
from typing import Optional, Dict, Any
from app.config import settings

logger = logging.getLogger(__name__)

supabase_client = None

try:
    if settings.SUPABASE_URL and settings.SUPABASE_KEY and "example.supabase.co" not in settings.SUPABASE_URL:
        from supabase import create_client, Client
        supabase_client: Optional[Client] = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        logger.info("Supabase client successfully initialized.")
    else:
        logger.warning("Supabase credentials not configured or default mock used. Running in decoupled mock DB mode.")
except Exception as e:
    logger.warning(f"Could not connect to Supabase: {e}. Falling back to in-memory store.")
    supabase_client = None

# Almacén en memoria para desarrollo local / demo sin conexión
_in_memory_scans: Dict[str, Dict[str, Any]] = {}

def save_scan_result(scan_data: Dict[str, Any]) -> None:
    scan_id = scan_data.get("scan_id")
    if not scan_id:
        return
    _in_memory_scans[scan_id] = scan_data
    if supabase_client:
        try:
            supabase_client.table("scans").insert(scan_data).execute()
        except Exception as e:
            logger.warning(f"Error persisting scan to Supabase: {e}")

def get_scan_result(scan_id: str) -> Optional[Dict[str, Any]]:
    if scan_id in _in_memory_scans:
        return _in_memory_scans[scan_id]
    if supabase_client:
        try:
            res = supabase_client.table("scans").select("*").eq("scan_id", scan_id).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Error fetching scan from Supabase: {e}")
    return None
