# Career Chatbot

A full-stack AI-powered career advice chatbot, featuring a Node.js/Express backend (with Google Gemini integration) and a modern React frontend (Vite + Tailwind CSS). The project is organized into three main folders: `server`, `frontend`, and `client`.

---

## Folder Structure

```
career-chatbot/
  server/     # Node.js backend (Express, Gemini API)
  frontend/   # Modern React frontend (Vite, Tailwind)
  client/     # (Legacy) Create React App frontend
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## .env File Setup

### `server/.env`

Create a `.env` file in the `server` directory with the following content:

```
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

- `PORT`: Port for the backend server (default: 5000)
- `GEMINI_API_KEY`: Your Google Gemini API key (get from Google AI Studio)
- `CLIENT_URL`: The URL where your frontend runs (default for Vite is `http://localhost:5173`)

### `frontend/.env` (optional)

If you want to use environment variables in the frontend, create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:5000
```

---

## Local Development

### 1. Install Dependencies

Open a terminal in the root project folder and run:

```sh
cd server
npm install

cd ../frontend
npm install
```

### 2. Start the Backend

In the `server` directory:

```sh
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 3. Start the Frontend

In a new terminal, in the `frontend` directory:

```sh
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## Accessing the App

Open your browser and go to [http://localhost:5173](http://localhost:5173).

---

## How to Use the Career Chatbot

1. **Open the Application:**  
   Visit [http://localhost:5173](http://localhost:5173) in your web browser after starting both backend and frontend servers.

2. **Start Chatting:**  
   - Type your career-related questions or concerns in the chat input box.
   - Press "Send" or hit Enter to submit your query.
   - The chatbot will respond with AI-powered advice and suggestions.

3. **Voice Input (if available):**  
   - Click the microphone icon to speak your question (if the feature is enabled in the UI).
   - Wait for the chatbot to process and respond.

4. **Explore Further:**  
   - Ask follow-up questions or request more details.
   - Use the chatbot for resume tips, interview preparation, career path suggestions, and more.

---

## Notes

- The `client` folder contains a legacy Create React App version. The recommended frontend is in the `frontend` folder (Vite + React).
- Make sure your `.env` files are **not committed to version control** (they are in `.gitignore` by default).
- If you want to deploy, update the `CLIENT_URL` and API URLs accordingly.

---

## Useful Scripts

- **Backend:**  
  `npm start` — Start the Express server

- **Frontend:**  
  `npm run dev` — Start Vite dev server  
  `npm run build` — Build for production  
  `npm run preview` — Preview production build

---

## Credits

- Google Gemini API via [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai)
- React, Vite, Tailwind CSS

---

For any issues, please open an issue in the repository.