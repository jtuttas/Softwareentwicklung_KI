
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
    const {title, description, dueDate, done, priority_id, project_id} = req.body;
    db.run(`INSERT INTO tasks (title, description, dueDate, done, priority_id, project_id) VALUES (?,?,?,?,?,?)`,
     [title, description, dueDate, done, priority_id, project_id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, ...req.body }
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
    const {title, description, dueDate, done, priority_id, project_id} = req.body;
    db.run(`UPDATE tasks set title = ?, description = ?, dueDate = ?, done = ?, priority_id = ?, project_id = ? WHERE id = ?`,
        [title, description, dueDate, done, priority_id, project_id, req.params.id], (err, result) => {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({ message: "success", data: req.body})
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
