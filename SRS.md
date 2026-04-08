# 📝 Pflichtenheft: ToDo-App (Umsetzung mit Bootstrap, jQuery, localStorage)

## Auftragnehmer

Die Umsetzung der ToDo-App erfolgt durch die Change IT GmbH, ein erfahrenes Softwareentwicklungshaus mit Expertise in Webanwendungen und Frontend-Entwicklung. 

### Ansprechpartner

* Herr Schmidt (Projektleiter)
* Frau Becker (Lead Developer)

### Adresse

Change IT GmbH
Expo Plaza 3
30539 Hannover

## 1. Zielsetzung

Ziel ist die Entwicklung einer clientseitigen ToDo-Anwendung, die Aufgaben lokal im Browser speichert. Die Benutzeroberfläche soll responsiv mit **Bootstrap** umgesetzt werden. Die Interaktivität wird mit **jQuery** realisiert. Alle Daten werden im **localStorage** des Browsers persistiert.

Die Anwendung sollte einfach durch öffnen der Seite index.htm (also über file://) zu öffnen sein!

Der gesamte Code soll modular und wartbar sein, unter Berücksichtigung von Best Practices in der Webentwicklung. Der Sourcecode soll im Ordner `./src/` abgelegt werden. 

## 2. Technische Rahmenbedingungen

KEIN CDN verwenden sondern Komponenten lokal einbinden um Edge's Tracking Prevention zur vermeiden!

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

## UI Design und Layout

Auf den Seiten sollte das Logo der Tiese Gmbh zu sehen sein (siehe logo-Tiese-groß.png bzw. logo-Tiese-klein.png). Es soll eine übersichtliche und intuitive Benutzeroberfläche geben, die es dem Anwender ermöglicht, schnell und einfach Aufgaben zu verwalten. Die Hauptseite sollte eine Liste aller Aufgaben anzeigen, mit Optionen zum Filtern und Sortieren. Es sollte klare Buttons oder Links geben, um neue Aufgaben, Prioritäten und Projekte hinzuzufügen. Bearbeitungs- und Löschoptionen sollten leicht zugänglich sein. Die Anwendung sollte auf verschiedenen Bildschirmgrößen gut funktionieren (responsive design).

### Farben und Schriftarten

* Primärfarbe: #5F6463
* Sekundärfarbe: #9D9B9D
* Akzentfarbe: #FF4845
* Schriftart: Arial, sans-serif

## 7. Best Practices

* Modularer Code: Trennung von UI-Logik (jQuery) und Datenlogik (Storage)
* Verwenden von UUIDs für eindeutige Identifikation
* Lokale Speicherung als JSON-Strukturen
* Event-Delegation bei dynamischen DOM-Elementen
* Initiale Default-Daten beim ersten Start (Prioritäten, ggf. Beispielprojekt)
* Einsatz von Bootstrap-Komponenten wie `modals`, `alerts`, `cards`, `collapse` zur besseren UX

---

## 8. Dokumentation und Tests

* Ausführliche Code-Kommentare
* Erstellen einer Bedienungsanleitung für Endbenutzer (Bedienungsanleitung.md).
* erstellen und aktualisieren einer README.md mit Projektbeschreibung, Installationsanleitung und Nutzungshinweisen
* Protokolliere alle Änderungen, die du vornimmst in der Datei ./CHANGELOG.md mit Datum und einer kurzen Beschreibung der Änderungen unter der Sektion "Unreleased".

