import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { solveMathProblem } from '../services/gemini';
import { ChatMessage, HistoryItem, CalculatorMode } from '../types';
import Button from './Button';

interface AISolverProps {
  onAddToHistory: (item: HistoryItem) => void;
}

const AISolver: React.FC<AISolverProps> = ({ onAddToHistory }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: 'Hello! I am GodCalculator.pro. I can help you solve complex math problems, convert units, or explain mathematical concepts. What can I do for you today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userText = prompt.trim();
    setPrompt('');
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await solveMathProblem(userText);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };

      setMessages(prev => [...prev, aiMsg]);

      // Add to global history if it looks like a concise solution
      onAddToHistory({
        id: Date.now().toString(),
        expression: userText.substring(0, 50) + (userText.length > 50 ? '...' : ''),
        result: "AI Response",
        timestamp: Date.now(),
        mode: CalculatorMode.AI_SOLVER
      });

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I encountered an error while processing your request. Please check your connection or API key.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'}
              ${msg.isError ? 'bg-rose-50 dark:bg-rose-900/50 border-rose-200 dark:border-rose-500/50 text-rose-600 dark:text-rose-200' : ''}
            `}>
              {msg.role === 'model' && !msg.isError && (
                 <div className="flex items-center gap-2 mb-2 text-indigo-500 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                   <Sparkles className="w-3 h-3" /> GodCalculator.pro
                 </div>
              )}
              <div className="whitespace-pre-wrap font-mono text-xs sm:text-sm">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-none p-4 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-spin" />
              <span className="text-slate-500 dark:text-slate-400 text-xs">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a math problem..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-4 pr-12 py-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            variant="rose"
            className="absolute right-2 p-2 rounded-lg !w-10 !h-10"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AISolver;