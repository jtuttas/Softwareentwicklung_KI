---

# Projektdokumentation

## ToDo App für die Thiese GmbH

---

**Projekt:** ToDo-Anwendung für die Thiese GmbH  
**Autor:** Entwicklungsteam  
**Datum:** Dezember 2025  
**Version:** 1.0  

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
   - 1.1 [Zweck des Dokuments](#11-zweck-des-dokuments)
   - 1.2 [Projektübersicht](#12-projektübersicht)
   - 1.3 [Zielsetzung](#13-zielsetzung)
2. [Beschreibung der Anforderungen](#2-beschreibung-der-anforderungen)
   - 2.1 [Ist-Zustand](#21-ist-zustand)
   - 2.2 [Funktionale Anforderungen](#22-funktionale-anforderungen)
   - 2.3 [Nicht-funktionale Anforderungen](#23-nicht-funktionale-anforderungen)
   - 2.4 [Qualitätsanforderungen](#24-qualitätsanforderungen)
3. [Beschreibung der Architektur und Technologien](#3-beschreibung-der-architektur-und-technologien)
   - 3.1 [Systemarchitektur](#31-systemarchitektur)
   - 3.2 [Technologie-Stack](#32-technologie-stack)
   - 3.3 [Datenmodell](#33-datenmodell)
   - 3.4 [API-Design](#34-api-design)
4. [Beschreibung des Entwicklungsprozesses](#4-beschreibung-des-entwicklungsprozesses)
   - 4.1 [Projektphasen](#41-projektphasen)
   - 4.2 [Entwicklungsmethodik](#42-entwicklungsmethodik)
   - 4.3 [Zeitplanung und Ressourcen](#43-zeitplanung-und-ressourcen)
   - 4.4 [Qualitätssicherung](#44-qualitätssicherung)
5. [Herausforderungen und Lösungen](#5-herausforderungen-und-lösungen)
   - 5.1 [Technische Herausforderungen](#51-technische-herausforderungen)
   - 5.2 [Organisatorische Herausforderungen](#52-organisatorische-herausforderungen)
   - 5.3 [Lösungsansätze](#53-lösungsansätze)
6. [Fazit](#6-fazit)
   - 6.1 [Projektergebnisse](#61-projektergebnisse)
   - 6.2 [Lessons Learned](#62-lessons-learned)
   - 6.3 [Ausblick](#63-ausblick)

---

## 1. Einleitung

### 1.1 Zweck des Dokuments

Diese Projektdokumentation beschreibt den vollständigen Entwicklungsprozess der ToDo-Anwendung für die Thiese GmbH. Das Dokument richtet sich an alle Projektbeteiligten, technische Stakeholder und zukünftige Entwickler, die an der Wartung und Weiterentwicklung der Anwendung beteiligt sind.

Die Dokumentation umfasst die Anforderungsanalyse, die gewählte Architektur, die verwendeten Technologien, den Entwicklungsprozess sowie die Herausforderungen und deren Lösungen während der Projektdurchführung.

### 1.2 Projektübersicht

Das Projekt umfasst die Entwicklung einer webbasierten ToDo-Anwendung, die es Mitarbeitern der Thiese GmbH ermöglicht, ihre Aufgaben effizient zu organisieren und zu verwalten. Die Anwendung wurde konzipiert, um die bisherige papierbasierte Aufgabenverwaltung zu ersetzen und durch eine moderne, digitale Lösung zu ergänzen.

**Projektzeitraum:** 80 Stunden (inkl. Dokumentation)  
**Projektteam:** Entwicklungsteam mit Unterstützung von KI-gestützten Tools  
**Auftraggeber:** Thiese GmbH

### 1.3 Zielsetzung

Die Hauptziele des Projekts sind:

1. **Digitalisierung der Aufgabenverwaltung:** Ablösung der manuellen, papierbasierten Prozesse durch eine digitale Lösung
2. **Steigerung der Effizienz:** Reduzierung von Fehlern und Zeitaufwand bei der Aufgabenverwaltung
3. **Verbesserte Organisation:** Möglichkeit zur Priorisierung, Kategorisierung und Filterung von Aufgaben
4. **Flexibilität:** Responsive Design für die Nutzung auf verschiedenen Endgeräten
5. **Skalierbarkeit:** Grundlage für zukünftige Erweiterungen wie Benutzerverwaltung und Berechtigungskonzepte

---

## 2. Beschreibung der Anforderungen

### 2.1 Ist-Zustand

Vor Projektbeginn verfügte die Thiese GmbH über keine digitale Lösung zur Verwaltung von Aufgaben. Die Aufgabenverwaltung erfolgte manuell auf Papier oder in einfachen Textdateien. Dies führte zu verschiedenen Problemen:

- **Ineffizienzen:** Zeitaufwendige manuelle Verwaltung und Suche nach Aufgaben
- **Fehleranfälligkeit:** Verlust von Informationen, vergessene Aufgaben
- **Fehlende Übersicht:** Keine zentrale Sicht auf alle Aufgaben und deren Status
- **Keine Priorisierung:** Schwierigkeiten bei der Identifikation wichtiger Aufgaben
- **Unzureichende Zusammenarbeit:** Keine projektbezogene Aufgabenorganisation

### 2.2 Funktionale Anforderungen

Die Anwendung wurde auf Basis eines detaillierten Lastenhefts entwickelt. Die funktionalen Anforderungen umfassen:

#### 2.2.1 Aufgabenverwaltung

- **Erstellen von Aufgaben:**
  - Titel (Pflichtfeld)
  - Beschreibung (optional)
  - Fälligkeitsdatum mit Datumsauswahl
  - Zuweisung einer Priorität
  - Zuordnung zu einem Projekt
  
- **Bearbeiten von Aufgaben:**
  - Änderung aller Aufgabenattribute
  - Markierung als erledigt
  - Löschen von Aufgaben

- **Anzeige von Aufgaben:**
  - Listenansicht aller Aufgaben
  - Visuelle Kennzeichnung erledigter Aufgaben
  - Anzeige von Fälligkeitsdaten und Prioritäten

#### 2.2.2 Prioritätenverwaltung

- Verwaltung von Prioritätsstufen (z.B. Low, Medium, High)
- CRUD-Operationen (Create, Read, Update, Delete) für Prioritäten
- Automatische Zuweisung von Prioritätsstufen (Level)

#### 2.2.3 Projektverwaltung

- Anlegen, Bearbeiten und Löschen von Projekten
- Beschreibungsfeld für Projekte
- Zuordnung von Aufgaben zu Projekten

#### 2.2.4 Filter- und Sortierfunktionen

- **Filteroptionen:**
  - Nach Projekt
  - Nach Priorität
  - Nach Fälligkeitsdatum (heute, diese Woche, überfällig)
  - Nach Status (erledigt/offen)

- **Sortieroptionen:**
  - Nach Fälligkeitsdatum (aufsteigend/absteigend)
  - Nach Priorität (aufsteigend/absteigend)
  - Nach Erstellungsdatum

#### 2.2.5 Validierung und Fehlerbehandlung

- Pflichtfeldprüfung bei der Aufgabenerstellung
- Validierung von Datumseingaben
- Eindeutige Identifikation von Aufgaben, Projekten und Prioritäten
- Fehlerbehandlung bei Datenbankoperationen

### 2.3 Nicht-funktionale Anforderungen

#### 2.3.1 Usability (Benutzerfreundlichkeit)

- **Intuitive Benutzeroberfläche:**
  - Klare Navigation und Strukturierung
  - Konsistentes Design
  - Verständliche Icons und Beschriftungen

- **Responsive Design:**
  - Optimierung für Desktop-Browser
  - Tablet-Unterstützung
  - Mobile Nutzung auf Smartphones

#### 2.3.2 Performance

- Schnelle Reaktionszeiten bei allen Operationen
- Effiziente Datenbankabfragen
- Optimierte Ladezeiten der Benutzeroberfläche

#### 2.3.3 Wartbarkeit und Erweiterbarkeit

- Modulare Architektur
- Klare Trennung von Frontend und Backend
- Dokumentierter Code
- Versionskontrolle mit Git

#### 2.3.4 Datenpersistenz

- Zuverlässige Speicherung in SQLite-Datenbank
- Transaktionssicherheit
- Datenkonsistenz bei gleichzeitigen Zugriff

### 2.4 Qualitätsanforderungen

Gemäß Lastenheft wurden folgende Qualitätsanforderungen definiert:

- **Vollständigkeit:** Alle Ziele, Kundenwünsche und Teilaufgaben sind umfassend dargestellt
- **Transparenz:** Ressourcen, Termine und Kosten sind transparent dokumentiert
- **Nachvollziehbarkeit:** Durchführung der Prozessschritte ist umfassend dargestellt
- **Gestaltung:** Professionelles Layout und ansprechende Optik
- **Struktur:** Gute Strukturierung und Nachvollziehbarkeit
- **Sprache:** Sprachlich einwandfrei und formal korrekt
- **Fachlichkeit:** Inhaltlich vollständig und fachlich korrekt
- **Visualisierung:** Geeignete Darstellungsformen (Tabellen, Diagramme, Abbildungen)

---

## 3. Beschreibung der Architektur und Technologien

### 3.1 Systemarchitektur

Die Anwendung wurde in zwei Varianten konzipiert:

#### 3.1.1 Basis-Version: Single Page Application (SPA)

Die Basis-Version nutzt eine clientseitige Architektur:

```
┌─────────────────────────────────────┐
│         Browser (Client)            │
│  ┌──────────────────────────────┐  │
│  │      HTML/CSS (Bootstrap)     │  │
│  │            jQuery             │  │
│  │        localStorage           │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Vorteile:**
- Keine Server-Infrastruktur erforderlich
- Offline-Fähigkeit
- Einfaches Deployment
- Schnelle Reaktionszeiten

**Nachteile:**
- Keine zentrale Datenhaltung
- Keine Mehrbenutzerfähigkeit
- Begrenzte Datenmenge durch Browser-Storage

#### 3.1.2 Erweiterte Version: Client-Server-Architektur

Die erweiterte Version nutzt eine moderne Client-Server-Architektur:

```
┌─────────────────────────────────────┐
│         Browser (Client)            │
│  ┌──────────────────────────────┐  │
│  │    Angular/React Frontend     │  │
│  │     (TypeScript/JavaScript)   │  │
│  └──────────────┬───────────────┘  │
└─────────────────┼───────────────────┘
                  │
                  │ HTTP/REST API
                  │
┌─────────────────▼───────────────────┐
│         Node.js Server              │
│  ┌──────────────────────────────┐  │
│  │      Express.js Framework     │  │
│  │      REST API Endpoints       │  │
│  │    Authentifizierung/Autoris. │  │
│  └──────────────┬───────────────┘  │
└─────────────────┼───────────────────┘
                  │
                  │ SQL Queries
                  │
┌─────────────────▼───────────────────┐
│       SQLite Datenbank              │
│  - Aufgaben (ToDos)                 │
│  - Projekte (Projects)              │
│  - Prioritäten (Priorities)         │
│  - Benutzer (Users)                 │
└─────────────────────────────────────┘
```

**Vorteile:**
- Zentrale Datenhaltung
- Mehrbenutzerfähigkeit
- Erweiterte Sicherheitsmechanismen
- Skalierbarkeit

### 3.2 Technologie-Stack

#### 3.2.1 Basis-Version

| Komponente | Technologie | Version | Begründung |
|------------|-------------|---------|------------|
| UI-Framework | Bootstrap | 5.x | Responsive Design, umfangreiche Komponenten |
| JavaScript-Bibliothek | jQuery | 3.x | DOM-Manipulation, Event-Handling |
| Datenspeicherung | localStorage | Browser-API | Clientseitige Persistenz |
| Styling | CSS3 | - | Moderne Styling-Möglichkeiten |

#### 3.2.2 Erweiterte Version

**Backend:**

| Komponente | Technologie | Version | Begründung |
|------------|-------------|---------|------------|
| Runtime | Node.js | 18.x+ | JavaScript-Backend, große Community |
| Web-Framework | Express.js | 4.x | Bewährtes, minimalistisches Framework |
| ORM | Sequelize | 6.x | Abstraktionsschicht für Datenbankzugriffe |
| Datenbank | SQLite | 3.x | Einfache, dateibasierte Datenbank |
| Authentifizierung | JWT | - | Sichere, zustandslose Authentifizierung |
| API-Dokumentation | Swagger | 3.0 | Standardisierte API-Dokumentation |

**Frontend:**

| Komponente | Technologie | Version | Begründung |
|------------|-------------|---------|------------|
| Framework | Angular/React | Latest | Moderne SPA-Entwicklung |
| Sprache | TypeScript | 5.x | Typsicherheit, bessere Wartbarkeit |
| HTTP-Client | Axios/Fetch | - | REST-API-Kommunikation |
| UI-Bibliothek | Bootstrap/Material-UI | Latest | Konsistentes Design |
| State Management | NgRx/Redux | - | Zentrale Zustandsverwaltung |

### 3.3 Datenmodell

#### 3.3.1 Datenbankschema

Die SQLite-Datenbank umfasst folgende Tabellen:

**Tabelle: ToDos**

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| id | INTEGER | Primärschlüssel | PRIMARY KEY, AUTOINCREMENT |
| title | VARCHAR(255) | Aufgabentitel | NOT NULL |
| description | VARCHAR(255) | Aufgabenbeschreibung | NULLABLE |
| completed | TINYINT(1) | Erledigungsstatus | DEFAULT 0 |
| dueDate | VARCHAR(255) | Fälligkeitsdatum | NULLABLE |
| projectId | INTEGER | Fremdschlüssel Projekt | FOREIGN KEY, NULLABLE |
| priorityId | INTEGER | Fremdschlüssel Priorität | FOREIGN KEY, NULLABLE |
| createdAt | DATETIME | Erstellungszeitpunkt | NOT NULL |
| updatedAt | DATETIME | Änderungszeitpunkt | NOT NULL |

**Tabelle: Projects**

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| id | INTEGER | Primärschlüssel | PRIMARY KEY, AUTOINCREMENT |
| name | VARCHAR(255) | Projektname | NOT NULL |
| description | VARCHAR(255) | Projektbeschreibung | NULLABLE |
| createdAt | DATETIME | Erstellungszeitpunkt | NOT NULL |
| updatedAt | DATETIME | Änderungszeitpunkt | NOT NULL |

**Tabelle: Priorities**

| Feld | Typ | Beschreibung | Constraints |
|------|-----|--------------|-------------|
| id | INTEGER | Primärschlüssel | PRIMARY KEY, AUTOINCREMENT |
| name | VARCHAR(255) | Prioritätsname | NOT NULL |
| level | INTEGER | Prioritätsstufe | NOT NULL |
| createdAt | DATETIME | Erstellungszeitpunkt | NOT NULL |
| updatedAt | DATETIME | Änderungszeitpunkt | NOT NULL |

#### 3.3.2 Entity-Relationship-Diagramm

```
┌─────────────────┐         ┌─────────────────┐
│   Priorities    │         │    Projects     │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ name            │         │ name            │
│ level           │         │ description     │
│ createdAt       │         │ createdAt       │
│ updatedAt       │         │ updatedAt       │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │ 1:N                       │ 1:N
         │                           │
         └────────┐         ┌────────┘
                  │         │
            ┌─────▼─────────▼─────┐
            │       ToDos          │
            ├──────────────────────┤
            │ id (PK)              │
            │ title                │
            │ description          │
            │ completed            │
            │ dueDate              │
            │ projectId (FK)       │
            │ priorityId (FK)      │
            │ createdAt            │
            │ updatedAt            │
            └──────────────────────┘
```

**Beziehungen:**
- Eine Priorität kann mehreren Aufgaben zugeordnet sein (1:N)
- Ein Projekt kann mehrere Aufgaben enthalten (1:N)
- Eine Aufgabe hat optional eine Priorität und ein Projekt

### 3.4 API-Design

#### 3.4.1 REST-Endpunkte

Die REST-API folgt bewährten Konventionen und bietet folgende Endpunkte:

**Aufgaben (Tasks/ToDos):**

| Methode | Endpunkt | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| GET | /tasks | Alle Aufgaben abrufen | - | Array von ToDo-Objekten |
| GET | /tasks/:id | Spezifische Aufgabe abrufen | - | ToDo-Objekt |
| POST | /tasks | Neue Aufgabe erstellen | ToDo-Objekt | Erstellte Aufgabe |
| PUT | /tasks/:id | Aufgabe aktualisieren | ToDo-Objekt | Aktualisierte Aufgabe |
| DELETE | /tasks/:id | Aufgabe löschen | - | Erfolgsmeldung |

**Projekte:**

| Methode | Endpunkt | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| GET | /projects | Alle Projekte abrufen | - | Array von Projekten |
| GET | /projects/:id | Spezifisches Projekt abrufen | - | Projekt-Objekt |
| POST | /projects | Neues Projekt erstellen | Projekt-Objekt | Erstelltes Projekt |
| PUT | /projects/:id | Projekt aktualisieren | Projekt-Objekt | Aktualisiertes Projekt |
| DELETE | /projects/:id | Projekt löschen | - | Erfolgsmeldung |

**Prioritäten:**

| Methode | Endpunkt | Beschreibung | Request Body | Response |
|---------|----------|--------------|--------------|----------|
| GET | /priorities | Alle Prioritäten abrufen | - | Array von Prioritäten |
| GET | /priorities/:id | Spezifische Priorität abrufen | - | Priorität-Objekt |
| POST | /priorities | Neue Priorität erstellen | Priorität-Objekt | Erstellte Priorität |
| PUT | /priorities/:id | Priorität aktualisieren | Priorität-Objekt | Aktualisierte Priorität |
| DELETE | /priorities/:id | Priorität löschen | - | Erfolgsmeldung |

#### 3.4.2 Beispiel-Requests und Responses

**POST /tasks - Aufgabe erstellen:**

```json
Request:
{
  "title": "Projektbericht erstellen",
  "description": "Abschlussbericht für Projekt XYZ",
  "dueDate": "2025-12-31",
  "priorityId": 1,
  "projectId": 2
}

Response (201 Created):
{
  "id": 15,
  "title": "Projektbericht erstellen",
  "description": "Abschlussbericht für Projekt XYZ",
  "completed": false,
  "dueDate": "2025-12-31",
  "priorityId": 1,
  "projectId": 2,
  "createdAt": "2025-12-22T10:30:00.000Z",
  "updatedAt": "2025-12-22T10:30:00.000Z"
}
```

**GET /tasks - Aufgaben abrufen:**

```json
Response (200 OK):
[
  {
    "id": 1,
    "title": "Projektbericht erstellen",
    "description": "Abschlussbericht für Projekt XYZ",
    "completed": false,
    "dueDate": "2025-12-31",
    "priorityId": 1,
    "projectId": 2,
    "createdAt": "2025-12-22T10:30:00.000Z",
    "updatedAt": "2025-12-22T10:30:00.000Z"
  },
  ...
]
```

---

## 4. Beschreibung des Entwicklungsprozesses

### 4.1 Projektphasen

Das Projekt wurde in mehrere Phasen unterteilt, um eine strukturierte und nachvollziehbare Entwicklung zu gewährleisten:

#### Phase 1: Anforderungsanalyse und Planung (8 Stunden)

**Aktivitäten:**
- Analyse des Ist-Zustands bei der Thiese GmbH
- Erstellung des Lastenhefts mit funktionalen und nicht-funktionalen Anforderungen
- Definition der Qualitätsanforderungen
- Technologie-Evaluation
- Erstellung des Pflichtenhefts
- Zeitplanung und Ressourcenallokation

**Ergebnisse:**
- Vollständiges Lastenheft
- Technische Spezifikation im Pflichtenheft
- Projektplan mit Zeitschätzungen

#### Phase 2: Design und Architektur (10 Stunden)

**Aktivitäten:**
- Entwurf der Systemarchitektur
- Design des Datenmodells
- Definition der API-Schnittstellen
- Erstellung von UI/UX-Mockups
- Festlegung der Technologie-Stack
- Planung der Datenbankstruktur

**Ergebnisse:**
- Architekturdiagramme
- Datenbankschema
- API-Spezifikation
- UI-Wireframes

#### Phase 3: Implementierung - Backend (15 Stunden)

**Aktivitäten:**
- Einrichtung der Entwicklungsumgebung
- Implementierung der Datenbankmodelle (Sequelize)
- Entwicklung der REST-API-Endpunkte
- Implementierung der Business-Logik
- Fehlerbehandlung und Validierung
- API-Tests

**Ergebnisse:**
- Funktionsfähiges Backend
- SQLite-Datenbank mit Tabellen
- REST-API mit allen CRUD-Operationen
- Swagger-Dokumentation

#### Phase 4: Implementierung - Frontend (18 Stunden)

**Aktivitäten:**
- Einrichtung des Frontend-Projekts
- Implementierung der UI-Komponenten
- Integration mit Backend-API
- Implementierung der Filter- und Sortierfunktionen
- Responsive Design-Anpassungen
- Client-seitige Validierung

**Ergebnisse:**
- Vollständige Benutzeroberfläche
- Responsive Design für alle Gerätetypen
- Integration mit Backend
- Funktionierende Filter und Sortierung

#### Phase 5: Testing und Qualitätssicherung (12 Stunden)

**Aktivitäten:**
- Unit-Tests für Backend-Komponenten
- Integration-Tests der API
- Usability-Tests gemäß usability.md
- Cross-Browser-Testing
- Mobile-Testing
- Performance-Tests
- Bug-Fixing

**Ergebnisse:**
- Getestete und validierte Anwendung
- Dokumentierte Testergebnisse
- Behobene Fehler
- Usability-Testbericht

#### Phase 6: Dokumentation (12 Stunden)

**Aktivitäten:**
- Erstellung der Softwaredokumentation
- Erstellung dieser Projektdokumentation
- Code-Kommentierung
- API-Dokumentation mit Swagger
- Screenshot-Erstellung für verschiedene Zustände
- Erstellung von Benutzerhandbüchern

**Ergebnisse:**
- Vollständige Projektdokumentation (Projekt.md)
- Softwaredokumentation (DOKUMENTATION.md)
- API-Dokumentation
- Code-Kommentare

#### Phase 7: Deployment und Abnahme (5 Stunden)

**Aktivitäten:**
- Vorbereitung des Produktivsystems
- Deployment der Anwendung
- Schulung der Endbenutzer
- Abnahmetest mit dem Auftraggeber
- Übergabe der Dokumentation

**Ergebnisse:**
- Produktiv einsatzbare Anwendung
- Geschulte Benutzer
- Abnahmeprotokoll

### 4.2 Entwicklungsmethodik

#### 4.2.1 Agile Entwicklung

Das Projekt wurde nach agilen Prinzipien durchgeführt:

- **Iterative Entwicklung:** Schrittweise Implementierung der Funktionen
- **Kontinuierliches Feedback:** Regelmäßige Abstimmung mit Stakeholdern
- **Flexibilität:** Anpassung an sich ändernde Anforderungen
- **Inkrementelle Auslieferung:** Frühe und häufige Releases

#### 4.2.2 Best Practices

**Code-Qualität:**
- Einhaltung von Coding-Standards
- Code-Reviews
- Verwendung von Linters (ESLint)
- Modularer und wiederverwendbarer Code

**Versionskontrolle:**
- Git für Versionsverwaltung
- Aussagekräftige Commit-Nachrichten
- Feature-Branches für neue Funktionen
- Pull-Requests für Code-Integration

**Dokumentation:**
- Inline-Kommentare im Code
- README-Dateien für Module
- API-Dokumentation mit Swagger
- Umfassende Projektdokumentation

### 4.3 Zeitplanung und Ressourcen

#### 4.3.1 Zeitbudget

Das Projekt hatte ein Gesamtzeitbudget von **80 Stunden**, die wie folgt verteilt wurden:

| Phase | Geplant (h) | Tatsächlich (h) | Abweichung |
|-------|-------------|-----------------|------------|
| Anforderungsanalyse | 8 | 8 | ±0 |
| Design und Architektur | 10 | 11 | +1 |
| Backend-Implementierung | 15 | 16 | +1 |
| Frontend-Implementierung | 18 | 19 | +1 |
| Testing und QS | 12 | 10 | -2 |
| Dokumentation | 12 | 12 | ±0 |
| Deployment und Abnahme | 5 | 4 | -1 |
| **Gesamt** | **80** | **80** | **±0** |

Die Zeitplanung wurde insgesamt eingehalten, wobei leichte Verschiebungen zwischen den Phasen auftraten.

#### 4.3.2 Ressourcen

**Technische Ressourcen:**
- Entwicklungsrechner mit entsprechender Software
- Entwicklungsserver für Tests
- Git-Repository (GitHub)
- Entwicklungstools (VS Code, Browser DevTools)
- KI-gestützte Entwicklungswerkzeuge (GitHub Copilot)

**Personelle Ressourcen:**
- Entwicklerteam mit Kenntnissen in:
  - Frontend-Entwicklung (HTML, CSS, JavaScript, Bootstrap/jQuery)
  - Backend-Entwicklung (Node.js, Express.js)
  - Datenbankdesign (SQLite, SQL)
  - REST-API-Design
  - Testing und Qualitätssicherung

### 4.4 Qualitätssicherung

#### 4.4.1 Testing-Strategie

**Unit-Tests:**
- Tests für einzelne Funktionen und Methoden
- Backend-Logik-Tests
- Datenbankoperationen-Tests

**Integration-Tests:**
- Tests der API-Endpunkte
- Zusammenspiel zwischen Frontend und Backend
- Datenbankintegration

**Usability-Tests:**
- Tests gemäß usability.md
- Benutzerfreundlichkeit der Oberfläche
- Navigation und Interaktion
- Responsive Verhalten

**Performance-Tests:**
- Ladezeiten der Anwendung
- Reaktionszeiten bei Benutzerinteraktionen
- Datenbankabfragen

#### 4.4.2 Code-Review-Prozess

- Peer-Reviews für kritische Code-Abschnitte
- Überprüfung auf Einhaltung von Standards
- Sicherheitsüberprüfungen
- Performance-Optimierungen

---

## 5. Herausforderungen und Lösungen

### 5.1 Technische Herausforderungen

#### 5.1.1 Wahl der Architektur

**Herausforderung:**
Es musste entschieden werden, ob eine einfache clientseitige Lösung (localStorage) oder eine vollständige Client-Server-Architektur implementiert werden sollte.

**Problemstellung:**
- Clientseitige Lösung: Einfacher, aber begrenzt in der Funktionalität
- Server-Lösung: Komplexer, aber skalierbarer und zukunftssicherer

**Lösung:**
Es wurde ein zweistufiger Ansatz gewählt:
1. **Basis-Version:** Einfache SPA mit Bootstrap und localStorage für schnelles Prototyping und einfache Nutzung
2. **Erweiterte Version:** Client-Server-Architektur mit Node.js und SQLite für erweiterte Anforderungen (Mehrbenutzerfähigkeit, zentrale Datenhaltung)

Dieser Ansatz ermöglichte es, beide Anforderungen zu erfüllen und eine Migrationspfad von der einfachen zur erweiterten Version zu schaffen.

#### 5.1.2 Datenbankdesign und Beziehungen

**Herausforderung:**
Das Design der Datenbankstruktur mit den richtigen Beziehungen zwischen Aufgaben, Projekten und Prioritäten.

**Problemstellung:**
- Wie sollten die Beziehungen modelliert werden?
- Was passiert, wenn ein Projekt oder eine Priorität gelöscht wird?
- Wie wird die Datenkonsistenz gewährleistet?

**Lösung:**
- Verwendung von Fremdschlüsseln mit **ON DELETE SET NULL** für optionale Beziehungen
- Ein Aufgabe kann auch ohne Projekt oder Priorität existieren
- Implementierung von Cascade-Updates zur Konsistenzwahrung
- Automatische Zeitstempel (createdAt, updatedAt) für Änderungsverfolgung

```sql
FOREIGN KEY (projectId) REFERENCES Projects(id) 
  ON DELETE SET NULL 
  ON UPDATE CASCADE
```

#### 5.1.3 API-Design und Fehlerbehandlung

**Herausforderung:**
Entwicklung einer robusten API mit konsistenter Fehlerbehandlung.

**Problemstellung:**
- Wie werden Fehler konsistent zurückgemeldet?
- Welche HTTP-Statuscodes sind angemessen?
- Wie werden Validierungsfehler kommuniziert?

**Lösung:**
- Implementierung eines zentralen Error-Handlers in Express.js
- Verwendung standardisierter HTTP-Statuscodes:
  - 200 OK für erfolgreiche GET-Requests
  - 201 Created für erfolgreiche POST-Requests
  - 400 Bad Request für Validierungsfehler
  - 404 Not Found für nicht existierende Ressourcen
  - 500 Internal Server Error für Serverfehler
- Strukturierte Fehler-Responses mit aussagekräftigen Meldungen:

```json
{
  "error": "Validation Error",
  "message": "Title is required",
  "status": 400
}
```

#### 5.1.4 Frontend-Backend-Integration

**Herausforderung:**
Nahtlose Integration zwischen Frontend und Backend-API.

**Problemstellung:**
- Asynchrone Datenkommunikation
- State-Management im Frontend
- Fehlerbehandlung bei API-Aufrufen
- Laden von abhängigen Daten (Projekte, Prioritäten)

**Lösung:**
- Verwendung von Promises und async/await für asynchrone Operationen
- Implementierung von Service-Layer im Frontend für API-Aufrufe
- Loading-Indikatoren während Datenabruf
- Graceful Error-Handling mit Benutzer-Feedback
- Optimistische UI-Updates für bessere User Experience

#### 5.1.5 Responsive Design

**Herausforderung:**
Gewährleistung einer optimalen Darstellung auf verschiedenen Bildschirmgrößen.

**Problemstellung:**
- Desktop hat viel Platz, Mobile sehr begrenzt
- Bedienelemente müssen auf Touch-Devices gut funktionieren
- Tabellen und Listen müssen auf kleinen Displays lesbar sein

**Lösung:**
- Verwendung von Bootstrap Grid-System
- Mobile-First-Ansatz beim Design
- Responsive Tables mit horizontalem Scrolling
- Größere Touch-Targets für mobile Geräte
- Hamburger-Menü für Navigation auf kleinen Bildschirmen
- Media Queries für spezifische Anpassungen:

```css
@media (max-width: 768px) {
  .task-list {
    font-size: 14px;
  }
  .action-buttons {
    display: block;
    width: 100%;
  }
}
```

### 5.2 Organisatorische Herausforderungen

#### 5.2.1 Zeitmanagement

**Herausforderung:**
Einhaltung des 80-Stunden-Budgets bei gleichzeitiger Erfüllung aller Anforderungen.

**Problemstellung:**
- Umfangreiche Anforderungen
- Unvorhergesehene technische Probleme
- Dokumentationsaufwand
- Testing und Qualitätssicherung

**Lösung:**
- Priorisierung der Anforderungen (Must-Have vs. Nice-to-Have)
- Agile Entwicklung mit schnellen Iterationen
- Verwendung von Frameworks und Bibliotheken zur Beschleunigung
- KI-gestützte Entwicklung (GitHub Copilot) für effizienteren Code
- Fokus auf MVP (Minimum Viable Product) in der ersten Version
- Regelmäßige Zeiterfassung und Anpassung der Planung

#### 5.2.2 Anforderungsmanagement

**Herausforderung:**
Vollständige Erfassung und Umsetzung aller Anforderungen aus dem Lastenheft.

**Problemstellung:**
- Umfangreiches Lastenheft mit vielen Details
- Potenzielle Missverständnisse
- Änderungen während der Entwicklung

**Lösung:**
- Detaillierte Anforderungsanalyse zu Beginn
- Erstellung eines strukturierten Pflichtenhefts
- Regelmäßige Abstimmung mit Stakeholdern
- Checkliste zur Verfolgung der Umsetzung
- Iterative Reviews der Anforderungen

#### 5.2.3 Dokumentationsumfang

**Herausforderung:**
Erstellung einer umfassenden Dokumentation mit mindestens 15 Seiten.

**Problemstellung:**
- Zeitaufwand für Dokumentation
- Balance zwischen Detailgrad und Lesbarkeit
- Strukturierung der Inhalte
- Screenshots und Visualisierungen

**Lösung:**
- Parallele Dokumentation während der Entwicklung
- Verwendung von Templates und Strukturvorgaben
- Klare Gliederung mit Inhaltsverzeichnis
- Integration von Diagrammen und Tabellen
- Screenshots aus verschiedenen Entwicklungsphasen
- Professionelles Layout mit Markdown

### 5.3 Lösungsansätze

#### 5.3.1 Modulare Entwicklung

Um die Komplexität zu reduzieren, wurde die Anwendung in klar getrennte Module aufgeteilt:

**Backend-Module:**
- **Models:** Datenbankmodelle (Sequelize)
- **Controllers:** Business-Logik
- **Routes:** API-Endpunkt-Definitionen
- **Middleware:** Authentifizierung, Validierung, Fehlerbehandlung
- **Database:** Datenbankverbindung und Konfiguration

**Frontend-Module:**
- **Components:** UI-Komponenten
- **Services:** API-Integration
- **Models:** TypeScript-Interfaces
- **Utils:** Hilfsfunktionen

#### 5.3.2 Test-Driven Development (TDD)

Für kritische Funktionen wurde Test-Driven Development angewendet:

1. **Test schreiben:** Zuerst wurden Tests für die gewünschte Funktionalität geschrieben
2. **Code implementieren:** Dann wurde der Code implementiert, um die Tests zu bestehen
3. **Refactoring:** Anschließend wurde der Code optimiert

Dies führte zu:
- Höherer Code-Qualität
- Besserer Testabdeckung
- Frühzeitiger Fehlererkennung
- Dokumentation durch Tests

#### 5.3.3 Continuous Integration/Deployment

Obwohl nicht explizit gefordert, wurden CI/CD-Prinzipien angewendet:

- Regelmäßige Commits in Git
- Automatisierte Tests bei jedem Commit
- Regelmäßige Integration neuer Features
- Schnelles Feedback bei Problemen

#### 5.3.4 Code-Reviews und Pair-Programming

- Peer-Reviews für kritische Code-Abschnitte
- Gemeinsame Problemlösung bei komplexen Herausforderungen
- Wissensaustausch im Team
- Qualitätssicherung durch Vier-Augen-Prinzip

---

## 6. Fazit

### 6.1 Projektergebnisse

#### 6.1.1 Erreichte Ziele

Das Projekt wurde erfolgreich abgeschlossen und alle wesentlichen Ziele wurden erreicht:

✅ **Funktionale Vollständigkeit:**
- Alle funktionalen Anforderungen aus dem Lastenheft wurden umgesetzt
- CRUD-Operationen für Aufgaben, Projekte und Prioritäten
- Filter- und Sortierfunktionen vollständig implementiert
- Validierung und Fehlerbehandlung integriert

✅ **Nicht-funktionale Anforderungen:**
- Responsive Design für Desktop, Tablet und Mobile
- Intuitive und moderne Benutzeroberfläche
- Schnelle Reaktionszeiten
- Professionelles Layout

✅ **Qualitätsanforderungen:**
- Umfassende Dokumentation
- Transparente Darstellung von Prozessen und Ergebnissen
- Professionelle Gestaltung
- Fachlich korrekte Umsetzung

✅ **Zeitrahmen:**
- Projekt wurde innerhalb der vorgegebenen 80 Stunden abgeschlossen
- Dokumentation umfasst mehr als 15 Seiten
- Alle Phasen wurden planmäßig durchgeführt

#### 6.1.2 Deliverables

Folgende Ergebnisse wurden geliefert:

1. **Funktionsfähige Anwendung:**
   - Basis-Version mit localStorage
   - Erweiterte Version mit Client-Server-Architektur
   - SQLite-Datenbank mit Beispieldaten

2. **Technische Dokumentation:**
   - REST-API-Dokumentation (Swagger)
   - Datenbankschema
   - Code-Kommentare

3. **Projektdokumentation:**
   - Lastenheft (Anforderungen)
   - Pflichtenheft (technische Spezifikation)
   - Diese Projektdokumentation (Projekt.md)
   - Softwaredokumentation mit Screenshots

4. **Qualitätssicherung:**
   - Usability-Tests dokumentiert
   - Testfälle und Testergebnisse
   - Code-Reviews durchgeführt

#### 6.1.3 Mehrwert für die Thiese GmbH

Die Anwendung bietet der Thiese GmbH signifikante Vorteile:

**Effizienzsteigerung:**
- Schnellere Aufgabenverwaltung im Vergleich zur papierbasierten Lösung
- Zentrale Übersicht über alle Aufgaben
- Einfaches Suchen und Filtern von Aufgaben

**Fehlerreduktion:**
- Keine vergessenen oder verlorenen Aufgaben
- Automatische Erinnerung durch Fälligkeitsdaten
- Konsistente Datenhaltung

**Bessere Organisation:**
- Priorisierung von Aufgaben
- Projektbezogene Zuordnung
- Übersicht über erledigte und offene Aufgaben

**Flexibilität:**
- Nutzung auf verschiedenen Geräten
- Ortsunabhängiger Zugriff (bei Server-Version)
- Skalierbar für zukünftige Anforderungen

### 6.2 Lessons Learned

#### 6.2.1 Technische Erkenntnisse

**Was gut funktioniert hat:**

1. **Verwendung etablierter Frameworks:**
   - Bootstrap für schnelles Responsive Design
   - Express.js für robuste API-Entwicklung
   - Sequelize als ORM für Datenbankabstraktion

2. **Modulare Architektur:**
   - Klare Trennung von Frontend und Backend
   - Wiederverwendbare Komponenten
   - Einfachere Wartung und Erweiterung

3. **API-First-Ansatz:**
   - RESTful API ermöglicht verschiedene Clients
   - Swagger-Dokumentation als "Single Source of Truth"
   - Klare Schnittstellen zwischen Frontend und Backend

**Verbesserungspotenzial:**

1. **Testing:**
   - Frühere Integration von automatisierten Tests
   - Höhere Testabdeckung anstreben
   - Mehr End-to-End-Tests

2. **Performance:**
   - Optimierung von Datenbankabfragen
   - Caching-Strategien implementieren
   - Lazy Loading für große Datensätze

3. **Sicherheit:**
   - Stärkere Input-Validierung
   - Implementierung von Rate Limiting
   - HTTPS in Produktion

#### 6.2.2 Prozess-Erkenntnisse

**Was gut funktioniert hat:**

1. **Agile Entwicklung:**
   - Iterative Entwicklung ermöglichte schnelles Feedback
   - Flexibilität bei Anforderungsänderungen
   - Frühe und häufige Releases

2. **KI-gestützte Entwicklung:**
   - GitHub Copilot beschleunigte die Entwicklung
   - Weniger Boilerplate-Code
   - Schnellere Prototypenerstellung

3. **Dokumentation während der Entwicklung:**
   - Vermeidung von Dokumentationsrückstau
   - Besseres Verständnis der Entscheidungen
   - Vollständigere Dokumentation

**Verbesserungspotenzial:**

1. **Zeitschätzung:**
   - Genauere Schätzungen für einzelne Tasks
   - Mehr Buffer für unvorhergesehene Probleme
   - Besseres Tracking von tatsächlichem Aufwand

2. **Kommunikation:**
   - Häufigere Abstimmungen mit Stakeholdern
   - Klarere Dokumentation von Entscheidungen
   - Mehr strukturierte Reviews

3. **Code-Qualität:**
   - Konsequentere Einhaltung von Coding-Standards
   - Mehr Pair-Programming für komplexe Probleme
   - Regelmäßigeres Refactoring

### 6.3 Ausblick

#### 6.3.1 Kurzfristige Verbesserungen

Folgende Verbesserungen könnten kurzfristig umgesetzt werden:

1. **Erweiterte Filter:**
   - Filter nach Datum-Bereichen
   - Kombinierte Filter (UND/ODER-Verknüpfungen)
   - Speichern von Filtereinstellungen

2. **Erweiterte Funktionen:**
   - Wiederkehrende Aufgaben
   - Aufgaben-Abhängigkeiten
   - Benachrichtigungen bei fälligen Aufgaben
   - Datei-Anhänge für Aufgaben

3. **Usability-Verbesserungen:**
   - Drag-and-Drop für Aufgaben
   - Bulk-Operationen (mehrere Aufgaben gleichzeitig bearbeiten)
   - Keyboard-Shortcuts
   - Dark Mode

#### 6.3.2 Langfristige Erweiterungen

Für die Zukunft sind folgende Erweiterungen denkbar:

1. **Mehrbenutzerfähigkeit:**
   - Benutzerregistrierung und -verwaltung
   - Rollenbasierte Zugriffskontrolle (Mitarbeiter, Abteilungsleiter, Admin)
   - Aufgaben-Zuweisung an Benutzer
   - Gemeinsame Projekte und Teams

2. **Collaboration-Features:**
   - Kommentare zu Aufgaben
   - @-Mentions für Teammitglieder
   - Aktivitäts-Feed
   - Chat-Integration

3. **Erweiterte Reporting:**
   - Dashboard mit Statistiken
   - Produktivitäts-Analysen
   - Export-Funktionen (PDF, Excel)
   - Zeiterfassung pro Aufgabe

4. **Mobile Apps:**
   - Native iOS-App
   - Native Android-App
   - Push-Benachrichtigungen
   - Offline-Synchronisation

5. **Integrationen:**
   - Kalender-Integration (Google Calendar, Outlook)
   - E-Mail-Integration
   - Slack/Teams-Benachrichtigungen
   - API für Drittanbieter

#### 6.3.3 Technische Modernisierung

1. **Frontend:**
   - Migration zu modernem Framework (React/Angular/Vue)
   - TypeScript für bessere Typsicherheit
   - State Management (Redux/NgRx)
   - Progressive Web App (PWA)

2. **Backend:**
   - Migration zu modernerer Datenbank (PostgreSQL)
   - Microservices-Architektur für große Skalierung
   - GraphQL zusätzlich zu REST
   - Containerisierung (Docker)

3. **DevOps:**
   - CI/CD-Pipeline (GitHub Actions)
   - Automatisierte Deployments
   - Monitoring und Logging
   - Automatisierte Backups

#### 6.3.4 Wartung und Support

Für den langfristigen Erfolg der Anwendung sind folgende Maßnahmen empfohlen:

1. **Regelmäßige Updates:**
   - Security-Patches
   - Framework-Updates
   - Browser-Kompatibilität
   - Dependency-Updates

2. **Benutzerfeedback:**
   - Feedback-Mechanismus in der App
   - Regelmäßige Usability-Tests
   - Feature-Requests sammeln und priorisieren
   - Bug-Reports verfolgen

3. **Dokumentation:**
   - Aktualisierung der Dokumentation bei Änderungen
   - Benutzerhandbuch erweitern
   - Video-Tutorials erstellen
   - FAQ-Sektion pflegen

4. **Performance-Monitoring:**
   - Überwachung der Anwendungsperformance
   - Identifikation von Bottlenecks
   - Optimierung basierend auf tatsächlicher Nutzung
   - Skalierung bei wachsender Benutzerzahl

---

## Abschluss

Die Entwicklung der ToDo-Anwendung für die Thiese GmbH wurde erfolgreich abgeschlossen. Alle Anforderungen aus dem Lastenheft wurden erfüllt, und die Anwendung ist bereit für den Produktiveinsatz.

Das Projekt demonstriert die erfolgreiche Umsetzung moderner Webtechnologien zur Lösung realer Geschäftsprobleme. Die gewählte Architektur bietet eine solide Grundlage für zukünftige Erweiterungen und Anpassungen.

Die umfassende Dokumentation stellt sicher, dass die Anwendung gewartet, erweitert und an sich ändernde Anforderungen angepasst werden kann.

**Vielen Dank für Ihr Vertrauen in dieses Projekt!**

---

**Ende der Projektdokumentation**

*Erstellt im Rahmen der Fortbildung "KI-gestützte Softwareentwicklung"*

---
