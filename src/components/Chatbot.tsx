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
    { label: "Book Consultation", query: "I would like to book a consultation." },
    { label: "Strategy & Transformation", query: "Tell me about your Strategy & Transformation services." },
    { label: "AI & Digital", query: "What AI & Digital services do you provide?" },
    { label: "Experience Advisory", query: "Tell me about your Experience Advisory practice." },
    { label: "Institutional Transformation", query: "Tell me about your Institutional Transformation practice." },
    { label: "Investment & Economic Advisory", query: "Tell me about your Investment & Economic Advisory practice." }
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
          keywords: ["strategic advisory", "strategy & transformation", "strategy", "business model", "organizational design", "capabilities", "what do you do", "services"],
          response: "Our Strategy & Transformation practice aligns executive vision with actionable execution. We focus on business model innovation, organizational design, operating model development, and scaling digital capability models. No hype, just clear outcomes."
        },
        {
          keywords: ["customer experience", "cx", "ex", "employee experience", "satisfaction", "retention", "journey", "culture", "workforce", "experience advisory", "experience"],
          response: "Our Experience Advisory practice designs Customer Experiences (CX) and Employee Experiences (EX) that drive bottom-line retention. By linking journey touchpoints to hard financial metrics (like customer lifetime value and cost-to-serve), we turn experience design into a strategic asset."
        },
        {
          keywords: ["ai", "ai & digital", "intelligence", "data engineering", "predictive", "machine learning", "ml", "data pipelines", "analytics"],
          response: "Our AI & Digital practice bridges modern data engineering with predictive analytics. We design data pipelines, ingest real-time signals, and design custom AI models to forecast customer behaviors and operational bottlenecks."
        },
        {
          keywords: ["institutional", "institutional transformation", "government", "public systems", "reform", "restructuring", "capacity building"],
          response: "Our Institutional Transformation practice supports government bodies, public authorities, and complex organizations navigating structural reform. We deliver capacity building, operating model modernization, and program management tailored for high-stakes institutional mandates."
        },
        {
          keywords: ["investment", "economic", "investment & economic", "feasibility", "growth", "policy design", "financial strategy"],
          response: "Our Investment & Economic Advisory practice supports sovereign agencies, investment funds, and corporate clients with feasibility studies, economic policy design, and sector development strategies to unlock long-term regional and organizational value."
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
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 rounded-full bg-bridge-red text-cream flex items-center justify-center shadow-2xl shadow-bridge-red/35 hover:scale-105 transition-transform cursor-pointer focus:outline-none border border-white/10"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 w-[310px] sm:w-[350px] h-[460px] bg-[#0c101b]/70 border border-white/10 rounded-xl z-50 flex flex-col justify-between overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_40px_rgba(178,32,48,0.18)]"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bridge-red/20 border border-bridge-red flex items-center justify-center text-bridge-red">
                  <Sparkles className="w-4 h-4" />
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
                    className={
                      msg.sender === "user"
                        ? "chat-bubble-user"
                        : "chat-bubble-bot"
                    }
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
                  <div className="chat-bubble-bot flex items-center gap-1">
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
              {/* Quick Replies */}
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none snap-x">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply.query)}
                    className="chat-quick-reply shrink-0 snap-center"
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
                className="chat-input-bar"
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
