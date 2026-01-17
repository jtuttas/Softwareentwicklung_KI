# 📝 Pflichtenheft: ToDo-App (Umsetzung mit Bootstrap, jQuery, localStorage)

## 1. Zielsetzung

Ziel ist die Entwicklung einer clientseitigen ToDo-Anwendung, die Aufgaben lokal im Browser speichert. Die Benutzeroberfläche soll responsiv mit **Bootstrap** umgesetzt werden. Die Interaktivität wird mit **jQuery** realisiert. Alle Daten werden im **localStorage** des Browsers persistiert.

Der gesamte Code soll modular und wartbar sein, unter Berücksichtigung von Best Practices in der Webentwicklung. Der Sourcecode soll im Ordner `./src/` abgelegt werden. 

## 2. Technische Rahmenbedingungen

| Komponente            | Technologie                   |
| --------------------- | ----------------------------- |
| UI-Framework          | Bootstrap (v5)                |
| JavaScript-Bibliothek | jQuery (v3.x)                 |
| Datenspeicherung      | Browser localStorage          |
| Architektur           | Single Page Application (SPA) |

---

## 3. Funktionale Anforderungen

### 3.1 Aufgabenverwaltung

* Aufgaben **anlegen** mit folgenden Feldern:

  * Titel (Pflichtfeld)
  * Fälligkeitsdatum (optional)
  * Priorität (Low, Medium, High)
  * Projektzuordnung (optional)
* Aufgaben können **bearbeitet** werden (alle Felder)
* Aufgaben können als **erledigt markiert** oder **gelöscht** werden

### 3.2 Prioritätenverwaltung

* Benutzer kann Prioritäten **hinzufügen**, **bearbeiten** und **löschen**
* Standard-Prioritäten: Low, Medium, High

### 3.3 Projektverwaltung

* Projekte können **angelegt**, **bearbeitet** und **gelöscht** werden
* Aufgaben können Projekten zugeordnet werden

### 3.4 Filter- und Sortierfunktionen

* Filter nach:

  * Fälligkeitsdatum (z. B. heute, diese Woche)
  * Priorität
  * Projekt
* Sortiermöglichkeiten:

  * nach Fälligkeitsdatum (auf-/absteigend)
  * nach Priorität (auf-/absteigend)

---

## 4. Nicht-funktionale Anforderungen

* Responsive Design für Desktop und Mobile
* Intuitive Benutzerführung
* Performance: Änderungen wirken sich sofort auf die UI aus
* Fehlertoleranz: Validierung bei Eingaben
* Datenpersistenz: Speichern und Laden aller Daten ausschließlich über `localStorage`

---

## 5. Datenmodell (localStorage)

### Aufgaben

```json
{
  "id": "uuid",
  "title": "String",
  "dueDate": "YYYY-MM-DD",
  "priorityId": "String",
  "projectId": "String",
  "done": false
}
```

### Prioritäten

```json
{
  "id": "uuid",
  "name": "String"
}
```

### Projekte

```json
{
  "id": "uuid",
  "name": "String"
}
```

---

## 6. Best Practices

* Modularer Code: Trennung von UI-Logik (jQuery) und Datenlogik (Storage)
* Verwenden von UUIDs für eindeutige Identifikation
* Lokale Speicherung als JSON-Strukturen
* Event-Delegation bei dynamischen DOM-Elementen
* Initiale Default-Daten beim ersten Start (Prioritäten, ggf. Beispielprojekt)
* Einsatz von Bootstrap-Komponenten wie `modals`, `alerts`, `cards`, `collapse` zur besseren UX

---

## 7. Dokumentation und Tests

* Ausführliche Code-Kommentare
* Testfälle für alle funktionalen Anforderungen
* Dokumentation der Implementierungsschritte und Entscheidungen
* erstellen und aktualisieren einer README.md mit Projektbeschreibung, Installationsanleitung und Nutzungshinweisen
* Protokolliere alle Änderungen, die du vornimmst in der Datei ./CHANGELOG.md mit Datum und einer kurzen Beschreibung der Änderungen unter der Sektion "Unreleased".



