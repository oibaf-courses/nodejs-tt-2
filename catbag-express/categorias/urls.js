const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const findCategoria = async (catId) => {
    let retorno = await models.Categoria.find({id: catId});
    if (!retorno.length) {
        retorno = undefined;
    }
    return retorno;
}

const findProduto = async (prodId, catId) => {
    let retorno = await models.Produto.find({id: prodId, categoriaId: catId});
    if (!retorno.length) {
        retorno = undefined;
    }
    return retorno;
}

router = express.Router();

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    const { filtro } = req.query;
    let query = {};
    if (filtro) {
        query = {nome: filtro};
    }
    const cats = (await models.Categoria.find(query));
    res.json(cats);
});

router.post('/', async (req, res) => {
    const { id, nome} = req.body;
    const newCategoria = new models.Categoria({id, nome});
    await models.Categoria.insert(newCategoria);
    res.status(201).send(
        await models.Categoria.find({})
    );
});

router.get('/:catId', async (req, res) => {
    const { catId } = req.params;
    const categoria = await findCategoria(catId);
    if (categoria) {
        res.json(categoria);
    }
    else {
        res.sendStatus(404);
    }
});

router.get('/:catId/produtos', async (req, res) => {
    const { catId } = req.params;
    const produto = await model.Produto.find({categoriaId: catId});
    res.json(produto);
});

router.post('/:catId/produtos', async (req, res) => {
    const { catId } = req.params;
    const categoria = await findCategoria(catId);
    if(!categoria) {
        res.status(400).send("Categoria não existente");
    }
    else {
        const produto = new models.Produto(req.body);
        produto.categoriaId = catId;
        await models.Produto.insert(produto);
        const produtos = await models.Produto.find({});
        res.status(201).json(produtos);
    }
});

router.get('/:catId/produtos/:prodId', async (req, res) => {
    const { catId, prodId } = req.params;
    const produto = findProduto(prodId, catId);
    if(!produto) {
        res.status(400).send("Produto não existente");
    }
    else {
        res.json(produto);
    }
});

module.exports = {
    router
};