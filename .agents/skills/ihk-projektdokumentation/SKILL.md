---
name: ihk-projektdokumentation
description: >
  Erstellt vollständige IHK-konforme Projektdokumentationen für Fachinformatiker Anwendungsentwicklung (FIAE).
  Verwende diesen Skill immer wenn ein Benutzer eine IHK Projektdokumentation, Abschlussdokumentation,
  Dokumentation zur betrieblichen Projektarbeit, IHK Abschlussarbeit oder ähnliches erstellen möchte –
  auch wenn er nur sagt "Ich brauche meine IHK Doku" oder "erstelle mir die Projektdoku für mein IHK Projekt".
  Erzeugt ein professionelles .docx Word-Dokument (mind. 15 Seiten) mit allen Pflichtkapiteln,
  Zeitplanung (80h), Wirtschaftlichkeitsanalyse, Ressourcenplanung, Glossar, Quellenverzeichnis,
  Anhang mit Codeauszügen und Eidesstattlicher Erklärung.
---

# IHK Projektdokumentation erstellen

Du erstellst eine vollständige, IHK-konforme **Dokumentation zur betrieblichen Projektarbeit** für einen
Fachinformatiker Anwendungsentwicklung. Das Ergebnis ist ein professionelles `.docx` Word-Dokument
mit **mindestens 15 Seiten** Gesamtumfang.

## Kernprinzip: Sofort loslegen – Lücken plausibel füllen

Frage den Benutzer **nur nach dem, was zwingend personenbezogen und unbekannt ist**.
Alles andere ergänzt du mit professionellen, realistischen Standardwerten auf Deutsch.

| Information | Vorgehen bei fehlender Angabe |
|-------------|-------------------------------|
| Name + Prüflingsnummer | **Muss gefragt werden** |
| Ausbildungsbetrieb + Ort | **Muss gefragt werden** |
| Projekttitel | **Muss gefragt werden** |
| Technologiestack | Aus Projekttitel ableiten oder einmalig fragen |
| Prüfungszeitraum | Aktuelles Halbjahr (z.B. "Sommer 2025") |
| Projektphasen & Stunden | Standard-Verteilung auf exakt 80h (siehe unten) |
| Stundensätze | Prüfling 12 €/h, Ausbilder 65 €/h, 10h Betreuung |
| Unternehmensadresse | "Musterstraße 1, 12345 Musterstadt" als Platzhalter |
| Ausgangsproblem | Aus Projekttitel und Tech-Stack ableiten |
| Wirtschaftlichkeit | Realistisch kalkulieren: ext. Lösung ca. 2,5× Eigenentwicklung |
| Glossar, Quellen, Testfälle | Branchenübliche Standardeinträge verwenden |

**Fasse alle fehlenden Pflichtangaben in einer einzigen Frage zusammen. Starte danach sofort ohne weitere Rückfragen.**

## Standard-Zeitplanung (80h – bei fehlenden Angaben)

| Phase | Soll (h) | Ist (h) |
|-------|----------|---------|
| Analysephase | 8 | 9 |
| Entwurfsphase | 12 | 11 |
| Implementierungsphase | 40 | 41 |
| Testphase | 12 | 12 |
| Dokumentation | 8 | 7 |
| **Gesamt** | **80** | **80** |

Ist-Stunden leicht variieren (±1–2h/Phase), Gesamtsumme ebenfalls ~80h.

## Schritt 1: Daten-JSON erstellen

Schreibe alle Projektdaten in `/tmp/ihk_<kurzname>.json`.
Alle Felder füllst du mit realistischen deutschen Fachtexten – **kein Feld bleibt leer oder als Platzhalter**.

```json
{
  "meta": {
    "prüfling": "Vollständiger Name",
    "prüflingsnummer": "XXX XXXXXXX",
    "ausbildungsbetrieb": "Firmenname GmbH",
    "ausbildungsbetrieb_adresse": "Musterstraße 1, 12345 Musterstadt",
    "prüfungszeitraum": "Sommer 2025",
    "projekttitel": "Vollständiger Projekttitel",
    "projekttitel_kurz": "Kurzform (max. 50 Zeichen)"
  },
  "projekt": {
    "kontext": "Unternehmensbeschreibung (2–3 Sätze): Branche, Mitarbeiterzahl, Kerngeschäft",
    "ausgangsproblem": "Konkretes Problem mit Zahlen (3–5 Sätze): Was läuft schief, wie oft, Folgen",
    "ziel": "Projektziel mit messbaren Kriterien (2–3 Sätze)",
    "abgrenzung": "Was explizit NICHT Teil des Projekts ist"
  },
  "technik": {
    "sprache": "Programmiersprache inkl. Version",
    "framework": "Hauptframework",
    "datenbank": "Datenbankname oder null",
    "stack": ["Tech1", "Tech2", "Tech3"],
    "besonderheiten": "Architekturmuster, besondere technische Entscheidungen"
  },
  "planung": {
    "vorgehensmodell": "Wasserfallmodell",
    "vorgehensmodell_begründung": "Warum dieses Modell (2–3 Sätze)",
    "phasen": [
      {"name": "Analysephase",          "soll": 8,  "ist": 9},
      {"name": "Entwurfsphase",         "soll": 12, "ist": 11},
      {"name": "Implementierungsphase", "soll": 40, "ist": 41},
      {"name": "Testphase",             "soll": 12, "ist": 12},
      {"name": "Dokumentation",         "soll": 8,  "ist": 7}
    ]
  },
  "wirtschaftlichkeit": {
    "stundensatz_pruegling": 12,
    "stundensatz_betreuer": 65,
    "stunden_betreuer": 10,
    "hardware_sonstiges": 0,
    "lizenzen": 0,
    "nutzen_beschreibung": "Wirtschaftlicher Nutzen mit konkreten Zahlen (1–2 Sätze)",
    "externe_loesung_kosten": 5000,
    "amortisation_monate": 14
  },
  "analyse": {
    "ist_zustand": "Detaillierter Ist-Zustand mit konkreten Mengenangaben (3–5 Sätze)",
    "soll_zustand": "Was nach dem Projekt besser ist (2–3 Sätze)",
    "make_or_buy": "Begründung für Eigenentwicklung mit Kostenvergleich (2–3 Sätze)"
  },
  "entwurf": {
    "architektur": "Architekturübersicht mit Begründung (3–4 Sätze)",
    "datenmodell": "Datenmodellbeschreibung mit Entitäten (2–3 Sätze)",
    "ui_konzept": "UI-Konzeptbeschreibung (2–3 Sätze)"
  },
  "implementierung": {
    "abschnitte": [
      {"titel": "Datenbankschicht",   "beschreibung": "Implementierungsdetails (3–4 Sätze)"},
      {"titel": "Anwendungslogik",    "beschreibung": "Implementierungsdetails (3–4 Sätze)"},
      {"titel": "Benutzeroberfläche", "beschreibung": "Implementierungsdetails (3–4 Sätze)"}
    ],
    "herausforderungen": "Technische Herausforderungen und Lösungsansätze (3–4 Sätze)"
  },
  "qualitaet": {
    "teststrategie": "Teststrategie auf 3 Ebenen (3–4 Sätze)",
    "testfaelle_anzahl": 15,
    "fehler_gefunden": 3,
    "fehler_behoben": 3,
    "testfazit": "Zusammenfassung des Testergebnisses (1–2 Sätze)"
  },
  "fazit": {
    "ergebnis_zusammenfassung": "Was wurde erreicht (2–3 Sätze)",
    "abweichungen": "Zeitabweichungen mit Begründung (2–3 Sätze)",
    "ausblick": "Mögliche Erweiterungen (2–3 Sätze)"
  },
  "glossar": [
    {"term": "API",   "definition": "Application Programming Interface – Schnittstelle..."},
    {"term": "DSGVO", "definition": "Datenschutz-Grundverordnung – EU-Verordnung..."}
  ],
  "quellen": [
    "Autor, T.: Titel des Werks. Verlag, Jahr.",
    "Organisation: Seitenname. Online: https://example.com (abgerufen: 2025-01-10)"
  ],
  "anhang_code": [
    {
      "titel": "Auszug: Kernkomponente XY",
      "sprache": "C# / Python / JavaScript etc.",
      "code": [
        "class Beispiel {",
        "    // Relevanter Codeauszug",
        "}"
      ]
    }
  ]
}
```

**Wichtig:** `phasen[].soll` muss auf exakt **80** summieren.

## Schritt 2: Dokument generieren

```bash
# docx-Modul prüfen (falls nötig: npm install docx)
node -e "require('docx')" 2>/dev/null || npm install docx

# Skript ausführen
SKILL_SCRIPT="$(dirname "$(realpath "$0")")/scripts/generate_ihk_doc.js"
node "$SKILL_SCRIPT" /tmp/ihk_<kurzname>.json /tmp/ihk_output.docx
```

Das Skript `scripts/generate_ihk_doc.js` erzeugt automatisch das komplette Dokument mit
Deckblatt → Inhaltsverzeichnis → Kapitel 1–7 → Glossar → Quellen → Anhang → Eidesstattliche Erklärung.

## Schritt 3: Ergebnis präsentieren

- Vollständiger Pfad zur erzeugten `.docx`-Datei
- Geschätzte Seitenzahl (typisch 15–17 Seiten)
- Welche Felder mit Standardwerten belegt wurden

---

## Dokumentstruktur (fest vorgegeben)

| Abschnitt | Inhalt |
|-----------|--------|
| Deckblatt (Seite 1) | Titelseite mit Prüflingsdaten, Projekttitel |
| Inhaltsverzeichnis (Seite 2) | Alle Kapitel mit Seitenzahlen und Punktführung |
| Kap. 1: Projektbeschreibung | Unternehmen, Ausgangsproblem, Ziel, Abgrenzung |
| Kap. 2: Projektplanung | Vorgehensmodell, Zeitplanung (80h-Tabelle), Wirtschaftlichkeitsanalyse |
| Kap. 3: Analysephase | Ist-Analyse, Soll-Konzept, FA + NFA als Bullet-Listen |
| Kap. 4: Entwurfsphase | Architektur, Datenmodell, UI-Konzept, **Ressourcenplanung (Tabelle)** |
| Kap. 5: Implementierung | Technologieentscheidungen, Kernkomponenten, Herausforderungen |
| Kap. 6: Qualitätssicherung | Teststrategie, Testfall-Tabelle, Testergebnis |
| Kap. 7: Fazit | Soll-Ist-Vergleich (Tabelle mit Abweichung), Reflexion, Ausblick |
| Glossar | Alphabetische Auflistung der Fachbegriffe |
| Quellenverzeichnis | Nummerierte Quellenliste |
| Anhang | Codeauszüge (Monospace, grauer Hintergrund) |
| Eidesstattliche Erklärung | Eigene Seite, Unterschriftsfelder für Prüfling und Ausbilder |

## Qualitätskriterien

- **Sprache:** Professionelles Deutsch, korrekte Fachbegriffe
- **Umlaute:** Deutsche Umlaute (ä, ö, ü, Ä, Ö, Ü, ß) werden **ausdrücklich und durchgehend verwendet**.
  Schreibe niemals Ersatzformen wie „ae", „oe", „ue", „ss" statt der korrekten Umlaute.
  Das gilt für alle Textfelder im JSON sowie für alle generierten Inhalte.
- **Stunden:** Soll-Summe exakt **80h**; Ist-Werte realistisch abweichend
- **Wirtschaftlichkeit:** Konkrete **€-Beträge** in Tabellen, Amortisationsberechnung
- **Umfang:** Mindestens **15 Seiten** Gesamtdokument
- **Keine Leeräume:** Text füllt den Platz; Standardtext für alle leeren Felder
- **Format:** A4, Arial 12pt, 1,5-facher Zeilenabstand, Seitenzahlen in Fußzeile, Kopfzeile mit Titel

Details zu Inhalten und Beispielformulierungen: `references/ihk-struktur.md`
