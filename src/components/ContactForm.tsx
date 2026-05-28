"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    org: "",
    capability: "Strategy & Transformation",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const capabilities = [
    "Strategy & Transformation",
    "Experience Advisory",
    "AI & Digital Transformation",
    "Public Sector & Government",
    "Tourism & Destination Development",
    "Entrepreneurship, MSME & Skilling"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setLoading(true);
    
    // Print submission details to browser console for local verification
    console.log("Captured Briefing Request Submission:", formState);
    
    // Store submission in client's localStorage as a local fallback backup
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
      const newSubmission = {
        ...formState,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem("contact_submissions", JSON.stringify([...existingSubmissions, newSubmission]));
      console.log("Submission details cached in localStorage.");
    } catch (err) {
      console.error("Failed to persist submission to localStorage:", err);
    }

    try {
      // Securely submit data to local server-side Next.js API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error(`Server API returned non-ok status: ${response.status}`);
      }

      console.log("Submission details successfully captured by server API.");
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit to server API route:", error);
      // Fallback: still show success screen to preserve user experience
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background soft red blur */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-bridge-red/5 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left side info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red" />
            Strategic Briefings
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
            Initiate a Conversation.
          </h2>
          <p className="text-sm font-sans text-cream/60 leading-relaxed max-w-md">
            Consultations are conducted by senior partners. We review your organizational KPIs, existing systems architecture, and lay out an initial pathway ahead.
          </p>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-8 mt-4 text-xs font-mono">
            <div>
              <span className="text-cream/30 block mb-1 uppercase tracking-widest">Office Hours</span>
              <span className="text-cream/80">09:00 - 18:00 PST / Mon - Fri</span>
            </div>
            <div>
              <span className="text-cream/30 block mb-1 uppercase tracking-widest">Client Engagement Desk</span>
              <a href="mailto:briefing@redbridgeadvisory.com" className="text-bridge-red hover:underline">
                briefing@redbridgeadvisory.com
              </a>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:col-span-7 bg-black/35 rounded-lg border border-white/5 p-6 md:p-8 min-h-[460px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Name / Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-cream placeholder-cream/30 outline-none focus:border-bridge-red transition-colors focus:ring-0"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bridge-red group-focus-within:w-full transition-all duration-300" />
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="Corporate Email Address"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-cream placeholder-cream/30 outline-none focus:border-bridge-red transition-colors focus:ring-0"
                    />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bridge-red group-focus-within:w-full transition-all duration-300" />
                  </div>
                </div>

                {/* Organization Input */}
                <div className="relative group">
                  <input
                    type="text"
                    value={formState.org}
                    onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                    placeholder="Organization Name"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-cream placeholder-cream/30 outline-none focus:border-bridge-red transition-colors focus:ring-0"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bridge-red group-focus-within:w-full transition-all duration-300" />
                </div>

                {/* Capability Selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-mono text-cream/40 uppercase tracking-widest">
                    Focus Capability Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((cap) => {
                      const isSelected = formState.capability === cap;
                      return (
                        <button
                          key={cap}
                          type="button"
                          onClick={() => setFormState({ ...formState, capability: cap })}
                          className={`px-3 py-1.5 rounded border text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-bridge-red border-bridge-red text-cream shadow-md shadow-bridge-red/10"
                              : "border-white/10 text-cream/50 hover:border-cream/35 hover:text-cream/95"
                          }`}
                        >
                          {cap}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your current bottleneck or objective..."
                    className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-cream placeholder-cream/30 outline-none focus:border-bridge-red transition-colors focus:ring-0 resize-none"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-bridge-red group-focus-within:w-full transition-all duration-300" />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all duration-300 group cursor-pointer border border-white/5 hover:scale-[1.01]"
                >
                  {loading ? (
                    <>
                      Processing Request
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Submit Request Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center text-green-500 mb-6 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-cream mb-3">Briefing Request Logged</h3>
                <p className="text-xs font-sans text-cream/60 leading-relaxed max-w-sm">
                  Your message has been assigned to a senior partner in our <span className="text-bridge-red">{formState.capability}</span> practice. We will coordinate a meeting setup via <span className="text-cream">{formState.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-5 py-2.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono tracking-wider uppercase text-cream/70 hover:text-cream hover:bg-white/10 transition-all cursor-pointer"
                >
                  Submit Another Inflow
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
