"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: "Welcome to Red Bridge Advisory. I am your digital strategic assistant. How can I assist your transformation journey today?",
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { label: "Strategic Advisory", query: "Tell me about your Strategic Advisory services." },
    { label: "CX Transformation", query: "How do you approach Customer Experience?" },
    { label: "Experience Intelligence", query: "What is AI-driven Experience Intelligence?" },
    { label: "Industries & Sectors", query: "What industries do you specialize in?" },
    { label: "Case Studies", query: "Can you share some case studies?" },
    { label: "Pricing & Retainers", query: "How do you charge for your services?" },
    { label: "Careers", query: "Are you hiring?" },
    { label: "Schedule Briefing", query: "I would like to book a consultation." }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const normalizedQuery = text.trim().toLowerCase();
      let responseText = "Thank you for your inquiry. A senior advisory coordinator has been alerted to review your message. You can also contact us directly at briefing@redbridgeadvisory.com.";

      // Rule-based keyword matching for common client inquiries
      const responseRules = [
        {
          keywords: ["strategic advisory", "strategy", "business model", "organizational design", "capabilities", "what do you do", "services"],
          response: "Our Strategic Advisory practice aligns executive vision with actionable execution. We focus on business model innovation, organizational design, and scaling digital capability models. No hype, just clear outcomes."
        },
        {
          keywords: ["customer experience", "cx", "ex", "employee experience", "satisfaction", "retention", "journey", "culture", "workforce"],
          response: "We design Customer Experiences (CX) and Employee Experiences (EX) that drive bottom-line retention. By linking journey touchpoints to hard financial metrics (like customer lifetime value and cost-to-serve), we turn experience design into a strategic asset."
        },
        {
          keywords: ["ai", "intelligence", "data engineering", "predictive", "machine learning", "ml", "data pipelines", "analytics"],
          response: "Experience Intelligence bridges modern data engineering with predictive analytics. We design data pipelines, ingest real-time signals, and feed custom AI models to forecast customer behaviors and operational bottlenecks."
        },
        {
          keywords: ["industries", "sectors", "healthcare", "finance", "retail", "telecom", "banking", "public sector", "manufactur"],
          response: "We serve key enterprise domains including Financial Services (banking, capital markets), Healthcare (clinical systems, digital health), Omnichannel Retail, Telecommunications, and the Public Sector/Smart Infrastructure."
        },
        {
          keywords: ["case studies", "projects", "work", "examples", "clients", "track record"],
          response: "We have executed major transformations, including routing critical clinical records for national providers, engineering analytics engines processing billions of retail events, and deploying strategic models for banking networks. Check the 'Case Studies' section above for detailed metrics."
        },
        {
          keywords: ["pricing", "cost", "rates", "fees", "how much", "budget"],
          response: "Our advisory engagements are custom-scoped based on target enterprise outcomes and complexity. We typically operate on retainer or fixed-fee milestone structures. Contact our client desk at briefing@redbridgeadvisory.com to arrange a scoped proposal briefing."
        },
        {
          keywords: ["careers", "jobs", "join", "recruiting", "position", "work at"],
          response: "We are always looking for elite strategic designers, principal data engineers, and transformation architects. Visit our Careers section or send your details directly to talent@redbridgeadvisory.com."
        },
        {
          keywords: ["consultation", "book", "meeting", "briefing", "schedule", "contact", "talk", "email", "call"],
          response: "Excellent choice. You can scroll down to our booking form at the bottom of this page, or write directly to our executive client desk at briefing@redbridgeadvisory.com. We typically respond within 4 hours."
        },
        {
          keywords: ["about", "philosophy", "who are you", "who is", "red bridge", "agency", "firm"],
          response: "Red Bridge Advisory is a premier strategic and experience transformation partner. Distinct by Design, Made to Matter. We combine deep business consulting with modern systems engineering to solve high-stakes enterprise challenges."
        }
      ];

      for (const rule of responseRules) {
        if (rule.keywords.some(kw => normalizedQuery.includes(kw))) {
          responseText = rule.response;
          break;
        }
      }

      const botMsg: Message = {
        id: Math.random().toString(),
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-bridge-red text-cream flex items-center justify-center shadow-2xl shadow-bridge-red/35 hover:scale-105 transition-transform cursor-pointer focus:outline-none border border-white/10"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 rounded-full bg-bridge-red animate-ping opacity-25 pointer-events-none" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[520px] glass-panel-glow rounded-xl z-50 flex flex-col justify-between overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bridge-red/20 border border-bridge-red flex items-center justify-center text-bridge-red">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-cream">
                    AI Advisor
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online • Advisory Engine
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cream/40 hover:text-cream/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-bridge-red text-cream border border-white/10"
                        : "bg-deep-navy/35 text-cream/90 border border-white/5"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="block text-[9px] text-cream/40 mt-1.5 font-mono text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded px-3.5 py-2.5 bg-deep-navy/35 text-cream/40 border border-white/5 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cream/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies & Input Panel */}
            <div className="p-3 border-t border-white/5 bg-black/35 flex flex-col gap-3">
              {/* Quick Replies Carousel */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply.query)}
                    className="flex-shrink-0 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono tracking-wider text-cream/60 hover:text-cream hover:border-bridge-red/35 hover:bg-bridge-red/5 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2 bg-black/40 rounded border border-white/5 px-2.5 py-1.5 focus-within:border-bridge-red/40 transition-colors"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a strategic question..."
                  className="flex-1 bg-transparent text-xs text-cream outline-none placeholder-cream/30 py-1"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-1.5 rounded bg-bridge-red text-cream disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
