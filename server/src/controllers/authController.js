
const db = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.login = (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const userResponse = { ...user };
            delete userResponse.password;

            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token, user: userResponse });
        });
    });
};

exports.createUser = (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields (username, password, role) are required' });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, hash, role], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ message: 'Username already exists' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User created successfully', userId: this.lastID });
        });
    });
};
