
const db = require('../db/database');

exports.getAllTasks = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
};

exports.createTask = (req, res) => {
    const {title, description, dueDate, done, priority_id, project_id, user_id} = req.body;
    let assignedUserId = req.user.id;

    if (req.user.role === 'Mitarbeiter') {
        if (user_id && user_id !== req.user.id) {
            return res.status(403).json({ "error": "Mitarbeiter can only assign tasks to themselves." });
        }
    } else { // Abteilungsleiter or Administrator
        if (user_id) {
            assignedUserId = user_id;
        }
    }

    db.run(`INSERT INTO tasks (title, description, dueDate, done, priority_id, project_id, user_id) VALUES (?,?,?,?,?,?,?)`,
     [title, description, dueDate, done, priority_id, project_id, assignedUserId], function(err) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, ...req.body, user_id: assignedUserId }
        })
    });
};

exports.getTaskById = (req, res) => {
    db.get("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
};

exports.updateTask = (req, res) => {
    const {title, description, dueDate, done, priority_id, project_id, user_id} = req.body;
    const taskId = req.params.id;
    let assignedUserId = user_id;

    // Fetch the current task to check its assigned user
    db.get("SELECT user_id FROM tasks WHERE id = ?", [taskId], (err, task) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (!task) {
            return res.status(404).json({ "message": "Task not found" });
        }

        if (req.user.role === 'Mitarbeiter') {
            // Mitarbeiter can only update tasks assigned to them
            if (task.user_id !== req.user.id) {
                return res.status(403).json({ "error": "Mitarbeiter can only update their own tasks." });
            }
            // Mitarbeiter cannot change the assigned user_id
            if (user_id && user_id !== req.user.id) {
                return res.status(403).json({ "error": "Mitarbeiter cannot reassign tasks." });
            }
            assignedUserId = req.user.id; // Ensure Mitarbeiter can only assign to themselves
        } else { // Abteilungsleiter or Administrator
            // If no user_id is provided, keep the existing one
            if (!user_id) {
                assignedUserId = task.user_id;
            }
        }

        db.run(`UPDATE tasks set title = ?, description = ?, dueDate = ?, done = ?, priority_id = ?, project_id = ?, user_id = ? WHERE id = ?`,
            [title, description, dueDate, done, priority_id, project_id, assignedUserId, taskId], (err, result) => {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({ message: "success", data: req.body})
        });
    });
};

exports.deleteTask = (req, res) => {
    db.run('DELETE FROM tasks WHERE id = ?', req.params.id, function (err, result) {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({"message":"deleted", changes: this.changes})
    });
};

exports.markTaskAsDone = (req, res) => {
    const { done } = req.body;
    const { id } = req.params;

    if (typeof done === 'undefined' || typeof done !== 'boolean') {
        return res.status(400).json({ "error": "'done' field is required and must be a boolean" });
    }

    db.run(`UPDATE tasks SET done = ? WHERE id = ?`,
        [done, id], function(err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ "message": "Task not found" });
                return;
            }
            res.json({ "message": "Task status updated successfully", changes: this.changes });
        });
};
