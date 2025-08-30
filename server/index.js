const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

dotenv.config();
const app = express();
// Define the list of allowed origins
const whitelist = [
    process.env.CLIENT_URL, // Your production URL from .env file
    'http://localhost:5173', // Your local development URL
    'http://localhost:9002' // Your API server URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in our whitelist
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // If you need to handle cookies or authorization headers
};

// Use the CORS middleware with your options
app.use(cors(corsOptions));

// --- END: FIX FOR CORS ---

app.use(express.json());

const chatHistories = new Map();
    
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const primaryModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const CAREER_PROMPT = `
You are "CareerNavigator AI", an expert career consultant and mentor with 20+ years of experience
helping students, graduates, and professionals find the right career path. Your job is to give 
detailed, personalized advice on:

- Career exploration based on skills, interests, and values.
- Resume and cover letter improvement.
- Interview preparation with realistic practice questions.
- Guidance on higher education opportunities, scholarships, and certifications.
- Salary trends, industry growth, and job market analysis.
- Switching careers effectively without losing momentum.
- Building in-demand skills for the future.
- Networking strategies and professional growth tips.

Your advice should:
- Be **clear, step-by-step, and tailored** to the user’s situation.
- Include **real-world examples and actionable tips**.
- Be empathetic, supportive, and encouraging.
- Avoid generic motivational lines — focus on **practical guidance**.
- If user’s query is vague, ask clarifying questions before giving advice.

Do not answer unrelated questions. If the question is not about career or education, politely say:
"I’m here to provide career-related advice. Could you rephrase your question to focus on your career path, education, or professional growth?"
`;

async function retryWithBackoff(fn, retries = 5) {
    let attempt = 0;
    let delayTime = 1000;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (err) {
            if (err.status === 503) {
                const jitter = Math.floor(Math.random() * 500);
                console.warn(`Gemini overloaded. Retry ${attempt + 1}/${retries} in ${(delayTime + jitter) / 1000}s...`);
                await delay(delayTime + jitter);
                delayTime *= 2;
                attempt++;
            } else {
                throw err;
            }
        }
    }
    throw new Error("Max retries reached - Gemini still overloaded");
}

async function sendMessageWithFallback(history, message) {
    try {
        const chatInstance = primaryModel.startChat({
            history,
            generationConfig: { maxOutputTokens: 1000 },
        });
        const result = await retryWithBackoff(() => chatInstance.sendMessage(message));
        return await result.response.text();
    } catch (err) {
        if (err.status === 503) {
            console.log("Falling back to gemini-pro...");
            try {
                const fallbackChat = fallbackModel.startChat({
                    history,
                    generationConfig: { maxOutputTokens: 1000 },
                });
                const result = await retryWithBackoff(() => fallbackChat.sendMessage(message));
                return await result.response.text();
            } catch (err2) {
                console.error("Fallback model also overloaded.");
                return "⚠️ Our AI is experiencing heavy traffic right now. Please try again in a few minutes.";
            }
        }
        throw err;
    }
}

async function handleChatMessage(req, res) {
    let { message, sessionId } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    let conversationHistory;
    if (!sessionId) {
        sessionId = uuidv4();
        conversationHistory = [{ role: "system", text: CAREER_PROMPT }];
        console.log(`New chat session started: ${sessionId}`);
    } else {
        conversationHistory = chatHistories.get(sessionId) || [{ role: "system", text: CAREER_PROMPT }];
    }

    const formattedHistory = conversationHistory.map(msg => ({
        role: msg.role === "system" ? "user" : msg.role, 
        parts: [{ text: msg.text }]
    }));

    const responseText = await sendMessageWithFallback(formattedHistory, message);

    conversationHistory.push({ role: 'user', text: message });
    conversationHistory.push({ role: 'model', text: responseText });
    chatHistories.set(sessionId, conversationHistory);

    const publicHistory = conversationHistory.filter(msg => msg.role !== "system");

    res.json({
        response: responseText,
        sessionId,
        history: publicHistory
    });
}

const queue = [];
let isProcessing = false;

function processQueue() {
    if (isProcessing || queue.length === 0) return;
    isProcessing = true;

    const { req, res } = queue.shift();
    handleChatMessage(req, res)
        .catch(err => {
            console.error("Chat processing error:", err);
            res.status(500).json({
                error: "The AI is currently experiencing issues. Please try again later."
            });
        })
        .finally(() => {
            isProcessing = false;
            processQueue();
        });
}

app.post('/api/chat/message', (req, res) => {
    queue.push({ req, res });
    processQueue();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
