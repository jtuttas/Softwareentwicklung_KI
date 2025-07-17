const db = require('../db/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUsers = (req, res) => {
    db.all("SELECT id, username, role FROM users", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

exports.getUserById = (req, res) => {
    db.get("SELECT id, username, role FROM users WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            res.status(404).json({"message": "User not found"});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
};

exports.updateUser = (req, res) => {
    const { username, password, role } = req.body;
    const userId = req.params.id;

    if (!username && !password && !role) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    let updateFields = [];
    let updateValues = [];

    if (username) {
        updateFields.push("username = ?");
        updateValues.push(username);
    }
    if (role) {
        updateFields.push("role = ?");
        updateValues.push(role);
    }

    if (password) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            updateFields.push("password = ?");
            updateValues.push(hash);
            
            const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
            updateValues.push(userId);

            db.run(query, updateValues, function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ message: 'Username already exists' });
                    }
                    return res.status(400).json({"error": err.message});
                }
                if (this.changes === 0) {
                    return res.status(404).json({ "message": "User not found or no changes made" });
                }
                res.json({ message: "User updated successfully" });
            });
        });
    } else {
        const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
        updateValues.push(userId);

        db.run(query, updateValues, function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ message: 'Username already exists' });
                }
                return res.status(400).json({"error": err.message});
            }
            if (this.changes === 0) {
                return res.status(404).json({ "message": "User not found or no changes made" });
            }
            res.json({ message: "User updated successfully" });
        });
    }
};

exports.deleteUser = (req, res) => {
    db.run('DELETE FROM users WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ "message": "User not found" });
            return;
        }
        res.json({"message": "User deleted successfully", changes: this.changes});
    });
};