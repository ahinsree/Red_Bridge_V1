"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Share2,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";

export default function WorkPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#111827] selection:bg-[#B22030] selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Header />

      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION (Turtlewax Clean Spacious Aesthetic) */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAFAFA] border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Breadcrumb & Share Link */}
          <div className="flex items-center justify-between gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest text-gray-500 hover:text-[#B22030] transition-colors"
            >
              <ArrowLeft size={13} /> Back to Overview
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              <span>{copied ? "Link Copied" : "Share Case Study"}</span>
            </button>
          </div>

          {/* Tag & Title Block */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest font-semibold text-[#B22030]">
                Case Study • Automotive
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-mono text-gray-500">Middle East Region</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-[1.15] tracking-tight">
              From Customer Feedback to Customer Action
            </h1>

            <p className="text-lg sm:text-xl font-sans text-gray-600 font-normal leading-relaxed max-w-3xl pt-2">
              Transforming Customer Experience for a Leading Automotive Dealer in the Middle Eastern Region.
            </p>
          </div>

          {/* Quick Specifications Metadata Strip */}
          <div className="pt-8 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-gray-600">
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Industry</span>
              <span className="text-gray-900 font-semibold">Automotive</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Region</span>
              <span className="text-gray-900 font-semibold">Middle East</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Coverage</span>
              <span className="text-gray-900 font-semibold">Presales | Sales | Service | Bodyshop</span>
            </div>
            <div>
              <span className="text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Core Outcome</span>
              <span className="text-[#B22030] font-semibold">Closed-Loop Issue Resolution</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW & SERVICES SECTION (Turtlewax 2-Column Specs Layout) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Services Provided List (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                Services Provided
              </span>
              
              <ul className="space-y-3 text-sm font-sans text-gray-700 divide-y divide-gray-100">
                <li className="pt-2 font-medium">Voice of Customer Framework (VOC)</li>
                <li className="pt-2">Presales Journey Streamlining</li>
                <li className="pt-2">Sales &amp; Service Feedback Architecture</li>
                <li className="pt-2">Bodyshop Touchpoint Optimisation</li>
                <li className="pt-2">Role-Based CX Dashboards</li>
                <li className="pt-2">Closed-Loop Ticketing Engine</li>
                <li className="pt-2">Executive Experience Governance</li>
              </ul>
            </div>

            {/* Right Column: Executive Overview Narrative (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
                Overview
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-snug">
                Moving Beyond Traditional CX Measurement to Build an Operational Action Ecosystem
              </h2>

              <p className="text-base sm:text-lg font-sans text-gray-600 leading-relaxed">
                A leading automotive dealer in the Middle Eastern region had an established customer feedback program across key stages of the automotive journey—covering Presales, Sales, Service, and Bodyshop operations.
              </p>

              <p className="text-base font-sans text-gray-600 leading-relaxed">
                However, fragmented survey structures and reporting processes made it challenging to consistently translate customer feedback into clear insights, operational action, and timely issue resolution.
              </p>

              <div className="p-6 rounded-2xl bg-[#F9F9F8] border-l-4 border-[#B22030] my-4">
                <p className="text-sm font-serif italic text-gray-900 font-medium leading-relaxed">
                  &ldquo;The organisation needed to move beyond traditional CX reporting and create an ecosystem where teams could quickly answer: What are customers telling us? Where is the problem? Who needs to act? And has it been resolved?&rdquo;
                </p>
              </div>

              {/* Spec Details Table */}
              <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-xs font-mono text-gray-600">
                <div>
                  <span className="text-gray-400 block mb-0.5">CLIENT</span>
                  <span className="text-gray-900 font-medium">Leading Automotive Dealer</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">GEOGRAPHY</span>
                  <span className="text-gray-900 font-medium">Middle Eastern Region</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. VISUAL SHOWCASE BANNER (Turtlewax Clean Widescreen Banner) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#111827] text-white p-8 sm:p-14 shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E31E24] font-bold block">
                Integrated Experience Management
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Listen → Understand → Act
              </h2>

              <p className="text-base sm:text-lg font-sans text-gray-300 font-light leading-relaxed">
                Connecting customer feedback directly to operational workflows, role-based dashboards, and accountable issue closure.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono text-white/80">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="font-bold block text-white text-sm">4</span> Verticals
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="font-bold block text-white text-sm">1</span> Ecosystem
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="font-bold block text-white text-sm">Role-Based</span> Intelligence
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <span className="font-bold block text-emerald-400 text-sm">Closed-Loop</span> Resolution
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CHALLENGE SECTION (Turtlewax Clean 4-Card Problem Layout) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              The Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-snug">
              Customer feedback was being collected. The opportunity was turning it into action.
            </h2>
            <p className="text-base sm:text-lg font-sans text-gray-600 leading-relaxed pt-2">
              Fragmented survey structures and reporting processes made it challenging to consistently translate customer feedback into clear insights, operational action, and timely issue resolution.
            </p>
          </div>

          {/* 4 Operational Questions Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-medium block">
              The 4 Critical Operational Questions to Answer:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-3">
                <span className="text-xs font-mono font-bold text-[#B22030]">QUESTION 01</span>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  What are customers telling us?
                </h3>
                <p className="text-xs font-sans text-gray-600 leading-relaxed">
                  Streamlined survey framework capturing actionable feedback at relevant journey moments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-3">
                <span className="text-xs font-mono font-bold text-[#B22030]">QUESTION 02</span>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Where is the problem?
                </h3>
                <p className="text-xs font-sans text-gray-600 leading-relaxed">
                  Diagnostic dashboards isolating friction points across Presales, Sales, Service, or Bodyshop.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-3">
                <span className="text-xs font-mono font-bold text-[#B22030]">QUESTION 03</span>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Who needs to act?
                </h3>
                <p className="text-xs font-sans text-gray-600 leading-relaxed">
                  Role-based permissions routing specific tickets directly to responsible operational owners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-3">
                <span className="text-xs font-mono font-bold text-emerald-600">QUESTION 04</span>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  And has it been resolved?
                </h3>
                <p className="text-xs font-sans text-gray-600 leading-relaxed">
                  Closed-loop verification tracking ticket lifecycle from assignment through to closure.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE DID SECTION (Turtlewax 3-Stage Process Clean Cards) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#FAFAFA] border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              What We Did
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              The 3-Stage Transformation Strategy
            </h2>
          </div>

          {/* Stage 01 */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold">
                01 — Redesigned the Voice of Customer
              </span>
              <span className="text-xs font-mono text-gray-400">Presales | Sales | Service | Bodyshop</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Making every question count.
            </h3>

            <p className="text-base font-sans text-gray-600 leading-relaxed max-w-4xl">
              We restructured and streamlined the customer survey framework across Presales, Sales, Service and Bodyshop. The new approach focused on capturing feedback at the most relevant moments of the customer journey while generating insights that could directly support improvement.
            </p>

            <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-gray-500">
                <span className="text-gray-400 block text-[10px]">FROM</span>
                Collecting customer feedback
              </div>
              <ArrowRight size={16} className="text-[#B22030] hidden sm:block shrink-0" />
              <div className="text-gray-900 font-bold">
                <span className="text-[#B22030] block text-[10px]">TO</span>
                Capturing feedback designed for action
              </div>
            </div>
          </div>

          {/* Stage 02 */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold">
                02 — Reimagined CX Reporting
              </span>
              <span className="text-xs font-mono text-gray-400">Decision-Built Intelligence</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-gray-900">
              From dashboards full of data to dashboards built for decisions.
            </h3>

            <p className="text-base font-sans text-gray-600 leading-relaxed max-w-4xl">
              We completely revamped the CX reporting and dashboard ecosystem, transforming customer feedback into meaningful, actionable insights. Dashboards were designed around the needs of different stakeholder groups, providing the right information at the right level—from leadership visibility to operational action. A robust role-based access and permission structure ensured that stakeholders could access the insights relevant to their responsibilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-[#B22030] block">↑ Visibility</span>
                <span className="text-xs font-sans text-gray-600">Clearer understanding of CX performance</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-[#B22030] block">↑ Actionability</span>
                <span className="text-xs font-sans text-gray-600">Insights connected to specific opportunities</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-[#B22030] block">↑ Accountability</span>
                <span className="text-xs font-sans text-gray-600">Right teams seeing right information</span>
              </div>
            </div>
          </div>

          {/* Stage 03 */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold">
                03 — Closed the Loop on Customer Issues
              </span>
              <span className="text-xs font-mono text-gray-400">Issue Resolution Engine</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-gray-900">
              Because identifying an issue is only the beginning.
            </h3>

            <p className="text-base font-sans text-gray-600 leading-relaxed max-w-4xl">
              We built a closed-loop ticketing and issue-management process to connect customer feedback directly to action. When a customer issue was identified, it could be converted into a ticket, routed to the appropriate owner, tracked through resolution and closed once the required action was completed.
            </p>

            <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-center">
              <span className="text-gray-700 font-medium">Feedback</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-700 font-medium">Ticket</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-700 font-medium">Ownership</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-700 font-medium">Resolution</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Closure</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-600 block">↓ Time to Action</span>
                <span className="text-xs font-sans text-gray-600">Issues routed quickly to right teams</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-[#B22030] block">↑ Ownership</span>
                <span className="text-xs font-sans text-gray-600">Clear accountability for every issue</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F9F9F8] border border-gray-200 space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-600 block">↓ Unresolved Issues</span>
                <span className="text-xs font-sans text-gray-600">Visibility of open issues through closure</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE IMPACT SECTION (Turtlewax Clean Results Grid) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              The Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              A connected CX ecosystem built around action
            </h2>
            <p className="text-base font-sans text-gray-600 leading-relaxed">
              The transformation brought together customer listening, insight generation and operational action into a single experience management ecosystem.
            </p>
          </div>

          {/* 5 Clean Outcome Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-2">
              <span className="text-xs font-mono font-bold text-[#B22030]">↑ CUSTOMER VISIBILITY</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">Journey-Wide View</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">
                A clearer view of customer experience across the automotive journey.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-2">
              <span className="text-xs font-mono font-bold text-[#B22030]">↑ DECISION QUALITY</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">Actionable Insights</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">
                Actionable insights replacing fragmented or purely descriptive reporting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-2">
              <span className="text-xs font-mono font-bold text-[#B22030]">↑ ACCOUNTABILITY</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">Operational Focus</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">
                Role-based reporting helped teams focus on issues within their control.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600">↓ RESOLUTION FRICTION</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">Streamlined Path</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">
                Closed-loop ticketing created a faster path from issue to resolution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9F8] border border-gray-200/80 space-y-2 lg:col-span-2">
              <span className="text-xs font-mono font-bold text-[#B22030]">↑ CUSTOMER-CENTRICITY</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">Operational Active Input</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">
                Customer feedback became an active input into operational improvement rather than simply a score reported to the organisation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRANSFORMATION AT A GLANCE (Clean Numbers Strip) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-[#FAFAFA] border-b border-gray-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold text-center block">
            The Transformation at a Glance
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-2">
              <span className="text-4xl font-serif font-bold text-gray-900 block">4</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold block">Journey Verticals</span>
              <span className="text-[11px] font-sans text-gray-400 block">Presales | Sales | Service | Bodyshop</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-2">
              <span className="text-4xl font-serif font-bold text-gray-900 block">1</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold block">Connected CX Ecosystem</span>
              <span className="text-[11px] font-sans text-gray-400 block">Listen → Understand → Act</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-2">
              <span className="text-2xl font-serif font-bold text-gray-900 block pt-1">Role-Based</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold block">Experience Intelligence</span>
              <span className="text-[11px] font-sans text-gray-400 block">Right insight. Right stakeholder.</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-2">
              <span className="text-2xl font-serif font-bold text-[#B22030] block pt-1">Closed-Loop</span>
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold block">Issue Management</span>
              <span className="text-[11px] font-sans text-gray-400 block">Identify → Assign → Resolve → Close</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CORE PHILOSOPHY QUOTE BANNER (Turtlewax Highlight Quote Box) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-14 rounded-3xl bg-[#F9F9F8] border border-gray-200 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B22030] font-bold block">
              Core Shift
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              From Measuring Experience to Managing Experience
            </h3>

            <div className="space-y-4 text-base sm:text-lg font-sans text-gray-700 leading-relaxed max-w-4xl">
              <p className="text-gray-500">
                The transformation shifted the organisation from asking:
              </p>
              <p className="text-gray-500 italic pl-4 border-l-2 border-gray-300">
                &ldquo;What is our customer experience score?&rdquo;
              </p>
              <p className="text-gray-500">
                to asking:
              </p>
              <p className="text-[#B22030] font-serif font-semibold text-xl sm:text-2xl pl-4 border-l-2 border-[#B22030]">
                &ldquo;What are our customers telling us, what needs to change, who needs to act—and have we resolved it?&rdquo;
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs font-mono uppercase tracking-wider text-gray-500 font-bold">
                That is the difference between measuring customer experience and actively managing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONTACT / ADVISORY CTA FOOTER BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#111827] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-bold block">
                Red Bridge Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Transform Customer Experience in Your Organisation
              </h3>
              <p className="text-sm font-sans text-gray-400">
                Connect with our senior partners to structure your customer experience management ecosystem.
              </p>
            </div>

            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full bg-white text-gray-900 text-xs font-mono uppercase tracking-wider font-bold hover:bg-gray-100 transition-all shrink-0"
            >
              Discuss Engagement &rarr;
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
