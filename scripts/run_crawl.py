"""
Script de orquestación: crawlea las 3 categorías target y guarda en parquet.

Uso:
    python scripts/run_crawl.py
"""
import logging
from datetime import datetime, timezone
from pathlib import Path

from src.config import RAW_DIR
from src.ingestion.crawler import crawl_categories_to_dataframe
from src.ingestion.meli_client import MeliReadOnlyClient

# Categorías target del proyecto
CATEGORIES = [
    "MLC1055",  # Celulares y Smartphones
    "MLC1000",  # Audio
    "MLC1648",  # Computación
]


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%H:%M:%S",
    )
    log = logging.getLogger("crawl")

    log.info(f"Iniciando crawl de {len(CATEGORIES)} categorias: {CATEGORIES}")
    client = MeliReadOnlyClient()

    df = crawl_categories_to_dataframe(client, CATEGORIES)

    if df.empty:
        log.error("Dataset vacio, abortando")
        return

    # Guardar parquet con timestamp en el nombre
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    out_path = RAW_DIR / f"highlights_offers_{ts}.parquet"
    df.to_parquet(out_path, index=False)

    # Resumen
    log.info("=" * 60)
    log.info(f"Filas totales:        {len(df):,}")
    log.info(f"Productos unicos:     {df['product_id'].nunique():,}")
    log.info(f"Sellers unicos:       {df['seller_id'].nunique():,}")
    log.info(f"Categorias:           {df['category_id'].nunique()}")
    log.info(f"Rango de precios CLP: ${df['price'].min():,.0f} - ${df['price'].max():,.0f}")
    log.info(f"Filas con descuento:  {df['discount_pct'].notna().sum():,}")
    log.info("=" * 60)
    log.info(f"Guardado en: {out_path}")
    log.info(f"Tamaño:      {out_path.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()