const mongoose = require('../database');

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    numberOfPages: Number,
    publicationYear: Number
});

const Book = mongoose.model('Book', bookSchema);

const BookService = {
    all: () => {
        return Book.find();
    },
    insert: ({title, author, category, numberOfPages, publicationYear}) => {
        const book = new Book({
            title,
            author,
            category,
            numberOfPages,
            publicationYear
        });
        return book.save();
    },
    findById: (id) => {
        return Book.findById(id);
    },
    update: async (id, {title, author, category, numberOfPages, publicationYear}) => {
        const book = await BookService.findById(id);
        book.title = title;
        book.author = author;
        book.category = category;
        book.numberOfPages = numberOfPages;
        book.publicationYear = publicationYear;
        return book.save();
    },
    delete: async (id) => {
        const book = await BookService.findById(id);
        return book.remove();
    }
}

module.exports = {
    Book,
    BookService
}