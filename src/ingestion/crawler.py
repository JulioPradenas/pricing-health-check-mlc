"""
Crawler de productos best-seller y sus ofertas competitivas en MercadoLibre Chile.

Estrategia (Camino B):
1. Para cada categoría, obtener los best-sellers vía /highlights.
2. Para cada producto, obtener metadata vía /products/{id}.
3. Para cada producto, obtener la lista de ofertas vía /products/{id}/items.
4. Aplanar todo en una tabla de "ofertas competitivas" (una fila por oferta).
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Iterator

import pandas as pd

from src.ingestion.meli_client import MeliAPIError, MeliReadOnlyClient

logger = logging.getLogger(__name__)


def _extract_attribute(attributes: list[dict], attr_id: str) -> str | None:
    """Busca un atributo por id en la lista de atributos del producto."""
    for a in attributes or []:
        if a.get("id") == attr_id:
            return a.get("value_name")
    return None


def _flatten_offer(
    offer: dict,
    product: dict,
    category_id: str,
    category_name: str,
    highlight_position: int,
    n_competitors: int,
    min_price: float,
    snapshot_date: datetime,
) -> dict:
    """Convierte una oferta cruda + contexto en una fila plana del dataset."""
    price = offer.get("price")
    seller_addr = offer.get("seller_address") or {}
    state_obj = seller_addr.get("state") if isinstance(seller_addr, dict) else None
    seller_state = state_obj.get("name") if isinstance(state_obj, dict) else None

    shipping = offer.get("shipping") or {}
    original_price = offer.get("original_price")

    discount_pct = None
    if original_price and price and original_price > 0:
        discount_pct = round((original_price - price) / original_price * 100, 2)

    price_gap_to_min_pct = None
    if price and min_price and min_price > 0:
        price_gap_to_min_pct = round((price - min_price) / min_price * 100, 2)

    return {
        "snapshot_date": snapshot_date,
        "category_id": category_id,
        "category_name": category_name,
        "highlight_position": highlight_position,
        "product_id": product.get("id"),
        "product_name": product.get("name"),
        "domain_id": product.get("domain_id"),
        "brand": _extract_attribute(product.get("attributes", []), "BRAND"),
        "model": _extract_attribute(product.get("attributes", []), "MODEL"),
        "item_id": offer.get("item_id"),
        "seller_id": offer.get("seller_id"),
        "official_store_id": offer.get("official_store_id"),
        "price": price,
        "original_price": original_price,
        "discount_pct": discount_pct,
        "currency_id": offer.get("currency_id"),
        "condition": offer.get("condition"),
        "listing_type_id": offer.get("listing_type_id"),
        "free_shipping": shipping.get("free_shipping"),
        "logistic_type": shipping.get("logistic_type"),
        "seller_state": seller_state,
        "accepts_mercadopago": offer.get("accepts_mercadopago"),
        "n_competitors": n_competitors,
        "is_min_price": price == min_price if price else None,
        "price_gap_to_min_pct": price_gap_to_min_pct,
    }


def crawl_category(
    client: MeliReadOnlyClient,
    category_id: str,
) -> Iterator[dict]:
    """
    Genera filas planas (una por oferta competitiva) para una categoría.

    Yields:
        dict con la estructura del dataset definida.
    """
    snapshot_date = datetime.now(timezone.utc)

    # 1. Resolver nombre de la categoría
    try:
        cat = client.get_category(category_id)
        category_name = cat.get("name", category_id)
    except MeliAPIError as e:
        logger.warning(f"No se pudo resolver categoria {category_id}: {e}")
        category_name = category_id

    # 2. Obtener best-sellers
    try:
        highlights = client._get(f"/highlights/MLC/category/{category_id}")
    except MeliAPIError as e:
        logger.error(f"Highlights fallo para {category_id}: {e}")
        return

    products_in_highlights = [
        entry for entry in highlights.get("content", []) if entry.get("type") == "PRODUCT"
    ]
    logger.info(f"[{category_id}] {len(products_in_highlights)} best-sellers")

    # 3. Para cada producto, obtener metadata + ofertas
    for entry in products_in_highlights:
        pid = entry["id"]
        position = entry.get("position", -1)

        try:
            product = client.get_product(pid)
        except MeliAPIError as e:
            logger.warning(f"  product {pid} skip: {e}")
            continue

        try:
            items_resp = client._get(f"/products/{pid}/items")
        except MeliAPIError as e:
            # Producto sin ofertas activas - lo skipeamos
            logger.info(f"  product {pid} sin ofertas (skip)")
            continue

        offers = items_resp.get("results", []) or []
        if not offers:
            continue

        # Calcular contexto competitivo
        prices = [o.get("price") for o in offers if o.get("price")]
        if not prices:
            continue
        min_price = min(prices)
        n_competitors = len(offers)

        for offer in offers:
            yield _flatten_offer(
                offer=offer,
                product=product,
                category_id=category_id,
                category_name=category_name,
                highlight_position=position,
                n_competitors=n_competitors,
                min_price=min_price,
                snapshot_date=snapshot_date,
            )


def crawl_categories_to_dataframe(
    client: MeliReadOnlyClient,
    category_ids: list[str],
) -> pd.DataFrame:
    """
    Crawlea múltiples categorías y devuelve un DataFrame consolidado.
    """
    rows: list[dict] = []
    for cat_id in category_ids:
        n_before = len(rows)
        for row in crawl_category(client, cat_id):
            rows.append(row)
        n_added = len(rows) - n_before
        logger.info(f"[{cat_id}] +{n_added} filas (total acumulado: {len(rows)})")

    if not rows:
        return pd.DataFrame()

    df = pd.DataFrame(rows)
    return df


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )
    client = MeliReadOnlyClient()

    # Test rápido con UNA categoría
    df = crawl_categories_to_dataframe(client, ["MLC1055"])
    print()
    print(f"Filas generadas: {len(df)}")
    print(f"Productos únicos: {df['product_id'].nunique() if len(df) else 0}")
    print(f"Sellers únicos:   {df['seller_id'].nunique() if len(df) else 0}")
    if len(df):
        print()
        print("Muestra de columnas clave:")
        cols = ["product_name", "seller_id", "price", "is_min_price", "n_competitors", "free_shipping"]
        print(df[cols].head(10).to_string(index=False))