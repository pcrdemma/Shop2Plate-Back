const express = require('express');
const connection = require('../connection'); 

const router = express.Router();

router.get('/', (req, res) => {

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }

        // Remplir le tableau users avec les résultats de la requête
        const products = results;

        res.json(products);
    });
});

module.exports = router;