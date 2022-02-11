const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/images/'),
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + ' - ' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  file.mimetype.includes('image') ? cb(null, true) : cb(null, false);
};

module.exports = multer({ storage, fileFilter });
