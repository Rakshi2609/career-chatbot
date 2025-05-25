const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Your React app's URL from .env
    credentials: true // Allow cookies/headers if needed (though not strictly necessary for this simple app)
}));
app.use(express.json()); // Body parser for JSON requests

// Initialize Gemini API
// Use a currently supported model for chat interactions, e.g., "gemini-1.5-flash"
// Check Google AI Studio / Gemini API documentation for the latest available models
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Changed model name here!

// Route to send a message and get a response from Gemini
app.post('/api/chat/message', async (req, res) => {
    try {
        const { message, history } = req.body; // Expect history from frontend

        console.log('Received message request:', req.body); // For debugging
        console.log('User Message:', message);              // For debugging
        console.log('Received History (from frontend):', history); // For debugging

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // --- FIX 2: Filter history to only include valid Gemini roles ('user', 'model') ---
        const conversationHistory = history
            .filter(msg => ['user', 'model'].includes(msg.role)) // Crucial: Filter out 'error' or other invalid roles
            .map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }));

        console.log('Formatted History for Gemini (after filtering):', conversationHistory); // For debugging

        const chatInstance = model.startChat({
            history: conversationHistory,
            generationConfig: {
                maxOutputTokens: 500, // Adjust as needed
            },
        });

        // Send the user's current message to the chat instance
        const result = await chatInstance.sendMessage(message);
        const responseText = await result.response.text();

        console.log('Gemini Raw Response:', responseText); // For debugging

        res.json({ response: responseText });
    } catch (error) {
        // Log the full error object for better debugging on the server
        console.error('Error generating content from Gemini API:', error);
        console.error('Full Error Object:', error);

        // More specific error handling could be added here based on error.status or error.code
        if (error.status === 404) { // Specific check for 404 if model not found
             res.status(500).json({ error: 'Chatbot model not found or invalid. Please check backend configuration.' });
        } else {
             res.status(500).json({ error: 'Failed to get a response from the chatbot. Please try again.' });
        }
    }
});

// Basic route to confirm server is running
app.get('/', (req, res) => {
    res.send('Chatbot API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));