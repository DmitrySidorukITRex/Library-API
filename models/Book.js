const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    annotation: {
        type: String,
        required: true
    },
    originalName: {
        type: String
    },
    originalAuthor: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('book', bookSchema);