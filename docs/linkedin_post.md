# Post LinkedIn — Lanzamiento Pricing Health Check MLC

Tres versiones del post según el estilo y largo que prefieras. **Recomendación: usá la versión media (B)** — es la que mejor performa en LinkedIn LATAM para contenido técnico-analítico.

Para todos: subí 1-2 figuras del proyecto como imagen del post (recomendadas: `fig_06_hero_benchmark.png` y `fig_07_bandit_trap.png`).

---

## Versión A — Corta (lectura ~30 segundos)

> Auditamos 348 ofertas de electrónica en MercadoLibre Chile.
>
> Hallazgo que no esperábamos: **0% de los productos best-seller tienen "Buy Box winner" declarado en la API**. El sistema que en Amazon concentra el 82% de las ventas, en MLC simplemente no opera.
>
> ¿Quién gana entonces? La logística:
>
> → MELI Full: 40% win rate de precio mínimo
> → Self-shipping: solo 3%
>
> Para sellers PYME, eso reordena la jugada de pricing por completo.
>
> Reporte completo + dashboard + código en GitHub:
> 🔗 github.com/JulioPradenas/pricing-health-check-mlc
>
> #pricing #ecommerce #datascience #latam

---

## Versión B — Media (lectura ~60 segundos) ⭐ Recomendada

> ¿Qué pasaría si recomendaras al cliente la solución más sofisticada técnicamente y le destruyeras 27 millones de pesos al año?
>
> Eso casi me pasa. Por eso terminé sin recomendar Thompson Sampling.
>
> Acabo de cerrar un Pricing Health Check sobre 348 ofertas en MercadoLibre Chile (Audio + Computación + Celulares). El cliente avatar: un seller PYME que vende 7 productos best-seller y pierde el precio mínimo en el 100% de sus listings.
>
> Tres hallazgos que me sorprendieron:
>
> ▶ **El catálogo MLC no tiene Buy Box winner declarado.** En 54 productos top, ninguno. El sistema que en Amazon define el 82% de las ventas, en Chile no opera de la misma forma.
>
> ▶ **MELI Full define quién gana.** Win rate 40% con Full vs 3% sin Full. La logística manda más que el precio.
>
> ▶ **Bandits destruirían el margen.** Simulé 90 días de Thompson Sampling: +280% en ventas, pero -38% en margen total. La sofisticación de la herramienta no es la respuesta cuando los costos de adquisición no son competitivos.
>
> La recomendación final no fue bandits. Fue:
> 1. Renegociar costos con proveedores (sin esto, lo demás es destructivo)
> 2. Migrar a MELI Full
> 3. Motor de reglas + alertas Telegram
> 4. Tracking propio (GA4) para validar
>
> ROI proyectado año 1: +12.6M CLP. Costo: 1.07M CLP.
>
> Todo el análisis (3 notebooks, 7 figuras, pitch deck, reporte ejecutivo en Word) está abierto en GitHub. La idea es que cualquier seller PYME o consultor pueda replicarlo:
>
> 🔗 github.com/JulioPradenas/pricing-health-check-mlc
>
> #pricing #ecommerce #datascience #mercadolibre #latam #python

---

## Versión C — Larga (lectura ~90 segundos, formato historia)

> Pasé 6 días auditando el catálogo de MercadoLibre Chile en busca de una historia útil para sellers PYME. La encontré, pero no era la que esperaba.
>
> El plan original era simple: cuantificar elasticidad de precio para tres categorías (Audio, Computación, Celulares), simular bandits Thompson Sampling, y mostrar que un seller PYME puede capturar 30% más margen con repricing inteligente.
>
> Sucedieron tres cosas que cambiaron el análisis.
>
> Primero, descubrí que el sistema de Buy Box explícito de MELI **no opera en Chile** como en Amazon. En 54 productos best-seller, 0 tienen "buy_box_winner" declarado en la API. La pregunta de "cómo ganar el Buy Box" no era la pregunta correcta.
>
> Segundo, vi que la logística importa más que el precio. Las ofertas con MELI Full tienen 40% win rate de precio mínimo. Las ofertas con self-shipping (la mayoría) tienen 3%. Sin Full, el repricing es secundario.
>
> Tercero, simulé Thompson Sampling sobre 7 productos del seller hero (anonimizado como "ElectroChile") durante 90 días. El bandit convergió al brazo más bajo (1.05x del mínimo), generó 280% más ventas... y destruyó 38% del margen total. Anualizado: -27.5M CLP.
>
> Bandits, la herramienta más "vendible" técnicamente, era la peor recomendación posible para este caso.
>
> La recomendación que terminó en el reporte: motor de reglas + alertas Telegram + migración logística. Inversión 1.07M CLP año 1, ROI +12.6M. Sin sofisticación innecesaria.
>
> El insight que me llevo: **la sofisticación correcta es saber cuándo no usar la herramienta sofisticada.**
>
> Todo el análisis está abierto. 3 notebooks, 7 figuras, pitch deck de 12 slides, reporte ejecutivo en Word, roadmap de implementación 90 días. Construido con la API pública oficial de MELI, sin scraping. Reproducible end-to-end.
>
> 🔗 github.com/JulioPradenas/pricing-health-check-mlc
>
> Si trabajas en pricing o e-commerce en LATAM y querés discutir alguno de los hallazgos, escribime por DM.
>
> #pricing #ecommerce #datascience #mercadolibre #latam #python #analytics

---

## Notas de publicación

**Cuándo publicar:** Martes o miércoles, 9:00-10:00 AM hora Chile. Es cuando hay mayor engagement de público profesional LATAM.

**Imágenes a adjuntar:**
1. `fig_06_hero_benchmark.png` — el gráfico que muestra a ElectroChile siempre del lado caro
2. `fig_07_bandit_trap.png` — la trampa de bandits

**Hashtags a probar:** #pricing #ecommerce #datascience #mercadolibre #latam #python #analytics #chile

**Tagging estratégico (si te animas):** equipos de Pricing/Data en empresas LATAM. No abusar — máximo 2-3 tags por post, y solo si tu contenido es relevante para ellos.

**Plan de seguimiento:**
- Día 0: Publicar
- Día 1: Responder todos los comentarios en menos de 4 hrs
- Día 3: Repostear con un comentario adicional ("Algo que aprendí esta semana...")
- Día 7: Post de seguimiento con un hallazgo más específico (e.g. el caso del Mouse Logitech con 22 sellers compitiendo)