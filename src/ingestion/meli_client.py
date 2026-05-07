"""
Cliente HTTP de solo lectura para la API de MercadoLibre.

Diseño:
- Solo expone métodos GET (sin POST/PUT/DELETE) por defensa en profundidad.
- Reutiliza el token vía MeliAuth y lo renueva automáticamente.
- Reintentos exponenciales en errores 5xx y 429.
- Respeta rate limit con sleep configurable entre llamadas.
"""
import time
from typing import Any, Optional

import requests
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from src.config import MELI_API_BASE, MELI_SITE_ID
from src.ingestion.auth import MeliAuth


class MeliAPIError(Exception):
    """Error en la API de MELI."""


class MeliReadOnlyClient:
    """
    Cliente de solo lectura para la API de MercadoLibre.

    Aunque la app puede tener scope read+write (forzado por MELI en el permiso
    'Usuarios'), este cliente intencionalmente NO expone métodos de escritura.
    Si en el futuro se necesita escribir, debe crearse un cliente separado
    con review explícito.
    """

    def __init__(
        self,
        site_id: str = MELI_SITE_ID,
        rate_limit_sleep: float = 0.1,
    ) -> None:
        self.site_id = site_id
        self.rate_limit_sleep = rate_limit_sleep
        self._auth = MeliAuth()
        self._session = requests.Session()

    @retry(
        retry=retry_if_exception_type((requests.HTTPError, requests.ConnectionError)),
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        reraise=True,
    )
    def _get(self, path: str, params: Optional[dict] = None) -> dict[str, Any]:
        """GET con reintentos automáticos. Renueva token si recibe 401."""
        url = f"{MELI_API_BASE}{path}"
        response = self._session.get(
            url,
            params=params,
            headers=self._auth.headers(),
            timeout=15,
        )

        # Token expirado → renovar y reintentar una vez
        if response.status_code == 401:
            self._auth.get_token(force_refresh=True)
            response = self._session.get(
                url,
                params=params,
                headers=self._auth.headers(),
                timeout=15,
            )

        if response.status_code == 429:
            time.sleep(5)
            response.raise_for_status()

        if response.status_code >= 500:
            response.raise_for_status()

        if not response.ok:
            raise MeliAPIError(
                f"GET {path} -> {response.status_code}: {response.text[:200]}"
            )

        time.sleep(self.rate_limit_sleep)
        return response.json()

    # ---------- Endpoints de catalogo ----------

    def get_category(self, category_id: str) -> dict:
        """Detalle de una categoria (e.g. MLC1055 -> Celulares y Smartphones)."""
        return self._get(f"/categories/{category_id}")

    def get_site_categories(self) -> list[dict]:
        """Lista todas las categorias raiz del sitio."""
        return self._get(f"/sites/{self.site_id}/categories")

    def get_category_trends(self, category_id: str) -> list[dict]:
        """Keywords mas buscadas en una categoria."""
        return self._get(f"/trends/{self.site_id}/{category_id}")

    # ---------- Endpoints de productos catalogo ----------

    def search_products(
        self,
        q: Optional[str] = None,
        category: Optional[str] = None,
        status: str = "active",
        limit: int = 50,
        offset: int = 0,
    ) -> dict:
        """
        Busqueda en el catalogo unificado de MELI.

        Devuelve productos con catalog_product_id, atributos, marca, modelo
        y referencia al buy_box_winner (en endpoint de detalle).
        """
        params = {
            "site_id": self.site_id,
            "status": status,
            "limit": min(limit, 50),
            "offset": offset,
        }
        if q:
            params["q"] = q
        if category:
            params["category"] = category
        return self._get("/products/search", params=params)

    def get_product(self, product_id: str) -> dict:
        """
        Detalle de un producto del catalogo, incluyendo buy_box_winner
        con precio, seller_id y condicion del ganador del Buy Box.
        """
        return self._get(f"/products/{product_id}")


if __name__ == "__main__":
    client = MeliReadOnlyClient()

    print("Test 1: Detalle de categoria MLC1055")
    cat = client.get_category("MLC1055")
    print(f"   OK {cat['name']} - {cat['total_items_in_this_category']:,} items\n")

    print("Test 2: Buscar productos 'iphone' en MLC1055")
    search = client.search_products(q="iphone", category="MLC1055", limit=3)
    print(f"   OK {search['paging']['total']:,} resultados totales")
    for p in search["results"][:3]:
        print(f"      - {p['id']}: {p['name'][:60]}")

    print("\nTest 3: Detalle del primer producto")
    first_id = search["results"][0]["id"]
    product = client.get_product(first_id)
    bbw = product.get("buy_box_winner")
    if bbw:
        print(f"   OK Buy Box winner: ${bbw.get('price'):,} - seller {bbw.get('seller_id')}")
    else:
        print(f"   AVISO Sin buy_box_winner (producto inactivo o sin ofertas)")