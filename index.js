const express = require('express');
const productsRouter = require('./router/products');
const usersRouter = require('./router/users');
const app = express(); 

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', usersRouter);
// app.use('/products', productsRouter);




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});