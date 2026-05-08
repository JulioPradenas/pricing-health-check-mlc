# Pricing Health Check para Sellers PYME en MercadoLibre Chile

[![Status](https://img.shields.io/badge/status-completed-success)]()
[![Python](https://img.shields.io/badge/python-3.11-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Notebooks](https://img.shields.io/badge/notebooks-3-orange)]()

> Auditoría competitiva, análisis de elasticidad y simulación de escenarios de repricing para un seller PYME en MercadoLibre Chile, con foco en Audio y Computación.

---

## TL;DR

ElectroChile, un seller PYME con 7 productos best-seller en el catálogo unificado de MELI Chile, **es el seller más caro o de los más caros en el 100% de sus listings**. Cobra 165% más en promedio que el competidor más barato del mismo SKU. El proyecto cuantifica el problema, simula 3 estrategias de solución y descubre un insight contraintuitivo: **el repricing con bandits Thompson Sampling destruiría $27.5M CLP de margen anual**, mientras que un motor de reglas simple genera +$12.6M.

---

## Hallazgos clave

| Hallazgo | Cifra | Implicancia |
|---|---|---|
| **Catálogo MLC sin Buy Box winner** | 0 / 54 productos | El sistema de Buy Box explícito no opera en Chile como en Amazon |
| **Brecha de precio entre sellers** | mediana 71%, máx 340% | Mismo SKU vendido por sellers distintos hasta a 4.4x el precio |
| **Tienda Oficial vs PYME** | 32% vs 10% win rate | Las oficiales dominan el pricing competitivo |
| **MELI Full vs Self-shipping** | 40% vs 3% win rate | La logística predice el éxito mejor que el precio |
| **La trampa de bandits** | +280% ventas, −38% margen | Repricing agresivo sin renegociar costos destruye el negocio |

---

## Stack técnico

**Lenguajes**: Python 3.11 · JavaScript (Node.js para entregables)
**Datos**: MercadoLibre API (`/highlights`, `/products`, `/products/{id}/items`)
**Análisis**: pandas · numpy · statsmodels · scikit-learn · LightGBM
**Visualización**: matplotlib · seaborn
**Persistencia**: parquet (PyArrow)
**Entregables**: pptxgenjs (deck) · docx (reporte ejecutivo)
**Reproducibilidad**: requirements.txt · `.env.example` · script `run_crawl.py`

---

## Estructura del repositorio

pricing-health-check-mlc/
├── src/                          Cliente API y crawler reutilizable
│   ├── config.py                 Configuración centralizada
│   └── ingestion/
│       ├── auth.py               OAuth Client Credentials con caché
│       ├── meli_client.py        Cliente HTTP de solo lectura
│       └── crawler.py            Crawler de best-sellers + competidores
│
├── scripts/                      Orquestación y generación de entregables
│   ├── run_crawl.py              Pipeline de ingesta a parquet
│   ├── deck/build_deck.js        Generador del pitch deck (PPTX)
│   └── report/build_report.js    Generador del reporte ejecutivo (DOCX)
│
├── notebooks/                    Análisis reproducible
│   ├── 01_eda.ipynb              EDA + 4 figuras publicables
│   ├── 02_elasticity.ipynb       Elasticidad descriptiva con caveats
│   └── 03_repricing_simulation.ipynb  Simulación de 3 escenarios
│
├── data/raw/                     Snapshots versionados (gitignored)
│
├── deliverables/                 Entregables finales
│   ├── fig_01..07_*.png          7 figuras publicables
│   ├── pitch_deck_electrochile.pptx   12 slides
│   └── executive_report_electrochile.docx  9 secciones
│
└── docs/
└── roadmap_90_days.md        Plan de implementación 12 semanas

---

## Cómo reproducir

### Requisitos previos
- Python 3.11+
- Node.js 18+ (solo para regenerar pitch deck y reporte)
- Cuenta de MercadoLibre Chile con app creada en [DevCenter](https://developers.mercadolibre.cl/devcenter)

### Setup

```bash
git clone https://github.com/JulioPradenas/pricing-health-check-mlc
cd pricing-health-check-mlc

# Entorno Python
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Credenciales MELI
cp .env.example .env
# Editar .env con MELI_APP_ID y MELI_CLIENT_SECRET

# Ingesta de datos
python -m scripts.run_crawl
```

### Reproducir entregables (opcional)

```bash
# Pitch deck (Node.js)
npm install
node scripts/deck/build_deck.js

# Reporte ejecutivo
node scripts/report/build_report.js
```

---

## Caveats metodológicos declarados

Este proyecto practica honestidad metodológica:

- **Elasticidad descriptiva, no causal**. Los β estimados (Celulares −0.67, Audio −0.56) tienen p > 0.05 y CIs anchos. Los datos públicos del catálogo no son suficientes para estimar elasticidad causal en MLC.
- **Proxy de demanda**. Sin acceso a `sold_quantity` o visitas, se usa la posición en el ranking de best-sellers como proxy.
- **Costo de adquisición asumido**. El supuesto de costo = 80% del precio mediano competitivo debe validarse con el cliente.
- **Lifts proyectados con sensibilidad**. Los +20% (Escenario A) y +25% (C) son rangos no validados; el reporte declara el rango bajo y alto.
- **Extrapolación 90d → 360d**. Asume estacionalidad uniforme, lo cual es falso. Cyber, Navidad y vuelta a clases tienen efectos distintos.

---

## Decisiones de pricing que diferencian este análisis

1. **Recomendar Reglas + alertas en lugar de bandits** cuando los datos lo indican, aunque bandits sea más "vendible" técnicamente.
2. **Identificar la migración a MELI Full como pre-requisito** del repricing, no como un complemento.
3. **Plantear renegociación de costos como acción primaria**, no el repricing per se. El repricing sin renegociar costos destruye margen.
4. **Declarar caveats explícitamente** en cada sección del reporte y en la simulación. El honest reporting es parte del entregable.

---

## Sobre el autor

**Julio Pradenas** — Data Analyst especializado en pricing y e-commerce. Concepción, Chile.

Background mixto en biología marina (UCSC), programación (TNS Instituto Virginio Gómez) y data analytics (Desafío LATAM). Experiencia previa en project control de transmisión eléctrica (BBosch S.A.), análisis de datos (Carrasco Sáez), datos operacionales (Sernapesca) y data annotation para LLMs.

- LinkedIn: [linkedin.com/in/julio-pradenas](https://linkedin.com/in/jpradenas)
- GitHub: [@JulioPradenas](https://github.com/JulioPradenas)

---

## Licencia

MIT — Libre para uso académico, profesional y comercial. Citación apreciada pero no exigida.