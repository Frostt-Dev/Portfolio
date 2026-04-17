import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { useChatbot } from '../hooks/useChatbot';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 bg-primary border-2 border-black shadow-neo rounded-none flex items-center justify-center text-white hover:bg-secondary transition-colors"
            aria-label="Open Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-[90vw] md:w-[400px] h-[500px] bg-surface border-2 border-black shadow-neo-lg flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b-2 border-black">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                <h3 className="font-bold text-black uppercase tracking-wide">Krish AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black hover:bg-black/10 p-1 rounded transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-main"
              data-lenis-prevent="true"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 text-sm border-2 border-black shadow-neo-sm ${
                      msg.role === 'user' 
                        ? 'bg-accent text-black' 
                        : 'bg-white text-black'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-black shadow-neo-sm p-3 flex gap-1">
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 border-t-2 border-black bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border-2 border-black bg-main text-text focus:outline-none focus:border-primary placeholder:text-text/50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-primary border-2 border-black text-white hover:bg-secondary hover:text-black transition-colors shadow-neo-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
