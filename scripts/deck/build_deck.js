const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Julio Pradenas";
pres.title = "Pricing Health Check ElectroChile";
pres.company = "Pricing Health Check MLC";

// Paleta — Cherry Bold (rojo + cream + navy)
const COLORS = {
  primary:   "2563EB",
  warning:   "DC2626",
  good:      "16A34A",
  accent:    "FFE600",
  neutral:   "64748B",
  navyDark:  "0F172A",
  cream:     "FAF7F2",
  ink:       "1E293B",
};

const FONT_HEADER = "Calibri";
const FONT_BODY = "Calibri";
const TOTAL = 12;

// Path absoluto a las figuras del proyecto
const DELIVERABLES = path.resolve(__dirname, "..", "..", "deliverables");
const FIG_HERO = path.join(DELIVERABLES, "fig_06_hero_benchmark.png");
const FIG_TRAP = path.join(DELIVERABLES, "fig_07_bandit_trap.png");

function addFooter(slide, n, total) {
  slide.addText("Pricing Health Check · ElectroChile · MercadoLibre Chile", {
    x: 0.4, y: 5.3, w: 6, h: 0.25,
    fontSize: 9, color: COLORS.neutral, fontFace: FONT_BODY,
  });
  slide.addText(`${n} / ${total}`, {
    x: 9.0, y: 5.3, w: 0.6, h: 0.25,
    fontSize: 9, color: COLORS.neutral, fontFace: FONT_BODY, align: "right",
  });
}

function addSlideTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.4, y: 0.3, w: 9.2, h: 0.55,
    fontSize: 26, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: 0.85, w: 9.2, h: 0.35,
      fontSize: 13, color: COLORS.neutral, fontFace: FONT_BODY, italic: true, margin: 0,
    });
  }
}

// ============ Slide 1 — Portada ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.navyDark };

  s.addText("Pricing Health Check", {
    x: 0.6, y: 1.6, w: 9, h: 0.7,
    fontSize: 42, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, margin: 0,
  });

  s.addText("Diagnóstico competitivo y plan de acción 90 días para ElectroChile", {
    x: 0.6, y: 2.4, w: 9, h: 0.4,
    fontSize: 18, color: "FFFFFF", fontFace: FONT_BODY, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.95, w: 1.2, h: 0.05,
    fill: { color: COLORS.warning }, line: { type: "none" },
  });

  s.addText("MercadoLibre Chile · Audio + Computación · Mayo 2026", {
    x: 0.6, y: 3.15, w: 9, h: 0.3,
    fontSize: 12, color: "CBD5E1", fontFace: FONT_BODY, margin: 0,
  });

  s.addText("Julio Pradenas · Data Analyst Pricing", {
    x: 0.6, y: 4.8, w: 9, h: 0.3,
    fontSize: 13, color: "FFFFFF", fontFace: FONT_BODY, bold: true, margin: 0,
  });
}

// ============ Slide 2 — El problema en 1 número ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "El problema en un número", "Win rate de precio mínimo de ElectroChile, últimos 30 días");

  s.addText("0%", {
    x: 0.6, y: 1.7, w: 4.5, h: 2,
    fontSize: 180, bold: true, color: COLORS.warning, fontFace: FONT_HEADER, align: "center", margin: 0,
  });
  s.addText("de tus 7 productos best-seller capturan el precio más bajo del catálogo", {
    x: 0.6, y: 3.7, w: 4.5, h: 0.6,
    fontSize: 14, color: COLORS.ink, fontFace: FONT_BODY, align: "center", margin: 0,
  });

  s.addText("¿Qué significa esto?", {
    x: 5.4, y: 1.7, w: 4.2, h: 0.4,
    fontSize: 16, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText([
    { text: "En tus 7 productos del catálogo MELI, eres el seller más caro o de los más caros.", options: { breakLine: true } },
    { text: "" , options: { breakLine: true } },
    { text: "Cobrás 165% más en promedio que el competidor más barato del mismo producto.", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "En 4 productos hay 11+ sellers cobrando menos.", options: {} },
  ], {
    x: 5.4, y: 2.2, w: 4.2, h: 3,
    fontSize: 13, color: COLORS.ink, fontFace: FONT_BODY, margin: 0,
  });

  addFooter(s, 2, TOTAL);
}

// ============ Slide 3 — Tres hallazgos ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Tres hallazgos del diagnóstico", "Análisis sobre 348 ofertas, 53 productos best-seller, 214 sellers");

  const cards = [
    { x: 0.4, label: "01", color: COLORS.warning, title: "Brecha brutal", stat: "165%",
      caption: "más caro en promedio que el competidor más barato del mismo SKU" },
    { x: 3.7, label: "02", color: COLORS.primary, title: "Logística no Full", stat: "5 / 7",
      caption: "productos en self-shipping (xd_drop_off), donde el win rate es solo 3%" },
    { x: 7.0, label: "03", color: COLORS.good, title: "Listing premium sin retorno", stat: "gold_pro",
      caption: "pagas más comisión sin ganar Buy Box implícito vs gold_special" },
  ];

  for (const c of cards) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: c.x, y: 1.4, w: 2.6, h: 3.6,
      fill: { color: COLORS.cream }, line: { color: "E2E8F0", width: 1 },
    });
    s.addText(c.label, {
      x: c.x + 0.2, y: 1.55, w: 2.2, h: 0.5,
      fontSize: 14, bold: true, color: c.color, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(c.title, {
      x: c.x + 0.2, y: 2.0, w: 2.2, h: 0.5,
      fontSize: 17, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(c.stat, {
      x: c.x + 0.2, y: 2.6, w: 2.2, h: 0.9,
      fontSize: 38, bold: true, color: c.color, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(c.caption, {
      x: c.x + 0.2, y: 3.65, w: 2.2, h: 1.2,
      fontSize: 11, color: COLORS.neutral, fontFace: FONT_BODY, margin: 0,
    });
  }

  addFooter(s, 3, TOTAL);
}

// ============ Slide 4 — Brecha de precio ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Tus 7 productos vs. competencia", "ElectroChile (rojo) está siempre del lado caro del rango competitivo");

  s.addImage({
    path: FIG_HERO,
    x: 0.4, y: 1.3, w: 9.2, h: 3.8, sizing: { type: "contain", w: 9.2, h: 3.8 },
  });

  addFooter(s, 4, TOTAL);
}

// ============ Slide 5 — Por qué pasa ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "¿Por qué pasa esto?", "Tres causas estructurales que se refuerzan entre sí");

  const reasons = [
    { y: 1.4, num: "1.", title: "Logística sin MELI Full",
      body: "5 de tus 7 productos usan self-shipping. Sin Full, el win rate del catálogo cae a 3%. MELI prioriza ofertas con stock en su centro de distribución." },
    { y: 2.55, num: "2.", title: "Costos de adquisición no competitivos",
      body: "El competidor más barato te vende un producto idéntico a un precio que probablemente está cerca de su costo. Si compraras al mismo costo, podrías bajar 30-50% manteniendo margen." },
    { y: 3.7, num: "3.", title: "Repricing manual sin datos competitivos",
      body: "Sin un sistema que monitoree precios competidores en tiempo real, los ajustes manuales semanales llegan tarde. El catálogo MELI cambia a diario." },
  ];

  for (const r of reasons) {
    s.addText(r.num, {
      x: 0.6, y: r.y, w: 0.5, h: 0.4,
      fontSize: 22, bold: true, color: COLORS.warning, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(r.title, {
      x: 1.1, y: r.y, w: 8.5, h: 0.4,
      fontSize: 16, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(r.body, {
      x: 1.1, y: r.y + 0.4, w: 8.5, h: 0.7,
      fontSize: 12, color: COLORS.neutral, fontFace: FONT_BODY, margin: 0,
    });
  }

  addFooter(s, 5, TOTAL);
}

// ============ Slide 6 — Tres escenarios ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Tres escenarios evaluados", "Simulación cuantitativa sobre 7 productos, 90 días, modelo de mercado calibrado");

  const headers = ["Escenario", "Mecanismo", "Costo anual", "ROI año 1"];
  const rows = [
    ["A · Reglas + alertas", "Motor determinístico + bot Telegram", "$570k CLP", "+$12.6M"],
    ["B · Thompson Sampling", "Bandits sobre 4 puntos de precio", "$2.28M CLP", "−$27.5M"],
    ["C · Tool comercial", "Prisync / RepricerExpress", "$2.57M CLP", "+$13.9M"],
  ];

  const tableData = [
    headers.map(h => ({
      text: h,
      options: { bold: true, color: "FFFFFF", fill: { color: COLORS.ink }, fontSize: 12, fontFace: FONT_HEADER, align: "left" },
    })),
    ...rows.map((row, i) => row.map((cell, j) => {
      const isLast = j === row.length - 1;
      const isB = i === 1;
      const color = isLast ? (isB ? COLORS.warning : COLORS.good) : COLORS.ink;
      return {
        text: cell,
        options: {
          fontSize: 12, color, bold: isLast, fontFace: FONT_BODY,
          fill: { color: i % 2 === 0 ? "FFFFFF" : COLORS.cream }, align: "left",
        },
      };
    })),
  ];

  s.addTable(tableData, {
    x: 0.4, y: 1.4, w: 9.2,
    colW: [2.4, 3.6, 1.6, 1.6], rowH: 0.55,
    border: { type: "solid", color: "E2E8F0", pt: 0.5 },
  });

  s.addText("Bandits parecía la opción más sofisticada — y destruye margen. La sofisticación correcta es saber cuándo no usar.", {
    x: 0.4, y: 4.5, w: 9.2, h: 0.5,
    fontSize: 12, italic: true, color: COLORS.neutral, fontFace: FONT_BODY, margin: 0,
  });

  addFooter(s, 6, TOTAL);
}

// ============ Slide 7 — Trampa de bandits ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "La trampa del repricing agresivo", "Más ventas, menos margen — el caso del Escenario B");

  s.addImage({
    path: FIG_TRAP,
    x: 0.4, y: 1.3, w: 9.2, h: 3.5, sizing: { type: "contain", w: 9.2, h: 3.5 },
  });

  s.addText("Bandits venden 3.8x más unidades pero generan 38% menos margen total. Antes de optimizar precios, hay que renegociar costos.", {
    x: 0.4, y: 4.85, w: 9.2, h: 0.4,
    fontSize: 12, italic: true, color: COLORS.warning, fontFace: FONT_BODY, bold: true, margin: 0,
  });

  addFooter(s, 7, TOTAL);
}

// ============ Slide 8 — Recomendación ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.cream };
  addSlideTitle(s, "Recomendación: Escenario A", "Reglas + alertas + migración logística + tracking propio");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.4, w: 4.0, h: 3.6,
    fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 },
  });
  s.addText("+$12.6M", {
    x: 0.6, y: 1.8, w: 3.6, h: 1.2,
    fontSize: 44, bold: true, color: COLORS.good, fontFace: FONT_HEADER, align: "center", margin: 0,
  });
  s.addText("CLP año 1", {
    x: 0.6, y: 3.0, w: 3.6, h: 0.4,
    fontSize: 16, color: COLORS.ink, fontFace: FONT_BODY, align: "center", margin: 0,
  });
  s.addText("ROI neto vs status quo", {
    x: 0.6, y: 3.4, w: 3.6, h: 0.3,
    fontSize: 11, italic: true, color: COLORS.neutral, fontFace: FONT_BODY, align: "center", margin: 0,
  });
  s.addText("Inversión total: $1.07M CLP", {
    x: 0.6, y: 4.2, w: 3.6, h: 0.3,
    fontSize: 12, color: COLORS.neutral, fontFace: FONT_BODY, align: "center", margin: 0,
  });
  s.addText("Riesgo: bajo", {
    x: 0.6, y: 4.5, w: 3.6, h: 0.3,
    fontSize: 12, color: COLORS.neutral, fontFace: FONT_BODY, align: "center", margin: 0,
  });

  s.addText("Cuatro pilares secuenciales:", {
    x: 4.7, y: 1.4, w: 4.9, h: 0.4,
    fontSize: 16, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
  });

  const pilares = [
    { num: "1", text: "Renegociar costos con proveedores en 3-5 SKUs prioritarios" },
    { num: "2", text: "Migrar 5 productos de self-shipping a MELI Full" },
    { num: "3", text: "Implementar motor de reglas + alertas Telegram" },
    { num: "4", text: "Instrumentar tracking de visitas y conversiones (GA4)" },
  ];

  for (let i = 0; i < pilares.length; i++) {
    const p = pilares[i];
    const y = 2.0 + i * 0.7;
    s.addShape(pres.shapes.OVAL, {
      x: 4.7, y: y, w: 0.4, h: 0.4,
      fill: { color: COLORS.warning }, line: { type: "none" },
    });
    s.addText(p.num, {
      x: 4.7, y: y, w: 0.4, h: 0.4,
      fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.text, {
      x: 5.25, y: y, w: 4.4, h: 0.4,
      fontSize: 12, color: COLORS.ink, fontFace: FONT_BODY, valign: "middle", margin: 0,
    });
  }

  addFooter(s, 8, TOTAL);
}

// ============ Slide 9 — Roadmap 90 días ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Roadmap 90 días", "Tres pilares en paralelo después del kickoff");

  const phases = [
    { x: 0.4, w: 3.0, label: "MES 1", title: "Diagnóstico + Reglas v1", color: COLORS.primary,
      items: ["Sem 1: Kickoff y baseline", "Sem 2: Setup técnico", "Sem 3: Negociar costos", "Sem 4: Motor reglas v1"] },
    { x: 3.5, w: 3.0, label: "MES 2", title: "MELI Full + Tracking", color: COLORS.warning,
      items: ["Sem 5-6: Migrar 5 productos a Full", "Sem 7: GA4 + dashboard Looker", "Sem 8: Ajuste reglas v1.1"] },
    { x: 6.6, w: 3.0, label: "MES 3", title: "Operación + Decisión", color: COLORS.good,
      items: ["Sem 9-10: Auto-aplicación parcial", "Sem 11: Análisis de impacto", "Sem 12: Decisión continuar/escalar"] },
  ];

  for (const p of phases) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: 1.4, w: p.w, h: 0.6,
      fill: { color: p.color }, line: { type: "none" },
    });
    s.addText(p.label, {
      x: p.x + 0.15, y: 1.45, w: p.w - 0.3, h: 0.25,
      fontSize: 11, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(p.title, {
      x: p.x + 0.15, y: 1.7, w: p.w - 0.3, h: 0.3,
      fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: 2.0, w: p.w, h: 2.7,
      fill: { color: COLORS.cream }, line: { color: "E2E8F0", width: 1 },
    });

    const items = p.items.map((item, i) => ({
      text: item,
      options: { bullet: true, breakLine: i < p.items.length - 1, fontSize: 11, color: COLORS.ink },
    }));
    s.addText(items, {
      x: p.x + 0.2, y: 2.15, w: p.w - 0.4, h: 2.4,
      fontFace: FONT_BODY, margin: 0,
    });
  }

  addFooter(s, 9, TOTAL);
}

// ============ Slide 10 — KPIs ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Cómo medimos el éxito", "5 KPIs medibles a 90 días, con baseline cuantificado");

  const kpis = [
    ["KPI", "Hoy", "Target 90 días", "Crítico para"],
    ["Win rate de precio mínimo", "0%", "≥ 15%", "Validar repricing"],
    ["Productos en MELI Full", "2 / 7", "5 / 7", "Validar logística"],
    ["Margen total mensual", "$1.4M CLP", "$1.6M-$1.8M", "Validar ROI"],
    ["Recomendaciones aplicadas", "0%", "≥ 60%", "Validar adherencia"],
    ["Conversion rate (con tracking)", "n/a", "Establecer", "Validar tracking"],
  ];

  const tableData = kpis.map((row, i) => row.map(cell => {
    if (i === 0) {
      return { text: cell, options: { bold: true, color: "FFFFFF", fill: { color: COLORS.ink }, fontSize: 12, fontFace: FONT_HEADER, align: "left" } };
    }
    return { text: cell, options: { fontSize: 12, color: COLORS.ink, fontFace: FONT_BODY, align: "left", fill: { color: i % 2 === 0 ? COLORS.cream : "FFFFFF" } } };
  }));

  s.addTable(tableData, {
    x: 0.4, y: 1.4, w: 9.2,
    colW: [3.0, 1.5, 2.4, 2.3], rowH: 0.5,
    border: { type: "solid", color: "E2E8F0", pt: 0.5 },
  });

  addFooter(s, 10, TOTAL);
}

// ============ Slide 11 — Riesgos ============
{
  const s = pres.addSlide();
  s.background = { color: "FFFFFF" };
  addSlideTitle(s, "Riesgos y mitigaciones", "Lo que puede salir mal — y cómo lo manejamos");

  const risks = [
    { title: "No se logra renegociar costos con proveedores",
      mit: "Limitar repricing solo a productos donde el costo es competitivo. Excluir SKUs sin margen.", sev: "Alta" },
    { title: "Seller deja de aprobar recomendaciones",
      mit: "Reducir frecuencia: alertas → resúmenes semanales. Auto-aplicar cambios menores tras 30 días.", sev: "Media" },
    { title: "MELI cambia política del catálogo",
      mit: "Mantener flexibilidad para pivotar a listings sueltos. Re-baseline cada 30 días.", sev: "Baja" },
    { title: "Estacionalidad distorsiona métricas",
      mit: "Comparar contra mismo periodo año anterior si hay data. Marcar Cyber/Navidad como períodos atípicos.", sev: "Alta" },
  ];

  let y = 1.4;
  for (const r of risks) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: y, w: 9.2, h: 0.85,
      fill: { color: COLORS.cream }, line: { color: "E2E8F0", width: 1 },
    });
    s.addText(r.title, {
      x: 0.6, y: y + 0.1, w: 6.5, h: 0.35,
      fontSize: 13, bold: true, color: COLORS.ink, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(r.mit, {
      x: 0.6, y: y + 0.42, w: 7.5, h: 0.4,
      fontSize: 11, color: COLORS.neutral, fontFace: FONT_BODY, margin: 0,
    });
    const sevColor = r.sev === "Alta" ? COLORS.warning : r.sev === "Media" ? "F59E0B" : COLORS.good;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 8.3, y: y + 0.22, w: 1.0, h: 0.4,
      fill: { color: sevColor }, line: { type: "none" }, rectRadius: 0.05,
    });
    s.addText(r.sev, {
      x: 8.3, y: y + 0.22, w: 1.0, h: 0.4,
      fontSize: 11, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, align: "center", valign: "middle", margin: 0,
    });
    y += 0.95;
  }

  addFooter(s, 11, TOTAL);
}

// ============ Slide 12 — Próximos pasos ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.navyDark };

  s.addText("Próximos pasos", {
    x: 0.6, y: 0.6, w: 9, h: 0.6,
    fontSize: 36, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.25, w: 1.2, h: 0.05,
    fill: { color: COLORS.warning }, line: { type: "none" },
  });

  const steps = [
    "Confirmar disponibilidad de costos de adquisición por SKU",
    "Asignar contraparte interna (1-2 hrs por semana)",
    "Aprobar acceso de lectura del consultor a la cuenta MELI",
    "Calendarizar reunión de kickoff (90 minutos)",
  ];

  for (let i = 0; i < steps.length; i++) {
    const y = 1.7 + i * 0.55;
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y, w: 0.4, h: 0.4,
      fill: { color: COLORS.warning }, line: { type: "none" },
    });
    s.addText(`${i + 1}`, {
      x: 0.6, y: y, w: 0.4, h: 0.4,
      fontSize: 14, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, align: "center", valign: "middle", margin: 0,
    });
    s.addText(steps[i], {
      x: 1.15, y: y, w: 8.4, h: 0.4,
      fontSize: 16, color: "FFFFFF", fontFace: FONT_BODY, valign: "middle", margin: 0,
    });
  }

  s.addText("Julio Pradenas", {
    x: 0.6, y: 4.4, w: 9, h: 0.4,
    fontSize: 16, bold: true, color: "FFFFFF", fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("Data Analyst Pricing · Concepción, Chile", {
    x: 0.6, y: 4.75, w: 9, h: 0.3,
    fontSize: 12, color: "CBD5E1", fontFace: FONT_BODY, margin: 0,
  });
  s.addText("github.com/JulioPradenas/pricing-health-check-mlc", {
    x: 0.6, y: 5.05, w: 9, h: 0.3,
    fontSize: 11, color: "CBD5E1", fontFace: FONT_BODY, italic: true, margin: 0,
  });
}

const outPath = path.resolve(__dirname, "..", "..", "deliverables", "pitch_deck_electrochile.pptx");
pres.writeFile({ fileName: outPath })
  .then(name => console.log("OK: " + name));