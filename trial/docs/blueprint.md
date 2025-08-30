# **App Name**: MIRA: Voice AI

## Core Features:

- Real-time Chat Interface: Display conversation history, differentiating user and bot messages.
- API Communication: Send user messages to the backend and receive bot responses, managing loading states and network errors.
- Session Management: Implement a sessionId, sent with each request and updated with each backend response, to maintain conversation context.
- Voice Input (Speech-to-Text): Enable users to speak their messages using the webkitSpeechRecognition API, displaying real-time transcriptions. Note that while AI can perform Speech to Text, that piece has already been pre-selected. Here the frontend only uses browser APIs.
- Voice Output (Text-to-Speech): Use the SpeechSynthesis API to read the bot's responses aloud in Voice Mode.
- New Chat Control: Provide a button to clear the current session and start a new chat.
- Voice Mode Toggle: Implement a toggle switch to turn Voice Mode on and off.

## Style Guidelines:

- Color palette: Dark theme with deep, rich blues and near-blacks, suitable for a sophisticated feel. Primary color: Electric blue (#2563eb) for user messages, buttons, and focus rings.
- Background color: Animated gradient blending dark ink blue (#0a192f), deep purple (#4c1d95), and midnight blue (#1e3a8a).
- Secondary color: Semi-transparent, dark gray (bg-gray-900/90) with a backdrop-blur effect for the main chat window to create a "glassmorphism" look.
- Accent color: Neutral dark gray (bg-gray-700) for bot messages.
- Font: 'Inter', a clean, modern sans-serif font for maximum readability and a professional feel.
- Main chat component: Centered on the page, with a fixed height (90vh) to feel like a dedicated application window.
- Loading state: Elegant "Thinking..." animation with pulsing dots when waiting for an API response.