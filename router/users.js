const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.get('/allUser', (req, res) => {
    const allUserQuery = 'SELECT id, firstname, lastname, email, sexe, price FROM user';

    connection.query(allUserQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const allUsers = results;

        res.json(allUsers);
    });

});

router.get('/login', (req, res) => {

    const emailLoginQuery = 'SELECT id, email FROM user';
    connection.query(emailLoginQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const emailPassword = results;

        res.json(emailPassword);
    });
});

router.post('/addUser', (req, res) => {
    const { firstname, lastname, email, password, sexe, price, isChecked } = req.body;
    const hashPassword = require('bcrypt');
    hashPassword.hash(password, 10, (error, encryptedPassword) => {
        if (error) {
            console.error('Erreur lors du hash du mot de passe :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
    let finalPrice = price;
    if (isChecked === true) {
        finalPrice = price * 0.82;
    }
        const addUserQuery = 'INSERT INTO user (firstname, lastname, email, password, sexe, price) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(addUserQuery, [firstname, lastname, email, encryptedPassword, sexe, finalPrice], (error, results) => {
            if (error) {
                console.error('Erreur lors de la sauvegarde d\'un utilisateur :', error);
                res.status(500).send('Erreur serveur');
                return;
            }
            res.sendStatus(200);
        });
    });
});

router.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const userQuery = 'SELECT * FROM user WHERE id = ?';
    connection.query(userQuery, [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Utilisateur non trouvé');
            return;
        }
        res.json(results[0]);
    });
});

router.get('/budget', (req, res) => {  
    const budgetQuery = 'SELECT price FROM user';
    connection.query(budgetQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const budget = results;

        res.json(budget);
    });
});

module.exports = router;
