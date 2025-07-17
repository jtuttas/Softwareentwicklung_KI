const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS priorities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        dueDate TEXT,
        done BOOLEAN,
        priority_id INTEGER,
        project_id INTEGER,
        user_id INTEGER,
        FOREIGN KEY (priority_id) REFERENCES priorities (id),
        FOREIGN KEY (project_id) REFERENCES projects (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`);

    const users = [
        { username: 'admin', password: 'admin', role: 'Administrator' },
        { username: 'abteilungsleiter', password: 'abteilungsleiter', role: 'Abteilungsleiter' },
        { username: 'mitarbeiter', password: 'mitarbeiter', role: 'Mitarbeiter' }
    ];

    const stmt = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
    let completed = 0;
    users.forEach((user, index) => {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                console.error(err.message);
                completed++;
                if (completed === users.length) {
                    stmt.finalize();
                }
                return;
            }
            // Check if user already exists
            db.get("SELECT * FROM users WHERE username = ?", [user.username], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (!row) {
                    stmt.run(user.username, hash, user.role, function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                        completed++;
                        if (completed === users.length) {
                            stmt.finalize();
                        }
                    });
                } else {
                    completed++;
                    if (completed === users.length) {
                        stmt.finalize();
                    }
                }
            });
        });
    });

    const projects = [
        { name: 'Website Relaunch' },
        { name: 'Mobile App Development' },
        { name: 'Backend API Refactoring' }
    ];

    const projectStmt = db.prepare("INSERT OR IGNORE INTO projects (name) VALUES (?)");
    projects.forEach(project => {
        projectStmt.run(project.name);
    });
    projectStmt.finalize();

    const priorities = [
        { name: 'High' },
        { name: 'Medium' },
        { name: 'Low' }
    ];

    const priorityStmt = db.prepare("INSERT OR IGNORE INTO priorities (name) VALUES (?)");
    priorities.forEach(priority => {
        priorityStmt.run(priority.name);
    });
    priorityStmt.finalize();
});

module.exports = db;