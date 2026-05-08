const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageBreak, Footer, PageNumber,
} = require("docx");

// Paleta consistente con el pitch deck
const C = {
  ink: "1E293B",
  neutral: "64748B",
  warning: "DC2626",
  good: "16A34A",
  primary: "2563EB",
  cream: "FAF7F2",
};

const FIGS = path.resolve(__dirname, "..", "..", "deliverables");

// Helpers
const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, font: "Calibri", size: 22, ...opts.run })],
  spacing: { before: 80, after: 80, line: 320 },
  ...opts.paragraph,
});

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun({ text, font: "Calibri", size: 32, bold: true })],
  spacing: { before: 360, after: 200 },
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text, font: "Calibri", size: 26, bold: true })],
  spacing: { before: 280, after: 160 },
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun({ text, font: "Calibri", size: 22, bold: true, color: C.neutral })],
  spacing: { before: 200, after: 100 },
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  children: [new TextRun({ text, font: "Calibri", size: 22 })],
  spacing: { before: 40, after: 40, line: 300 },
});

const bold = (text) => new TextRun({ text, font: "Calibri", size: 22, bold: true });
const txt = (text) => new TextRun({ text, font: "Calibri", size: 22 });

const border = { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" };
const borders = { top: border, bottom: border, left: border, right: border };
const tableMargins = { top: 100, bottom: 100, left: 140, right: 140 };

function makeCell(text, opts = {}) {
  const isHeader = opts.isHeader || false;
  return new TableCell({
    borders,
    width: { size: opts.width || 2340, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: tableMargins,
    children: [new Paragraph({
      children: [new TextRun({
        text,
        font: "Calibri",
        size: 20,
        bold: isHeader || opts.bold,
        color: opts.color || (isHeader ? "FFFFFF" : C.ink),
      })],
      alignment: opts.align || AlignmentType.LEFT,
    })],
  });
}

function makeTable(rows, columnWidths) {
  return new Table({
    width: { size: columnWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths,
    rows,
  });
}

function loadImage(filename) {
  const fullPath = path.join(FIGS, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Imagen no encontrada: ${fullPath}`);
    return null;
  }
  return fs.readFileSync(fullPath);
}

function makeImageParagraph(filename, width = 540, height = 280) {
  const data = loadImage(filename);
  if (!data) return p(`[Figura no disponible: ${filename}]`);
  return new Paragraph({
    children: [new ImageRun({
      data, type: "png",
      transformation: { width, height },
    })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 200 },
  });
}

function caption(text) {
  return new Paragraph({
    children: [new TextRun({
      text, font: "Calibri", size: 18, italics: true, color: C.neutral,
    })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
  });
}

// ============ CONSTRUCCIÓN DEL REPORTE ============

const children = [];

// Carátula
children.push(new Paragraph({
  children: [new TextRun({ text: "Pricing Health Check", font: "Calibri", size: 56, bold: true })],
  alignment: AlignmentType.LEFT,
  spacing: { before: 2400, after: 200 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Diagnóstico competitivo y plan de acción 90 días", font: "Calibri", size: 32, color: C.neutral })],
  spacing: { after: 800 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Cliente:  ElectroChile", font: "Calibri", size: 24, bold: true })],
  spacing: { after: 100 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Plataforma:  MercadoLibre Chile (MLC)", font: "Calibri", size: 24 })],
  spacing: { after: 100 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Categorías:  Audio · Computación · Celulares", font: "Calibri", size: 24 })],
  spacing: { after: 800 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Julio Pradenas", font: "Calibri", size: 24, bold: true })],
  spacing: { after: 80 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Data Analyst Pricing", font: "Calibri", size: 22, color: C.neutral })],
  spacing: { after: 60 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Concepción, Chile · Mayo 2026", font: "Calibri", size: 22, color: C.neutral })],
  spacing: { after: 0 },
}));
children.push(new Paragraph({ children: [new PageBreak()] }));

// 1. Resumen ejecutivo
children.push(h1("1.  Resumen ejecutivo"));
children.push(p("ElectroChile compite con 7 productos best-seller en el catálogo unificado de MercadoLibre Chile, distribuidos en las categorías de Audio y Computación. El análisis competitivo realizado sobre 348 ofertas activas, 53 productos del top de cada categoría y 214 sellers únicos arroja un diagnóstico claro:"));
children.push(p("ElectroChile es el seller más caro o de los más caros en sus 7 productos. Cobra en promedio 165% más que el competidor más barato del mismo SKU. Su win rate de precio mínimo es 0%."));
children.push(h3("Tres causas estructurales identificadas"));
children.push(bullet("5 de 7 productos usan self-shipping (xd_drop_off), donde el win rate observado a nivel de catálogo es solo 3%."));
children.push(bullet("El gap de precio sugiere costos de adquisición no competitivos: el competidor más barato vende a precios cercanos a su costo, lo que sugiere acceso a proveedores con condiciones distintas."));
children.push(bullet("El uso de listing premium (gold_pro) no compensa la base logística incorrecta. Sin MELI Full, el mejor listing no captura Buy Box implícito."));
children.push(h3("Recomendación"));
children.push(p("Implementar el Escenario A: motor de reglas + alertas Telegram con migración logística a MELI Full y renegociación de costos con proveedores. Inversión total año 1: $1.07M CLP. Retorno proyectado: +$12.6M CLP de margen incremental."));
children.push(p("Se descarta explícitamente Thompson Sampling (Escenario B) — la simulación mostró que destruiría $27.5M CLP de margen anual al priorizar volumen sobre rentabilidad. La sofisticación de la herramienta no es la respuesta."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 2. Metodología
children.push(h1("2.  Metodología"));
children.push(h2("2.1  Fuentes de datos"));
children.push(p("Se utilizó exclusivamente la API pública oficial de MercadoLibre, accedida con credenciales de aplicación cliente_credentials. Todos los datos son del catálogo público abierto a cualquier desarrollador autorizado."));
children.push(p("Endpoints consultados:"));
children.push(bullet("/highlights/MLC/category/{id} — productos best-seller por categoría"));
children.push(bullet("/products/{id} — metadata del producto del catálogo unificado"));
children.push(bullet("/products/{id}/items — ofertas competitivas asociadas a un producto"));
children.push(bullet("/categories/{id} — taxonomía de categorías"));

children.push(h2("2.2  Alcance del dataset"));
const scopeRows = [
  new TableRow({ children: [
    makeCell("Métrica", { isHeader: true, fill: C.ink, width: 4680 }),
    makeCell("Valor", { isHeader: true, fill: C.ink, width: 4680, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Categorías analizadas", { width: 4680 }),
    makeCell("3 (Celulares, Audio, Computación)", { width: 4680, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Productos del catálogo", { width: 4680, fill: C.cream }),
    makeCell("53 best-sellers", { width: 4680, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Ofertas analizadas", { width: 4680 }),
    makeCell("348", { width: 4680, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Sellers únicos", { width: 4680, fill: C.cream }),
    makeCell("214", { width: 4680, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Snapshot fecha", { width: 4680 }),
    makeCell("7 mayo 2026", { width: 4680, align: AlignmentType.CENTER }),
  ]}),
];
children.push(makeTable(scopeRows, [4680, 4680]));

children.push(h2("2.3  Limitaciones declaradas"));
children.push(p("Para mantener honestidad metodológica, declaramos las siguientes limitaciones:"));
children.push(bullet("La API pública no devuelve sold_quantity ni visitas individuales. Como proxy de demanda relativa se utilizó la posición en el ranking de best-sellers."));
children.push(bullet("Las elasticidades calculadas son descriptivas, no causales. Para estimación causal se requiere instrumentación de tracking propio (Google Analytics, conversiones)."));
children.push(bullet("La simulación de escenarios usa un modelo de mercado calibrado heurísticamente con los win rates observados por logistic_type, no con elasticidad estimada."));
children.push(bullet("Las proyecciones de ROI extrapolan 90 días a 360 días, lo que ignora estacionalidad (Cyber Monday, Navidad, año escolar)."));
children.push(bullet("El costo de adquisición se asume como 80% del precio mediano competitivo. Este supuesto debe validarse con el cliente."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 3. Diagnóstico
children.push(h1("3.  Diagnóstico cuantitativo"));

children.push(h2("3.1  Densidad competitiva por categoría"));
children.push(p("La estructura competitiva de MLC es muy desigual entre categorías:"));
const densRows = [
  new TableRow({ children: [
    makeCell("Categoría", { isHeader: true, fill: C.ink, width: 3120 }),
    makeCell("Productos", { isHeader: true, fill: C.ink, width: 1560, align: AlignmentType.CENTER }),
    makeCell("Mediana competidores", { isHeader: true, fill: C.ink, width: 2340, align: AlignmentType.CENTER }),
    makeCell("Máximo", { isHeader: true, fill: C.ink, width: 1560, align: AlignmentType.CENTER }),
    makeCell("Patrón", { isHeader: true, fill: C.ink, width: 780, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Celulares", { width: 3120 }),
    makeCell("15", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("2", { width: 2340, align: AlignmentType.CENTER }),
    makeCell("7", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("Dormido", { width: 780, align: AlignmentType.CENTER, color: C.warning, bold: true }),
  ]}),
  new TableRow({ children: [
    makeCell("Audio", { width: 3120, fill: C.cream }),
    makeCell("19", { width: 1560, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("6", { width: 2340, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("25", { width: 1560, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("Activo", { width: 780, align: AlignmentType.CENTER, color: C.good, bold: true, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Computación", { width: 3120 }),
    makeCell("20", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("5", { width: 2340, align: AlignmentType.CENTER }),
    makeCell("28", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("Activo", { width: 780, align: AlignmentType.CENTER, color: C.good, bold: true }),
  ]}),
];
children.push(makeTable(densRows, [3120, 1560, 2340, 1560, 780]));
children.push(makeImageParagraph("fig_01_densidad_competitiva.png", 540, 230));
children.push(caption("Figura 1. Distribución del número de competidores por producto, separada por categoría."));

children.push(h2("3.2  Brechas de precio entre sellers"));
children.push(p("Para los 39 productos con 2 o más sellers compitiendo, la brecha mediana de precio es 71%. Esto significa que en el producto típico, el seller más caro cobra 71% más que el más barato del mismo SKU exacto."));
children.push(p("Los casos extremos son materiales de venta directos:"));
children.push(bullet("Pasta Térmica Arctic MX-4: gap 340% — el seller más caro cobra 4.4x el precio del más barato."));
children.push(bullet("Impresora HP Smart Tank: $138.500 vs $499.990 (diferencia $361.490 CLP por la misma impresora)."));
children.push(bullet("Mouse Logitech M280: 22 sellers compitiendo, gap 152%."));
children.push(makeImageParagraph("fig_02_brechas_precio.png", 540, 270));
children.push(caption("Figura 2. Distribución del spread de precio (max−min)/min por categoría."));

children.push(h2("3.3  Tienda Oficial vs Seller PYME"));
children.push(p("Las Tiendas Oficiales dominan el pricing competitivo:"));
children.push(bullet("Win rate de precio mínimo: Tienda Oficial 32.4% vs Seller PYME 10.2%."));
children.push(bullet("Cuando no ganan, las oficiales están a 18% del mínimo en mediana, los PYME a 47%."));
children.push(bullet("El 70% de los sellers competidores son PYME (sin tienda oficial)."));
children.push(makeImageParagraph("fig_03_oficial_vs_pyme.png", 540, 200));
children.push(caption("Figura 3. Distribución de la distancia al precio mínimo y win rate por tipo de seller."));

children.push(h2("3.4  Logística como variable competitiva"));
children.push(p("El tipo de logística es el predictor más fuerte del win rate observado:"));
const logiRows = [
  new TableRow({ children: [
    makeCell("Tipo de logística", { isHeader: true, fill: C.ink, width: 3120 }),
    makeCell("Ofertas", { isHeader: true, fill: C.ink, width: 1560, align: AlignmentType.CENTER }),
    makeCell("Win rate", { isHeader: true, fill: C.ink, width: 2340, align: AlignmentType.CENTER }),
    makeCell("Gap mediano al min", { isHeader: true, fill: C.ink, width: 2340, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("MELI Full (fulfillment)", { width: 3120, bold: true }),
    makeCell("106", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("39.6%", { width: 2340, align: AlignmentType.CENTER, color: C.good, bold: true }),
    makeCell("4.3%", { width: 2340, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Drop-off (puntos retiro)", { width: 3120, fill: C.cream }),
    makeCell("7", { width: 1560, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("42.9%", { width: 2340, align: AlignmentType.CENTER, fill: C.cream, color: C.good }),
    makeCell("3.7%", { width: 2340, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Cross-docking (MELI recoge)", { width: 3120 }),
    makeCell("68", { width: 1560, align: AlignmentType.CENTER }),
    makeCell("10.3%", { width: 2340, align: AlignmentType.CENTER }),
    makeCell("25.5%", { width: 2340, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Self-shipping (seller envía)", { width: 3120, fill: C.cream }),
    makeCell("165", { width: 1560, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("3.0%", { width: 2340, align: AlignmentType.CENTER, fill: C.cream, color: C.warning, bold: true }),
    makeCell("40.0%", { width: 2340, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
];
children.push(makeTable(logiRows, [3120, 1560, 2340, 2340]));
children.push(makeImageParagraph("fig_04_logistica_winrate.png", 540, 240));
children.push(caption("Figura 4. Win rate de precio mínimo por tipo de logística."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 4. ElectroChile en contexto
children.push(h1("4.  ElectroChile en contexto competitivo"));
children.push(p("ElectroChile (seller_id 1310149720) opera con 7 productos best-seller distribuidos en las categorías Audio y Computación. El detalle de su posicionamiento competitivo:"));
const heroRows = [
  new TableRow({ children: [
    makeCell("Producto", { isHeader: true, fill: C.ink, width: 3744 }),
    makeCell("Hero", { isHeader: true, fill: C.ink, width: 1404, align: AlignmentType.CENTER }),
    makeCell("Min", { isHeader: true, fill: C.ink, width: 1404, align: AlignmentType.CENTER }),
    makeCell("Gap", { isHeader: true, fill: C.ink, width: 936, align: AlignmentType.CENTER }),
    makeCell("Logística", { isHeader: true, fill: C.ink, width: 1872, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Pasta Térmica Arctic MX-4", { width: 3744 }),
    makeCell("$11.980", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("$2.723", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("+340%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true }),
    makeCell("Self", { width: 1872, align: AlignmentType.CENTER, color: C.warning }),
  ]}),
  new TableRow({ children: [
    makeCell("Audífonos Bluetooth Blik Soul250", { width: 3744, fill: C.cream }),
    makeCell("$31.490", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("$9.990", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("+215%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true, fill: C.cream }),
    makeCell("Full", { width: 1872, align: AlignmentType.CENTER, fill: C.cream, color: C.good }),
  ]}),
  new TableRow({ children: [
    makeCell("Xiaomi Redmi Buds 6 Play Rosa", { width: 3744 }),
    makeCell("$33.590", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("$12.272", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("+174%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true }),
    makeCell("Self", { width: 1872, align: AlignmentType.CENTER, color: C.warning }),
  ]}),
  new TableRow({ children: [
    makeCell("Mouse Logitech M280 Gris", { width: 3744, fill: C.cream }),
    makeCell("$29.990", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("$11.900", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("+152%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true, fill: C.cream }),
    makeCell("Self", { width: 1872, align: AlignmentType.CENTER, color: C.warning, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Audífonos Redmi Buds 6 Active Pink", { width: 3744 }),
    makeCell("$45.140", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("$20.990", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("+115%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true }),
    makeCell("Self", { width: 1872, align: AlignmentType.CENTER, color: C.warning }),
  ]}),
  new TableRow({ children: [
    makeCell("Amazon Echo Dot 5th Gen", { width: 3744, fill: C.cream }),
    makeCell("$99.990", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("$52.990", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("+89%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true, fill: C.cream }),
    makeCell("Full", { width: 1872, align: AlignmentType.CENTER, fill: C.cream, color: C.good }),
  ]}),
  new TableRow({ children: [
    makeCell("Sony PlayStation DualSense", { width: 3744 }),
    makeCell("$110.228", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("$65.524", { width: 1404, align: AlignmentType.CENTER }),
    makeCell("+68%", { width: 936, align: AlignmentType.CENTER, color: C.warning, bold: true }),
    makeCell("Self", { width: 1872, align: AlignmentType.CENTER, color: C.warning }),
  ]}),
];
children.push(makeTable(heroRows, [3744, 1404, 1404, 936, 1872]));
children.push(makeImageParagraph("fig_06_hero_benchmark.png", 540, 280));
children.push(caption("Figura 5. ElectroChile (rojo) versus competidores (gris) en cada producto."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 5. Escenarios evaluados
children.push(h1("5.  Escenarios de repricing evaluados"));
children.push(p("Se simularon tres escenarios de repricing sobre los 7 productos de ElectroChile, durante 90 días con 5 oportunidades de venta diarias por producto. El modelo de mercado utilizado es una función logística calibrada con los win rates observados por logistic_type."));

children.push(h2("5.1  Escenario A — Reglas + alertas"));
children.push(p("Motor de reglas determinísticas que sugiere precio según el tipo de logística del seller y el precio mínimo del producto. Las recomendaciones se envían vía bot Telegram al seller, quien aprueba manualmente cada cambio. Costo operacional anual: $570.000 CLP. Lift proyectado: +20% margen sobre status quo."));

children.push(h2("5.2  Escenario B — Thompson Sampling"));
children.push(p("Bandit Thompson Sampling sobre 4 puntos de precio: 1.00x, 1.05x, 1.15x y 1.30x del precio mínimo competitivo. El bandit explora y converge al brazo con mayor recompensa observada."));
children.push(p("Resultado de la simulación:"));
children.push(bullet("Volumen de ventas: +280% vs status quo (1.487 vs 391 ventas en 90 días)."));
children.push(bullet("Margen total: −38% vs status quo ($10.1M vs $16.4M)."));
children.push(bullet("El bandit converge al brazo más bajo (1.05x) porque maximiza probabilidad de venta."));
children.push(bullet("Anualizado: −$27.5M CLP vs status quo después de costos."));
children.push(makeImageParagraph("fig_07_bandit_trap.png", 540, 230));
children.push(caption("Figura 6. La trampa del repricing agresivo: más ventas, menos margen."));

children.push(h2("5.3  Escenario C — Tool comercial"));
children.push(p("Integración con plataforma comercial de repricing (Prisync, RepricerExpress) vía API MELI. Costo $150-300 USD/mes. Lift proyectado similar a A (+25%) pero con mejor experiencia de usuario y menor mantenimiento técnico."));

children.push(h2("5.4  Comparativa de ROI año 1"));
const roiRows = [
  new TableRow({ children: [
    makeCell("Escenario", { isHeader: true, fill: C.ink, width: 3120 }),
    makeCell("Margen anual", { isHeader: true, fill: C.ink, width: 2340, align: AlignmentType.CENTER }),
    makeCell("Costo anual", { isHeader: true, fill: C.ink, width: 1872, align: AlignmentType.CENTER }),
    makeCell("Δ vs status quo", { isHeader: true, fill: C.ink, width: 2028, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Status quo", { width: 3120 }),
    makeCell("$65.7M", { width: 2340, align: AlignmentType.CENTER }),
    makeCell("—", { width: 1872, align: AlignmentType.CENTER }),
    makeCell("$0", { width: 2028, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("A · Reglas + alertas", { width: 3120, bold: true, fill: C.cream }),
    makeCell("$78.8M", { width: 2340, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("$570k", { width: 1872, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("+$12.6M", { width: 2028, align: AlignmentType.CENTER, color: C.good, bold: true, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("B · Thompson Sampling", { width: 3120 }),
    makeCell("$40.5M", { width: 2340, align: AlignmentType.CENTER }),
    makeCell("$2.28M", { width: 1872, align: AlignmentType.CENTER }),
    makeCell("−$27.5M", { width: 2028, align: AlignmentType.CENTER, color: C.warning, bold: true }),
  ]}),
  new TableRow({ children: [
    makeCell("C · Tool comercial", { width: 3120, fill: C.cream }),
    makeCell("$82.1M", { width: 2340, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("$2.57M", { width: 1872, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("+$13.9M", { width: 2028, align: AlignmentType.CENTER, color: C.good, bold: true, fill: C.cream }),
  ]}),
];
children.push(makeTable(roiRows, [3120, 2340, 1872, 2028]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 6. Recomendación
children.push(h1("6.  Recomendación: Escenario A"));
children.push(p("Recomendamos implementar el Escenario A. Razones:"));
children.push(bullet("Genera +$12.6M CLP año 1 con riesgo bajo y costo operativo mínimo."));
children.push(bullet("Mantiene aprobación humana en cada cambio durante los primeros 30 días, reduciendo riesgo de errores."));
children.push(bullet("4.5x más barato que el Escenario C para entregar lift comparable."));
children.push(bullet("B se descarta: pierde margen porque el costo de adquisición de ElectroChile no permite competir agresivamente."));

children.push(h2("6.1  Pre-requisitos no negociables"));
children.push(p("Antes de cualquier sistema de repricing, ElectroChile debe ejecutar tres acciones:"));
children.push(bullet("Renegociar costos de adquisición con proveedores en al menos 3 SKUs prioritarios. Sin esto, el repricing es destructivo (Escenario B lo demostró)."));
children.push(bullet("Migrar 5 productos de self-shipping a MELI Full. El lift estimado en win rate es de +30 puntos."));
children.push(bullet("Instrumentar tracking propio (Google Analytics 4, conversiones por listing). Sin esto ninguna decisión de pricing es validable."));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 7. Roadmap
children.push(h1("7.  Roadmap de implementación 90 días"));
children.push(h2("7.1  Mes 1 — Diagnóstico, infraestructura, motor v1"));
children.push(bullet("Semana 1: Kickoff, levantamiento de costos reales, baseline."));
children.push(bullet("Semana 2: Setup técnico (acceso API, bot Telegram, repo Git)."));
children.push(bullet("Semana 3: Negociación con proveedores."));
children.push(bullet("Semana 4: Motor de reglas v1 operando con aprobación manual."));

children.push(h2("7.2  Mes 2 — MELI Full y tracking"));
children.push(bullet("Semanas 5-6: Migrar 5 productos a Full por lotes."));
children.push(bullet("Semana 7: Instrumentar GA4 + dashboard Looker."));
children.push(bullet("Semana 8: Primera revisión KPIs, ajuste motor a v1.1."));

children.push(h2("7.3  Mes 3 — Operación y decisión"));
children.push(bullet("Semanas 9-10: Auto-aplicación parcial de cambios menores."));
children.push(bullet("Semana 11: Análisis de impacto formal."));
children.push(bullet("Semana 12: Decisión continuar / escalar / cancelar."));

children.push(h2("7.4  KPIs medibles a 90 días"));
const kpiRows = [
  new TableRow({ children: [
    makeCell("KPI", { isHeader: true, fill: C.ink, width: 3744 }),
    makeCell("Hoy", { isHeader: true, fill: C.ink, width: 1872, align: AlignmentType.CENTER }),
    makeCell("Target 90 días", { isHeader: true, fill: C.ink, width: 2340, align: AlignmentType.CENTER }),
    makeCell("Crítico para", { isHeader: true, fill: C.ink, width: 1404, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Win rate de precio mínimo", { width: 3744 }),
    makeCell("0%", { width: 1872, align: AlignmentType.CENTER, color: C.warning, bold: true }),
    makeCell("≥ 15%", { width: 2340, align: AlignmentType.CENTER, color: C.good }),
    makeCell("Repricing", { width: 1404, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Productos en MELI Full", { width: 3744, fill: C.cream }),
    makeCell("2 / 7", { width: 1872, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("5 / 7", { width: 2340, align: AlignmentType.CENTER, color: C.good, fill: C.cream }),
    makeCell("Logística", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
  new TableRow({ children: [
    makeCell("Margen total mensual", { width: 3744 }),
    makeCell("$1.4M CLP", { width: 1872, align: AlignmentType.CENTER }),
    makeCell("$1.6M-$1.8M", { width: 2340, align: AlignmentType.CENTER, color: C.good }),
    makeCell("ROI", { width: 1404, align: AlignmentType.CENTER }),
  ]}),
  new TableRow({ children: [
    makeCell("Recomendaciones aplicadas", { width: 3744, fill: C.cream }),
    makeCell("0%", { width: 1872, align: AlignmentType.CENTER, fill: C.cream }),
    makeCell("≥ 60%", { width: 2340, align: AlignmentType.CENTER, color: C.good, fill: C.cream }),
    makeCell("Adherencia", { width: 1404, align: AlignmentType.CENTER, fill: C.cream }),
  ]}),
];
children.push(makeTable(kpiRows, [3744, 1872, 2340, 1404]));

children.push(new Paragraph({ children: [new PageBreak()] }));

// 8. Caveats
children.push(h1("8.  Caveats y limitaciones"));
children.push(p("Este reporte se entrega con honestidad metodológica explícita. Los números proyectados deben interpretarse en su contexto:"));
children.push(bullet("Los lifts de los Escenarios A (+20%) y C (+25%) son supuestos no validados. Requieren tracking real para confirmar."));
children.push(bullet("La extrapolación 90d → 360d asume estacionalidad uniforme, lo cual es falso. Cyber Monday, Navidad y vuelta a clases tienen efectos estacionales que no se modelaron."));
children.push(bullet("El supuesto de costo de adquisición (80% del precio mediano competitivo) puede ser optimista o pesimista según el seller. Validar en Semana 1 del proyecto."));
children.push(bullet("La simulación opera con 5 visitas/día por producto. El tráfico real puede ser distinto y debe medirse en Semana 7 con GA4 instrumentado."));
children.push(bullet("Las elasticidades estimadas en el análisis son descriptivas, no causales. Para estimación causal robusta se recomienda una segunda fase con metodología Double Machine Learning sobre datos propios del seller."));

children.push(h1("9.  Próximos pasos para el cliente"));
children.push(bullet("Confirmar disponibilidad de costos de adquisición por SKU (semana 1 lo bloquea todo)."));
children.push(bullet("Asignar 1 persona del equipo del seller como contraparte (1-2 horas por semana)."));
children.push(bullet("Aprobar acceso de lectura del consultor a la cuenta de MELI."));
children.push(bullet("Calendarizar reunión de kickoff (90 minutos)."));

children.push(h1("Anexo A — Repositorio del análisis"));
children.push(p("Todo el código, datos crudos y notebooks de análisis están disponibles públicamente en GitHub:"));
children.push(p("https://github.com/JulioPradenas/pricing-health-check-mlc", { run: { color: C.primary, italics: true } }));
children.push(p("Estructura del repositorio:"));
children.push(bullet("src/ingestion — cliente Python para API MELI con auth, retry, rate limiting."));
children.push(bullet("notebooks/01_eda.ipynb — análisis exploratorio del catálogo."));
children.push(bullet("notebooks/02_elasticity.ipynb — elasticidad descriptiva con caveats."));
children.push(bullet("notebooks/03_repricing_simulation.ipynb — simulación de los 3 escenarios."));
children.push(bullet("data/raw — snapshots versionados del catálogo."));
children.push(bullet("deliverables — figuras, pitch deck y este reporte."));

// ============ DOCUMENTO ============

const doc = new Document({
  creator: "Julio Pradenas",
  title: "Pricing Health Check ElectroChile",
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: C.ink },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: C.ink },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Calibri", color: C.neutral },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Pricing Health Check  ·  ElectroChile  ·  Pág. ", font: "Calibri", size: 18, color: C.neutral }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: C.neutral }),
          ],
        })],
      }),
    },
    children,
  }],
});

const outPath = path.resolve(__dirname, "..", "..", "deliverables", "executive_report_electrochile.docx");
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("OK: " + outPath);
});