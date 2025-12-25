# Softwaredokumentation - ToDo App für die Thiese GmbH

## Inhaltsverzeichnis
1. [Überblick](#überblick)
2. [Technische Grundlagen](#technische-grundlagen)
3. [Funktionen](#funktionen)
4. [Benutzeroberfläche](#benutzeroberfläche)
5. [Bedienungsanleitung](#bedienungsanleitung)
6. [Datenspeicherung](#datenspeicherung)

---

## Überblick

Die ToDo App ist eine clientseitige Webanwendung zur Verwaltung von Aufgaben. Sie ermöglicht es Benutzern, Aufgaben zu erstellen, zu organisieren und zu verwalten. Die Anwendung ist vollständig responsiv und funktioniert auf Desktop- und Mobilgeräten.

### Hauptmerkmale
- ✅ Aufgabenverwaltung mit Titel, Fälligkeitsdatum und Priorität
- 📁 Projektverwaltung zur Organisation von Aufgaben
- ⚑ Prioritätenverwaltung (Low, Medium, High)
- 🔍 Such- und Filterfunktionen
- 📊 Sortieroptionen nach Fälligkeit und Priorität
- 💾 Lokale Datenspeicherung im Browser
- 📱 Responsive Design für Desktop, Tablet und Smartphone

---

## Technische Grundlagen

### Verwendete Technologien

| Komponente | Technologie | Version |
|------------|-------------|---------|
| UI-Framework | Bootstrap | 5.3.0 (minimal) |
| JavaScript-Bibliothek | jQuery (custom) | 3.x kompatibel |
| Datenspeicherung | localStorage | Browser-API |
| Architektur | Single Page Application (SPA) | - |

### Dateien
- `index.html` - Hauptseite mit HTML-Struktur
- `app.js` - Anwendungslogik und Datenmanagement
- `style.css` - Benutzerdefinierte Styles
- `bootstrap-minimal.css` - Minimale Bootstrap-Styles
- `simple-jquery.js` - jQuery-kompatible Funktionen
- `simple-bootstrap.js` - Bootstrap Modal-Funktionalität

---

## Funktionen

### 1. Aufgabenverwaltung

#### Aufgabe erstellen
- Klicken Sie auf die Schaltfläche **"+ Neue Aufgabe"**
- Geben Sie einen **Titel** ein (Pflichtfeld)
- Wählen Sie optional ein **Fälligkeitsdatum**
- Wählen Sie eine **Priorität** (Low, Medium, High)
- Wählen Sie optional ein **Projekt**
- Klicken Sie auf **"Speichern"**

#### Aufgabe bearbeiten
- Klicken Sie auf die Schaltfläche **"Bearbeiten"** bei einer Aufgabe
- Ändern Sie die gewünschten Felder
- Klicken Sie auf **"Speichern"**

#### Aufgabe als erledigt markieren
- Klicken Sie auf die Schaltfläche **"Erledigt"**
- Die Aufgabe wird durchgestrichen dargestellt
- Mit **"Wiederherstellen"** kann die Markierung rückgängig gemacht werden

#### Aufgabe löschen
- Klicken Sie auf die Schaltfläche **"Löschen"**
- Bestätigen Sie die Sicherheitsabfrage
- Die Aufgabe wird dauerhaft entfernt

### 2. Projektverwaltung

#### Projekt erstellen
- Navigieren Sie zum Tab **"Projekte"**
- Klicken Sie auf **"+ Neues Projekt"**
- Geben Sie einen Namen ein
- Klicken Sie auf **"Speichern"**

#### Projekt bearbeiten/löschen
- Verwenden Sie die Schaltflächen **"Bearbeiten"** oder **"Löschen"**
- Beim Löschen eines Projekts werden die Aufgaben nicht gelöscht, sondern nur die Projektzuordnung entfernt

### 3. Prioritätenverwaltung

#### Vordefinierte Prioritäten
Die Anwendung startet mit drei vordefinierten Prioritäten:
- **Low** (Niedrig) - Cyan-Farbe
- **Medium** (Mittel) - Gelb-Farbe
- **High** (Hoch) - Rot-Farbe

#### Priorität erstellen/bearbeiten
- Navigieren Sie zum Tab **"Prioritäten"**
- Verwenden Sie **"+ Neue Priorität"** zum Erstellen
- Verwenden Sie **"Bearbeiten"** zum Ändern einer Priorität

### 4. Filter- und Suchfunktionen

#### Nach Projekt filtern
- Wählen Sie ein Projekt aus dem Dropdown **"Filter nach Projekt"**
- Nur Aufgaben des ausgewählten Projekts werden angezeigt

#### Nach Priorität filtern
- Wählen Sie eine Priorität aus dem Dropdown **"Filter nach Priorität"**
- Nur Aufgaben mit der ausgewählten Priorität werden angezeigt

#### Aufgaben suchen
- Geben Sie einen Suchbegriff in das Feld **"Aufgabe suchen..."** ein
- Die Liste wird in Echtzeit gefiltert

### 5. Sortierfunktionen

#### Nach Fälligkeitsdatum sortieren
- Wählen Sie **"Fälligkeitsdatum"** im Dropdown **"Sortieren nach"**
- Wählen Sie **"Aufsteigend"** oder **"Absteigend"**

#### Nach Priorität sortieren
- Wählen Sie **"Priorität"** im Dropdown **"Sortieren nach"**
- Die Aufgaben werden nach Wichtigkeit sortiert (High → Medium → Low)

---

## Benutzeroberfläche

### Desktop-Ansicht

#### Startseite (Keine Aufgaben)
![Desktop - Leere Aufgabenliste](https://github.com/user-attachments/assets/27aba282-d679-4716-b066-c122504747af)

Die Startseite zeigt:
- Navigationsleiste mit Links zu Aufgaben, Projekten und Prioritäten
- Filter- und Sortieroptionen
- Suchfeld für Aufgaben
- Platzhalter für leere Liste

#### Aufgabenansicht mit Daten
![Desktop - Aufgabe erstellt](https://github.com/user-attachments/assets/acfd735c-0e32-4489-a964-200908523274)

Aufgabenkarten zeigen:
- Titel der Aufgabe
- Priorität als farbiges Badge (⚑)
- Fälligkeitsdatum (📅)
- Aktionsschaltflächen (Erledigt, Bearbeiten, Löschen)

#### Erledigte Aufgabe
![Desktop - Erledigte Aufgabe](https://github.com/user-attachments/assets/56780548-d7b6-4b6a-81e4-ae785521e906)

Erledigte Aufgaben werden:
- Mit durchgestrichenem Text angezeigt
- Mit reduzierter Deckkraft dargestellt
- Mit grünem linken Rand markiert
- Mit "Wiederherstellen"-Schaltfläche versehen

#### Projektansicht
![Desktop - Projekte](https://github.com/user-attachments/assets/1fb7a54b-2396-46ce-a47f-ad04c4a8df1b)

Die Projektansicht zeigt:
- Liste aller Projekte
- Anzahl der zugeordneten Aufgaben
- Bearbeiten- und Löschen-Schaltflächen

#### Prioritätenansicht
![Desktop - Prioritäten](https://github.com/user-attachments/assets/c144e234-cd51-4bce-ac9a-d080963e189e)

Die Prioritätenansicht zeigt:
- Alle verfügbaren Prioritäten mit farbigen Badges
- Anzahl der Aufgaben pro Priorität
- Bearbeiten- und Löschen-Schaltflächen

### Mobile Ansicht

#### Mobile Aufgabenansicht
![Mobile - Aufgaben](https://github.com/user-attachments/assets/d3dfb669-386f-4e36-9e1f-47859921d758)

Die mobile Ansicht bietet:
- Kompakte Navigation mit ausklappbarem Menü
- Vollbreite Filteroptionen
- Stapelweise angeordnete Aktionsschaltflächen
- Touch-optimierte Bedienelemente

---

## Bedienungsanleitung

### Erste Schritte

1. **Öffnen Sie die Anwendung**
   - Öffnen Sie `index.html` in einem modernen Webbrowser
   - Die Anwendung lädt automatisch und zeigt die Aufgabenansicht

2. **Erstellen Sie Ihre erste Aufgabe**
   - Klicken Sie auf **"+ Neue Aufgabe"**
   - Geben Sie einen aussagekräftigen Titel ein
   - Wählen Sie ein Fälligkeitsdatum und eine Priorität
   - Speichern Sie die Aufgabe

3. **Organisieren Sie Ihre Aufgaben**
   - Erstellen Sie Projekte über den Tab **"Projekte"**
   - Weisen Sie Aufgaben Projekten zu
   - Nutzen Sie Filter und Sortierung für einen besseren Überblick

### Tipps für effektives Arbeiten

- **Verwenden Sie aussagekräftige Titel**: Beschreiben Sie klar, was zu tun ist
- **Setzen Sie Fälligkeitsdaten**: Behalten Sie Fristen im Blick
  - Überfällige Aufgaben werden rot markiert
  - Aufgaben für heute werden gelb markiert
  - Zukünftige Aufgaben werden grün markiert
- **Nutzen Sie Prioritäten**: Konzentrieren Sie sich auf das Wichtigste
- **Organisieren Sie mit Projekten**: Gruppieren Sie zusammengehörige Aufgaben
- **Filtern und Suchen**: Finden Sie schnell, was Sie brauchen

### Tastenkombinationen

Die Anwendung ist primär mausgesteuert, unterstützt aber auch:
- **Tab**: Navigation durch Formularfelder
- **Enter**: Bestätigung in Modaldialogen
- **Escape**: Schließen von Modaldialogen

---

## Datenspeicherung

### localStorage

Die Anwendung verwendet die `localStorage`-API des Browsers zur Datenpersistenz:

- **Vorteile**:
  - Keine Serververbindung erforderlich
  - Schneller Zugriff
  - Daten bleiben auch nach Schließen des Browsers erhalten

- **Einschränkungen**:
  - Daten sind nur im verwendeten Browser verfügbar
  - Speicherlimit von ca. 5-10 MB
  - Beim Löschen der Browser-Daten gehen alle Aufgaben verloren

### Datenstruktur

Die Anwendung speichert drei Arten von Daten:

```javascript
// Aufgaben
{
  "id": "uuid",
  "title": "Aufgabentitel",
  "dueDate": "2025-12-25",
  "priorityId": "uuid",
  "projectId": "uuid",
  "done": false
}

// Projekte
{
  "id": "uuid",
  "name": "Projektname"
}

// Prioritäten
{
  "id": "uuid",
  "name": "High"
}
```

### Datensicherung

**Empfohlene Maßnahmen**:
1. Exportieren Sie regelmäßig wichtige Daten
2. Nutzen Sie Browser-Sync-Funktionen wenn verfügbar
3. Vermeiden Sie das Löschen von Browser-Daten ohne Backup

**Manuelle Datensicherung**:
1. Öffnen Sie die Browser-Entwicklertools (F12)
2. Gehen Sie zum Tab "Application" oder "Storage"
3. Wählen Sie "Local Storage"
4. Kopieren Sie die Werte für:
   - `todoapp_tasks`
   - `todoapp_projects`
   - `todoapp_priorities`

---

## Browser-Kompatibilität

Die Anwendung wurde getestet mit:
- ✅ Google Chrome (neueste Version)
- ✅ Mozilla Firefox (neueste Version)
- ✅ Microsoft Edge (neueste Version)
- ✅ Safari (neueste Version)

**Mindestanforderungen**:
- JavaScript aktiviert
- localStorage-Unterstützung
- CSS3-Unterstützung

---

## Fehlerbehebung

### Aufgaben werden nicht gespeichert
- **Lösung**: Überprüfen Sie, ob localStorage aktiviert ist
- Einige Browser deaktivieren localStorage im Inkognito-Modus

### Anzeigefehler
- **Lösung**: Aktualisieren Sie die Seite (F5)
- Löschen Sie den Browser-Cache

### Filter funktioniert nicht
- **Lösung**: Setzen Sie alle Filter zurück
- Wählen Sie "Alle Projekte" und "Alle Prioritäten"

---

## Support und Feedback

Bei Fragen oder Problemen wenden Sie sich bitte an:
- **Entwicklungsteam**: Thiese GmbH IT-Abteilung
- **Dokumentation**: Diese Datei
- **Version**: 1.0.0
- **Letzte Aktualisierung**: Dezember 2025
