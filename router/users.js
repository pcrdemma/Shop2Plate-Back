const express = require('express');
const connection = require('../connection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(express.json());


router.get('/allUser', (req, res) => {
    const allUserQuery = 'SELECT id, firstname, lastname, email, sexe, price FROM user';

    connection.query(allUserQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
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
        res.json(results);
    });
});

router.post('/addUser', (req, res) => {
    const { firstname, lastname, email, password, sexe, price, isChecked } = req.body;
    if (!firstname || !lastname || !email || !password || !sexe || price === undefined) {
        return res.status(400).send('Données manquantes');
    }

    bcrypt.hash(password, 10, (error, encryptedPassword) => {
        if (error) {
            console.error('Erreur lors du hash du mot de passe :', error);
            return res.status(500).send('Erreur serveur');
        }

        const finalPrice = isChecked ? price * 0.82 : price;
        const addUserQuery = 'INSERT INTO user (firstname, lastname, email, password, sexe, price) VALUES (?, ?, ?, ?, ?, ?)';

        connection.query(addUserQuery, [firstname, lastname, email, encryptedPassword, sexe, finalPrice], (error, results) => {
            if (error) {
                console.error('Erreur lors de la sauvegarde d\'un utilisateur :', error);
                return res.status(500).send('Erreur serveur');
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
        res.json(results);
    });
});

router.post('/updateUser', (req, res) => {
    const { id, firstname, email, password, price } = req.body;
    if (!id || !firstname || !email || !password || price === undefined) {
        return res.status(400).send('Données manquantes');
    }

    bcrypt.hash(password, 10, (error, encryptedPassword) => {
        if (error) {
            console.error('Erreur lors du hash du mot de passe :', error);
            return res.status(500).send('Erreur serveur');
        }

        const updateUserQuery = 'UPDATE user SET firstname = ?, email = ?, password = ?, price = ? WHERE id = ?';
        connection.query(updateUserQuery, [firstname, email, encryptedPassword, price, id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la modification d\'un utilisateur :', error);
                return res.status(500).send('Erreur serveur');
            }
            res.sendStatus(200);
        });
    });
});

router.post('/deleteUser', (req, res) => {
    const { id } = req.body;

    const deleteUserQuery = 'DELETE FROM user WHERE id = ?';
    connection.query(deleteUserQuery, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression d\'un utilisateur :', error);
            return res.status(500).send('Erreur serveur');
        }
        res.sendStatus(200);
    });
});

module.exports = router;
