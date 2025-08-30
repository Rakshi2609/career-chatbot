import { useState, useRef, useEffect } from "react";
import axios from 'axios';

// This is your original, unmodified chatbot component
export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  const recognitionRef = useRef(null);
  const speechRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ... (All your existing useEffects and functions remain here, unchanged)
  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interim = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            setFinalTranscript(prev => prev + transcript + " ");
            setInterimTranscript("");
          } else {
            interim += transcript;
          }
        }
        
        if (interim) {
          setInterimTranscript(interim);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimTranscript("");
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript("");
      };
    }
  }, []);

  useEffect(() => {
    setInput(finalTranscript + interimTranscript);
  }, [finalTranscript, interimTranscript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice Controls
  const startVoiceRecognition = () => {
    if (!recognitionRef.current) return;
    setFinalTranscript("");
    setInterimTranscript("");
    setInput("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopVoiceRecognition = () => {
    if (!recognitionRef.current) return;
    setIsListening(false);
    recognitionRef.current.stop();
    setInterimTranscript("");
  };

  const muteBot = () => {
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }
  };

  const speakBotResponse = (text) => {
    muteBot();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // --- FIX: Replaced simulated API call with the real one ---
  const sendMessage = async () => {
    if (!input.trim()) return;

    muteBot();
    setLoading(true);

    const newMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]); // Optimistically show user message
    
    setInput("");
    setFinalTranscript("");
    setInterimTranscript("");

    try {
      // The real API call to your backend
      const res = await axios.post("http://localhost:5000/api/chat/message", {
        message: newMsg.text,
        sessionId: sessionId, // Send the session ID for context
      });

      const { response: responseText, sessionId: newSessionId, history } = res.data;

      setSessionId(newSessionId); // Update the session ID from the server
      setMessages(history);     // Update the entire chat with the server's history

      if (isVoiceMode) {
        speakBotResponse(responseText);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to the server. Please ensure it's running." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard send
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear Chat
  const clearChat = () => {
    setMessages([]);
    muteBot();
    setSessionId(null);
    setInput("");
    setFinalTranscript("");
    setInterimTranscript("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    muteBot();
    if (!isListening) {
      setFinalTranscript("");
      setInterimTranscript("");
    }
  };

  return (
    // This is your JSX, unchanged
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 text-white flex justify-center items-center p-4 font-sans">
        <div className="w-full max-w-4xl h-full bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gray-800/80 p-4 border-b border-gray-700 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">MIRA</h1>
            <button
            onClick={clearChat}
            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-sm transition-colors"
            >
            New Chat
            </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 custom-scrollbar">
            {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <p>Start a conversation...</p>
                <p className="text-sm mt-2">Try saying: "Hello there" then pause and say "How are you?"</p>
                </div>
            </div>
            ) : (
            messages.map((msg, idx) => (
                <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-700 text-white rounded-bl-sm"
                    }`}
                >
                    {msg.text}
                </div>
                </div>
            ))
            )}
            {loading && (
            <div className="flex justify-start">
                <div className="p-3 rounded-lg bg-gray-700 animate-pulse">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="ml-2">Thinking...</span>
                </div>
                </div>
            </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        {/* Voice Status */}
        {isVoiceMode && (
            <div className="px-4 py-2 bg-gray-800/60 border-t border-gray-700">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <div
                className={`w-2 h-2 rounded-full ${
                    isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
                }`}
                ></div>
                {isListening ? (
                <span className="flex items-center gap-2">
                    Listening... 
                    {interimTranscript && (
                    <span className="text-blue-300 italic">"{interimTranscript}"</span>
                    )}
                </span>
                ) : (
                "Voice mode active"
                )}
            </div>
            </div>
        )}
        {/* Input */}
        <div className="p-4 bg-gray-800/60 border-t border-gray-700">
            <div className="flex gap-2 mb-3">
            <input
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={isVoiceMode ? "Speak or type your message..." : "Type your message..."}
                className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition-colors"
                disabled={loading}
            />
            <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
            >
                Send
            </button>
            </div>
            {/* Controls */}
            <div className="flex gap-2 justify-center flex-wrap">
            <button
                onClick={() => setIsVoiceMode((prev) => !prev)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                isVoiceMode
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
            >
                🎤 {isVoiceMode ? "Voice Mode On" : "Voice Mode Off"}
            </button>
            {isVoiceMode && (
                <>
                <button
                    onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                    isListening
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-purple-600 hover:bg-purple-500"
                    }`}
                >
                    {isListening ? "⏹️ Stop Listening" : "🎙️ Start Listening"}
                </button>
                <button
                    onClick={muteBot}
                    className="bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors"
                >
                    🔇 Mute Bot
                </button>
                </>
            )}
            </div>
        </div>
        </div>
        <style jsx>{`
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4a5568 #1a202c;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a202c;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #718096;
        }
        `}</style>
    </div>
  );
}