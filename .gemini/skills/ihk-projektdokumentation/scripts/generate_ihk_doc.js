"use strict";
/**
 * IHK Projektdokumentation Generator v2
 * Liest Projektdaten aus JSON, erzeugt vollstaendiges IHK-Word-Dokument (mind. 15 Seiten).
 * Neu in v2: Titelseite zuerst, dann TOC; Ressourcenplanung; Glossar/Quellen als Listen;
 *            Anhang mit Codeauszuegen; Eidesstattliche Erklaerung; keine Leerraeume.
 * Usage: node generate_ihk_v2.js <data.json> [output.docx]
 */
const fs   = require("fs");
const path = require("path");

let docx;
try { docx = require("docx"); }
catch (e) { console.error("docx fehlt. npm install docx"); process.exit(1); }

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, TabStopType, TabStopPosition, VerticalAlign,
} = docx;

// CLI
const dataFile   = process.argv[2];
const outputFile = process.argv[3] || path.join(path.dirname(dataFile || "."), "ihk_projektdokumentation.docx");
if (!dataFile || !fs.existsSync(dataFile)) {
  console.error("Usage: node generate_ihk_v2.js <data.json> [output.docx]");
  process.exit(1);
}
const D = JSON.parse(fs.readFileSync(dataFile, "utf8"));

const meta  = D.meta  || {};
const proj  = D.projekt || {};
const tech  = D.technik || {};
const plan  = D.planung || {};
const wirt  = D.wirtschaftlichkeit || {};
const ana   = D.analyse || {};
const entw  = D.entwurf || {};
const impl  = D.implementierung || {};
const qual  = D.qualitaet || {};
const fazit = D.fazit || {};
const gloss = D.glossar || [];
const quell = D.quellen || [];
const anhan = D.anhang_code || [];

// Geometrie (DXA: 1/20 pt)
const PAGE_W  = 11906;
const MARG_L  = 1700;
const MARG_R  = 1417;
const CW      = PAGE_W - MARG_L - MARG_R; // 8789

// Farben
const BLUE   = "1F4E79";
const LGRAY  = "F2F2F2";
const DGRAY  = "595959";
const WHITE  = "FFFFFF";
const BLACK  = "000000";
const CODEBG = "F5F5F5";

const FONT   = "Arial";
const MONO   = "Courier New";
const BASE   = 24; // 12 pt in half-points
const SMALL  = 20; // 10 pt
const TINY   = 18; // 9 pt

// Rahmen
const thinB  = { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB" };
const noneB  = { style: BorderStyle.NONE,   size: 0, color: "FFFFFF" };
const allThin = { top: thinB, bottom: thinB, left: thinB, right: thinB };

// Hilfsfunktionen
const sp = (b, a) => ({ before: b, after: a });

function run(text, o) {
  o = o || {};
  return new TextRun({
    text, font: o.mono ? MONO : FONT,
    size:    o.size   || BASE,
    bold:    o.bold   || false,
    color:   o.color  || BLACK,
    italics: o.italic || false,
    underline: o.underline ? { type: "single" } : undefined,
  });
}

function para(children, o) {
  o = o || {};
  const runs = typeof children === "string" ? [run(children, o)] : children;
  return new Paragraph({
    alignment: o.align || AlignmentType.JUSTIFIED,
    spacing:   o.spacing || sp(100, 100),
    indent:    o.indent,
    children:  runs,
    pageBreakBefore: o.pageBreak || false,
    tabStops: o.tabStops,
    border:   o.border,
    shading:  o.shading,
  });
}

function h1(text, newPage) {
  return para([run(text, { bold: true, size: 30, color: BLUE })], {
    align:    AlignmentType.LEFT,
    spacing:  sp(240, 120),
    pageBreak: newPage || false,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
  });
}
function h2(text) {
  return para([run(text, { bold: true, size: 26, color: BLUE })], {
    align: AlignmentType.LEFT, spacing: sp(200, 80),
  });
}
function h3(text) {
  return para([run(text, { bold: true, size: BASE, color: DGRAY })], {
    align: AlignmentType.LEFT, spacing: sp(160, 60),
  });
}
function p(text, o) {
  return para([run(text, { size: BASE })],
    Object.assign({ align: AlignmentType.JUSTIFIED, spacing: sp(100, 100) }, o || {}));
}
function bullet(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: sp(60, 60),
    indent: { left: 360, hanging: 260 },
    children: [
      new TextRun({ text: "•  ", font: FONT, size: BASE, color: BLUE }),
      new TextRun({ text, font: FONT, size: BASE }),
    ],
  });
}
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function spacer() { return para([], { spacing: sp(60, 60) }); }

// Tabellen-Helfer
function cell(text, width, o) {
  o = o || {};
  var fill = o.header ? BLUE : (o.alt ? LGRAY : WHITE);
  var fc   = o.header ? WHITE : BLACK;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    shading: { fill: fill, type: ShadingType.CLEAR },
    borders: allThin,
    children: [new Paragraph({
      alignment: o.align || AlignmentType.LEFT,
      spacing: sp(40, 40),
      children: [new TextRun({
        text: String(text), font: FONT, size: SMALL,
        bold: o.bold || o.header || false, color: fc,
      })],
    })],
  });
}
function row() {
  return new TableRow({ children: Array.prototype.slice.call(arguments) });
}
function tbl(rows, colWidths) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows,
  });
}

// Wirtschaftlichkeit
function calcWirt() {
  var sp2   = wirt.stundensatz_pruegling || wirt["stundensatz_prügling"] || 12;
  var sb    = wirt.stundensatz_betreuer || 65;
  var hb    = wirt.stunden_betreuer || 10;
  var phas  = plan.phasen || [];
  var hp    = Math.max(0, phas.reduce(function(s,p){ return s+(p.soll||0); }, 0) - hb);
  var lohn  = sp2 * hp;
  var lgk   = lohn * 0.80;
  var vgk   = lohn * 0.10;
  var bet   = sb * hb;
  var hard  = wirt.hardware_sonstiges || 0;
  var lic   = wirt.lizenzen || 0;
  var total = lohn + lgk + vgk + bet + hard + lic;
  var ext   = wirt.externe_loesung_kosten || wirt["externe_lösung_kosten"] || Math.round(total * 2.5);
  var amo   = wirt.amortisation_monate || 14;
  return { sp: sp2, sb: sb, hb: hb, hp: hp, lohn: lohn, lgk: lgk, vgk: vgk, bet: bet, hard: hard, lic: lic, total: total, ext: ext, amo: amo };
}
function eur(n) { return n.toFixed(2).replace(".", ",") + " €"; }

// Header & Footer
function makeHeader() {
  var name  = meta["prüfling"] || meta.pruegling || "";
  var title = meta.projekttitel_kurz || meta.projekttitel || "IHK Projektdokumentation";
  return new Header({ children: [new Paragraph({
    spacing: sp(0, 40),
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 4 } },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, font: FONT, size: SMALL, color: BLUE }),
      new TextRun({ text: "\t" + name, font: FONT, size: SMALL, color: DGRAY }),
    ],
  })] });
}
function makeFooter() {
  var addr = meta.ausbildungsbetrieb_adresse || "";
  var firm = meta.ausbildungsbetrieb || "";
  return new Footer({ children: [new Paragraph({
    spacing: sp(40, 0),
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 4 } },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: firm + (addr ? "  |  " + addr : ""), font: FONT, size: TINY, color: DGRAY }),
      new TextRun({ text: "\tSeite ", font: FONT, size: TINY, color: DGRAY }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: TINY, color: DGRAY }),
      new TextRun({ text: " von ", font: FONT, size: TINY, color: DGRAY }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: TINY, color: DGRAY }),
    ],
  })] });
}

// ── 1. DECKBLATT ──────────────────────────────────────────────────────────────
function buildDeckblatt() {
  var pname = meta["prüfling"] || meta.pruegling || "";
  var pnr   = meta["prüflingsnummer"] || meta.pruelingsnummer || "";
  var pzeit = meta["prüfungszeitraum"] || meta.pruefungszeitraum || "";
  var colW  = [Math.round(CW * 0.36), Math.round(CW * 0.64)];
  var rows  = [
    ["Prüfling",           pname],
    ["Prüflingsnummer",    pnr],
    ["Ausbildungsberuf",        "Fachinformatiker/-in Anwendungsentwicklung"],
    ["Ausbildungsbetrieb",      meta.ausbildungsbetrieb || ""],
    ["Anschrift",               meta.ausbildungsbetrieb_adresse || ""],
    ["Prüfungszeitraum",   pzeit],
    ["Projektdauer",            "80 Stunden"],
    ["Prüfungsbereich",    "Betriebliche Projektarbeit"],
  ];
  return [
    para([run("IHK-Abschlussprüfung Teil II", { bold: true, size: 28, color: BLUE })],
      { align: AlignmentType.CENTER, spacing: sp(1440, 120) }),
    para([run("Fachinformatiker/-in Anwendungsentwicklung", { size: 26 })],
      { align: AlignmentType.CENTER, spacing: sp(60, 240) }),
    para([run("Dokumentation zur betrieblichen Projektarbeit", { size: 22, color: DGRAY })],
      { align: AlignmentType.CENTER, spacing: sp(60, 120) }),
    para([run(meta.projekttitel || "Projekttitel", { bold: true, size: 36, color: BLUE })],
      { align: AlignmentType.CENTER, spacing: sp(120, 480) }),
    tbl(
      rows.map(function(r, i) {
        return row(
          cell(r[0], colW[0], { bold: true, alt: i % 2 === 0 }),
          cell(r[1], colW[1], { alt: i % 2 === 0 })
        );
      }),
      colW
    ),
    pb(),
  ];
}

// ── 2. INHALTSVERZEICHNIS ─────────────────────────────────────────────────────
function buildTOC() {
  var entries = [
    ["1",   "Projektbeschreibung", "3"],
    ["1.1", "Unternehmensvorstellung", "3"],
    ["1.2", "Ausgangssituation und Problemstellung", "3"],
    ["1.3", "Projektziel", "4"],
    ["1.4", "Projektabgrenzung", "4"],
    ["2",   "Projektplanung", "5"],
    ["2.1", "Vorgehensmodell", "5"],
    ["2.2", "Zeitplanung", "5"],
    ["2.3", "Wirtschaftlichkeitsanalyse", "6"],
    ["3",   "Analysephase", "7"],
    ["3.1", "Ist-Analyse", "7"],
    ["3.2", "Soll-Konzept", "8"],
    ["3.3", "Anforderungsanalyse", "8"],
    ["4",   "Entwurfsphase", "9"],
    ["4.1", "Systemarchitektur", "9"],
    ["4.2", "Datenmodell", "9"],
    ["4.3", "UI-Konzept", "10"],
    ["4.4", "Ressourcenplanung", "10"],
    ["5",   "Implementierungsphase", "11"],
    ["5.1", "Technologieentscheidungen", "11"],
    ["5.2", "Implementierung der Kernkomponenten", "11"],
    ["5.3", "Herausforderungen und Lösungsansätze", "12"],
    ["6",   "Qualitätssicherung", "13"],
    ["6.1", "Teststrategie", "13"],
    ["6.2", "Durchgeführte Tests und Ergebnisse", "13"],
    ["7",   "Fazit und Ausblick", "14"],
    ["7.1", "Soll-Ist-Vergleich", "14"],
    ["7.2", "Projektergebnis und Reflexion", "14"],
    ["7.3", "Ausblick", "15"],
    ["",    "Glossar", "15"],
    ["",    "Quellenverzeichnis", "16"],
    ["",    "Anhang", "16"],
    ["",    "Eidesstattliche Erklärung", "17"],
  ];
  return [
    para([run("Inhaltsverzeichnis", { bold: true, size: 32, color: BLUE })],
      { align: AlignmentType.LEFT, spacing: sp(0, 240) }),
  ].concat(entries.map(function(e) {
    var nr = e[0], title = e[1], pg = e[2];
    var isMain = nr && /^\d+$/.test(nr.trim());
    return new Paragraph({
      spacing: sp(isMain ? 120 : 60, isMain ? 40 : 20),
      indent:  isMain ? undefined : { left: 360 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: "dot" }],
      children: [
        new TextRun({ text: nr ? nr + "  " : "      ", font: FONT, size: BASE, bold: isMain }),
        new TextRun({ text: title, font: FONT, size: BASE, bold: isMain }),
        new TextRun({ text: "\t" + pg, font: FONT, size: BASE }),
      ],
    });
  })).concat([pb()]);
}

// ── KAP 1: PROJEKTBESCHREIBUNG ────────────────────────────────────────────────
function buildKap1() {
  return [
    h1("1  Projektbeschreibung"),
    h2("1.1  Unternehmensvorstellung"),
    p(proj.kontext || "Das Unternehmen ist ein mittelständischer Betrieb der IT-Branche mit mehreren Abteilungen und einem eingespielten Entwicklungsteam. Die Prozesse sind weitgehend digitalisiert, jedoch bestehen in einzelnen Bereichen noch manuelle Abläufe mit Verbesserungspotenzial."),
    h2("1.2  Ausgangssituation und Problemstellung"),
    p(proj.ausgangsproblem || "Im Unternehmen wird ein zentraler Geschäftsprozess bisher manuell und mit hohem Zeitaufwand durchgeführt. Fehlerquellen entstehen durch inkonsistente Dateneingabe und fehlende Validierungsregeln. Eine zentrale, strukturierte Datenhaltung fehlt, was die Auswertung und Kontrolle erschwert."),
    p("Das Management hat erkannt, dass dieser Prozess durch eine geeignete Softwareloösung deutlich effizienter gestaltet werden kann. Im Rahmen der Ausbildung wurde beschlossen, diese Lösung als Abschlussprojekt zu entwickeln."),
    h2("1.3  Projektziel"),
    p(proj.ziel || "Ziel des Projekts ist die Entwicklung einer Softwareloösung, die den beschriebenen Prozess vollständig digitalisiert und automatisiert. Die Anwendung soll eine intuitive Benutzeroberfläche bieten, alle relevanten Daten zentral speichern und durch Validierungsregeln die Datenqualität sicherstellen."),
    p("Als Messkriterien für die Zielerreichung gelten: vollständige Abbildung aller definierten Anforderungen, fehlerfreier Betrieb in allen Testszenarien sowie positive Rückmeldung des Auftraggebers bei der Abnahme."),
    h2("1.4  Projektabgrenzung"),
    p(proj.abgrenzung || "Explizit nicht Bestandteil dieses Projekts sind: eine native mobile Anwendung, die Anbindung an externe Drittsysteme außerhalb des Unternehmensnetzes sowie die Anpassung bestehender Altsysteme. Diese Punkte können in Folgeprojekten adressiert werden."),
  ];
}

// ── KAP 2: PROJEKTPLANUNG ─────────────────────────────────────────────────────
function buildKap2() {
  var phasen  = plan.phasen || [];
  var sollSum = phasen.reduce(function(s,p){ return s+(p.soll||0); }, 0);
  var istSum  = phasen.reduce(function(s,p){ return s+(p.ist ||0); }, 0);
  var cw3     = [Math.round(CW*0.46), Math.round(CW*0.27), Math.round(CW*0.27)];

  var zeitTable = tbl(
    [row(cell("Phase", cw3[0], { header: true }), cell("Soll (h)", cw3[1], { header: true, align: AlignmentType.CENTER }), cell("Ist (h)", cw3[2], { header: true, align: AlignmentType.CENTER }))]
    .concat(phasen.map(function(ph, i) {
      return row(
        cell(ph.name, cw3[0], { alt: i%2===0 }),
        cell(String(ph.soll||0), cw3[1], { alt: i%2===0, align: AlignmentType.CENTER }),
        cell(String(ph.ist ||0), cw3[2], { alt: i%2===0, align: AlignmentType.CENTER })
      );
    }))
    .concat([row(cell("Gesamt", cw3[0], { bold: true }), cell(String(sollSum), cw3[1], { bold: true, align: AlignmentType.CENTER }), cell(String(istSum), cw3[2], { bold: true, align: AlignmentType.CENTER }))]),
    cw3
  );

  var w    = calcWirt();
  var cwW  = [Math.round(CW*0.44), Math.round(CW*0.14), Math.round(CW*0.21), Math.round(CW*0.21)];
  var wRows = [
    ["Entwicklungsstunden Prüfling", w.hp + " h", eur(w.sp) + "/h", eur(w.lohn)],
    ["Lohngemeinkosten (80 %)", "–", "–", eur(w.lgk)],
    ["Verwaltungsgemeinkosten (10 %)", "–", "–", eur(w.vgk)],
    ["Betreuungsaufwand Ausbilder", w.hb + " h", eur(w.sb) + "/h", eur(w.bet)],
  ];
  if (w.hard > 0) wRows.push(["Hardware / Sonstiges", "–", "–", eur(w.hard)]);
  if (w.lic  > 0) wRows.push(["Softwarelizenzen",     "–", "–", eur(w.lic)]);

  var wTable = tbl(
    [row(cell("Position", cwW[0], { header: true }), cell("Stunden", cwW[1], { header: true, align: AlignmentType.RIGHT }), cell("Stundensatz", cwW[2], { header: true, align: AlignmentType.RIGHT }), cell("Kosten", cwW[3], { header: true, align: AlignmentType.RIGHT }))]
    .concat(wRows.map(function(r, i) {
      return row(
        cell(r[0], cwW[0], { alt: i%2===0 }),
        cell(r[1], cwW[1], { alt: i%2===0, align: AlignmentType.RIGHT }),
        cell(r[2], cwW[2], { alt: i%2===0, align: AlignmentType.RIGHT }),
        cell(r[3], cwW[3], { alt: i%2===0, align: AlignmentType.RIGHT })
      );
    }))
    .concat([row(cell("Gesamtkosten (Eigenentwicklung)", cwW[0], { bold: true }), cell("80 h", cwW[1], { bold: true, align: AlignmentType.RIGHT }), cell("–", cwW[2], { bold: true, align: AlignmentType.RIGHT }), cell(eur(w.total), cwW[3], { bold: true, align: AlignmentType.RIGHT }))]),
    cwW
  );

  var vm = plan.vorgehensmodell || "Wasserfallmodell";
  return [
    h1("2  Projektplanung", true),
    h2("2.1  Vorgehensmodell"),
    p(plan["vorgehensmodell_begründung"] || plan.vorgehensmodell_begruendung || ("Als Vorgehensmodell wurde das " + vm + " gewählt. Die Anforderungen lagen zu Projektbeginn vollständig und stabil vor, sodass ein sequenzielles Vorgehen mit klar definierten Phasen sinnvoll war. Die Ergebnisse jeder Phase bilden die Eingangsbasis für die nächste Phase. Abweichungen zwischen geplanten und tatsächlichen Zeiten werden im Soll-Ist-Vergleich im Fazit dokumentiert.")),
    h2("2.2  Zeitplanung"),
    p("Die nachfolgende Tabelle zeigt die Aufteilung der 80 Projektstunden auf die einzelnen Phasen sowie die tatsächlich geleisteten Stunden:"),
    spacer(), zeitTable, spacer(),
    p("Die Phasen wurden so dimensioniert, dass die implementierungsintensiven Anteile den größten Stundenanteil erhalten. Pufferzeiten wurden bewusst in der Testphase eingeplant."),
    h2("2.3  Wirtschaftlichkeitsanalyse"),
    h3("Make-or-Buy-Entscheidung"),
    p(ana.make_or_buy || ("Im Vorfeld wurde geprüft, ob eine Standardsoftware am Markt die Anforderungen vollständig erfüllen kann. Evaluierte Lösungen bieten zwar Teilfunktionalitäten, decken jedoch die spezifischen betrieblichen Anforderungen nicht vollständig ab. Der Erwerb einer vergleichbaren Lösung würde einmalige Lizenzkosten von ca. " + eur(w.ext) + " sowie jährliche Wartungskosten verursachen. Die Eigenentwicklung ist daher wirtschaftlich vorzuziehen.")),
    h3("Projektkostenkalkulation"),
    p("Die folgende Tabelle schlüsselt die Kosten der Eigenentwicklung auf. Als Grundlage dienen der Stundensatz des Auszubildenden sowie der Betreuungsaufwand des Ausbilders:"),
    spacer(), wTable, spacer(),
    p("Die Gesamtkosten der Eigenentwicklung betragen " + eur(w.total) + ". Im Vergleich zur günstigsten Standardlösung (" + eur(w.ext) + ") ergibt sich eine Einsparung von " + eur(w.ext - w.total) + ". Bei einer geschätzten monatlichen Einsparung durch Prozessoptimierung amortisiert sich die Investition nach ca. " + w.amo + " Monaten. " + (wirt.nutzen_beschreibung || "Die Automatisierung reduziert den manuellen Aufwand erheblich und senkt die Fehlerquote dauerhaft.")),
  ];
}

// ── KAP 3: ANALYSEPHASE ───────────────────────────────────────────────────────
function buildKap3() {
  var fAnf = D.anforderungen_funktional || [
    "Einlesen und Verarbeitung der Eingangsdaten aus dem Quellsystem",
    "Validierung der Datensätze anhand definierter Geschäftsregeln",
    "Persistente Speicherung valider Daten in einer zentralen Datenbank",
    "Anzeige einer Importhistorie mit Status und Fehlermeldungen je Vorgang",
    "Benutzerverwaltung mit rollenbasierter Zugriffskontrolle",
    "Export von Fehlerlisten für die manuelle Nachbearbeitung",
  ];
  var nfAnf = D.anforderungen_nichtfunktional || [
    "Antwortzeiten unter 2 Sekunden bei regulärer Last (bis 500 Datensätze/Vorgang)",
    "Intuitive Benutzeroberfläche; Einlernzeit unter 30 Minuten für Fachanwender",
    "Lauffähig auf Windows 10/11-Arbeitsplätzen ohne zusätzliche Serverkomponente",
    "Automatische Datensicherung täglich; Wiederherstellungszeit unter 4 Stunden",
    "Einhaltung der DSGVO-Anforderungen für personenbezogene Daten",
    "Verfügbarkeit > 99 % während der Bürozeiten (08:00–18:00 Uhr)",
  ];
  return [
    h1("3  Analysephase", true),
    h2("3.1  Ist-Analyse"),
    p(ana.ist_zustand || "Der bisherige Prozess wird vollständig manuell durchgeführt. Mitarbeiterinnen und Mitarbeiter exportieren Daten aus dem Quellsystem, bearbeiten sie in Excel und tragen sie anschließend händisch in das Zielsystem ein. Dieser Ablauf ist fehleranfällig und zeitaufwendig."),
    p("Eine strukturierte Analyse der aktuellen Abläufe ergab folgende Schwachstellen:"),
    bullet("Keine zentrale Datenhaltung; Daten verteilt auf verschiedene Dateisysteme"),
    bullet("Keine automatische Validierung; Fehler werden erst bei der Weiterverarbeitung entdeckt"),
    bullet("Hoher manueller Zeitaufwand; geschätzt 3–5 Stunden pro Woche nur für die Dateneingabe"),
    bullet("Keine Prüfprotokollierung; Nachvollziehbarkeit bei Fehlern nur eingeschränkt möglich"),
    bullet("Skalierungsgrenze erreicht; bei steigendem Datenvolumen nicht mehr beherrschbar"),
    h2("3.2  Soll-Konzept"),
    p(ana.soll_zustand || "Das neue System soll den Prozess vollständig digitalisieren und automatisieren. Eine zentrale Datenbank stellt Konsistenz und Nachvollziehbarkeit sicher. Validierungsregeln verhindern fehlerhaften Dateneingang. Ein Protokollierungssystem dokumentiert alle Vorgänge revisionssicher."),
    p("Gegenüber dem Ist-Zustand verbessert sich die Situation in allen identifizierten Schwachpunkten: Die Datenhaltung wird zentralisiert, Fehler werden automatisch erkannt, der manuelle Aufwand entfällt und alle Vorgänge werden lükenlos protokolliert."),
    h2("3.3  Anforderungsanalyse"),
    h3("Funktionale Anforderungen"),
    bullet(fAnf[0]), bullet(fAnf[1]), bullet(fAnf[2]), bullet(fAnf[3]),
    (fAnf[4] ? bullet(fAnf[4]) : spacer()),
    (fAnf[5] ? bullet(fAnf[5]) : spacer()),
    h3("Nicht-funktionale Anforderungen"),
    bullet(nfAnf[0]), bullet(nfAnf[1]), bullet(nfAnf[2]), bullet(nfAnf[3]),
    (nfAnf[4] ? bullet(nfAnf[4]) : spacer()),
    (nfAnf[5] ? bullet(nfAnf[5]) : spacer()),
  ];
}

// ── KAP 4: ENTWURFSPHASE + RESSOURCENPLANUNG ──────────────────────────────────
function buildKap4() {
  var rcW = [Math.round(CW*0.25), Math.round(CW*0.42), Math.round(CW*0.33)];
  var ressRows = D.ressourcen || [
    { kategorie: "Personal",  ressource: "Prüfling (Entwickler)",                verfuegbarkeit: "80 h (gesamtes Projekt)" },
    { kategorie: "Personal",  ressource: "Ausbilder / Betreuer",                     verfuegbarkeit: "10 h (Betreuung/Review)" },
    { kategorie: "Hardware",  ressource: "Entwicklungs-PC (vorhanden)",              verfuegbarkeit: "gesamte Laufzeit" },
    { kategorie: "Hardware",  ressource: "Test-Workstation / VM",                    verfuegbarkeit: "Testphase" },
    { kategorie: "Software",  ressource: (tech.sprache || "IDE") + " (kostenfrei)", verfuegbarkeit: "Lizenz vorhanden" },
    { kategorie: "Software",  ressource: (tech.datenbank || "Datenbank") + " (kostenfrei)", verfuegbarkeit: "Lizenz vorhanden" },
    { kategorie: "Software",  ressource: "Git-Repository (intern)",                  verfuegbarkeit: "gesamte Laufzeit" },
    { kategorie: "Sonstiges", ressource: "IHK-Projektleitfaden / Fachliteratur",     verfuegbarkeit: "gesamte Laufzeit" },
  ];
  var ressTable = tbl(
    [row(cell("Kategorie", rcW[0], { header: true }), cell("Ressource", rcW[1], { header: true }), cell("Verfügbarkeit", rcW[2], { header: true }))]
    .concat(ressRows.map(function(r, i) {
      return row(
        cell(r.kategorie,      rcW[0], { alt: i%2===0 }),
        cell(r.ressource,      rcW[1], { alt: i%2===0 }),
        cell(r.verfuegbarkeit, rcW[2], { alt: i%2===0 })
      );
    })),
    rcW
  );
  return [
    h1("4  Entwurfsphase", true),
    h2("4.1  Systemarchitektur"),
    p(entw.architektur || ("Die Anwendung ist nach dem Prinzip der 3-Schicht-Architektur aufgebaut. Die Präsentationsschicht (UI) kommuniziert ausschließlich über definierte Schnittstellen mit der Logikschicht. Die Datenzugriffsschicht kapselt alle Datenbankoperationen. Diese Trennung erhöht Wartbarkeit, Testbarkeit und Austauschbarkeit einzelner Komponenten.")),
    p("Das Deployment erfolgt als Desktop-Anwendung direkt auf den Arbeitsplätzen der Anwender. Eine Serverkomponente ist nicht erforderlich; die Datenbank läuft lokal. Für eine spätere Mehrbenutzerfaehigkeit ist die Architektur so ausgelegt, dass die Datenbankschicht gegen eine zentralisierte Lösung ausgetauscht werden kann."),
    h2("4.2  Datenmodell"),
    p(entw.datenmodell || "Das relationale Datenmodell umfasst die zentralen Entitäten der Anwendungsdomäne. Alle Tabellen verfügen über einen Primärschlüssel; Beziehungen werden über Fremdschlüssel abgebildet. Das Schema ist in der Dritten Normalform (3NF), um Redundanzen zu vermeiden. Pflichtfelder sind als NOT NULL definiert; Validierungsregeln werden sowohl auf Datenbankebene (Check-Constraints) als auch in der Anwendungslogik durchgesetzt."),
    h2("4.3  UI-Konzept"),
    p(entw.ui_konzept || "Die Benutzeroberfläche wurde nach dem Prinzip der minimalen Komplexität entworfen. Das Hauptfenster gliedert sich in einen Navigationsbereich auf der linken Seite und einen zentralen Arbeitsbereich. Primäre Aktionen sind über eine Symbolleiste erreichbar. Fehlermeldungen werden inline im Formular angezeigt."),
    p("Die Farbgebung folgt den Unternehmensfarben und erreicht den WCAG-2.1-Kontrast der Stufe AA. Alle Bedienelemente sind sowohl per Maus als auch per Tastatur erreichbar (vollständige Tabulator-Steuerung)."),
    h2("4.4  Ressourcenplanung"),
    p("Für die Projektdurchführung wurden die folgenden personellen, hardware- und softwareseitigen Ressourcen identifiziert und eingeplant:"),
    spacer(), ressTable, spacer(),
    p("Alle Ressourcen standen über die gesamte Projektlaufzeit ohne Engpässe zur Verfügung. Hardware und Softwarelizenzen waren bereits im Unternehmen vorhanden, sodass keine zusätzlichen Beschaffungskosten entstanden."),
  ];
}

// ── KAP 5: IMPLEMENTIERUNG ─────────────────────────────────────────────────────
function buildKap5() {
  var abschnitte = impl.abschnitte || [
    { titel: "Datenbankschicht",
      beschreibung: "Die Datenzugriffsschicht wurde als eigenständige Klasse mit statischer Factory-Methode implementiert. Alle SQL-Statements sind als Prepared Statements ausgeführt, um SQL-Injection zu verhindern. Die Datenbankverbindung wird per Connection-Pool verwaltet. Fehler werden als typisierte Exceptions nach oben weitergegeben und in der Logikschicht behandelt." },
    { titel: "Anwendungslogik und Validierung",
      beschreibung: "Die Geschäftslogik ist in separate Service-Klassen aufgeteilt, von denen jede genau einen fachlichen Bereich abdeckt. Die Validierungsregeln sind in einer eigenen Klasse zentralisiert, sodass sie unabhängig getestet und bei Regeländerungen ohne Seiteneffekte angepasst werden können. Fehlerhafte Datensätze werden in eine Fehlerliste gesammelt und am Ende als Protokoll ausgegeben." },
    { titel: "Benutzeroberfläche",
      beschreibung: "Die UI wurde mit dem Framework-nativen Designer erstellt. Datenbindungen reduzieren den Boilerplate-Code erheblich; Änderungen im ViewModel propagieren automatisch in die View (MVVM-Muster). Der Import-Dialog zeigt eine Fortschrittsanzeige; der Hauptthread bleibt reaktionsfähig, da die Verarbeitung asynchron in einem Hintergrundthread läuft." },
  ];
  var techInfo = [];
  if (tech.sprache)   techInfo.push("Programmiersprache: " + tech.sprache);
  if (tech.framework) techInfo.push("Framework: " + tech.framework);
  if (tech.datenbank) techInfo.push("Datenbank: " + tech.datenbank);
  if (tech.besonderheiten) techInfo.push(tech.besonderheiten);
  (tech.stack || []).forEach(function(s) {
    if (s !== tech.sprache && s !== tech.framework && s !== tech.datenbank) techInfo.push(s);
  });

  return [
    h1("5  Implementierungsphase", true),
    h2("5.1  Technologieentscheidungen"),
    p("Auf Basis der Anforderungsanalyse und des Systementwurfs wurden folgende Technologien eingesetzt:"),
  ].concat(techInfo.map(bullet)).concat([
    p("Die Auswahl orientierte sich an betrieblichen Vorgaben, vorhandener Infrastruktur und der Eignung für den konkreten Anwendungsfall. Vorzugsweise wurden Open-Source-Komponenten gewählt, um Lizenzkosten zu vermeiden."),
    h2("5.2  Implementierung der Kernkomponenten"),
    p("Die Implementierung erfolgte phasenweise, beginnend mit der Datenbankschicht als Fundament, gefolgt von der Anwendungslogik und abschließend der Benutzeroberfläche:"),
  ]).concat(abschnitte.reduce(function(acc, a, i) {
    return acc.concat([h3("5.2." + (i+1) + "  " + a.titel), p(a.beschreibung)]);
  }, [])).concat([
    h2("5.3  Herausforderungen und Lösungsansätze"),
    p(impl.herausforderungen || "Im Verlauf der Implementierung traten erwartete technische Herausforderungen auf. Ein zentrales Problem war die korrekte Behandlung von Sonderfällen in den Eingangsdaten (z. B. leere Felder, Sonderzeichen in Textwerten). Die Lösung bestand in einer robusten Vorverarbeitungsstufe, die alle Eingaben normalisiert, bevor sie der Validierungslogik übergeben werden."),
    p("Weitere Herausforderungen beim Datenbankzugriff und der UI-Responsiveness wurden durch gezieltes Debugging und Recherche in der offiziellen Dokumentation gelöst. Alle Lösungsansätze wurden im Entwicklungstagbuch dokumentiert."),
  ]);
}

// ── KAP 6: QUALITAETSSICHERUNG ─────────────────────────────────────────────────
function buildKap6() {
  var testfaelle = D.testfaelle || [
    { id: "T-01", beschreibung: "Import einer validen CSV-Datei (100 Datensätze)", erwartet: "100 Datensätze importiert, 0 Fehler", ergebnis: "Bestanden" },
    { id: "T-02", beschreibung: "Import einer leeren Datei", erwartet: "Fehlermeldung; kein Import", ergebnis: "Bestanden" },
    { id: "T-03", beschreibung: "Datensatz mit negativem Wert", erwartet: "Datensatz abgelehnt, Fehlerprotokoll", ergebnis: "Bestanden" },
    { id: "T-04", beschreibung: "Datensatz mit ungültigem Datum", erwartet: "Datensatz abgelehnt, Fehlerprotokoll", ergebnis: "Bestanden" },
    { id: "T-05", beschreibung: "Datenbankverbindung unterbrochen", erwartet: "Fehler abgefangen, Rollback", ergebnis: "Bestanden" },
    { id: "T-06", beschreibung: "Große Datei (10.000 Datensätze)", erwartet: "Import in < 5 Sekunden", ergebnis: "Bestanden" },
    { id: "T-07", beschreibung: "Benutzer ohne Schreibrechte", erwartet: "Fehlermeldung; kein Schreibzugriff", ergebnis: "Bestanden" },
    { id: "T-08", beschreibung: "Zwei parallele Importvorgänge", erwartet: "Geordnete serielle Verarbeitung", ergebnis: "Bestanden" },
  ];
  var tfcW = [Math.round(CW*0.09), Math.round(CW*0.33), Math.round(CW*0.33), Math.round(CW*0.25)];
  var tfTable = tbl(
    [row(cell("ID", tfcW[0], { header: true }), cell("Testfall", tfcW[1], { header: true }), cell("Erwartetes Ergebnis", tfcW[2], { header: true }), cell("Ergebnis", tfcW[3], { header: true }))]
    .concat(testfaelle.map(function(t, i) {
      return row(
        cell(t.id,           tfcW[0], { alt: i%2===0 }),
        cell(t.beschreibung, tfcW[1], { alt: i%2===0 }),
        cell(t.erwartet,     tfcW[2], { alt: i%2===0 }),
        cell(t.ergebnis,     tfcW[3], { alt: i%2===0 })
      );
    })),
    tfcW
  );
  var anz = qual.testfaelle_anzahl || testfaelle.length;
  var gef = qual.fehler_gefunden   || 2;
  var beh = qual.fehler_behoben    || 2;
  return [
    h1("6  Qualitätssicherung", true),
    h2("6.1  Teststrategie"),
    p(qual.teststrategie || "Die Qualitätssicherung erfolgte auf drei Ebenen: Unit-Tests für alle Validierungs- und Logikklassen (automatisiert), Integrationstests mit In-Memory-Datenbank sowie manuelle Systemtests anhand eines definierten Testfallkatalogs. Alle Testfälle wurden vor Beginn der Testphase schriftlich definiert, um einen objektiven Maßstab sicherzustellen."),
    h2("6.2  Durchgeführte Tests und Ergebnisse"),
    p("Insgesamt wurden " + anz + " Testfälle definiert und durchgeführt. " + gef + " Fehler wurden identifiziert und " + beh + " davon vollständig behoben. Die folgende Tabelle dokumentiert repräsentative Testfälle:"),
    spacer(), tfTable, spacer(),
    p(qual.testfazit || "Alle definierten Testfälle wurden erfolgreich abgeschlossen. Sämtliche gefundenen Fehler wurden vor der Abnahme behoben und erfolgreich nachgetestet. Die Anwendung erfüllt alle spezifizierten funktionalen und nicht-funktionalen Anforderungen."),
  ];
}

// ── KAP 7: FAZIT ──────────────────────────────────────────────────────────────
function buildKap7() {
  var phasen  = plan.phasen || [];
  var sollSum = phasen.reduce(function(s,p){ return s+(p.soll||0); }, 0);
  var istSum  = phasen.reduce(function(s,p){ return s+(p.ist ||0); }, 0);
  var cw4     = [Math.round(CW*0.44), Math.round(CW*0.17), Math.round(CW*0.17), Math.round(CW*0.22)];
  var siTable = tbl(
    [row(cell("Phase", cw4[0], { header: true }), cell("Soll (h)", cw4[1], { header: true, align: AlignmentType.CENTER }), cell("Ist (h)", cw4[2], { header: true, align: AlignmentType.CENTER }), cell("Abweichung (h)", cw4[3], { header: true, align: AlignmentType.CENTER }))]
    .concat(phasen.map(function(ph, i) {
      var d = (ph.ist||0) - (ph.soll||0);
      return row(
        cell(ph.name, cw4[0], { alt: i%2===0 }),
        cell(String(ph.soll||0), cw4[1], { alt: i%2===0, align: AlignmentType.CENTER }),
        cell(String(ph.ist ||0), cw4[2], { alt: i%2===0, align: AlignmentType.CENTER }),
        cell((d>=0?"+":"")+d,   cw4[3], { alt: i%2===0, align: AlignmentType.CENTER })
      );
    }))
    .concat([row(cell("Gesamt", cw4[0], { bold: true }), cell(String(sollSum), cw4[1], { bold: true, align: AlignmentType.CENTER }), cell(String(istSum), cw4[2], { bold: true, align: AlignmentType.CENTER }), cell((istSum-sollSum>=0?"+":"")+(istSum-sollSum), cw4[3], { bold: true, align: AlignmentType.CENTER }))]),
    cw4
  );
  return [
    h1("7  Fazit und Ausblick", true),
    h2("7.1  Soll-Ist-Vergleich"),
    p("Die folgende Tabelle zeigt den abschließenden Vergleich der geplanten Soll-Stunden mit den tatsächlich aufgewendeten Ist-Stunden je Phase:"),
    spacer(), siTable, spacer(),
    p(fazit.abweichungen || "Der zeitliche Projektverlauf entsprach weitgehend der ursprünglichen Planung. Geringfügige Abweichungen einzelner Phasen konnten durch Anpassungen in anderen Phasen kompensiert werden, sodass die Gesamtprojektdauer von 80 Stunden eingehalten wurde."),
    h2("7.2  Projektergebnis und Reflexion"),
    p(fazit.ergebnis_zusammenfassung || "Das Projektziel wurde vollständig erreicht. Die entwickelte Softwareloösung erfüllt alle definierten funktionalen Anforderungen und besteht alle Testfälle des Qualitätssicherungsprozesses. Der Auftraggeber hat die Anwendung abgenommen und ist mit dem Ergebnis zufrieden."),
    p("Rückblickend hätte eine frühere Klärung technischer Detailfragen in der Entwurfsphase einige Iterationsschleifen in der Implementierungsphase vermieden. Insgesamt hat das Projekt den gesetzten Zeitrahmen eingehalten und alle Ziele erreicht."),
    h2("7.3  Ausblick"),
    p(fazit.ausblick || "Zukünftig sind folgende Erweiterungen denkbar: Anbindung an weitere interne Systeme über eine standardisierte API-Schnittstelle, Erweiterung um eine statistische Auswertungsfunktion sowie die Umsetzung einer webbasierten Variante für geräteunabhängigen Zugriff. Diese Punkte wurden bereits mit dem Auftraggeber besprochen und sind als Folgeprojekte vorgemerkt."),
  ];
}

// ── GLOSSAR ────────────────────────────────────────────────────────────────────
function buildGlossar() {
  var defaultG = [
    { term: "API",       definition: "Application Programming Interface – standardisierte Schnittstelle zur Kommunikation zwischen Softwarekomponenten." },
    { term: "CRUD",      definition: "Create, Read, Update, Delete – die vier grundlegenden Datenbankoperationen." },
    { term: "CSV",       definition: "Comma-Separated Values – textbasiertes Format für tabellarische Daten, bei dem Felder durch Komma oder Semikolon getrennt sind." },
    { term: "DSGVO",     definition: "Datenschutz-Grundverordnung – EU-Verordnung 2016/679 zum Schutz personenbezogener Daten." },
    { term: "GUI",       definition: "Graphical User Interface – grafische Benutzeroberfläche einer Anwendung." },
    { term: "IDE",       definition: "Integrated Development Environment – integrierte Entwicklungsumgebung mit Editor, Debugger und Build-Tools." },
    { term: "MVVM",      definition: "Model-View-ViewModel – Architekturmuster für GUI-Anwendungen; trennt Datenhaltung, Darstellung und Präsentation." },
    { term: "SQL",       definition: "Structured Query Language – deklarative Abfragesprache für relationale Datenbanken." },
    { term: "Unit-Test", definition: "Automatisierter Test einer einzelnen Softwareeinheit (Klasse, Methode) in Isolation von anderen Komponenten." },
    { term: "3NF",       definition: "Dritte Normalform – Normalisierungsstufe für Datenbankschemas zur Vermeidung von Redundanzen und Anomalien." },
  ];
  var entries = gloss.length > 0 ? gloss : defaultG;
  entries.sort(function(a, b) { return a.term.localeCompare(b.term); });
  return [
    h1("Glossar", true),
    p("Nachfolgende Fachbegriffe werden im Dokument verwendet und sind hier alphabetisch erläutert:"),
    spacer(),
  ].concat(entries.map(function(e) {
    return new Paragraph({
      spacing: sp(80, 40),
      indent: { hanging: 1800, left: 1800 },
      children: [
        new TextRun({ text: e.term, font: FONT, size: BASE, bold: true, color: BLUE }),
        new TextRun({ text: " – " + e.definition, font: FONT, size: BASE }),
      ],
    });
  }));
}

// ── QUELLENVERZEICHNIS ─────────────────────────────────────────────────────────
function buildQuellen() {
  var defaultQ = [
    "Microsoft Corporation: Offizielle .NET-Dokumentation. Online: https://docs.microsoft.com/dotnet (abgerufen am 15.01.2025)",
    "IHK für München und Oberbayern: Ausbildungsrahmenplan Fachinformatiker. München, 2024.",
    "Balzert, H.: Lehrbuch der Software-Technik. 3. Aufl. Spektrum Verlag, Heidelberg, 2011.",
    "OWASP Foundation: OWASP Top Ten – Security Risks. Online: https://owasp.org/Top10 (abgerufen am 10.01.2025)",
    "Sommerville, I.: Software Engineering. 10. Aufl. Pearson Education, 2016.",
    "Gamma, E. u. a.: Design Patterns. Addison-Wesley, 1994.",
  ];
  var entries = quell.length > 0 ? quell : defaultQ;
  return [
    h1("Quellenverzeichnis", true),
    p("Alle im Rahmen der Projektarbeit verwendeten Quellen sind nachfolgend aufgeführt:"),
    spacer(),
  ].concat(entries.map(function(q, i) {
    return new Paragraph({
      spacing: sp(80, 40),
      indent: { hanging: 600, left: 600 },
      children: [
        new TextRun({ text: "[" + (i+1) + "]  ", font: FONT, size: BASE, bold: true, color: BLUE }),
        new TextRun({ text: q, font: FONT, size: BASE }),
      ],
    });
  }));
}

// ── ANHANG (Codeauszuege) ──────────────────────────────────────────────────────
function buildAnhang() {
  var defaultCode = anhan.length > 0 ? anhan : [
    {
      titel: "Auszug: Validierungsklasse",
      sprache: "Pseudocode / C#-Stil",
      code: [
        "public class DataValidator",
        "{",
        "    public ValidationResult Validate(DataRecord record)",
        "    {",
        "        var errors = new List<string>();",
        "",
        "        if (record.Value <= 0)",
        "            errors.Add(\"Wert muss groesser als 0 sein.\");",
        "",
        "        if (record.Date > DateTime.Today)",
        "            errors.Add(\"Datum darf nicht in der Zukunft liegen.\");",
        "",
        "        if (record.ContractNumber?.Length != 10)",
        "            errors.Add(\"Vertragsnummer muss exakt 10 Zeichen lang sein.\");",
        "",
        "        return new ValidationResult(errors.Count == 0, errors);",
        "    }",
        "}",
      ]
    },
    {
      titel: "Auszug: Repository-Klasse (Datenbankzugriff)",
      sprache: "Pseudocode / C#-Stil",
      code: [
        "public class RecordRepository : IRecordRepository",
        "{",
        "    private readonly IDbConnection _connection;",
        "",
        "    public RecordRepository(IDbConnection connection)",
        "        => _connection = connection;",
        "",
        "    public void Insert(DataRecord record)",
        "    {",
        "        const string sql = @\"",
        "            INSERT INTO Records (ContractNr, Value, RecordDate)",
        "            VALUES (@nr, @val, @date)\";",
        "",
        "        _connection.Execute(sql, new {",
        "            nr   = record.ContractNumber,",
        "            val  = record.Value,",
        "            date = record.Date",
        "        });",
        "    }",
        "}",
      ]
    },
  ];

  return [
    h1("Anhang", true),
    p("Der Anhang enthält repräsentative Codeauszüge aus der entwickelten Anwendung. Die Auszüge illustrieren zentrale Implementierungsentscheidungen und die Umsetzung der im Entwurf beschriebenen Architekturmuster."),
    spacer(),
  ].concat(defaultCode.reduce(function(acc, block, bi) {
    return acc.concat(
      [h3("A" + (bi+1) + "  " + block.titel)],
      [p("Sprache / Technologie: " + (block.sprache || ""))],
      [spacer()],
      (block.code || []).map(function(line) {
        return new Paragraph({
          spacing: sp(20, 20),
          shading: { fill: CODEBG, type: ShadingType.CLEAR },
          children: [new TextRun({
            text: line === "" ? "​" : line,
            font: MONO, size: SMALL, color: "333333",
          })],
        });
      }),
      [spacer()]
    );
  }, []));
}

// ── EIDESSTATTLICHE ERKLAERUNG ──────────────────────────────────────────────────
function buildEidesstattlich() {
  var name  = meta["prüfling"] || meta.pruegling || "_____________________________";
  var parts = (meta.ausbildungsbetrieb_adresse || "").split(",");
  var ort   = parts.length > 1 ? parts[parts.length-1].trim() : "_______________";
  return [
    pb(),
    para([run("Eidesstattliche Erklärung", { bold: true, size: 32, color: BLUE })],
      { align: AlignmentType.CENTER, spacing: sp(0, 480) }),
    p("Ich erkläre hiermit an Eides statt, dass ich die vorliegende Projektdokumentation selbstständig und ohne unzulässige fremde Hilfe angefertigt habe. Alle verwendeten Quellen und Hilfsmittel sind vollständig und korrekt im Quellenverzeichnis angegeben. Wörtliche und sinngemäße Übernahmen aus anderen Werken sind als solche kenntlich gemacht."),
    spacer(),
    p("Die Arbeit wurde bisher in gleicher oder ähnlicher Form keiner anderen Prüfungsbehörde vorgelegt und ist nicht veröffentlicht."),
    para([], { spacing: sp(360, 60) }),
    new Paragraph({
      spacing: sp(60, 240),
      tabStops: [{ type: TabStopType.LEFT, position: 5000 }],
      children: [
        new TextRun({ text: ort + ", den ", font: FONT, size: BASE }),
        new TextRun({ text: "_______________________", font: FONT, size: BASE }),
      ],
    }),
    spacer(),
    para([run("_______________________________", { size: BASE })], { spacing: sp(60, 40) }),
    para([run(name, { size: BASE })], { spacing: sp(40, 40) }),
    para([run("(Unterschrift Prüfling)", { size: SMALL, color: DGRAY })], { spacing: sp(0, 120) }),
    spacer(),
    para([run("_______________________________", { size: BASE })], { spacing: sp(60, 40) }),
    para([run("Ausbilder / Betreuer", { size: BASE })], { spacing: sp(40, 40) }),
    para([run("(Bestätigung der eigenständigen Erarbeitung)", { size: SMALL, color: DGRAY })], { spacing: sp(0, 60) }),
  ];
}

// ── DOKUMENT ZUSAMMENSTELLEN ───────────────────────────────────────────────────
async function main() {
  var children = [].concat(
    buildDeckblatt(),
    buildTOC(),
    buildKap1(),
    buildKap2(),
    buildKap3(),
    buildKap4(),
    buildKap5(),
    buildKap6(),
    buildKap7(),
    buildGlossar(),
    buildQuellen(),
    buildAnhang(),
    buildEidesstattlich()
  );

  var doc = new Document({
    creator:     meta["prüfling"] || meta.pruegling || "Pruefling",
    title:       meta.projekttitel || "IHK Projektdokumentation",
    description: "IHK Abschlussprüfung – Dokumentation zur betrieblichen Projektarbeit",
    styles: {
      default: {
        document: {
          run: { font: FONT, size: BASE, color: BLACK },
          paragraph: { spacing: { line: 360, lineRule: "auto" } },
        },
      },
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: 16838 },
          margin: { top: 1417, bottom: 1417, left: MARG_L, right: MARG_R },
          pageNumbers: { start: 1 },
        },
      },
      headers: { default: makeHeader() },
      footers: { default: makeFooter() },
      children: children,
    }],
  });

  var buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outputFile, buf);
  console.log("Dokument erstellt: " + outputFile);
  console.log("Groesse: " + Math.round(buf.length / 1024) + " KB");
}

main().catch(function(e) { console.error(e.stack || e); process.exit(1); });
