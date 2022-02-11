const express = require('express');
const controller = require('../controllers/about-us');
const passport = require('passport');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, new Date().toISOString() + ' - ' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  file.mimetype.includes('video') ? cb(null, true) : cb(null, false);
};
const upload = multer({ storage, fileFilter });
const router = express.Router();

// router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/', controller.getAll);
router.post('/', upload.array('files'), controller.upload);

module.exports = router;
