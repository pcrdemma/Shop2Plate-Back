const express = require('express');
const client = require('../connection'); 

const router = express.Router();
 
router.get('/allProductStock', (req, res) => {
    const allProductStockQuery = 'SELECT * FROM "public"."ProductStock"';

    client.query(allProductStockQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const allProductStock = results;

        res.json(allProductStock);
    });

});

router.post('/addToStock', (req, res) => {
    let { name, quantity, expirationDate, openingDate, storageTime } = req.body;

    expirationDate = expirationDate ? expirationDate : '0000-00-00';
    openingDate = openingDate ? openingDate : '0000-00-00';

    const addToStockQuery = 'INSERT INTO "public"."ProductStock" (name, quantity, expirationDate, openingDate, storageTime) VALUES ($1, $2, $3, $4, $5)';
    client.query(addToStockQuery, [name, quantity, expirationDate, openingDate, storageTime], (error, results) => {
        if (error) {
            console.error('Erreur lors de la sauvegarde d\'un produit en stock :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
});

router.post('/deleteFromStock', (req, res) => {
    const { id } = req.body;

    const deleteFromStockQuery = 'DELETE FROM "public"."ProductStock" WHERE id = $1';
    client.query(deleteFromStockQuery, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression d\'un produit en stock :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
});

router.post('/updateStock', (req, res) => {
    const { id, name, quantity, expirationDate, openingDate, storageTime } = req.body;

    const updateStockQuery = 'UPDATE "public"."ProductStock" SET name = $2, quantity = $3, expirationDate = $4, openingDate = $5, storageTime = $6 WHERE id = $1';
    client.query(updateStockQuery, [name, quantity, expirationDate, openingDate, storageTime, id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la modification d\'un produit en stock :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
});


module.exports = router;