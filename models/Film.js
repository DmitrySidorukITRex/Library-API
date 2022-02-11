const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  idkp: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  videoSrc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('film', filmSchema);
