# ToDo App - Thiese GmbH

Eine moderne, clientseitige ToDo-Anwendung zur effizienten Verwaltung von Aufgaben, Projekten und Prioritäten.

## 🚀 Schnellstart

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Die Anwendung lädt automatisch und ist sofort einsatzbereit
3. Erstellen Sie Ihre erste Aufgabe über den Button "Neue Aufgabe"

## 📋 Funktionen

### Aufgabenverwaltung
- ✅ Aufgaben erstellen, bearbeiten und löschen
- 📅 Fälligkeitsdaten setzen
- ⚑ Prioritäten zuweisen (Low, Medium, High)
- 📁 Projekte zuordnen
- ✓ Aufgaben als erledigt markieren

### Organisation
- 🔍 Aufgaben durchsuchen
- 🎯 Nach Projekt oder Priorität filtern
- 📊 Nach Datum oder Priorität sortieren
- 📱 Vollständig responsiv für Desktop und Mobile

### Datenverwaltung
- 💾 Automatische Speicherung im Browser (localStorage)
- 🔄 Daten bleiben nach Seitenneuladen erhalten
- 🎨 Farbcodierte Prioritäten

## 🛠️ Technologie

- **Frontend**: HTML5, CSS3, JavaScript
- **UI-Framework**: Bootstrap 5 (minimal)
- **JavaScript**: jQuery-kompatible Implementierung
- **Datenspeicherung**: Browser localStorage API
- **Architektur**: Single Page Application (SPA)

## 📁 Projektstruktur

```
.
├── index.html              # Hauptseite
├── app.js                  # Anwendungslogik
├── style.css               # Benutzerdefinierte Styles
├── bootstrap-minimal.css   # Minimale Bootstrap-Styles
├── simple-jquery.js        # jQuery-Ersatz
├── simple-bootstrap.js     # Bootstrap Modal-Funktionalität
├── DOKUMENTATION.md        # Ausführliche Dokumentation
└── usability.md            # Usability-Testergebnisse
```

## �� Verwendung

### Aufgabe erstellen
1. Klicken Sie auf "Neue Aufgabe"
2. Geben Sie einen Titel ein (Pflichtfeld)
3. Wählen Sie optional Fälligkeitsdatum, Priorität und Projekt
4. Klicken Sie auf "Speichern"

### Projekt erstellen
1. Wechseln Sie zum Tab "Projekte"
2. Klicken Sie auf "Neues Projekt"
3. Geben Sie einen Namen ein
4. Klicken Sie auf "Speichern"

### Aufgaben filtern
- Verwenden Sie die Dropdown-Menüs "Filter nach Projekt" oder "Filter nach Priorität"
- Nutzen Sie das Suchfeld für die Volltextsuche

### Aufgaben sortieren
- Wählen Sie "Fälligkeitsdatum" oder "Priorität" im Dropdown "Sortieren nach"
- Wählen Sie "Aufsteigend" oder "Absteigend" für die Reihenfolge

## 📱 Browser-Kompatibilität

- ✅ Chrome (neueste Version)
- ✅ Firefox (neueste Version)
- ✅ Edge (neueste Version)
- ✅ Safari (neueste Version)

**Voraussetzungen:**
- JavaScript aktiviert
- localStorage-Unterstützung
- Moderne CSS3-Features

## 📖 Dokumentation

Ausführliche Informationen finden Sie in:
- `DOKUMENTATION.md` - Vollständige Softwaredokumentation mit Screenshots
- `usability.md` - Usability-Testergebnisse

## 🔒 Datenschutz

- Alle Daten werden **ausschließlich lokal** im Browser gespeichert
- Es findet **keine Datenübertragung** an externe Server statt
- Daten können durch Löschen der Browser-Daten entfernt werden

## ⚠️ Wichtige Hinweise

1. **Datensicherung**: Daten werden nur im lokalen Browser gespeichert. Bei Löschen der Browser-Daten gehen alle Aufgaben verloren.
2. **Inkognito-Modus**: Im privaten Modus werden Daten möglicherweise nicht gespeichert.
3. **Browser-Wechsel**: Daten sind nur im verwendeten Browser verfügbar.

## 🎨 Features im Detail

### Fälligkeitsdatum-Kennzeichnung
- **Rot**: Überfällige Aufgaben
- **Gelb**: Aufgaben, die heute fällig sind
- **Grün**: Zukünftige Aufgaben

### Prioritäts-Kennzeichnung
- **Rot**: High (Hohe Priorität)
- **Gelb**: Medium (Mittlere Priorität)
- **Cyan**: Low (Niedrige Priorität)

### Erledigte Aufgaben
- Durchgestrichener Text
- Reduzierte Deckkraft
- Grüner linker Rand
- "Wiederherstellen"-Funktion

## 🤝 Support

Bei Fragen oder Problemen:
- Siehe `DOKUMENTATION.md` für ausführliche Anleitungen
- Siehe Abschnitt "Fehlerbehebung" in der Dokumentation

## 📝 Version

- **Version**: 1.0.0
- **Datum**: Dezember 2025
- **Entwickelt für**: Thiese GmbH

---

**Entwickelt gemäß Lastenheft und Pflichtenheft-Bootstrap**
