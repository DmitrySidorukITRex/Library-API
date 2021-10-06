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
        penalty: req.body.penalty,
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

module.exports.update = async function(req, res) {
    const updated = {
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        penalty: req.body.penalty
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