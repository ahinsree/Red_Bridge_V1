"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Share2,
  Check,
  X,
  Target
} from "lucide-react";

export default function Engagements() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const handleModalScroll = () => {
    if (modalBodyRef.current) {
      const el = modalBodyRef.current;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        setScrollProgress((el.scrollTop / totalHeight) * 100);
      }
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const engagementsList = [
    {
      type: "Tourism • Government • Strategy",
      title: "Coastal destination strategy for a state government",
      desc: "A multi-phase engagement across destination master planning, multi-stakeholder co-design, and policy framework development. The strategy was formally adopted at state level and is in active pilot across multiple districts.",
      delayClass: "",
    },
    {
      type: "MSME • Institutional",
      title: "Enterprise development programme design for a multi-state ecosystem",
      desc: "Advisory spanning policy architecture, delivery structure, and institutional alignment across state bodies and industry partners in three states.",
      delayClass: "d1",
    },
    {
      type: "AI & Digital • Financial Services",
      title: "AI transformation advisory for a national financial institution",
      desc: "An honest assessment of data infrastructure, governance gaps, and organisational capability — before constructing a phased programme the institution could execute seamlessly.",
      delayClass: "d2",
    },
  ];

  return (
    <section className="section section--charcoal relative overflow-hidden" id="engagements">
      {/* Background Lighting Ambient Effect */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#B22030]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="container relative z-10">
        <div className="engagements__header reveal">
          <div>
            <span className="sec-label sec-label--muted">Featured Case Study &amp; Engagements</span>
            <h2 className="sec-title sec-title--light">Advisory in practice</h2>
          </div>
          <a href="#contact" className="btn btn--ghost-light" onClick={(e) => handleScrollTo(e, "#contact")}>
            Discuss your engagement &rarr;
          </a>
        </div>

        {/* Executive Case Study Hero Showcase Card */}
        <div className="mb-14 reveal">
          <div className="bg-[#0B0F1A] border border-white/12 hover:border-[#B22030]/60 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group transition-all duration-500">
            {/* Inner Glow Beam */}
            <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-gradient-to-bl from-[#B22030]/20 via-[#B22030]/5 to-transparent blur-3xl pointer-events-none group-hover:from-[#B22030]/30 transition-all duration-700" />
            
            <div className="relative z-10">
              {/* Badge & Metadata Ribbon */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B22030] text-white font-bold shadow-xs">
                  Spotlight Case Study
                </span>
                <span className="text-xs font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Automotive • Middle East
                </span>
                <span className="text-xs font-mono text-white/50 hidden sm:inline-block">
                  Presales | Sales | Service | Bodyshop
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="max-w-4xl mb-8">
                <h3 className="text-2.5xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4 tracking-tight group-hover:text-white transition-colors">
                  From Customer Feedback to Customer Action
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-sans font-light text-white/80 leading-relaxed max-w-3xl">
                  Transforming Customer Experience for a Leading Automotive Dealer in the Middle Eastern Region.
                </p>
              </div>

              {/* Key Transformation Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pt-6 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#E31E24] block mb-1">4</span>
                  <span className="text-xs font-sans text-white/80 font-medium block">Customer Verticals</span>
                  <span className="text-[10px] font-mono text-white/50 block">Presales to Bodyshop</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white block mb-1">1</span>
                  <span className="text-xs font-sans text-white/80 font-medium block">CX Ecosystem</span>
                  <span className="text-[10px] font-mono text-white/50 block">Listen → Understand → Act</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white block mb-1">Role-Based</span>
                  <span className="text-xs font-sans text-white/80 font-medium block">Intelligence</span>
                  <span className="text-[10px] font-mono text-white/50 block">Right stakeholder action</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white block mb-1">Closed-Loop</span>
                  <span className="text-xs font-sans text-white/80 font-medium block">Issue Management</span>
                  <span className="text-[10px] font-mono text-white/50 block">Identify → Resolve</span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <div className="text-xs font-mono text-white/60 italic">
                  Shifted from measuring CX scores to actively managing operational resolution.
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 rounded-full bg-[#B22030] hover:bg-[#8E1724] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-lg hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 group/btn shrink-0"
                >
                  <span>Explore Full Case Study</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Engagements List */}
        <div className="engagements__grid">
          {engagementsList.map((eng, index) => (
            <div key={index} className={`eng-card reveal ${eng.delayClass}`}>
              <span className="eng-card__type">{eng.type}</span>
              <h3 className="eng-card__title">{eng.title}</h3>
              <p className="eng-card__desc">{eng.desc}</p>
              <a href="#contact" className="eng-card__link" onClick={(e) => handleScrollTo(e, "#contact")}>
                Read engagement &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Full Case Study Reader Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />

            {/* Modal Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed inset-y-0 right-0 max-w-4xl w-full bg-[#0B0F1A] border-l border-white/10 shadow-2xl z-[101] flex flex-col text-white"
            >
              {/* Sticky Top Bar */}
              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-[#0B0F1A]/95 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B22030] text-white font-bold">
                    Automotive CX Case Study
                  </span>
                  <span className="text-xs font-mono text-white/50 hidden sm:inline-block">Middle East Region</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? "Copied" : "Share"}</span>
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-1 shrink-0">
                <div
                  className="bg-[#B22030] h-full transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {/* Scrollable Content Body */}
              <div
                ref={modalBodyRef}
                onScroll={handleModalScroll}
                className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 space-y-12 scrollbar-none"
              >
                {/* Header Title Section */}
                <div className="space-y-4 border-b border-white/10 pb-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E31E24] uppercase tracking-widest">
                    <span>Industry: Automotive</span>
                    <span>•</span>
                    <span>Region: Middle East</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4.5xl font-serif font-bold text-white leading-tight">
                    From Customer Feedback to Customer Action
                  </h1>
                  
                  <p className="text-lg sm:text-xl font-sans font-light text-white/80 leading-relaxed">
                    Transforming Customer Experience for a Leading Automotive Dealer in the Middle Eastern Region.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-white/60">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Coverage: Presales</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Sales</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Service</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Bodyshop</span>
                  </div>
                </div>

                {/* The Challenge Box */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B22030]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E31E24] font-bold">
                    <Target className="w-4 h-4" />
                    <span>The Challenge</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white">
                    Customer feedback was being collected. The opportunity was turning it into action.
                  </h3>

                  <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed">
                    A leading automotive dealer in the Middle Eastern region had an established customer feedback program across key stages of the automotive journey.
                    However, fragmented survey structures and reporting processes made it challenging to consistently translate customer feedback into clear insights, operational action and timely issue resolution.
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-3 font-semibold">
                      The organization needed to answer 4 critical operational questions:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8 text-xs font-mono text-white/90 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
                        <span>What are customers telling us?</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8 text-xs font-mono text-white/90 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
                        <span>Where is the problem?</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8 text-xs font-mono text-white/90 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]" />
                        <span>Who needs to act?</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8 text-xs font-mono text-white/90 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>And has it been resolved?</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What We Did — 3-Stage Transformation Roadmap */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#B22030]" />
                    <h3 className="text-2xl font-serif font-bold text-white">What We Did</h3>
                  </div>

                  {/* Stage 01 */}
                  <div className="p-8 rounded-3xl bg-[#0E1322] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-[#E31E24]">01</span>
                      <span className="text-xs font-mono text-white/50 uppercase">Voice of Customer Framework</span>
                    </div>

                    <h4 className="text-xl font-serif font-bold text-white">Redesigned the Voice of Customer</h4>
                    <p className="text-xs font-mono text-[#E31E24] uppercase tracking-wider">Making every question count.</p>

                    <p className="text-sm font-sans text-white/80 leading-relaxed">
                      We restructured and streamlined the customer survey framework across Presales, Sales, Service and Bodyshop.
                      The new approach focused on capturing feedback at the most relevant moments of the customer journey while generating insights that could directly support improvement.
                    </p>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                      <div className="text-white/60">
                        <span className="text-white/40 block text-[10px]">FROM:</span>
                        Collecting customer feedback
                      </div>
                      <ArrowRight size={16} className="text-[#E31E24] hidden sm:block shrink-0" />
                      <div className="text-emerald-400 font-bold">
                        <span className="text-white/40 block text-[10px] font-normal">TO:</span>
                        Capturing feedback designed for action
                      </div>
                    </div>
                  </div>

                  {/* Stage 02 */}
                  <div className="p-8 rounded-3xl bg-[#0E1322] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-[#E31E24]">02</span>
                      <span className="text-xs font-mono text-white/50 uppercase">Decision-Built Dashboards</span>
                    </div>

                    <h4 className="text-xl font-serif font-bold text-white">Reimagined CX Reporting</h4>
                    <p className="text-xs font-mono text-[#E31E24] uppercase tracking-wider">From dashboards full of data to dashboards built for decisions.</p>

                    <p className="text-sm font-sans text-white/80 leading-relaxed">
                      We completely revamped the CX reporting and dashboard ecosystem, transforming customer feedback into meaningful, actionable insights.
                      Dashboards were designed around the needs of different stakeholder groups, providing the right information at the right level—from leadership visibility to operational action.
                      A robust role-based access and permission structure ensured that stakeholders could access insights relevant to their responsibilities.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↑ Visibility</span>
                        <span className="text-xs font-sans text-white/70">Clearer understanding of CX performance</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↑ Actionability</span>
                        <span className="text-xs font-sans text-white/70">Insights connected to specific opportunities</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↑ Accountability</span>
                        <span className="text-xs font-sans text-white/70">Right teams seeing right information</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage 03 */}
                  <div className="p-8 rounded-3xl bg-[#0E1322] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-[#E31E24]">03</span>
                      <span className="text-xs font-mono text-white/50 uppercase">Issue Resolution Engine</span>
                    </div>

                    <h4 className="text-xl font-serif font-bold text-white">Closed the Loop on Customer Issues</h4>
                    <p className="text-xs font-mono text-[#E31E24] uppercase tracking-wider">Because identifying an issue is only the beginning.</p>

                    <p className="text-sm font-sans text-white/80 leading-relaxed">
                      We built a closed-loop ticketing and issue-management process to connect customer feedback directly to action.
                      When a customer issue was identified, it could be converted into a ticket, routed to the appropriate owner, tracked through resolution and closed once the required action was completed.
                    </p>

                    {/* Ticket Flow Diagram */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-center">
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-white">Feedback</span>
                      <ChevronRight size={14} className="text-[#E31E24]" />
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-white">Ticket</span>
                      <ChevronRight size={14} className="text-[#E31E24]" />
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-white">Ownership</span>
                      <ChevronRight size={14} className="text-[#E31E24]" />
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-white">Resolution</span>
                      <ChevronRight size={14} className="text-[#E31E24]" />
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold">Closure</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↓ Time to Action</span>
                        <span className="text-xs font-sans text-white/70">Issues routed quickly to the right teams</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↑ Ownership</span>
                        <span className="text-xs font-sans text-white/70">Clear accountability for every issue</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/8">
                        <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">↓ Unresolved Issues</span>
                        <span className="text-xs font-sans text-white/70">Visibility of open issues through closure</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Impact Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#B22030]" />
                    <h3 className="text-2xl font-serif font-bold text-white">The Impact</h3>
                  </div>

                  <p className="text-lg font-serif italic text-white/90">
                    A connected CX ecosystem built around action.
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-start gap-4">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">↑</span>
                      <div>
                        <h5 className="text-sm font-serif text-white font-bold">Customer Visibility</h5>
                        <p className="text-xs font-sans text-white/70">A clearer view of customer experience across the entire automotive journey.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-start gap-4">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">↑</span>
                      <div>
                        <h5 className="text-sm font-serif text-white font-bold">Decision Quality</h5>
                        <p className="text-xs font-sans text-white/70">Actionable insights replacing fragmented or purely descriptive reporting.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-start gap-4">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">↑</span>
                      <div>
                        <h5 className="text-sm font-serif text-white font-bold">Operational Accountability</h5>
                        <p className="text-xs font-sans text-white/70">Role-based reporting and structured ownership helped teams focus on issues within control.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-start gap-4">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">↓</span>
                      <div>
                        <h5 className="text-sm font-serif text-white font-bold">Resolution Friction</h5>
                        <p className="text-xs font-sans text-white/70">Closed-loop ticketing created a more streamlined path from identifying a customer issue to resolving it.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex items-start gap-4">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0 mt-0.5">↑</span>
                      <div>
                        <h5 className="text-sm font-serif text-white font-bold">Customer-Centricity</h5>
                        <p className="text-xs font-sans text-white/70">Customer feedback became an active input into operational improvement rather than simply a score reported to leadership.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transformation at a Glance Metric Grid */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-[#B22030]/20 via-[#0B0F1A] to-[#B22030]/10 border border-[#B22030]/30 space-y-6">
                  <h4 className="text-xl font-serif font-bold text-white text-center">The Transformation at a Glance</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-3xl font-serif font-bold text-[#E31E24] block mb-1">4</span>
                      <span className="text-xs font-mono text-white/90 uppercase font-bold block mb-1">Customer Journey Verticals</span>
                      <span className="text-[11px] font-sans text-white/60 block">Presales | Sales | Service | Bodyshop</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-3xl font-serif font-bold text-white block mb-1">1</span>
                      <span className="text-xs font-mono text-white/90 uppercase font-bold block mb-1">Connected CX Ecosystem</span>
                      <span className="text-[11px] font-sans text-white/60 block">Listen → Understand → Act</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-xl font-serif font-bold text-white block mb-1">Role-Based</span>
                      <span className="text-xs font-mono text-white/90 uppercase font-bold block mb-1">Experience Intelligence</span>
                      <span className="text-[11px] font-sans text-white/60 block">Right insight. Right stakeholder. Right action.</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <span className="text-xl font-serif font-bold text-[#E31E24] block mb-1">Closed-Loop</span>
                      <span className="text-xs font-mono text-white/90 uppercase font-bold block mb-1">Issue Management</span>
                      <span className="text-[11px] font-sans text-white/60 block">Identify → Assign → Resolve → Close</span>
                    </div>
                  </div>
                </div>

                {/* Core Takeaway Highlight Box */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E31E24] font-bold block">
                    Core Philosophy Shift
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                    &ldquo;From Measuring Experience to Managing Experience&rdquo;
                  </h3>

                  <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed italic">
                    The transformation shifted the organisation from asking:
                    <br />
                    <span className="text-white/60">&ldquo;What is our customer experience score?&rdquo;</span>
                    <br />
                    to asking:
                    <br />
                    <span className="text-emerald-400 font-medium font-serif text-lg">&ldquo;What are our customers telling us, what needs to change, who needs to act—and have we resolved it?&rdquo;</span>
                  </p>

                  <p className="text-xs font-mono text-white/50 pt-2 border-t border-white/10">
                    That is the difference between measuring customer experience and actively managing it.
                  </p>
                </div>

                {/* CTA Box */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-[#B22030] to-[#8E1724] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">Need CX &amp; Operational Transformation?</h4>
                    <p className="text-xs font-sans text-white/80 max-w-md">Connect with Red Bridge Advisory team to structure your customer experience management ecosystem.</p>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setIsModalOpen(false);
                      handleScrollTo(e, "#contact");
                    }}
                    className="px-8 py-3.5 rounded-full bg-white text-[#B22030] text-xs font-mono uppercase tracking-wider font-bold hover:bg-gray-100 shadow-md transition-all shrink-0"
                  >
                    Discuss Engagement
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
