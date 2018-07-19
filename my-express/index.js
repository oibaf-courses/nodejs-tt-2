const express = require('express');
const bodyParser = require('body-parser');
const adminUrls = require('./admin/urls');
const authMiddleware = require('./auth/middleware');
const app = express();


app.use(bodyParser.json());
app.use(express.static('./public'));

// auth
app.all('/admin*', authMiddleware);

app.all('*', (req, res, next) => {
    console.log(req.body);
    console.log('chegou miseravi');
    next();
});

app.use('/admin', adminUrls);

app.get('/secret', (req, res) => {
    res.send('Hello SECRET World!');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.send('POSTou, abestado!');
});

app.put('/', (req, res) => {
    res.send('PTou, abestado! (achou que vinha outra coisa, né)');
});

app.delete('/', (req, res) => {
    res.send('EXCLUIU, abestado! (achou que vinha outra coisa, né)');
});

app.get('/echo/:echo', (req, res) => {
    res.send(req.params.echo);
});

app.get('/echo/:echo1/echo/:echo2', (req, res) => {
    const { echo1, echo2 } = req.params;
    res.send([
        `Frase1 ${echo1}`,
        `Frase2 ${echo2}`
    ].join('<br>'));
});

// início app express
app.listen(3000, () => {
    console.log('App listening on port 3000!');
    console.log(this);
});