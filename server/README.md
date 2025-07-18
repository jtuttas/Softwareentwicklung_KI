This is the server for the Task Management API.

## Getting Started

1.  Install dependencies: `npm install`
2.  Start the server: `npm start`

The server will be running at `http://localhost:3000`.

## API Endpoints

The API documentation is available via Swagger at `http://localhost:3000/api-docs`.

## Database

The application uses a SQLite database. The database file is `database.sqlite`.

The database is initialized with the following tables:

*   `projects`
*   `priorities`
*   `tasks`
*   `users`

## Scripts

*   `npm start`: Starts the server.
*   `npm test`: (Not yet implemented)

## Roles and Permissions

| Role | Permissions |
| :--- | :--- |
| **Administrator** | Has all permissions of an "Abteilungsleiter".<br>Can create, read, update, and delete users.<br>Can register new users. |
| **Abteilungsleiter** | Has all permissions of a "Mitarbeiter".<br>Can create, read, update, and delete projects.<br>Can create, read, update, and delete priorities.<br>Can create, read, update, and delete tasks. |
| **Mitarbeiter** | Can read all tasks, projects, and priorities.<br>Can mark tasks as "done". |