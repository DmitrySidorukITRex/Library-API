const fs = require('fs');
const Film = require('../models/Film');
// const FormData = require('form-data');
const errorHandler = require('../utils/errorHandler');

module.exports.getFilm = async function (req, res) {
  try {
    const film = await Film.findOne({ idkp: req.params.id });
    const path = film.videoSrc;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      console.log('range---', range);
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      if (start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
        return;
      }
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (e) {}
};

module.exports.getAll = async function (req, res) {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.upload = async function (req, res) {
  const film = new Film({
    title: req.body.title,
    idkp: req.body.idkp,
    imageSrc: req.file.path,
    videoSrc: req.body.filmName,
  });

  try {
    await film.save();
    res.status(201).json(film);
  } catch (e) {
    errorHandler(res, e);
  }
};

// module.exports.uploadPoster = function (req, res) {
//   res.status(201).json({ done: true });
// };

module.exports.uploadFilm = async function (req, res) {
  try {
    const film = await Film.findOneAndUpdate(
      { idkp: req.body.idkp },
      { $set: { videoSrc: req.file.path } },
      { new: true }
    );
    res.status(201).json(film);
  } catch (e) {
    errorHandler(res, e);
  }
};
