import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

// Import ReactMarkdown and remark-gfm
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Define a constant for your API URL. Best practice is to use environment variables.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/chat';
const LOCAL_STORAGE_KEY = 'careerChatHistory'; // Key for local storage

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat window
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Load chat history from Local Storage on initial render
    useEffect(() => {
        const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedHistory) {
            try {
                setMessages(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse chat history from Local Storage:", e);
                localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
            }
        }
        scrollToBottom(); // Scroll on initial load
    }, []);

    // Save chat history to Local Storage whenever messages change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
        scrollToBottom(); // Scroll on new message
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const userMessage = { role: 'user', text: input };
        // Optimistically add user message to UI
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput(''); // Clear input field
        setLoading(true);

        try {
            // Send the current messages history along with the new message to the backend
            // The backend needs this history to maintain conversation context with Gemini
            const response = await axios.post(`${API_URL}/message`, {
                message: input,
                history: [...messages, userMessage], // Send current history + new user message
            });

            const botMessage = { role: 'model', text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'error', text: 'Oops! Something went wrong. Please try again.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = () => {
        if (window.confirm("Are you sure you want to start a new chat? This will clear your current history.")) {
            setMessages([]); // Clear messages in state
            localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear from Local Storage
            console.log('Chat history cleared.');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>Career Advice Chatbot</h2>
                <button onClick={handleNewChat} disabled={loading}>New Chat</button>
            </div>
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="no-messages">Type a question to get career advice!</div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            {/* Render Markdown content here */}
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                        </div>
                    ))
                )}
                {loading && <div className="loading-indicator">Thinking...</div>}
                <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for career advice..."
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>Send</button>
            </form>
        </div>
    );
}

export default App;