const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileName: { type: String, required: true },
  encoding: {
    resolution: String,
    bitrate: String,
    format: String
  },
  subtitles: [{
    language: String,
    filePath: String
  }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);