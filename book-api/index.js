const express = require('express');
const bodyParser = require('body-parser');
const books = require('./books');

const app = express();

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, HEAD, DELETE');
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.use('/books', books.router);

app.listen(process.env.APP_PORT || 8080, process.env.APP_ADDR || 'localhost', () => {
    console.log('book-api runnning at here');
});