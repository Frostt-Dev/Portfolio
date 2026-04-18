import { useState } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Hey there! I am Krish. What would you like to know about my portfolio, projects, or background?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to UI
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    
    // Save current messages to pass as history, then update UI
    const currentHistory = [...messages];
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: currentHistory,
        }),
      });

      const rawText = await response.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (err) {
        // If the server didn't return JSON (e.g. Vite 404 page or Vercel 500 HTML)
        throw new Error(`Non-JSON response: ${rawText.slice(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Server responded with an error');
      }

      const newModelMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', content: data.reply };
      setMessages((prev) => [...prev, newModelMsg]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage = error?.message || "Unknown error occurred.";
      const errorMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: `Oops! Connecting to my AI brain failed. Reason: ${errorMessage}` 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};

