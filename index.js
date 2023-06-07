const express = require('express');
const createError = require('http-errors');
const path = require('path');

const app = express();
require('dotenv').config();

// Enable req.body
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`\nServer is running at PORT ${PORT}`);
});

// API endpoints
require('./api')(app);


// Initialize DB
require('./initDB')(app);

// Not found pages
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

// Serve static files (React build)
//app.use(express.static(path.join(__dirname, 'client', 'dist')));

// React build
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
 */
