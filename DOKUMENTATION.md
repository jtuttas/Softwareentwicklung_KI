# ToDo App - Dokumentation

## Übersicht

Die ToDo App ist eine clientseitige Webanwendung zur Verwaltung von Aufgaben, Projekten und Prioritäten. Die Anwendung speichert alle Daten lokal im Browser mittels localStorage und bietet ein responsives Design für Desktop und Mobile.

## Technische Umsetzung

### Technologie-Stack

- **HTML5**: Strukturierung der Benutzeroberfläche
- **CSS3**: Responsives Design ohne externe Frameworks
- **JavaScript (Vanilla)**: Anwendungslogik ohne externe Bibliotheken
- **localStorage**: Persistente Datenspeicherung im Browser

### Architektur

Die Anwendung ist als Single Page Application (SPA) implementiert:
- `index.html`: Hauptstruktur und UI-Komponenten
- `style.css`: Alle Styles für Desktop und Mobile
- `app.js`: Komplette Anwendungslogik und Datenmanagement

### Datenmodell

#### Aufgaben (Tasks)
```javascript
{
  "id": "uuid",
  "title": "String",
  "dueDate": "YYYY-MM-DD",
  "priorityId": "String",
  "projectId": "String",
  "done": false
}
```

#### Prioritäten (Priorities)
```javascript
{
  "id": "uuid",
  "name": "String"
}
```

#### Projekte (Projects)
```javascript
{
  "id": "uuid",
  "name": "String"
}
```

## Funktionen

### 1. Aufgabenverwaltung

#### Aufgabe anlegen
- Benutzer klickt auf "➕ Neue Aufgabe"
- Modal-Dialog öffnet sich
- Pflichtfeld: Titel
- Optional: Fälligkeitsdatum, Priorität, Projektzuordnung
- Speichern erstellt neue Aufgabe in localStorage

#### Aufgabe bearbeiten
- Klick auf "✏️ Bearbeiten" bei einer Aufgabe
- Modal öffnet sich mit vorausgefüllten Daten
- Änderungen werden beim Speichern übernommen

#### Aufgabe löschen
- Klick auf "🗑️ Löschen"
- Bestätigungsdialog erscheint
- Nach Bestätigung wird Aufgabe gelöscht

#### Aufgabe als erledigt markieren
- Klick auf "✓ Erledigt"
- Aufgabe wird ausgegraut und durchgestrichen
- Button ändert sich zu "🔄 Wiederherstellen"

### 2. Prioritätenverwaltung

Die Anwendung wird mit drei Standard-Prioritäten initialisiert:
- **Low** (Niedrig) - Hellblau
- **Medium** (Mittel) - Gelb
- **High** (Hoch) - Rot

Benutzer können:
- Neue Prioritäten hinzufügen
- Bestehende Prioritäten bearbeiten
- Prioritäten löschen (mit automatischer Bereinigung in Aufgaben)

### 3. Projektverwaltung

Benutzer können:
- Projekte anlegen
- Projekte bearbeiten
- Projekte löschen (mit automatischer Bereinigung in Aufgaben)
- Aufgaben Projekten zuordnen

### 4. Filter- und Suchfunktionen

#### Suche
- Textfeld für Aufgabensuche
- Echtzeit-Filterung nach Titel

#### Filter
- **Nach Priorität**: Dropdown mit allen verfügbaren Prioritäten
- **Nach Projekt**: Dropdown mit allen verfügbaren Projekten
- Mehrfache Filter können kombiniert werden

#### Sortierung
- Nach Fälligkeitsdatum (aufsteigend/absteigend)
- Nach Priorität (aufsteigend/absteigend)

### 5. Visuelle Hervorhebungen

- **Überfällige Aufgaben**: Rote Markierung am linken Rand
- **Bald fällige Aufgaben** (≤3 Tage): Gelbe Markierung am linken Rand
- **Erledigte Aufgaben**: Ausgegraut mit durchgestrichenem Text

## Benutzeroberfläche

### Desktop-Ansicht

#### Aufgaben-Tab (Leer)
![Desktop - Aufgaben leer](https://github.com/user-attachments/assets/b4dec12c-8ccd-4035-b438-afa78a342f53)

Die Hauptansicht zeigt:
- Navigation mit drei Tabs (Aufgaben, Projekte, Prioritäten)
- Button zum Erstellen neuer Aufgaben
- Suchfeld und Filter-Optionen
- Hinweis "Keine Aufgaben gefunden" wenn leer

#### Aufgabe erstellen/bearbeiten
![Desktop - Aufgabe Modal](https://github.com/user-attachments/assets/62de142c-eee5-4db4-bb98-bf0e0c3f9436)

Der Modal-Dialog enthält:
- Titelfeld (Pflichtfeld)
- Datumsauswahl für Fälligkeit
- Dropdown für Priorität
- Dropdown für Projektzuordnung
- Abbrechen und Speichern Buttons

#### Aufgaben mit Daten
![Desktop - Aufgaben mit Einträgen](https://github.com/user-attachments/assets/5e25d4a0-4a3a-48a0-b44c-3a1ccacd6632)

Aufgabenkarten zeigen:
- Titel der Aufgabe
- Fälligkeitsdatum mit Kalender-Icon
- Priorität als farbiges Badge
- Projektzuordnung (falls vorhanden)
- Aktionsbuttons (Erledigt, Bearbeiten, Löschen)

#### Projekte-Tab
![Desktop - Projekte](https://github.com/user-attachments/assets/8336ffbe-4cfb-44e2-8a4b-b6d4b2479f9a)

Projekt-Verwaltung mit:
- Button zum Erstellen neuer Projekte
- Liste aller Projekte
- Bearbeiten und Löschen Buttons

#### Prioritäten-Tab
![Desktop - Prioritäten](https://github.com/user-attachments/assets/cad2d26e-05df-4762-9182-798548eb2ef6)

Prioritäten-Verwaltung zeigt:
- Alle Prioritäten mit farblicher Kennzeichnung
- Standard-Prioritäten: Low (hellblau), Medium (gelb), High (rot)
- Bearbeiten und Löschen Optionen

### Mobile-Ansicht

#### Aufgaben auf Smartphone
![Mobile - Aufgaben](https://github.com/user-attachments/assets/2a7c88f3-50db-4e69-b545-11d09952356a)

Responsive Design für Mobile:
- Alle Filter untereinander angeordnet
- Aktionsbuttons nehmen volle Breite ein
- Touch-optimierte Bedienelemente
- Tabs bleiben horizontal scrollbar

## Installation und Nutzung

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Keine Installation erforderlich

### Starten der Anwendung

1. **Lokaler Webserver** (empfohlen):
   ```bash
   python3 -m http.server 8000
   ```
   Dann öffnen: `http://localhost:8000/index.html`

2. **Direktes Öffnen**:
   - `index.html` im Browser öffnen
   - Alle Funktionen sind verfügbar

### Datenspeicherung

- Alle Daten werden im localStorage des Browsers gespeichert
- Daten bleiben auch nach Browser-Neustart erhalten
- Daten sind browser- und gerätespezifisch
- Löschen des Browser-Cache entfernt alle Daten

## Nicht-funktionale Anforderungen

### Responsive Design ✓
- Desktop-optimiert (1200px+)
- Tablet-optimiert (768px - 1199px)
- Mobile-optimiert (< 768px)

### Benutzerfreundlichkeit ✓
- Intuitive Navigation mit Tab-System
- Klare visuelle Hierarchie
- Farbcodierung für Prioritäten
- Sofortiges visuelles Feedback

### Performance ✓
- Keine externen Abhängigkeiten
- Schnelle Ladezeit
- Sofortige Reaktion auf Benutzeraktionen
- Effiziente localStorage-Nutzung

### Fehlertoleranz ✓
- Validierung von Pflichtfeldern
- Bestätigungsdialoge für Löschvorgänge
- Automatische Bereinigung bei Löschungen (z.B. gelöschte Projekte in Aufgaben)

## Best Practices umgesetzt

1. **Modularer Code**: Klare Trennung zwischen Datenlogik und UI-Logik
2. **UUIDs**: Eindeutige Identifikation aller Entitäten
3. **Event Delegation**: Effiziente Event-Handler für dynamische Elemente
4. **HTML Escaping**: Schutz vor XSS-Angriffen
5. **Datenintegrität**: Automatische Bereinigung bei Löschungen

## Bekannte Einschränkungen

- Keine Benutzerauthentifizierung
- Keine Backend-Synchronisation
- Daten sind lokal und nicht geräteübergreifend
- Keine Backup-Funktion (außer Browser-Backup)

## Weiterentwicklung

Mögliche Erweiterungen:
- Export/Import-Funktion für Daten (JSON)
- Mehrere Benutzer mit Rechteverwaltung
- Backend-Integration mit Datenbank
- Drag & Drop für Aufgaben
- Wiederkehrende Aufgaben
- Anhänge und Notizen zu Aufgaben
- Kollaborationsfunktionen

## Version

**Version 1.0** - Dezember 2025

Erstellt gemäß Lastenheft.md und Pflichtenheft-Bootstrap.md
