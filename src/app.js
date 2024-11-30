const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/database');
const mediaController = require('./controllers/mediaController');
const ChatService = require('./services/chatService');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);

// Initialize chat service
const chatService = new ChatService(server);

// Middleware
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/media', mediaController);

// Connect to database
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;