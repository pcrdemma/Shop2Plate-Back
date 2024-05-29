require('dotenv').config();
const { Client } = require('pg');
// Configuration de la connexion à la base de données
const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER, 
    password: process.env.PGPASSWORD,  
    database: process.env.PGDATABASE,
    port : process.env.PGPORT
});

client.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données réussie');
});

module.exports = client;
