"""
Gestión del access token de MercadoLibre.

Implementa el flujo Client Credentials con caché en memoria
para evitar regenerar el token en cada llamada.
"""
import time
from dataclasses import dataclass
from typing import Optional

import requests

from src.config import MELI_APP_ID, MELI_CLIENT_SECRET, MELI_TOKEN_URL


@dataclass
class Token:
    """Token de acceso con metadata de expiración."""
    access_token: str
    expires_at: float  # epoch seconds
    user_id: int
    scope: str

    @property
    def is_expired(self) -> bool:
        """True si el token ya expiró o está por expirar (margen 60s)."""
        return time.time() >= (self.expires_at - 60)


class MeliAuth:
    """
    Singleton ligero que cachea el token y lo renueva on-demand.

    Uso:
        auth = MeliAuth()
        token = auth.get_token()  # genera o reusa
        headers = auth.headers()  # diccionario listo para requests
    """

    def __init__(self) -> None:
        self._token: Optional[Token] = None

    def get_token(self, force_refresh: bool = False) -> Token:
        """Devuelve un token válido, regenerándolo si es necesario."""
        if force_refresh or self._token is None or self._token.is_expired:
            self._token = self._fetch_new_token()
        return self._token

    def headers(self) -> dict[str, str]:
        """Devuelve headers Authorization listos para usar en requests."""
        token = self.get_token()
        return {"Authorization": f"Bearer {token.access_token}"}

    def _fetch_new_token(self) -> Token:
        """Hace la llamada OAuth Client Credentials a MELI."""
        response = requests.post(
            MELI_TOKEN_URL,
            data={
                "grant_type": "client_credentials",
                "client_id": MELI_APP_ID,
                "client_secret": MELI_CLIENT_SECRET,
            },
            headers={
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded",
            },
            timeout=10,
        )
        response.raise_for_status()
        data = response.json()
        return Token(
            access_token=data["access_token"],
            expires_at=time.time() + data["expires_in"],
            user_id=data["user_id"],
            scope=data["scope"],
        )


if __name__ == "__main__":
    auth = MeliAuth()
    token = auth.get_token()
    print(f"✅ Token generado")
    print(f"   user_id:    {token.user_id}")
    print(f"   expira en:  {int((token.expires_at - time.time()) / 60)} min")
    print(f"   scope head: {token.scope[:60]}...")
