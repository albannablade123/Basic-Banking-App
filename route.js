const express = require('express');
const app = express();
const router = express.Router();

app.get('/', (req, res) => {
    res.send("Welcome to the Home page");
});

app.get('/customers', (req, res) => {
    res.send("Here are the list of customers");
});

module.exports = router;