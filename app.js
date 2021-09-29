const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('mongodb connected'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;