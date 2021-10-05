const Book = require('../models/Book');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    try {
        const books = await Book.find({isAvailable: true});
        res.status(200).json(books);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        annotation: req.body.annotation,
        originalName: req.body.originalName,
        originalAuthor: req.body.originalAuthor,
        isAvailable: true,
        userId: null
    });

    try {
        await book.save();
        res.status(201).json(book);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = function(req, res) {
    try {

    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Book.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Book successfully removed.'
        });
    } catch(e) {
        errorHandler(res, e);
    }
}