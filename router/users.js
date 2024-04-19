const express = require('express');
const connection = require('../connection'); 

const router = express.Router();

router.get('/alluser', (req, res) => {
    const query = 'SELECT * FROM user';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const users = results;

        res.json(users);
    });
});


module.exports = router;
