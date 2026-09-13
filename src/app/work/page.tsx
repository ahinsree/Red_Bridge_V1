"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Target,
  RefreshCw,
  Share2,
  Check
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";

export default function WorkPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollVal, setScrollVal] = useState(0);
  const [copied, setCopied] = useState(false);

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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBFBFA] text-[#1A1A1A] selection:bg-[#B22030] selection:text-white font-sans">
      {/* Top Header Navigation */}
      <Header />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER (Turtlewax Style Dark Executive Header) */}
      {/* ========================================================================= */}
      <section 
        className="hero relative overflow-hidden" 
        style={{ 
          minHeight: "560px",
          background: `radial-gradient(circle at 20% 30%, rgba(178, 32, 48, 0.45) 0%, transparent 70%), #0B0F1A`
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Background Parallax Layer */}
        <div className="hero__bg">
          <div 
            className="hero__parallax-wrapper" 
            style={{ 
              transform: `translate3d(${mousePos.x * -0.3}px, ${scrollVal * 0.25 + mousePos.y * -0.3}px, 0) scale(1.08)` 
            }}
          >
            <div 
              style={{
                position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
                background: `url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80') center/cover no-repeat`,
                opacity: 0.18,
                filter: "grayscale(80%) contrast(1.2)",
                animation: "heroKenBurns 45s ease-in-out infinite alternate"
              }}
            />
          </div>
        </div>

        {/* Ambient Lightbeam */}
        <div 
          className="hero__lightbeam" 
          style={{
            background: `linear-gradient(135deg, rgba(178, 32, 48, 0.4) 0%, transparent 65%)`
          }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ paddingTop: "140px", paddingBottom: "70px" }}>
          {/* Top Breadcrumb & Share */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-white/70 hover:text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10"
            >
              <ArrowLeft size={12} className="text-[#E31E24]" /> Work / Case Study
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-white/70 hover:text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
              <span>{copied ? "Link Copied" : "Share Case Study"}</span>
            </button>
          </div>

          {/* Subtitle Pill */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-[#B22030] text-white shadow-md">
              Automotive • Customer Experience Transformation
            </span>
            <span className="text-xs font-mono text-white/60 hidden sm:inline-block">Middle East Region</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl space-y-4">
            <h1 
              className="font-serif font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(32px, 5vw, 62px)" }}
            >
              From Customer Feedback to Customer Action
            </h1>
            <p 
              className="font-sans text-white/80 font-light max-w-3xl leading-relaxed"
              style={{ fontSize: "clamp(17px, 2vw, 22px)" }}
            >
              Transforming Customer Experience for a Leading Automotive Dealer in the Middle Eastern Region.
            </p>
          </div>

          {/* Quick Specifications Metadata Grid */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-white/70">
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">Industry</span>
              <span className="text-white font-medium">Automotive</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">Region</span>
              <span className="text-white font-medium">Middle East</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">Journey Verticals</span>
              <span className="text-white font-medium">Presales | Sales | Service | Bodyshop</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">Impact Scope</span>
              <span className="text-emerald-400 font-medium">Closed-Loop Resolution</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SERVICES & EXECUTIVE OVERVIEW SECTION (Turtlewax 2-Column Specs Layout) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Services Provided Pill Badges (4 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                  Capabilities &amp; Services Delivered
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  Engagement Overview
                </h2>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[
                  "Voice of Customer (VOC)",
                  "Presales Journey Architecture",
                  "Sales & Service Integration",
                  "Bodyshop Experience Framework",
                  "Role-Based CX Dashboards",
                  "Closed-Loop Ticketing System",
                  "Operational Issue Resolution",
                  "Executive Experience Intelligence"
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-[#F4F4F2] border border-gray-200 text-gray-800 text-xs font-mono font-medium hover:border-[#B22030] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Spec Box */}
              <div className="p-6 rounded-2xl bg-[#0B0F1A] text-white space-y-4 shadow-lg border border-white/10 mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#E31E24] font-bold">
                  Engagement Mandate
                </h4>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Client Category</span>
                    <span className="text-white font-medium">Leading Automotive Dealer</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Geographic Footprint</span>
                    <span className="text-white font-medium">Middle Eastern Region</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Touchpoint Coverage</span>
                    <span className="text-white font-medium">4 Critical Verticals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Primary Objective</span>
                    <span className="text-emerald-400 font-medium">Feedback-to-Action Ecosystem</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Executive Summary (7 cols offset) */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6 text-gray-700">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug">
                Transitioning an Automotive Giant from Passive Survey Reporting to Closed-Loop Operational Action.
              </h3>
              
              <p className="text-base font-sans leading-relaxed text-gray-600">
                A leading automotive dealership group operating across the Middle Eastern region possessed an established customer feedback program covering key customer touchpoints across Presales, Sales, Service, and Bodyshop operations.
              </p>

              <p className="text-base font-sans leading-relaxed text-gray-600">
                Despite gathering substantial volumes of feedback, fragmented survey structures and traditional descriptive reporting made it exceptionally difficult to translate customer sentiment into clear operational priorities or track timely issue resolution.
              </p>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border-l-4 border-[#B22030] space-y-2">
                <p className="text-sm font-serif italic text-gray-900 font-medium leading-relaxed">
                  &ldquo;The organisation needed to move beyond traditional CX reporting and create an ecosystem where teams could quickly answer: What are customers telling us? Where is the problem? Who needs to act? And has it been resolved?&rdquo;
                </p>
              </div>

              <p className="text-base font-sans leading-relaxed text-gray-600">
                Red Bridge Advisory collaborated with leadership to redesign the survey architecture, reimagine decision-driven role-based dashboards, and build a closed-loop ticketing mechanism that assigns accountability and enforces resolution across all 4 customer journey verticals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. VISUAL SHOWCASE BANNER (Turtlewax Widescreen Highlight Box) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#FBFBFA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] overflow-hidden bg-[#0B0F1A] border border-white/10 shadow-2xl p-8 sm:p-12 md:p-16">
            
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
                alt="Automotive Customer Experience"
                fill
                sizes="100vw"
                className="object-cover opacity-20 filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/90 to-transparent" />
            </div>

            {/* Glowing Accent */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B22030]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white">
                <Sparkles size={14} className="text-[#E31E24]" />
                <span>Connected Experience Management System</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Listen. Understand. Act.
              </h2>

              <p className="text-base sm:text-lg font-sans text-white/80 font-light leading-relaxed">
                Integrating Voice of Customer measurement directly with operational workflows to ensure no customer concern goes unresolved.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-mono text-white/90">
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#E31E24] shrink-0" />
                  <span>4 Journey Verticals</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#E31E24] shrink-0" />
                  <span>1 Ecosystem</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#E31E24] shrink-0" />
                  <span>Role-Based Intelligence</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#E31E24] shrink-0" />
                  <span>Closed-Loop Ticketing</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CHALLENGE SECTION (Problem Statement & 4 Core Questions Grid) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              01 / The Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Customer feedback was being collected. The opportunity was turning it into action.
            </h2>
            <p className="text-base sm:text-lg font-sans text-gray-600 leading-relaxed">
              A leading automotive dealer in the Middle Eastern region had an established customer feedback program across key stages of the automotive journey. However, fragmented survey structures and reporting processes made it challenging to consistently translate customer feedback into clear insights, operational action and timely issue resolution.
            </p>
          </div>

          {/* 4 Operational Questions Box Grid */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0F1A] text-white space-y-8 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B22030]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E31E24] font-bold block">
                The Core Operational Imperative
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                The organisation needed to move beyond traditional CX reporting and create an ecosystem where teams could quickly answer:
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E31E24] transition-all space-y-3">
                <span className="w-8 h-8 rounded-lg bg-[#B22030]/20 text-[#E31E24] font-mono text-xs font-bold flex items-center justify-center">
                  01
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  What are customers telling us?
                </h4>
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  Streamlined survey framework capturing relevant sentiment at key journey moments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E31E24] transition-all space-y-3">
                <span className="w-8 h-8 rounded-lg bg-[#B22030]/20 text-[#E31E24] font-mono text-xs font-bold flex items-center justify-center">
                  02
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Where is the problem?
                </h4>
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  Pinpointing root-cause operational friction across Presales, Sales, Service, or Bodyshop.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E31E24] transition-all space-y-3">
                <span className="w-8 h-8 rounded-lg bg-[#B22030]/20 text-[#E31E24] font-mono text-xs font-bold flex items-center justify-center">
                  03
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Who needs to act?
                </h4>
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  Role-based reporting routing actionable tickets directly to designated department owners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500 transition-all space-y-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                  04
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  And has it been resolved?
                </h4>
                <p className="text-xs font-sans text-white/70 leading-relaxed">
                  Closed-loop verification ensuring issues are tracked through resolution to final closure.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE DID SECTION (Turtlewax 3-Stage Transformation Process) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#FBFBFA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              02 / What We Did
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              The 3-Stage Transformation Roadmap
            </h2>
            <p className="text-base font-sans text-gray-600">
              A comprehensive restructuring of Voice of Customer measurement, CX reporting intelligence, and operational issue management.
            </p>
          </div>

          {/* Stage 01 */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-white border border-gray-200/90 shadow-xs space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                  01 — Redesigned the Voice of Customer
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  Making every question count.
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F4F4F2] text-gray-700 w-fit">
                Presales | Sales | Service | Bodyshop
              </span>
            </div>

            <p className="text-base font-sans text-gray-700 leading-relaxed max-w-4xl">
              We restructured and streamlined the customer survey framework across Presales, Sales, Service and Bodyshop. The new approach focused on capturing feedback at the most relevant moments of the customer journey while generating insights that could directly support improvement.
            </p>

            {/* Shift Box */}
            <div className="p-6 rounded-2xl bg-[#0B0F1A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">FROM PREVIOUS APPROACH</span>
                <span className="text-sm font-mono font-medium text-white/80">Collecting customer feedback</span>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#B22030] flex items-center justify-center shrink-0">
                <ArrowRight size={18} className="text-white" />
              </div>

              <div className="space-y-1 text-center sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">TO TRANSFORMED APPROACH</span>
                <span className="text-sm font-mono font-bold text-white">Capturing feedback designed for action</span>
              </div>
            </div>
          </div>

          {/* Stage 02 */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-white border border-gray-200/90 shadow-xs space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                  02 — Reimagined CX Reporting
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  From dashboards full of data to dashboards built for decisions.
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F4F4F2] text-gray-700 w-fit">
                Role-Based Experience Intelligence
              </span>
            </div>

            <p className="text-base font-sans text-gray-700 leading-relaxed max-w-4xl">
              We completely revamped the CX reporting and dashboard ecosystem, transforming customer feedback into meaningful, actionable insights. Dashboards were designed around the needs of different stakeholder groups, providing the right information at the right level—from leadership visibility to operational action. A robust role-based access and permission structure ensured that stakeholders could access the insights relevant to their responsibilities.
            </p>

            {/* 3 Outcome Metric Chips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-[#B22030] flex items-center gap-1.5">
                  <TrendingUp size={16} /> ↑ Visibility
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Clearer Understanding</h4>
                <p className="text-xs font-sans text-gray-600">A clear, unvarnished view of CX performance across all dealerships.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-[#B22030] flex items-center gap-1.5">
                  <Target size={16} /> ↑ Actionability
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Decision-Connected</h4>
                <p className="text-xs font-sans text-gray-600">Insights directly connected to specific operational opportunities.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-[#B22030] flex items-center gap-1.5">
                  <ShieldCheck size={16} /> ↑ Accountability
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Right Stakeholders</h4>
                <p className="text-xs font-sans text-gray-600">The right teams seeing the exact information relevant to their roles.</p>
              </div>
            </div>
          </div>

          {/* Stage 03 */}
          <div className="p-8 sm:p-12 rounded-[28px] bg-white border border-gray-200/90 shadow-xs space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                  03 — Closed the Loop on Customer Issues
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                  Because identifying an issue is only the beginning.
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#F4F4F2] text-gray-700 w-fit">
                Closed-Loop Issue Management
              </span>
            </div>

            <p className="text-base font-sans text-gray-700 leading-relaxed max-w-4xl">
              We built a closed-loop ticketing and issue-management process to connect customer feedback directly to action. When a customer issue was identified, it could be converted into a ticket, routed to the appropriate owner, tracked through resolution and closed once the required action was completed.
            </p>

            {/* Ticket Flow Banner */}
            <div className="p-6 rounded-2xl bg-[#0B0F1A] text-white space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E31E24] font-bold block">
                Closed-Loop Resolution Architecture
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium">
                  Feedback
                </div>
                <ChevronRight size={16} className="text-[#E31E24]" />
                <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium">
                  Ticket
                </div>
                <ChevronRight size={16} className="text-[#E31E24]" />
                <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium">
                  Ownership
                </div>
                <ChevronRight size={16} className="text-[#E31E24]" />
                <div className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white font-medium">
                  Resolution
                </div>
                <ChevronRight size={16} className="text-[#E31E24]" />
                <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Closure
                </div>
              </div>
            </div>

            {/* 3 Outcome Metric Chips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                  <Clock size={16} /> ↓ Time to Action
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Accelerated Routing</h4>
                <p className="text-xs font-sans text-gray-600">Issues could be routed quickly to the right teams without delay.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-[#B22030] flex items-center gap-1.5">
                  <ShieldCheck size={16} /> ↑ Ownership
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Clear Accountability</h4>
                <p className="text-xs font-sans text-gray-600">Explicit single-point accountability for every flagged issue.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 space-y-2">
                <span className="text-sm font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                  <RefreshCw size={16} /> ↓ Unresolved Issues
                </span>
                <h4 className="text-sm font-serif font-bold text-gray-900">Resolution Visibility</h4>
                <p className="text-xs font-sans text-gray-600">Greater end-to-end visibility of open issues through to closure.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE IMPACT SECTION (Turtlewax 5 Impact Cards Grid) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              03 / The Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              A connected CX ecosystem built around action
            </h2>
            <p className="text-base font-sans text-gray-600 leading-relaxed">
              The transformation brought together customer listening, insight generation and operational action into a single experience management ecosystem.
            </p>
          </div>

          {/* 5 Impact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Impact 1 */}
            <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 hover:border-[#B22030] transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-mono text-sm font-bold flex items-center justify-center">
                  ↑
                </span>
                <span className="text-xs font-mono text-gray-400">01 / Visibility</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">Customer Visibility</h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed">
                A clearer, unified view of customer experience across every phase of the automotive journey—Presales, Sales, Service, and Bodyshop.
              </p>
            </div>

            {/* Impact 2 */}
            <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 hover:border-[#B22030] transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-mono text-sm font-bold flex items-center justify-center">
                  ↑
                </span>
                <span className="text-xs font-mono text-gray-400">02 / Decisions</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">Decision Quality</h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed">
                Actionable operational insights replacing fragmented, lagged, or purely descriptive survey reporting.
              </p>
            </div>

            {/* Impact 3 */}
            <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 hover:border-[#B22030] transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-mono text-sm font-bold flex items-center justify-center">
                  ↑
                </span>
                <span className="text-xs font-mono text-gray-400">03 / Ownership</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">Operational Accountability</h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed">
                Role-based reporting and structured ownership helped operational teams focus on the specific issues within their direct control.
              </p>
            </div>

            {/* Impact 4 */}
            <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 hover:border-[#B22030] transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-mono text-sm font-bold flex items-center justify-center">
                  ↓
                </span>
                <span className="text-xs font-mono text-gray-400">04 / Friction</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">Resolution Friction</h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed">
                Closed-loop ticketing created a streamlined, friction-free path from identifying a customer issue to fully resolving it.
              </p>
            </div>

            {/* Impact 5 */}
            <div className="p-8 rounded-2xl bg-[#F8F8F6] border border-gray-200/80 hover:border-[#B22030] transition-all space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-mono text-sm font-bold flex items-center justify-center">
                  ↑
                </span>
                <span className="text-xs font-mono text-gray-400">05 / Culture</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900">Customer-Centricity</h3>
              <p className="text-sm font-sans text-gray-600 leading-relaxed">
                Customer feedback shifted to become an active, ongoing input into operational improvement across departments, rather than simply a static score reported to leadership.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATION AT A GLANCE (Turtlewax 4 Metric Cards Grid) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-[#0B0F1A] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E31E24] font-bold block">
              Executive Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              The Transformation at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-[#E31E24] transition-colors">
              <span className="text-5xl font-serif font-bold text-[#E31E24] block">4</span>
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Customer Journey Verticals
              </h4>
              <p className="text-xs font-sans text-white/60">
                Presales | Sales | Service | Bodyshop
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-[#E31E24] transition-colors">
              <span className="text-5xl font-serif font-bold text-white block">1</span>
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Connected CX Ecosystem
              </h4>
              <p className="text-xs font-sans text-white/60">
                Listen → Understand → Act
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-[#E31E24] transition-colors">
              <span className="text-3xl font-serif font-bold text-white block pt-2">Role-Based</span>
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Experience Intelligence
              </h4>
              <p className="text-xs font-sans text-white/60">
                Right insight. Right stakeholder. Right action.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-emerald-500 transition-colors">
              <span className="text-3xl font-serif font-bold text-emerald-400 block pt-2">Closed-Loop</span>
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Issue Management
              </h4>
              <p className="text-xs font-sans text-white/60">
                Identify → Assign → Resolve → Close
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CORE PHILOSOPHY QUOTE BANNER (Turtlewax Highlight Quote Box) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 md:p-16 rounded-[32px] bg-[#F4F4F0] border border-gray-200 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B22030]/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              Strategic Takeaway
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
              From Measuring Experience to Managing Experience
            </h3>

            <div className="space-y-4 text-base sm:text-lg font-sans text-gray-700 leading-relaxed max-w-4xl">
              <p className="text-gray-500 italic">
                The transformation shifted the organisation from asking:
              </p>
              <blockquote className="pl-6 border-l-4 border-gray-400 text-gray-600 font-serif italic text-xl">
                &ldquo;What is our customer experience score?&rdquo;
              </blockquote>
              <p className="text-gray-500 italic">
                to asking:
              </p>
              <blockquote className="pl-6 border-l-4 border-[#B22030] text-[#B22030] font-serif font-bold text-xl sm:text-2xl">
                &ldquo;What are our customers telling us, what needs to change, who needs to act—and have we resolved it?&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-gray-300/80">
              <p className="text-xs font-mono uppercase tracking-wider text-gray-600 font-bold">
                That is the difference between measuring customer experience and actively managing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONTACT / ADVISORY CTA FOOTER BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#0B0F1A] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 rounded-[32px] bg-gradient-to-r from-[#B22030] to-[#7E1521] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold block">
                Red Bridge Advisory • Experience Management Mandates
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                Transform Customer Experience into Operational Action
              </h3>
              <p className="text-sm sm:text-base font-sans text-white/80 font-light leading-relaxed">
                Connect with our senior practice partners to structure your customer listening framework, role-based dashboards, and closed-loop issue management.
              </p>
            </div>

            <Link
              href="/#contact"
              className="px-8 py-4 rounded-full bg-white text-[#B22030] text-xs font-mono uppercase tracking-widest font-bold hover:bg-gray-100 shadow-xl transition-all hover:scale-105 shrink-0"
            >
              Discuss Mandate &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer, Chatbot & Scroll */}
      <Footer />
      <Chatbot />
      <ScrollToggle />
    </div>
  );
}
