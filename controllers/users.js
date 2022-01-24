const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        books: req.body.books,
        isAdmin: req.body.isAdmin,
        email: req.body.email
    });

    try {
        await user.save();
        res.status(201).json(user);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        books: req.body.books,
        penaltyDueDate: req.body.penaltyDueDate
    };

    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );
        res.status(200).json(user);
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.remove = async function(req, res) {
    try {
        await User.remove({_id: req.params.id});
        res.status(200).json({
            message: 'The user has been successfully removed.'
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.takeBook = async function(req, res) {
    try {
        const user = await User.findById(req.params.id);
        const currentDate = new Date();
        checkAndUpdatePenalty(user, currentDate);
        
        const diffSeconds = Math.round((user.penaltyDueDate - currentDate) / 1000);
        if (diffSeconds) {
            await User.findOneAndUpdate(
                {_id: req.params.id},
                {$set: user},
                {new: true}
            );
            res.status(500).json({
                message: `You can not take a book. Your penalty is ${diffSeconds} seconds`
            });
        } else {
            user.books.push(req.body.book);
            const updatedUser = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$set: user},
                {new: true}
            );
            res.status(200).json(updatedUser);
        }
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.returnBook = async function(req, res) {
    const books = {books: req.body.books};
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: books},
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch(e) {
        errorHandler(res, e);
    }
}

function checkAndUpdatePenalty(user, currentDate) {
    user.penaltyDueDate = new Date();
    user.books.filter(x => x.isTakeAway).forEach(book => {
        let penaltyCount = Math.floor(Math.round((currentDate - new Date(book.takingTime)) / 1000) / 60);
        if (penaltyCount) {
            user.penaltyDueDate.setSeconds(user.penaltyDueDate.getSeconds() + (penaltyCount * 20));
        }
    });
    
}