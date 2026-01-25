# Career Chatbot - Server

Express.js backend API for the Career Chatbot application, powered by Google Gemini AI.

## Features

- RESTful API for chat interactions
- Google Gemini AI integration for intelligent career advice
- Session-based chat history management
- CORS-enabled for cross-origin requests
- WebSocket support for real-time communication

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **Google Gemini API** - AI-powered responses
- **dotenv** - Environment configuration
- **cors** - Cross-origin resource sharing
- **uuid** - Session ID generation
- **Socket.io** - Real-time communication (optional)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update the `.env` file with:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:9002
```

Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 3. Start the Server

```bash
npm start
```

Server will run on `http://localhost:5000`.

## API Endpoints

### POST `/api/chat`

Send a message and receive an AI response.

**Request Body:**
```json
{
  "message": "How do I prepare for a software engineering interview?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "sessionId": "generated-or-provided-session-id",
  "response": "AI-generated career advice...",
  "history": [
    {"role": "user", "text": "user message"},
    {"role": "model", "text": "AI response"}
  ]
}
```

## Project Structure

```
server/
├── index.js          # Main server file with Express and Gemini integration
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (not in git)
└── README.md        # This file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:9002 |

## Development

The server uses session-based chat history stored in memory. Each session maintains context for multi-turn conversations.

### System Prompt

The AI is configured as "CareerNavigator AI" - an expert career consultant providing detailed, practical guidance about careers, skills, interviews, jobs, resumes, and professional growth.

## Dependencies

See [package.json](package.json) for a full list of dependencies.

## License

ISC
