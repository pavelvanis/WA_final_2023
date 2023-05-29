
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')

const app = express();
require('dotenv').config();

// Enable req.body
app.use(express.json())


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\nServer is running at PORT ${PORT}`);
});


// Initialize DB
require('./initDB')()

// - Products
const productsRouter = require('./Routes/Product.route.js');
app.use('/products', productsRouter);


// Not found pages
app.use((req, res, next) => {
    next(createError(404, 'Not found'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})