const express = require('express');
const router = express.Router();
const models = require('./models');

router.get('/', async (req, res) => {
    const books = await models.BookService.all();
    res.json(books);
});

router.post('/', async (req, res) => {
    const book = await models.BookService.insert(req.body);
    res.status(200).json(book);
});

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const book = await models.BookService.findById(bookId);
    if (book) {
        res.json(book);
    }
    else {
        res.sendStatus(404);
    }
});

router.put('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const book = models.BookService.update(bookId, req.body);
    res.sendStatus(204);
});

router.delete('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    await models.BookService.delete(bookId);
    res.sendStatus(204);
});


module.exports = {
    router
};