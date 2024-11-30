const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');
const EncodingService = require('../services/encodingService');
const auth = require('../middleware/auth');
const logger = require('../utils/logger');

router.post('/upload', auth, async (req, res) => {
  try {
    const { file } = req.files;
    const mediaPath = path.join(process.env.MEDIA_STORAGE_PATH, file.name);
    
    await file.mv(mediaPath);
    
    const encodedPath = path.join(
      process.env.MEDIA_STORAGE_PATH,
      `encoded_${file.name}`
    );
    
    await EncodingService.encodeVideo(mediaPath, encodedPath);
    
    const media = new Media({
      title: file.name,
      fileName: `encoded_${file.name}`,
      encoding: {
        resolution: '720p',
        bitrate: '1000k',
        format: 'mp4'
      },
      uploadedBy: req.user._id
    });
    
    await media.save();
    logger.info(`New media uploaded: ${file.name}`);
    
    res.status(201).send(media);
  } catch (error) {
    logger.error(`Upload error: ${error.message}`);
    res.status(400).send({ error: error.message });
  }
});

router.get('/stream/:id', auth, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).send();
    }

    const mediaPath = path.join(process.env.MEDIA_STORAGE_PATH, media.fileName);
    const stat = fs.statSync(mediaPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(mediaPath, { start, end });
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
      fs.createReadStream(mediaPath).pipe(res);
    }
    
    logger.info(`Stream started: ${media.fileName}`);
  } catch (error) {
    logger.error(`Streaming error: ${error.message}`);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
