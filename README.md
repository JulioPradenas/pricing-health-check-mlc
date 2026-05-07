# Pricing Health Check para Sellers PYME en MercadoLibre Chile

Auditoría de pricing competitivo y análisis del catálogo unificado de MercadoLibre Chile (MLC), con foco en sellers PYME de electrónica.

**Estado:** 🚧 En desarrollo — Día 1 de 21

## Hallazgo macro preliminar

El catálogo unificado de MLC tiene baja adopción competitiva: en 54 productos best-seller analizados (3 categorías), **0% tiene Buy Box winner declarado por la API** y la mediana de competidores por producto es de 2-3 sellers. Esto contrasta fuertemente con marketplaces como Amazon, donde el sistema de Buy Box concentra el 82% de las ventas.

## Categorías analizadas

- MLC1055 — Celulares y Smartphones
- MLC1000 — Audio
- MLC1648 — Computación

## Stack

- **Python 3.11** — pandas, requests, lightgbm, statsmodels, streamlit
- **MercadoLibre API** — `/highlights`, `/products`, `/products/{id}/items`
- **Persistencia** — parquet en `data/raw/`
- **Notebook + dashboard** — Jupyter + Streamlit

## Estructura

src/
├── config.py
├── ingestion/        # Cliente HTTP MELI + crawler
├── matching/         # (pendiente) Product matching
├── analysis/         # (pendiente) Elasticidad y benchmark
└── repricing/        # (pendiente) Reglas + bandits
scripts/              # Orquestación
notebooks/            # EDA y análisis
data/raw/             # Parquets versionados (gitignored)

## Cómo reproducir

```bash
git clone https://github.com/<tu-usuario>/pricing-health-check-mlc
cd pricing-health-check-mlc
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # editar con tus credenciales MELI
python -m scripts.run_crawl
```

## Autor

[Julio Pradenas](https://www.linkedin.com/in/jpradenas) — Data Analyst | Pricing & E-commerce | Concepción, Chile

## Licencia

MIT