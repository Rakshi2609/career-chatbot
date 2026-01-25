# Career Chatbot

A full-stack AI-powered career advice chatbot, featuring a Node.js/Express backend with Google Gemini integration and a modern Next.js frontend with Genkit AI integration.

---

## Folder Structure

```
career-chatbot/
  server/     # Node.js backend (Express, Gemini API)
  trial/      # Next.js frontend with Genkit AI (Tailwind, shadcn/ui)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## .env File Setup

### `server/.env`

The `.env` file already exists in the `server` directory. Update it with your configuration:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:9002
```

- `PORT`: Port for the backend server (default: 5000)
- `GEMINI_API_KEY`: Your Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))
- `CLIENT_URL`: The URL where your frontend runs (Next.js runs on port 9002)

### `trial/.env.local`

A `.env.local` file has been created in the `trial` directory. Update it with your keys:

```env
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
PORT=9002
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- `GOOGLE_GENAI_API_KEY`: Your Google Gemini API key for Genkit
- `PORT`: Port for the Next.js app (default: 9002)
- `NEXT_PUBLIC_API_URL`: Backend API URL

---

## Local Development
# Install server dependencies
cd server
npm install

# Install trial (Next.js) dependencies
cd ../trial
npm install
```

### 2. Update Environment Variables

Make sure to update both `.env` files with your actual API keys:
- `server/.env` - Add your Gemini API key
- `trial/.env.local` - Add your Google Genai API key

### 3. Start the Backend

In the `server` directory:

```sh
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 4. Start the Frontend

In a new terminal, in the `trial` directory:

```sh
npm run dev
```

The Next.js frontend will run on [http://localhost:9002](http://localhost:9002).

### 5. (Optional) Run Genkit Development Server

For AI flow debugging with Genkit UI:

```sh
cd trial
npm run genkit:dev
```

---9002](http://localhost:9002) in your web browser after starting both backend and frontend servers.

2. **Start Chatting:**  
   - Navigate to the chatbot page
   - Type your career-related questions or concerns in the chat input box
   - Press "Send" or hit Enter to submit your query
   - Get AI-powered career advice powered by Google Gemini

3. **Features:**
   - Real-time AI responses for career guidance
   - Voice interaction capabilities
   - Modern, responsive UI with shadcn/ui components
   - Session-based chat historyhttp://localhost:9002

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