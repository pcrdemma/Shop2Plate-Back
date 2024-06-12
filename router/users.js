const express = require('express');
const client = require('../connection');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(express.json());


router.get('/allUser', (req, res) => {
    const allUserQuery = 'SELECT id, firstname, lastname, email, sexe, price FROM "public"."User"';

    client.query(allUserQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.json(results);
    });

});

router.get('/login', (req, res) => {
    console.log(req);
    const email = req.query["email"];
    const password  = req.query["password"];

    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
    }

    const emailLoginQuery = 'SELECT email, password FROM "public"."User" WHERE email = $1'; // Modifier la requête pour sélectionner l'utilisateur en fonction de l'email
    client.query(emailLoginQuery, [email], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            return res.status(500).send('Erreur serveur');
        }

        if (results.rows.length == 0) {
            // Aucun utilisateur trouvé avec cet email, renvoyer une erreur 401
            return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
        }

        const user = results.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la comparaison des mots de passe :', err);
                return res.status(500).send('Erreur serveur');
            }

            if (isMatch) {
                return res.json({ success: true, message: 'Connexion réussie', userId: user.id });
            } else {
                return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
            }
        });
    });
});



router.post('/addUser', (req, res) => {
    const { firstname, lastname, email, password, sexe, price, isChecked } = req.body;
    console.log(req.body);

    // Vérifiez les champs obligatoires
    if (!firstname || !lastname || !email || !password || typeof sexe === 'undefined' || typeof price === 'undefined') {
        return res.status(400).send('Données manquantes');
    }

    bcrypt.hash(password, 10, (error, encryptedPassword) => {
        if (error) {
            console.error('Erreur lors du hash du mot de passe :', error);
            return res.status(500).send('Erreur serveur');
        }

        const finalPrice = isChecked ? price * 0.82 : price;
        const addUserQuery = 'INSERT INTO "public"."User" (firstname, lastname, email, password, sexe, price) VALUES ($1, $2, $3, $4, $5, $6)';

        client.query(addUserQuery, [firstname, lastname, email, encryptedPassword, sexe, finalPrice], (error, results) => {
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
    const userQuery = 'SELECT * FROM "public"."User" WHERE id = $1';
    client.query(userQuery, [userId], (error, results) => {
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
    const budgetQuery = 'SELECT price FROM "public"."User"';
    client.query(budgetQuery, (error, results) => {
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

        const updateUserQuery = 'UPDATE "public"."User" SET firstname = $2, email = $3, password = $4, price = $5 WHERE id = $1';
        client.query(updateUserQuery, [firstname, email, encryptedPassword, price, id], (error, results) => {
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

    const deleteUserQuery = 'DELETE FROM "public"."User" WHERE id = $1';
    client.query(deleteUserQuery, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression d\'un utilisateur :', error);
            return res.status(500).send('Erreur serveur');
        }
        res.sendStatus(200);
    });
});

module.exports = router;
