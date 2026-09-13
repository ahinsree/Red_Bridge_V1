"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Share2,
  Check,
  X,
  Target,
  Filter
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";

interface CaseStudyItem {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  region: string;
  coverage?: string;
  image: string;
  excerpt: string;
  featured: boolean;
  hasFullModal: boolean;
}

const caseStudiesData: CaseStudyItem[] = [
  {
    id: "automotive-cx-middle-east",
    title: "From Customer Feedback to Customer Action",
    subtitle: "Transforming Customer Experience for a Leading Automotive Dealer in the Middle Eastern Region",
    industry: "Automotive",
    region: "Middle East",
    coverage: "Presales | Sales | Service | Bodyshop",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    excerpt: "Restructured survey framework across Presales, Sales, Service, and Bodyshop with closed-loop issue ticketing and role-based intelligence.",
    featured: true,
    hasFullModal: true,
  },
  {
    id: "coastal-destination-strategy",
    title: "Coastal Destination Strategy for a State Government",
    subtitle: "Master planning & policy framework development for regional tourism development",
    industry: "Tourism & Public Policy",
    region: "India",
    coverage: "State Governance | Destination Master Planning",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    excerpt: "A multi-phase engagement across destination master planning, multi-stakeholder co-design, and policy framework adopted at state level.",
    featured: false,
    hasFullModal: false,
  },
  {
    id: "enterprise-development-msme",
    title: "Enterprise Development Programme Design for a Multi-State Ecosystem",
    subtitle: "Building the institutional conditions for enterprise growth",
    industry: "MSME & Enterprise",
    region: "Multi-State",
    coverage: "Policy Architecture | Delivery Structure",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    excerpt: "Advisory spanning policy architecture, delivery structure, and institutional alignment across state bodies and industry partners in three states.",
    featured: false,
    hasFullModal: false,
  },
  {
    id: "ai-transformation-financial",
    title: "AI Transformation Advisory for a National Financial Institution",
    subtitle: "Phased AI readiness & data governance implementation roadmap",
    industry: "Financial Services & AI",
    region: "National",
    coverage: "Data Architecture | Tech Governance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt: "An honest assessment of data infrastructure, governance gaps, and capability before deploying a phased institutional roadmap.",
    featured: false,
    hasFullModal: false,
  },
];

const INDUSTRIES = ["All Industries", "Automotive", "Tourism & Public Policy", "MSME & Enterprise", "Financial Services & AI"];
const EXPERTISES = ["All Expertise", "Customer Experience (CX)", "Strategy & Governance", "Program Design", "AI & Digital"];

export default function WorkPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedExpertise, setSelectedExpertise] = useState("All Expertise");
  const [activeModalItem, setActiveModalItem] = useState<CaseStudyItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Parallax coordinates state matching Practice Hero Banner
  const [scrollVal, setScrollVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollVal(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 30,
      y: (clientY / innerHeight - 0.5) * 30,
    });
  };

  const filteredCaseStudies = useMemo(() => {
    return caseStudiesData.filter((item) => {
      const matchIndustry = selectedIndustry === "All Industries" || item.industry.toLowerCase().includes(selectedIndustry.toLowerCase().split(" ")[0]);
      const matchExpertise = selectedExpertise === "All Expertise" || (selectedExpertise === "Customer Experience (CX)" && item.id.includes("automotive")) || (selectedExpertise === "Strategy & Governance" && item.id.includes("destination")) || (selectedExpertise === "Program Design" && item.id.includes("enterprise")) || (selectedExpertise === "AI & Digital" && item.id.includes("ai"));
      return matchIndustry && matchExpertise;
    });
  }, [selectedIndustry, selectedExpertise]);

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

  return (
    <div className="relative min-h-screen bg-white text-[#1A1A1A] selection:bg-[#B22030] selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Practice-Style Executive Hero Banner (Inspired by webandcrafts.com/works) */}
      <section 
        className="hero relative overflow-hidden" 
        style={{ 
          height: "60vh", 
          minHeight: "500px",
          background: `radial-gradient(circle at 15% 35%, rgba(178, 32, 48, 0.45) 0%, transparent 65%), #0B0F1A`
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="hero__bg">
          <div 
            className="hero__parallax-wrapper" 
            style={{ 
              transform: `translate3d(${mousePos.x * -0.3}px, ${scrollVal * 0.28 + mousePos.y * -0.3}px, 0) scale(1.08)` 
            }}
          >
            <div 
              style={{
                position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
                background: `url('/images/hero-velocity-bg-desktop.webp') center/cover no-repeat`,
                opacity: 0.16,
                filter: "grayscale(100%) contrast(1.1)",
                animation: "heroKenBurns 45s ease-in-out infinite alternate"
              }}
            />
          </div>
        </div>
        
        {/* Animated Lightbeam overlay */}
        <div 
          className="hero__lightbeam" 
          style={{
            background: `linear-gradient(135deg, rgba(178, 32, 48, 0.45) 0%, transparent 60%)`
          }}
        />

        {/* Custom Parallax Floating Geometry */}
        <div 
          className="hero__floating-geometry hidden md:block"
          style={{
            transform: `translate3d(${mousePos.x * 0.5}px, ${scrollVal * -0.15 + mousePos.y * 0.5}px, 0) rotate(${scrollVal * 0.06}deg)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="hero__floating-geometry-inner">
            <svg width="240" height="240" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 110 L110 10 L210 110 L110 210 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M40 110 L110 40 L180 110 L110 180 Z" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <circle cx="110" cy="110" r="5" fill="#B22030" />
            </svg>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ paddingTop: "140px", paddingBottom: "60px" }}>
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 hover:border-white/20"
            >
              <ArrowLeft size={12} className="text-[#B22030]" /> Back to Home
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-gradient-to-r from-[#B22030] to-[#E31E24] bg-clip-text text-transparent text-xs font-bold tracking-widest uppercase">
              03 / Advisory in Practice
            </span>
            <div className="w-12 h-[1px] bg-[#B22030]" />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="hero__primary flex items-baseline gap-3" style={{ fontSize: "clamp(36px, 6vw, 68px)", lineHeight: 1.1 }}>
                <span>Case Studies</span>
                <sup className="text-xl sm:text-2xl font-mono font-normal text-[#E31E24]">({caseStudiesData.length})</sup>
              </h1>
              <p className="hero__secondary max-w-2xl" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "rgba(255,255,255,0.8)" }}>
                Transformative advisory, strategy execution &amp; institutional impact in practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Filter Controls Bar */}
      <section className="pt-8 md:pt-10 pb-4 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F3F1] border border-gray-200/90 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-gray-700 font-mono uppercase tracking-wider font-medium">
              <Filter size={14} className="text-[#B22030]" />
              <span>Filter case studies by:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
              {/* Dropdown 1: Industry */}
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full sm:w-60 appearance-none bg-white border border-gray-300 rounded-full px-5 py-3 pr-10 text-gray-800 text-xs font-medium focus:outline-none focus:border-[#B22030] focus:ring-1 focus:ring-[#B22030] cursor-pointer shadow-xs transition-colors"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-white text-gray-900">
                      {ind}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Dropdown 2: Expertise */}
              <div className="relative">
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full sm:w-60 appearance-none bg-white border border-gray-300 rounded-full px-5 py-3 pr-10 text-gray-800 text-xs font-medium focus:outline-none focus:border-[#B22030] focus:ring-1 focus:ring-[#B22030] cursor-pointer shadow-xs transition-colors"
                >
                  {EXPERTISES.map((exp) => (
                    <option key={exp} value={exp} className="bg-white text-gray-900">
                      {exp}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Column Uncluttered Portfolio Grid (Inspired by webandcrafts.com/works) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredCaseStudies.map((item) => (
              <article
                key={item.id}
                onClick={() => {
                  if (item.hasFullModal) {
                    setActiveModalItem(item);
                  }
                }}
                className={`group bg-white border border-gray-200/90 rounded-[24px] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#B22030] transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 ${
                  item.hasFullModal ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div>
                  {/* Media Cover Image Box */}
                  <div className="relative w-full h-72 md:h-80 overflow-hidden bg-gray-100 border-b border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {item.featured && (
                      <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[#B22030] text-white font-bold shadow-md">
                        Spotlight
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-7 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                      {item.industry}
                    </span>

                    <h3 className="text-xl font-serif text-gray-900 font-medium leading-[1.3] group-hover:text-[#B22030] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-7 pb-6 pt-0 border-t border-gray-100/80 pt-4 flex items-center justify-between text-xs font-mono font-medium text-gray-900 mt-auto">
                  <span className="text-gray-500 font-light">{item.region}</span>
                  {item.hasFullModal ? (
                    <span className="text-[#B22030] font-bold group-hover:underline flex items-center gap-1">
                      Read Case Study &rarr;
                    </span>
                  ) : (
                    <span className="text-gray-400">Advisory Case</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Slide-over Full Case Study Reader Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
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
                    onClick={() => setActiveModalItem(null)}
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
                  <Link
                    href="/#contact"
                    onClick={() => setActiveModalItem(null)}
                    className="px-8 py-3.5 rounded-full bg-white text-[#B22030] text-xs font-mono uppercase tracking-wider font-bold hover:bg-gray-100 shadow-md transition-all shrink-0"
                  >
                    Discuss Engagement
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <Chatbot />
      <ScrollToggle />
    </div>
  );
}
