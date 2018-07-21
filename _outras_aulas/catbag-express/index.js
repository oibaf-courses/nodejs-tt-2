const express = require('express')
const categorias = require('./categorias')

const app = express();

app.use('/categorias', categorias.urls.router);


app.listen(3000, () => {
    console.log('ok!');
});