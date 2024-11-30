const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const logger = require('../utils/logger');

class EncodingService {
  static async encodeVideo(inputPath, outputPath, options = {}) {
    const {
      resolution = '720p',
      bitrate = '1000k',
      format = 'mp4'
    } = options;

    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-s ${resolution}`,
          `-b:v ${bitrate}`,
          '-c:v libx264',
          '-preset medium',
          '-c:a aac',
          '-b:a 128k'
        ])
        .output(outputPath)
        .on('end', () => {
          logger.info(`Encoding completed: ${path.basename(outputPath)}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          logger.error(`Encoding error: ${err.message}`);
          reject(err);
        })
        .run();
    });
  }
}

module.exports = EncodingService;