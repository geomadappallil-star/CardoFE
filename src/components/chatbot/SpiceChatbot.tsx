import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, X, Send, Sparkles, MessageSquare, ChevronRight, 
  RotateCcw, ArrowUpRight, Zap, HelpCircle 
} from 'lucide-react';
import { answerQuery, QueryEngineContext, BotMessage } from './smartQueryEngine.js';

interface SpiceChatbotProps {
  context: QueryEngineContext;
  onNavigateTab: (tab: string) => void;
}

const INITIAL_SUGGESTIONS = [
  "What is the current cardamom price?",
  "Compare Vandanmettu vs Bodinayakanur",
  "Why did prices spike in 2019?",
  "How is the monsoon rainfall right now?",
  "How much does Idukki produce?",
  "Where does India export cardamom to?"
];

export const SpiceChatbot: React.FC<SpiceChatbotProps> = ({ context, onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 **Welcome to Cardo Board Spice Intelligence AI!**\n\nI am your live analytical assistant powered by **Engine A (Client-Side Smart NLP)**. I have real-time access to our verified Spices Board auctions, Western Ghats climate models, and UN Comtrade telemetry.\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: INITIAL_SUGGESTIONS.slice(0, 3),
      badge: 'Engine A (100% Free)',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: BotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate natural thinking delay (350ms) for pleasant conversational feel
    setTimeout(() => {
      const response = answerQuery(query, context);
      const botMsg: BotMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions,
        navigateToTab: response.navigateToTab,
        badge: response.badge,
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Conversation cleared. Ask me anything about cardamom prices, weather anomalies, production numbers, or future scenario models!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: INITIAL_SUGGESTIONS.slice(0, 3),
        badge: 'Ready',
      }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 border border-emerald-400/40"
          aria-label="Open Spice AI Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
          <span className="font-semibold text-xs sm:text-sm tracking-wide">Ask Spice AI</span>
          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-900/80 text-emerald-200 border border-emerald-400/30 uppercase tracking-wider">
            Free
          </span>
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[430px] h-[560px] max-h-[85vh] flex flex-col rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-600/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white">Spice Intelligence AI</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    Engine A
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Live Data Grounded • 100% Free
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Pill Strip */}
          <div className="px-3.5 py-1.5 bg-slate-950/50 border-b border-slate-800/60 text-[10px] text-slate-400 flex items-center justify-between">
            <div className="truncate flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Active: <span className="text-emerald-400 font-medium">{context.spice.replace('_', ' ')}</span> • {context.scope}</span>
            </div>
            <span className="font-mono text-slate-500 shrink-0">v1.3 Smart</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs text-slate-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Tag */}
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                  {msg.sender === 'bot' ? (
                    <>
                      <Bot className="w-3 h-3 text-emerald-400" />
                      <span className="font-semibold text-emerald-400">Cardo AI</span>
                      {msg.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 text-slate-300 border border-slate-700">
                          {msg.badge}
                        </span>
                      )}
                    </>
                  ) : (
                    <span>You</span>
                  )}
                  <span>• {msg.timestamp}</span>
                </div>

                {/* Bubble */}
                <div
                  className={`p-3 rounded-2xl max-w-[92%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-950/40'
                      : 'bg-slate-800/90 text-slate-200 rounded-bl-none border border-slate-700/60 shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                    {msg.text}
                  </div>

                  {/* Tab Navigation Quick Action Button */}
                  {msg.navigateToTab && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Related Dashboard Section:</span>
                      <button
                        onClick={() => {
                          onNavigateTab(msg.navigateToTab!);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/60 text-[10px] font-semibold transition-colors"
                      >
                        <span>View {msg.navigateToTab.toUpperCase()}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-1">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700/60 transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <ChevronRight className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
                <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span className="italic text-[11px]">Synthesizing telemetry data...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips on Empty/Initial View */}
          {messages.length <= 1 && (
            <div className="p-2 border-t border-slate-800 bg-slate-950/40">
              <span className="text-[10px] text-slate-400 block px-2 mb-1.5 font-medium">Quick Prompts:</span>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {INITIAL_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 shrink-0 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about prices, weather, floods, exports..."
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white transition-colors shadow-sm shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1 flex items-center justify-between text-[9px] text-slate-500 px-1">
              <span>Cardo Board AI • In-Memory Client NLP</span>
              <span className="text-emerald-500">Free Prototype Mode</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
