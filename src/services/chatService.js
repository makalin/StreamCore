const socketIO = require('socket.io');
const logger = require('../utils/logger');

class ChatService {
  constructor(server) {
    this.io = socketIO(server);
    this.setupSocketHandlers();
  }

  setupSocketHandlers() {
    this.io.on('connection', (socket) => {
      logger.info(`New chat connection: ${socket.id}`);

      socket.on('joinRoom', (mediaId) => {
        socket.join(`media_${mediaId}`);
        logger.info(`User joined chat room for media: ${mediaId}`);
      });

      socket.on('message', (data) => {
        const { mediaId, message, user } = data;
        this.io.to(`media_${mediaId}`).emit('message', {
          user,
          message,
          timestamp: new Date()
        });
        logger.info(`Chat message in room ${mediaId}: ${message}`);
      });

      socket.on('disconnect', () => {
        logger.info(`Chat disconnection: ${socket.id}`);
      });
    });
  }
}

module.exports = ChatService;