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

  // Helper to split text by first sentence for distinct premium typography (Serif heading + Sans-serif body)
  const renderBotMessage = (text: string) => {
    // Split by the first period, question mark, or exclamation mark followed by space
    const parts = text.split(/(?<=[.?!])\s+/);
    if (parts.length > 1) {
      const heading = parts[0];
      const rest = parts.slice(1).join(" ");
      return (
        <>
          <span className="block font-serif font-medium text-[13.5px] sm:text-[14px] text-cream leading-snug mb-1.5">
            {heading}
          </span>
          <span className="block font-sans text-[11px] sm:text-[11.5px] text-cream/70 leading-relaxed font-light">
            {rest}
          </span>
        </>
      );
    }
    return <span className="block font-sans text-[11.5px] text-cream/80 leading-relaxed">{text}</span>;
  };

  const quickReplies = [
    { label: "Book Consultation", query: "I would like to book a consultation." },
    { label: "Strategy & Transformation", query: "Tell me about your Strategy, Transformation & Institution Building services." },
    { label: "AI, Digital & Data", query: "What AI, Digital & Data services do you provide?" },
    { label: "Experience & Service Design", query: "Tell me about your Experience & Service Design practice." },
    { label: "Investment & Economic", query: "Tell me about your Investment, Economic & Infrastructure Advisory practice." },
    { label: "Startups & Ecosystems", query: "Tell me about your Entrepreneurship, Innovation & Startup Ecosystems practice." }
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
      let responseText = "Thank you for your inquiry. A senior advisory coordinator has been alerted to review your message. You can also contact us directly at contact@redbridgeadvisory.com.";

      // Rule-based keyword matching for common client inquiries
      const responseRules = [
        {
          keywords: ["strategic advisory", "strategy & transformation", "strategy", "business model", "organizational design", "capabilities", "what do you do", "services", "institution building"],
          response: "Our Strategy, Transformation & Institution Building practice aligns executive vision with operating model structures, governance, and reform design to ensure organizational change holds after we leave."
        },
        {
          keywords: ["customer experience", "cx", "ex", "employee experience", "satisfaction", "retention", "journey", "culture", "workforce", "experience & service design", "experience", "service design"],
          response: "Our Experience & Service Design practice works in the gap between what an organization designs and what a person actually gets, shaping customer and citizen experiences on purpose."
        },
        {
          keywords: ["ai", "ai, digital & data", "intelligence", "data engineering", "predictive", "machine learning", "ml", "data pipelines", "analytics", "digital & data"],
          response: "Our AI, Digital & Data practice helps you adopt technology with judgement, not haste, designing data strategies, architectures, and digital roadmaps that show results incrementally."
        },
        {
          keywords: ["investment", "economic", "investment & economic", "feasibility", "growth", "policy design", "financial strategy", "infrastructure advisory"],
          response: "Our Investment, Economic & Infrastructure Advisory practice prepares detailed project reports, feasibility studies, economic promotion strategies, and project structuring behind sound investment decisions."
        },
        {
          keywords: ["entrepreneurship", "innovation", "startups", "ecosystems", "msme", "incubators"],
          response: "Our Entrepreneurship, Innovation & Startup Ecosystems practice designs support architectures, incubation programs, and startup mission advisory to build the conditions for enterprise to grow."
        },
        {
          keywords: ["programme management", "monitoring", "evaluation", "pmu", "delivery", "baseline", "outcome studies"],
          response: "Our Programme Management, Monitoring & Evaluation practice handles execution and verifies outcomes, ensuring that large-scale programs are delivered with strict independent assurance."
        },
        {
          keywords: ["industries", "sectors", "tourism", "climate", "education", "maritime", "coastal", "public sector"],
          response: "We have deep experience across seven key sectors: Infrastructure & Economic Development; Tourism, Hospitality & Destinations; Government & Public Systems; MSME, Startups & Livelihoods; Sustainability, Climate & Green Growth; Education & Workforce Skilling; and Maritime & Coastal Coastal Development."
        },
        {
          keywords: ["case studies", "projects", "work", "examples", "clients", "track record"],
          response: "We have executed major public-sector and enterprise transformations across strategy, digitisation, tourism, skilling, and infrastructure. Details of our case studies and assignments are listed in our portfolio section above."
        },
        {
          keywords: ["pricing", "cost", "rates", "fees", "how much", "budget"],
          response: "Our engagements are custom-scoped. We operate on fixed-fee milestones or retainer structures, depending on the complexity. Contact us at contact@redbridgeadvisory.com to arrange a scoping meeting."
        },
        {
          keywords: ["careers", "jobs", "join", "recruiting", "position", "work at"],
          response: "We are always looking for outstanding independent advisors and specialists. Send your CV and portfolio details to contact@redbridgeadvisory.com."
        },
        {
          keywords: ["consultation", "book", "meeting", "briefing", "schedule", "contact", "talk", "email", "call"],
          response: "Excellent. You can use the enquiry form on our page or write to our team directly at contact@redbridgeadvisory.com. We typically respond within 24-48 hours."
        },
        {
          keywords: ["about", "philosophy", "who are you", "who is", "red bridge", "agency", "firm"],
          response: "Red Bridge Advisory is a boutique management consulting firm working with governments, enterprises and investors across strategy, digital, economic advisory, entrepreneurship, and programme delivery."
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
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 w-auto sm:w-[380px] h-[520px] bg-[#0c101b]/70 border border-white/10 rounded-xl z-50 flex flex-col justify-between overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_40px_rgba(178,32,48,0.18)]"
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
                        ? "chat-bubble-user font-sans"
                        : "chat-bubble-bot"
                    }
                  >
                    {msg.sender === "bot" ? (
                      renderBotMessage(msg.text)
                    ) : (
                      <p className="whitespace-pre-line text-[11px] sm:text-[11.5px] leading-relaxed">{msg.text}</p>
                    )}
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
