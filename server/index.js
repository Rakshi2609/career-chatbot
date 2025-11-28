const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// FIX FOR NODE-FETCH IN COMMONJS
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config();
const app = express();

const whitelist = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:9002",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || whitelist.includes(origin)) return callback(null, true);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

const chatHistories = new Map();

const SYSTEM_MESSAGE = `
You are "CareerNavigator AI", an expert career consultant.
Give detailed, practical guidance about careers, skills, interviews,
jobs, resumes, and growth. Redirect unrelated questions.
`;

async function callGeminiAPI(contents) {
    const url =
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
    });

    const data = await response.json();
    if (data.error) {
        console.error("Gemini Error:", data.error);
        throw new Error(data.error.message);
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function handleChatMessage(req, res) {
    let { message, sessionId } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    let history;
    if (!sessionId) {
        sessionId = uuidv4();
        history = [{ role: "user", text: SYSTEM_MESSAGE }];
        console.log("New chat session:", sessionId);
    } else {
        history = chatHistories.get(sessionId) || [
            { role: "user", text: SYSTEM_MESSAGE },
        ];
    }

    const contents = [
        ...history.map((h) => ({
            role: h.role,
            parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: message }] },
    ];

    try {
        const responseText = await callGeminiAPI(contents);

        history.push({ role: "user", text: message });
        history.push({ role: "model", text: responseText });
        chatHistories.set(sessionId, history);

        res.json({
            sessionId,
            response: responseText,
            history: history.slice(1),
        });
    } catch (err) {
        console.error("Chat error:", err);
        res.status(500).json({
            error: "AI service error. Please try again later.",
        });
    }
}

const queue = [];
let isProcessing = false;

function processQueue() {
    if (isProcessing || queue.length === 0) return;

    isProcessing = true;
    const { req, res } = queue.shift();

    handleChatMessage(req, res)
        .finally(() => {
            isProcessing = false;
            processQueue();
        });
}

app.post("/api/chat/message", (req, res) => {
    queue.push({ req, res });
    processQueue();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running → http://localhost:${PORT}`)
);
