const express = require('express');
const passport = require('passport');

const controller = require('../controllers/films');
const uploadPoster = require('../middleware/upload-image');
const uploadFilm = require('../middleware/upload-videos');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), uploadPoster.single('image'), controller.upload);
router.post(
  '/film',
  passport.authenticate('jwt', { session: false }),
  uploadFilm.single('file'),
  controller.uploadFilm
);
router.get('/:id/video', controller.getFilm);

module.exports = router;
