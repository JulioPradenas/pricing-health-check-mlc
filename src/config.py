"""
Configuración centralizada del proyecto.
Carga variables de entorno desde .env y las expone como constantes.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Raíz del proyecto (dos niveles arriba de este archivo)
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Cargar .env
load_dotenv(PROJECT_ROOT / ".env")

# Credenciales MELI
MELI_APP_ID = os.getenv("MELI_APP_ID")
MELI_CLIENT_SECRET = os.getenv("MELI_CLIENT_SECRET")
MELI_REDIRECT_URI = os.getenv("MELI_REDIRECT_URI")
MELI_SITE_ID = os.getenv("MELI_SITE_ID", "MLC")

# Endpoints
MELI_API_BASE = "https://api.mercadolibre.com"
MELI_TOKEN_URL = f"{MELI_API_BASE}/oauth/token"

# Rutas de datos
DATA_DIR = PROJECT_ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
INTERIM_DIR = DATA_DIR / "interim"
PROCESSED_DIR = DATA_DIR / "processed"

# Validación al import
def validate() -> None:
    """Verifica que las credenciales críticas estén presentes."""
    missing = [k for k in ("MELI_APP_ID", "MELI_CLIENT_SECRET") if not os.getenv(k)]
    if missing:
        raise RuntimeError(
            f"Variables faltantes en .env: {missing}. "
            f"Verifica el archivo {PROJECT_ROOT / '.env'}"
        )

if __name__ == "__main__":
    validate()
    print(f"✅ App ID: {MELI_APP_ID}")
    print(f"✅ Site:   {MELI_SITE_ID}")
    print(f"✅ Root:   {PROJECT_ROOT}")
