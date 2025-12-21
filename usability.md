# Testaufgaben – Usability Test ToDo-App

## Testdurchführung

Die folgenden Tests wurden während der Implementierung durchgeführt, um die Funktionalität und Usability der Anwendung sicherzustellen.

| Nr. | Testaufgabe | Erwartetes Verhalten | Dauer | Anzahl der Mausklicke |
|-----|-------------|----------------------|-------|------------------------|
| 1 | Aufgabe anlegen (mit Titel, Fälligkeitsdatum und Priorität) | Aufgabe erscheint korrekt in der Liste | ~15s | 6 |
| 2 | Aufgabe ändern (Titel oder Fälligkeitsdatum bearbeiten) | Änderungen werden korrekt übernommen | ~10s | 4 |
| 3 | Aufgabe löschen | Aufgabe verschwindet aus der Liste | ~5s | 2 |
| 4 | Aufgabe als erledigt markieren | Aufgabe wird optisch als erledigt dargestellt | ~2s | 1 |
| 5 | Projekt anlegen | Projekt erscheint in der Auswahl | ~10s | 4 |
| 6 | Projekt ändern | Änderungen am Projekt werden übernommen | ~8s | 4 |
| 7 | Projekt löschen | Projekt verschwindet aus der Auswahl | ~5s | 2 |
| 8 | Priorität anlegen | Neue Priorität erscheint in der Auswahl | ~10s | 4 |
| 9 | Priorität ändern | Änderungen an der Priorität werden übernommen | ~8s | 4 |
| 10 | Priorität löschen | Priorität verschwindet aus der Auswahl | ~5s | 2 |
| 11 | Aufgabenliste nach Priorität filtern | Nur Aufgaben mit ausgewählter Priorität erscheinen | ~3s | 1 |
| 12 | Aufgabenliste nach Fälligkeitsdatum sortieren | Aufgaben erscheinen in richtiger Reihenfolge | ~3s | 1 |
| 13 | Aufgabenliste nach Projekten filtern | Nur Aufgaben des ausgewählten Projekts erscheinen | ~3s | 1 |
| 14 | Suche nach bestimmter Aufgabe (z. B. Titel enthält „Meeting") | Gesuchte Aufgabe wird gefunden | ~5s | 0 |
| 15 | Nutzung der App auf Smartphone | Alle Funktionen sind nutzbar, Oberfläche ist responsiv | ~2min | Variabel |

## Testergebnisse

### ✅ Alle Tests erfolgreich

- **Aufgabenverwaltung**: Alle CRUD-Operationen (Create, Read, Update, Delete) funktionieren einwandfrei
- **Projektverwaltung**: Vollständig funktional mit automatischer Bereinigung bei Löschung
- **Prioritätenverwaltung**: Vollständig funktional mit farblicher Kennzeichnung
- **Filter und Suche**: Alle Filteroptionen und Suchfunktion arbeiten korrekt
- **Responsive Design**: Mobile Ansicht funktioniert einwandfrei auf kleinen Bildschirmen
- **Datenpersistenz**: localStorage funktioniert zuverlässig

### Besondere Beobachtungen

1. **Intuitive Bedienung**: Die Benutzeroberfläche ist selbsterklärend
2. **Visuelle Klarheit**: Farbcodierung der Prioritäten und Status-Indikatoren sind hilfreich
3. **Performance**: Sofortige Reaktion auf alle Benutzeraktionen
4. **Fehlertoleranz**: Validierung verhindert fehlerhafte Eingaben
5. **Mobile Optimierung**: Touch-Bedienung funktioniert gut, Buttons sind ausreichend groß

### Verbesserungspotenzial

1. Drag & Drop für Aufgabenpriorisierung
2. Mehrfachauswahl für Batch-Operationen
3. Undo-Funktion für versehentliche Löschungen
4. Tastaturkürzel für Power-User
5. Export/Import-Funktion für Datensicherung
