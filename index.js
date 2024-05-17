const express = require('express');
const usersRouter = require('./router/users');
const productsRouter = require('./router/products');
const productStockRouter = require ('./router/productStock');
const app = express(); 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/productstock', productStockRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});