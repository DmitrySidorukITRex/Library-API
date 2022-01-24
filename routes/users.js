const express = require('express');
const controller = require('../controllers/users');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.patch('/:id/take-book', passport.authenticate('jwt', {session: false}), controller.takeBook);
router.patch('/:id/return-book', passport.authenticate('jwt', {session: false}), controller.returnBook);

module.exports = router;