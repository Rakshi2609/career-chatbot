"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from "react-markdown";
import { Bot, Mic, RefreshCw, Send, Volume2, VolumeX, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { ChatMessage } from './chat-message';
import { VoiceStatusBar } from './voice-status-bar';

export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

const ThinkingIndicator = () => (
    <div className="flex items-start gap-3 justify-start">
      <div className="flex-shrink-0 size-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
        <Bot className="size-5 text-gray-300" />
      </div>
      <div className="p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none flex items-center space-x-1.5 h-10">
        <span className="size-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="size-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="size-2 bg-gray-400 rounded-full animate-pulse"></span>
      </div>
    </div>
  );

export default function MiraChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: 'Hello! I am MIRA. How can I assist you today? Toggle on voice mode for a conversational experience.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const speak = useCallback((text: string) => {
    if (!isVoiceMode || isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }, [isVoiceMode, isMuted]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/message", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageContent, sessionId }),
      });

      if (!response.ok) throw new Error('Network response was not ok.');
      
      const data = await response.json();

      const botMessage: Message = { id: `${Date.now()}-bot`, role: 'bot', content: data.response };
      setMessages(prev => [...prev, botMessage]);
      setSessionId(data.sessionId);
      speak(data.response);
    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from MIRA. Please try again.",
        variant: "destructive",
      });
       setMessages(prev => prev.slice(0, -1)); // Optimistic UI removal on error
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, speak, toast]);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }
    
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      let finalTranscript = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInterimTranscript(interim);
      if (finalTranscript) {
        setInputValue(prev => prev + finalTranscript);
      }
    };
    
    recognition.current.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      // If we have some final text, send it
      const finalInput = (inputValue + ' ' + (interimTranscript || '')).trim();
      if (isVoiceMode && finalInput) {
        handleSendMessage(finalInput);
      }
    };

    recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
    };

    return () => {
      recognition.current?.stop();
    };
  }, [isVoiceMode, inputValue, handleSendMessage]);

  const toggleListening = () => {
    if (!isVoiceMode) return;
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };
  
  const handleNewChat = () => {
    setMessages([{ id: '1', role: 'bot', content: 'New chat started. How can I help?' }]);
    setSessionId(null);
    setInputValue('');
    setIsLoading(false);
    window.speechSynthesis.cancel();
  };

  const toggleVoiceMode = (checked: boolean) => {
    setIsVoiceMode(checked);
    if (!checked) {
      setIsListening(false);
      recognition.current?.stop();
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50">
      <header className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <Bot className="text-primary size-7" />
          <h1 className="text-xl font-bold text-gray-100">MIRA: Voice AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="voice-mode" checked={isVoiceMode} onCheckedChange={toggleVoiceMode} />
            <Label htmlFor="voice-mode" className="text-gray-300">Voice Mode</Label>
          </div>
          <Button variant="outline" size="sm" onClick={handleNewChat}>
            <RefreshCw className="mr-2 size-4" />
            New Chat
          </Button>
        </div>
      </header>
      
      <div ref={chatContainerRef} className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <ThinkingIndicator />}
      </div>

      {isVoiceMode && <VoiceStatusBar isListening={isListening} interimTranscript={interimTranscript} />}

      <footer className="p-4 border-t border-gray-700/50">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex items-center gap-3">
          {isVoiceMode && (
             <Button type="button" variant="ghost" size="icon" className={cn("rounded-full flex-shrink-0", isMuted ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-700 hover:bg-gray-600' )} onClick={() => setIsMuted(prev => !prev)}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
          )}
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message or use the mic..."
            className="flex-1 bg-gray-800 border-gray-700 text-gray-200 focus:ring-primary focus:ring-2"
            disabled={isLoading}
          />
          {isVoiceMode ? (
            <Button type="button" variant="ghost" size="icon" className={cn("rounded-full flex-shrink-0", isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-green-500 hover:bg-green-600' )} onClick={toggleListening} disabled={isLoading}>
              <Mic />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className="rounded-full flex-shrink-0">
              {isLoading ? <LoaderCircle className="animate-spin" /> : <Send />}
            </Button>
          )}
        </form>
      </footer>
    </div>
  );
}
