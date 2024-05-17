const express = require('express');
const connection = require('../connection'); 

const router = express.Router();

router.get('/allProduct', (req, res) => {
    const allProductQuery = 'SELECT * FROM product';

    connection.query(allProductQuery, (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête à la base de données :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        const allProduct = results;

        res.json(allProduct);
    });

});

router.post ('/addProduct', (req, res ) =>{
    const {name, price, category, quantity} = req.body;
    const addProductQuery = 'INSERT INTO product (name, price, category, quantity) VALUES (?, ?, ?, ?)';
    connection.query(addProductQuery, [name, price, category, quantity], (error, results) => {
        if (error) {
            console.error('Erreur lors de la sauvegarde d\'un produit :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
    
});

router.post('/deleteProduct', (req, res) => {
    const { id } = req.body;

    const deleteProductQuery = 'DELETE FROM product WHERE id = ?';
    connection.query(deleteProductQuery, [id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la suppression d\'un produit :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
});

router.post('/updateProduct', (req, res) => {
    const { id, name, price, category, quantity } = req.body;

    const updateProductQuery = 'UPDATE product SET name = ?, price = ?, category = ?, quantity = ? WHERE id = ?';
    connection.query(updateProductQuery, [name, price, category, quantity, id], (error, results) => {
        if (error) {
            console.error('Erreur lors de la modification d\'un produit :', error);
            res.status(500).send('Erreur serveur');
            return;
        }
        res.sendStatus(200);
    });
});


module.exports = router;