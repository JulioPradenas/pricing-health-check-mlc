# Plan de Outreach — Distribución del Proyecto

Plan estratégico para convertir el repo + reporte en conversaciones reales (clientes consultivos, entrevistas de trabajo, contactos en la industria).

---

## Estrategia

Tres audiencias, tres mensajes distintos:

| Audiencia | Volumen | Conversión esperada | Objetivo |
|---|---|---|---|
| Sellers PYME en MELI Chile | 30 contactos | 2-3 reuniones | Cliente consultivo pagado |
| Pricing/Data Managers en retailers LATAM | 15 contactos | 1-2 entrevistas | Empleo full-time |
| Comunidad Data/MLOps LATAM | 5 grupos | 50+ views, 3-5 conversaciones | Networking + visibilidad |

---

## Audiencia 1 — Sellers PYME en MELI Chile

### Cómo identificarlos

Los 214 sellers únicos del dataset están en `data/raw/highlights_offers_*.parquet`. Filtrá:
- `is_official == False` (PYME real, no tienda oficial)
- `n_competitors >= 5` (compite en productos disputados)
- `gap_promedio >= 30` (tiene problema de pricing)
- Aparece en al menos 2 productos

Eso te da una shortlist de ~20-30 sellers candidatos.

### Cómo contactar

Buscás el seller en MercadoLibre con su `seller_id` o `nickname`, abrís su perfil de tienda y la mayoría tiene un teléfono o link a su sitio web. Algunos tienen email visible.

Si tienen sitio web propio, generalmente tienen LinkedIn — buscás "[nombre tienda] Chile" en LinkedIn.

### Plantilla DM/Email

> Hola [Nombre],
>
> Soy Julio Pradenas, data analyst especializado en pricing e-commerce. Acabo de publicar una auditoría competitiva de MercadoLibre Chile que cubre 348 ofertas en Audio, Computación y Celulares.
>
> Mientras analizaba los datos, vi que [TU TIENDA] aparece compitiendo en [PRODUCTO ESPECÍFICO]. Detecté un patrón que podría estar costándote ventas — específicamente, [INSIGHT ESPECÍFICO: brecha de precio, ausencia de MELI Full, etc.].
>
> Hice una versión genérica del análisis con un seller hero anónimo que detalla exactamente este patrón y propone un plan de 90 días para corregirlo. ROI proyectado: +12.6M CLP año 1, inversión 1.07M.
>
> ¿Te interesa que te muestre los hallazgos específicos de tu tienda en una llamada de 20 minutos? Sin compromiso ni venta — si te resulta útil, hablamos de cómo seguir.
>
> El reporte completo está acá: github.com/JulioPradenas/pricing-health-check-mlc
>
> Saludos,
> Julio

### Métricas de éxito
- 30 outreach enviados
- ≥10 abiertos (33%)
- ≥5 respuestas (17%)
- ≥2 reuniones agendadas (7%)
- ≥1 cliente cerrado (3%)

---

## Audiencia 2 — Pricing/Data Managers en retailers LATAM

### Empresas objetivo

Por relevancia para el perfil:

**Tier 1 (Chile)**
- MercadoLibre Chile (Pricing/Marketplace team)
- Falabella.com (Data Science team)
- Sodimac (Pricing team)
- Cencosud (Marketplace Paris)
- Linio Chile

**Tier 2 (LATAM remoto)**
- Mercado Libre regional (Argentina, Brasil)
- Rappi (pricing team)
- Cornershop / Uber (pricing)
- Linio México/Colombia

**Tier 3 (Tech LATAM / Startup pricing)**
- Buenbit, Ualá (fintech pricing)
- Tiendanube (e-commerce SaaS)
- Kavak (pricing automotriz)
- Habi (real estate pricing)

### Cómo encontrar contactos

LinkedIn con búsquedas específicas:
- `"Pricing Manager" AND "MercadoLibre"`
- `"Data Scientist" AND "Falabella"`
- `"Head of Pricing" AND "LATAM"`

Filtrá por 2nd y 3rd connections (más probable que respondan que un cold completo).

### Plantilla LinkedIn DM

> Hola [Nombre],
>
> Vi tu trabajo en [empresa] y me interesa lo que están haciendo en pricing. Acabo de publicar un proyecto de auditoría competitiva sobre MercadoLibre Chile que combina API pública, simulación de escenarios de repricing (incluyendo Thompson Sampling) y análisis de elasticidad descriptiva.
>
> Un hallazgo que creo te puede interesar: el sistema de Buy Box explícito no opera en MLC como en Amazon. La logística (MELI Full) predice el éxito mejor que el precio. Cuantifiqué la diferencia: 40% vs 3% de win rate.
>
> El proyecto está abierto: github.com/JulioPradenas/pricing-health-check-mlc — incluye el reporte ejecutivo, los notebooks de análisis y un pitch deck.
>
> Estoy buscando posiciones de Pricing Analyst / Data Scientist con foco en e-commerce. ¿Tendrías 15 min para una llamada esta o la próxima semana? Si no es el momento, igual aprecio si me podés indicar a alguien del equipo que reviewee perfiles.
>
> Saludos,
> Julio

### Métricas de éxito
- 15 contactos enviados
- ≥6 conexiones aceptadas (40%)
- ≥3 respuestas (20%)
- ≥1-2 entrevistas o referidos (10%)

---

## Audiencia 3 — Comunidades técnicas

### Dónde publicar

| Comunidad | Canal | Contenido a postear |
|---|---|---|
| Data Science Chile | Slack #showcase | Post LinkedIn + 2 figuras + link al repo |
| MLOps Community LATAM | Slack #latam-pricing o #showcase | Versión técnica enfocada en MLOps (auth, retry, parquet, reproducibilidad) |
| r/datascience (Reddit) | Post directo | "I built a pricing analysis tool for an emerging market" — no LATAM-only |
| r/MachineLearning | Solo si lo enfocás técnicamente | Versión enfocada en bandits + por qué no funcionan acá |
| Pioneras Latinoamérica | Slack o LinkedIn | Sin enfoque, contenido normal |
| Twitter/X | Hilo de 6-8 tweets | Resumen + insights + call to action |
| Hacker News | Show HN | Solo si tenés un dashboard Streamlit live (no es el caso ahora) |

### Plantilla post comunidad técnica

> Acabo de cerrar un proyecto de pricing data science enfocado en e-commerce LATAM. Stack: Python, MELI API, statsmodels, LightGBM. Notebooks abiertos, reporte en Word, deck en PowerPoint. Reproducible end-to-end.
>
> Tres hallazgos que pueden interesar a la comunidad:
>
> 1. El sistema de Buy Box explícito de MELI no opera en Chile como en Amazon (0 / 54 productos con winner declarado).
> 2. La logística predice el éxito 13x mejor que el precio (MELI Full 40% win rate vs Self-shipping 3%).
> 3. Thompson Sampling en este contexto destruye margen — un caso de estudio sobre cuándo NO usar bandits.
>
> Repo: github.com/JulioPradenas/pricing-health-check-mlc
>
> Feedback técnico bienvenido.

---

## Cronograma de ejecución (1 semana)

| Día | Acción | Tiempo |
|---|---|---|
| Lunes | Publicar post LinkedIn (versión B) | 30 min |
| Lunes | Cross-post X/Twitter como hilo | 15 min |
| Lunes-Martes | Identificar 30 sellers PYME del dataset + buscar contactos | 4 hrs |
| Martes | Identificar 15 contactos LinkedIn objetivo Tier 1 | 2 hrs |
| Miércoles | Envío de DMs a sellers (10 por día) | 2 hrs/día |
| Miércoles | Envío de connection requests Tier 1 | 1 hr |
| Jueves | Post en Data Science Chile Slack | 30 min |
| Jueves | Post en MLOps Community Slack | 30 min |
| Viernes | Seguimiento DMs sin responder | 1 hr |
| Lunes siguiente | Post LinkedIn de seguimiento ("una semana después...") | 30 min |

---

## Tracking

Mantener una hoja de cálculo (Google Sheets o Excel) con:

| Contacto | Empresa | Audiencia | Canal | Fecha | Respondió | Reunión | Resultado |
|---|---|---|---|---|---|---|---|
| Juan Pérez | TechShop SpA | Seller PYME | LinkedIn | 9-mayo | sí | sí 13-mayo | propuesta enviada |
| ... | ... | ... | ... | ... | ... | ... | ... |

Esto sirve para:
1. Medir qué canal/mensaje funciona mejor
2. Hacer seguimiento sin perder contactos
3. Aprender a iterar el outreach en proyectos futuros

---

## Mentalidad

- **No esperar respuesta inmediata.** El 70% no responde, es normal.
- **No personalizar emocionalmente las negativas.** Si dicen "no es el momento", agradecé y pedí permiso para volver en 3 meses.
- **Las mejores oportunidades llegan tarde.** Un contacto del mes 3 puede valer más que 10 del mes 1.
- **El proyecto está afuera para siempre.** Cada nuevo seller que entre a MELI mañana es un cliente potencial. Si el repo está bien indexado y tu LinkedIn lo muestra, el outreach se vuelve pasivo.