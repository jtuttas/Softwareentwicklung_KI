# ToDo App

Dies ist eine einfache, clientseitige ToDo-Anwendung, die im Rahmen eines Softwareentwicklungsprojekts mit KI-Unterstützung erstellt wurde. Die App ermöglicht es Benutzern, Aufgaben zu verwalten, sie Projekten und Prioritäten zuzuordnen und die Daten lokal im Browser zu speichern.

## Features

- **Aufgabenverwaltung:** Erstellen, Bearbeiten, Löschen und als erledigt Markieren von Aufgaben.
- **Projekte & Prioritäten:** Separates Verwalten von Projekten und Prioritäten.
- **Zuweisung:** Zuweisen von Aufgaben zu spezifischen Projekten und Prioritäten.
- **Filterung:** Filtern der Aufgabenliste nach Projekt und Priorität.
- **Sortierung:** Sortieren der Aufgaben nach Fälligkeitsdatum oder Priorität (auf- und absteigend).
- **Persistenz:** Alle Daten werden automatisch im `localStorage` des Browsers gespeichert.
- **Responsive Design:** Die Benutzeroberfläche ist für Desktop, Tablets und Smartphones optimiert.

## Verwendete Technologien

- **HTML5**
- **CSS3**
- **Bootstrap 5:** Für das responsive UI-Framework.
- **jQuery 3.x:** Zur Vereinfachung der DOM-Manipulation und des Event-Handlings.
- **Browser localStorage:** Als clientseitige Datenbank.

## Wie man die Anwendung startet

Es ist keine Installation oder ein Webserver erforderlich. Klonen Sie einfach das Repository und öffnen Sie die `index.html`-Datei in einem modernen Webbrowser.

```bash
# Optional: Klonen des Repositories
git clone <repository-url>
cd <repository-verzeichnis>
```

Öffnen Sie anschließend die `index.html` direkt im Browser (z.B. per Doppelklick).

## Projektstruktur

```
.
├── index.html              # Die Haupt-HTML-Datei der Anwendung
├── docs/
│   ├── app.js              # Enthält die gesamte JavaScript-Logik
│   └── style.css           # Benutzerdefinierte CSS-Stile
├── Lastenheft.md           # Funktionale und nicht-funktionale Anforderungen
├── Pflichtenheft-Bootstap.md # Technische Spezifikationen für die Umsetzung
└── README.md               # Diese Datei
```

## Präsentation starten

Im Verzeichnis `docs` befindet sich eine kurze Präsentation zum Projekt.
Um die Folien lokal im Browser anzuzeigen, kann [Marp](https://marp.app/) verwendet werden:

```bash
cd docs
marp . --server --allow-local-files --html
```

Durch diesen Befehl wird ein lokaler Webserver gestartet, der die Präsentation automatisch öffnet.
