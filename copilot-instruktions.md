# Pflichtenheft für die Entwicklung einer Webanwendung

Der Server soll als REST Server in node.js entwickelt werden. Die Daten sollen in einer SQLite-Datenbank gespeichert werden. Der Client soll mit Angular oder React entwickelt werden.

Endpunkte für:
- Aufgaben (CRUD)
- Projekte (CRUD)
- Prioritäten (CRUD)
- Benutzer (Login, Rollen)

Die Authentifizierung der Benutzer erfolgt über ein Login-System. 

Die Benutzer haben unterschiedliche Rollen (Mitarbeiter, Abteilungsleiter, Administrator) und damit unterschiedliche Berechtigungen.


## Server (node.js)

server/
├── node_modules/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── db/
│   ├── middleware/
│   └── app.js
├── database.sqlite
├── .env
├── package.json

Der Server soll auf Port 3000 laufen und die folgenden Endpunkte bereitstellen:

### Endpunkte

- `GET /` - Basis-Route (z.B. "API läuft oder Swagger Dokumentation")
- `GET /tasks` - Alle Aufgaben abrufen
- `POST /tasks` - Neue Aufgabe erstellen    
- `GET /tasks/:id` - Aufgabe nach ID abrufen
- `PUT /tasks/:id` - Aufgabe aktualisieren
- `DELETE /tasks/:id` - Aufgabe löschen
- `GET /projects` - Alle Projekte abrufen
- `POST /projects` - Neues Projekt erstellen
- `GET /projects/:id` - Projekt nach ID abrufen
- `PUT /projects/:id` - Projekt aktualisieren
- `DELETE /projects/:id` - Projekt löschen      
- `GET /priorities` - Alle Prioritäten abrufen
- `POST /priorities` - Neue Priorität erstellen
- `GET /priorities/:id` - Priorität nach ID abrufen
- `PUT /priorities/:id` - Priorität aktualisieren
- `DELETE /priorities/:id` - Priorität löschen
- `POST /login` - Benutzeranmeldung (Login)
- `GET /users` - Alle Benutzer abrufen (nur für Admin)  
- `POST /users` - Neuen Benutzer erstellen (nur für Admin)
- `GET /users/:id` - Benutzer nach ID abrufen (nur für Admin)
- `PUT /users/:id` - Benutzer aktualisieren (nur für Admin)
- `DELETE /users/:id` - Benutzer löschen (nur für Admin)
- `GET /users/me` - Aktuellen Benutzer abrufen (nach Login)

### Dokumentation

Die Dokumentation der API erfolgt über Swagger sowie über eine Datei 'rest.http' für den vs Code rest Client.


## Datenbank (SQLite)

Als Datenbanksystem soll eine SQLite-Datenbank verwendet werden. Die Datenbankdatei soll `database.sqlite` heißen und im Wurzelverzeichnis liegen.


## Client (angular oder react)

client/
├── src/
│   ├── app/
│   │   ├── services/
│   │   ├── components/
│   │   └── models/
│   └── environments/
├── angular.json
├── package.json

Der Client soll auf Port 4200 laufen und die folgenden Features bieten:
- Anzeige der Aufgabenliste mit Filter- und Sortierfunktionen
- Möglichkeit, neue Aufgaben zu erstellen und bestehende zu bearbeiten oder zu löschen
- Anzeige der Projekte und Prioritäten mit CRUD-Funktionalität
- Responsive Design für mobile Endgeräte

## Mögliche GUI vorschläge

### Hauptfenster

+---------------------------------------------------------------+
|                  [ ToDo App – Aufgabenverwaltung ]           |
+---------------------+-----------------------------------------+
| Seitenleiste        |                                         |
| (Navigation)        |                                         |
|                     |   🔲 Aufgabenliste (Hauptbereich)       |
| ▸ Aufgaben          |                                         |
| ▸ Prioritäten       |   [ Filter: 🔽Projekt 🔽Priorität ]      |
| ▸ Projekte          |                                         |
|                     |   [ Task: Titel ]                       |
|                     |   [ Beschreibung: .... ]               |
|                     |   [ Fällig am: 📅  ] [ ☐ Erledigt ]     |
|                     |   [ Priorität: 🔽 ] [ Projekt: 🔽 ]     |
|                     |   [ 💾 Speichern ] [ ❌ Löschen ]       |
+---------------------+-----------------------------------------+

### Dialogfenster: Prioritäten verwalten

Prioritäten
+-----------------------------+
| 🔽 Priorität: Hoch          |
| [ ✎ Bearbeiten ] [ 🗑 Löschen ] |
|                             |
| [ ➕ Neue Priorität ]        |
+-----------------------------+

### Dialogfenster: Projekte verwalten

Projekte
+-----------------------------+
| 🔽 Projekt: Schulprojekt    |
| [ ✎ Bearbeiten ] [ 🗑 Löschen ] |
|                             |
| [ ➕ Neues Projekt ]         |
+-----------------------------+

## Best Practices

### Backend

- Trennung von Verantwortlichkeiten (MVC-Prinzip)
- Verwendung von Umgebungsvariablen (.env)
- Fehlerhandling im Controller
- Middleware für Authentifizierung (bei Bedarf)
- Validierung der Eingaben (z.B. mit Joi oder express-validator)
- CORS-Konfiguration für Cross-Origin-Anfragen
- API Dokumentation (z.B. mit Swagger)



### Frontend

- Services zur Kapselung der API-Aufrufe
- Nutzung von Interfaces/Models für Typensicherheit
- Verwendung von environment.ts zur flexiblen API-Konfiguration
- Responsive Design mit Angular Material oder Bootstrap
- State Management (z.B. NgRx oder Redux)
- Implementierung von Loading-Indikatoren und Fehlermeldungen
- Validierung der Formulareingaben

