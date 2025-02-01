# Media Stream Server

A robust and efficient media streaming server built with Node.js, Express, and MongoDB. This project enables secure media streaming and management, utilizing technologies like Socket.IO for real-time communication and Fluent FFmpeg for media processing.

## Features

- **Media Streaming**: Stream videos and audio securely.
- **Authentication**: Uses JSON Web Tokens (JWT) for secure access control.
- **Media Management**: Upload and process media files.
- **Real-Time Updates**: Powered by Socket.IO for live interactions.
- **Logging**: Uses Winston for structured and scalable logging.
- **Database Integration**: MongoDB for storing user and media metadata.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 16.0.0)
- MongoDB (>= 5.0)
- FFmpeg (for media processing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/makalin/StreamCore.git
   cd StreamCore
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and specify the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/mediaserver
   JWT_SECRET=your_jwt_secret
   MEDIA_STORAGE_PATH=./media
   LOG_PATH=./logs
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST** `/api/login`
- **POST** `/api/register`

### Media Management

- **GET** `/api/media`
- **POST** `/api/media/upload`
- **DELETE** `/api/media/:id`

### Real-Time Communication

- **WebSocket**: `/socket.io`

## Logging

Logs are stored in the path specified in the `LOG_PATH` environment variable. Winston handles log rotation and error tracking.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Real-Time**: Socket.IO
- **Media Processing**: Fluent FFmpeg
- **Logging**: Winston

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Inspired by modern media streaming technologies and open-source contributions.
