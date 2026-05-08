# Roadmap de Implementación · 90 Días

**Cliente:** ElectroChile (seller PYME · 7+ productos en Audio/Computación · MercadoLibre Chile)
**Recomendación:** Escenario A — Reglas + alertas con migración logística
**Inversión total año 1:** ~$1.07M CLP (setup + costo operativo)
**Retorno proyectado año 1:** $12.6M CLP (rango $6M-$20M con sensibilidad)

---

## Resumen ejecutivo

El proyecto tiene **tres pilares secuenciales** que se ejecutan en paralelo después del kickoff:

1. **Pilar logístico** — migración de 5 productos a MELI Full (semanas 1-6)
2. **Pilar pricing** — motor de reglas + alertas Telegram (semanas 1-4)
3. **Pilar tracking** — instrumentación de visitas y conversiones (semanas 5-8)

A los 90 días se evalúa el lift real medido contra el status quo y se decide la fase 2 (escalar a más productos, o descartar y revertir).

---

## Mes 1 · Diagnóstico, infraestructura y migración logística

### Semana 1 — Kickoff y baseline

**Objetivos:**
- Acuerdo formal de alcance (KPIs, productos incluidos, criterios de éxito)
- Levantamiento de costos de adquisición reales por producto
- Snapshot 0 del estado competitivo

**Entregables:**
- Documento de scope firmado
- Tabla de costos por SKU (provista por el seller)
- Reporte de baseline competitivo (este análisis)

**Riesgos:**
- Seller no tiene costos limpios → mitigación: estimar usando facturas de proveedores

### Semana 2 — Setup técnico

**Objetivos:**
- Acceso de lectura a la API MELI desde el sistema del consultor
- Bot Telegram configurado para alertas al seller
- Repositorio Git privado del cliente con código del motor de reglas

**Entregables:**
- App MELI del seller creada (no la del consultor)
- Bot Telegram funcional con cuenta del seller
- Cron diario que sincroniza precios competitivos a las 8:00 AM

### Semana 3 — Negociación con proveedores (pre-requisito crítico)

**Objetivos:**
- Identificar los 3-5 productos donde el costo de adquisición está fuera de mercado
- Revisar contratos con proveedores actuales
- Solicitar cotizaciones a proveedores alternativos

**Entregables:**
- Tabla de costos actuales vs. cotizaciones alternativas
- Lista priorizada de productos con potencial de renegociación

**Riesgos:**
- Sin renegociación, el repricing destruye margen (insight Día 4)
- Mitigación: si no se logra reducir costos, **excluir esos productos del programa**

### Semana 4 — Implementación motor de reglas v1

**Objetivos:**
- Motor de reglas básico operando sobre los 7 productos
- Recomendaciones diarias enviadas al seller por Telegram
- Sin auto-aplicar todavía: el seller revisa y aprueba

**Entregables:**
- Código en producción del motor de reglas
- Bot Telegram enviando recomendaciones a las 9:00 AM
- Logbook compartido seller-consultor de decisiones

---

## Mes 2 · Migración a MELI Full y tracking

### Semana 5 — Iniciar migración logística (productos 1-2)

**Objetivos:**
- Activar MELI Full para los 2 productos con mayor volumen actual (Sony DualSense, Amazon Echo Dot)
- Coordinar inventario con MELI (envío a centro de distribución)
- Documentar costos logísticos antes/después

**Entregables:**
- 2 productos operando en Full
- Análisis de break-even del fee de Full (~10-15% adicional sobre comisión base)

### Semana 6 — Migración logística (productos 3-5)

**Objetivos:**
- Activar Full para los 3 productos restantes con potencial (Mouse Logitech, Audífonos Hoco, Audífonos Blik)
- Excluir Pasta Térmica y otros productos donde el ticket es bajo y el fee de Full no compensa

**Entregables:**
- 5 productos operando en Full (vs. 2 originales)
- Re-cálculo de win rate proyectado por producto

### Semana 7 — Tracking de visitas y conversiones

**Objetivos:**
- Instrumentar Google Analytics 4 + UTM en links de MELI
- Dashboard básico en Looker Studio con visitas, clicks, conversión por listing
- Establecer baseline de conversión por producto

**Entregables:**
- GA4 configurado y reportando datos
- Dashboard Looker Studio con vista por SKU
- Tabla de conversion rate baseline

**Riesgos:**
- MELI no permite tracking pixel directo en listings
- Mitigación: usar UTMs en redes sociales del seller que apunten a sus listings

### Semana 8 — Primera revisión de KPIs y ajuste de reglas

**Objetivos:**
- Revisar métricas mes 1 vs. baseline
- Ajustar parámetros del motor de reglas según resultados observados
- Decidir si activar auto-aplicación de cambios menores (<5%)

**Entregables:**
- Reporte de KPIs mes 1
- Ajuste del motor (versión 1.1)
- Decisión escrita sobre auto-aplicación

---

## Mes 3 · Operación, evaluación y decisión

### Semana 9-10 — Operación con auto-aplicación parcial

**Objetivos:**
- Auto-aplicar cambios menores (<5%) del motor de reglas
- Mantener aprobación manual para cambios mayores
- Monitorear margen real semana a semana

**Entregables:**
- Sistema operando semi-autónomo
- Reporte semanal de cambios aplicados y resultados

### Semana 11 — Análisis de impacto

**Objetivos:**
- Comparar ventas, margen y win rate del periodo vs. baseline
- Test estadístico simple (proporción de win rate antes/después)
- Identificar productos donde el sistema funcionó vs. no funcionó

**Entregables:**
- Reporte de impacto cuantitativo
- Recomendaciones de continuación, ajuste o cancelación

### Semana 12 — Decisión y entrega

**Objetivos:**
- Reunión de decisión: continuar, escalar o cancelar
- Si continúa: contrato de operación + nuevo alcance (más productos, más categorías)
- Transferencia de conocimiento al equipo del seller

**Entregables:**
- Reporte ejecutivo final 90 días
- Plan de fase 2 (si aplica)
- Documentación técnica para el seller

---

## KPIs de éxito (medibles a los 90 días)

| KPI | Baseline | Target a 90 días | Crítico para |
|---|---|---|---|
| Win rate de precio mínimo | 0% | ≥15% | Validar el repricing |
| Productos en MELI Full | 2 / 7 | 5 / 7 | Validar pilar logístico |
| Margen total mensual | $1.4M CLP | $1.6M-$1.8M | Validar ROI |
| Recomendaciones aplicadas | 0% | ≥60% del total | Validar adherencia del seller |
| Conversion rate (con tracking) | n/a | Establecer baseline | Validar tracking |

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Seller no logra renegociar costos | Alta | Alto | Limitar repricing a productos donde costo es competitivo |
| MELI cambia política de catálogo | Baja | Alto | Mantener flexibilidad para cambiar a listings sueltos |
| Seller deja de aprobar recomendaciones | Media | Medio | Reducir frecuencia de alertas; resúmenes semanales |
| Productos competidores cambian dramáticamente | Media | Medio | Re-baseline cada 30 días |
| Estacionalidad distorsiona resultados | Alta | Medio | Comparar contra mismo periodo del año anterior si es posible |

---

## Costos detallados año 1

| Concepto | Año 1 |
|---|---|
| Setup inicial (consultor) | $500.000 CLP (1 vez) |
| Operación motor de reglas (cloud + bot) | $570.000 CLP |
| Honorarios de monitoreo (4hrs/sem × 12 sem) | $0 (incluido en ROI) |
| **Total año 1** | **~$1.07M CLP** |

---

## Próximos pasos para el cliente

1. Confirmar disponibilidad de costos de adquisición por SKU (semana 1 lo bloquea todo).
2. Asignar 1 persona del equipo del seller como contraparte (1-2 hrs/sem).
3. Aprobar acceso de lectura del consultor a su cuenta de MELI.
4. Calendarizar reunión de kickoff.

---

*Documento generado a partir del análisis de catálogo MLC (snapshot 7 mayo 2026). Todos los lifts proyectados son rangos con sensibilidad declarada. Caveats metodológicos en notebooks/01_eda.ipynb, 02_elasticity.ipynb, 03_repricing_simulation.ipynb del repositorio.*