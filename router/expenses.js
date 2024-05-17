const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.use(express.json());


router.get("/allExpenses", (req, res) => {
    const allExpensesQuery = "SELECT * FROM expenses WHERE userid = ?";
    connection.query(allExpensesQuery, [req.query.userid], (error, results) => {
        if (error) {
            console.error("Erreur lors de la requête à la base de données :", error);
            res.status(500).send("Erreur serveur");
            return;
        }
        res.json(results);
    });
});

router.post("/addExpenses", (req, res) => {
    const { name, price, date, userid } = req.body;
    if (!name || !price || !date || !userid) {
        return res.status(400).send("Données manquantes");
    }

    const addExpensesQuery = "INSERT INTO expenses (name, price, date, userid) VALUES (?, ?, ?, ?)";

    connection.query(addExpensesQuery, [name, price, date, userid], (error, results) => {
        if (error) {
            console.error("Erreur lors de la sauvegarde d'une dépense :", error);
            return res.status(500).send("Erreur serveur");
        }
        res.sendStatus(200);
    });
});

module.exports = router;
