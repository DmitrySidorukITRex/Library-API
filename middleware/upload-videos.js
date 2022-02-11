const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos/'),
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + ' - ' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  file.mimetype.includes('video') ? cb(null, true) : cb(null, false);
};

module.exports = multer({ storage, fileFilter });
