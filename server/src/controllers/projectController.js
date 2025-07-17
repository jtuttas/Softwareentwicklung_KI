
const db = require('../db/database');

exports.getAllProjects = (req, res) => {
    db.all("SELECT * FROM projects", [], (err, rows) => {
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

exports.createProject = (req, res) => {
    const {name} = req.body;
    db.run(`INSERT INTO projects (name) VALUES (?)`, [name], function(err) {
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

exports.getProjectById = (req, res) => {
    db.get("SELECT * FROM projects WHERE id = ?", [req.params.id], (err, row) => {
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

exports.updateProject = (req, res) => {
    const {name} = req.body;
    db.run(`UPDATE projects set name = ? WHERE id = ?`, [name, req.params.id], (err, result) => {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({ message: "success", data: req.body})
    });
};

exports.deleteProject = (req, res) => {
    db.run('DELETE FROM projects WHERE id = ?', req.params.id, function (err, result) {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({"message":"deleted", changes: this.changes})
    });
};
