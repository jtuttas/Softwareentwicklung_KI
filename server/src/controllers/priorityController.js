
const db = require('../db/database');

exports.getAllPriorities = (req, res) => {
    db.all("SELECT * FROM priorities", [], (err, rows) => {
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

exports.createPriority = (req, res) => {
    const {name} = req.body;
    db.run(`INSERT INTO priorities (name) VALUES (?)`, [name], function(err) {
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

exports.getPriorityById = (req, res) => {
    db.get("SELECT * FROM priorities WHERE id = ?", [req.params.id], (err, row) => {
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

exports.updatePriority = (req, res) => {
    const {name} = req.body;
    db.run(`UPDATE priorities set name = ? WHERE id = ?`, [name, req.params.id], (err, result) => {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({ message: "success", data: req.body})
    });
};

exports.deletePriority = (req, res) => {
    db.run('DELETE FROM priorities WHERE id = ?', req.params.id, function (err, result) {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({"message":"deleted", changes: this.changes})
    });
};
