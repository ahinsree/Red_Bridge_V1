"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, Database, ShieldCheck, ArrowRight, Eye, RefreshCw, Zap, Maximize2, X } from "lucide-react";

interface Pillar {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  description: string;
  capabilities: { name: string; desc: string }[];
  schematic: React.ReactNode;
}

export default function WhatWeDo() {
  const [activePillar, setActivePillar] = useState<string>("strategy");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pillars: Pillar[] = [
    {
      id: "strategy",
      num: "01",
      title: "Strategic Advisory & Governance",
      shortDesc: "Corporate transformation blueprints, operating models, and risk governance.",
      icon: Compass,
      description: "We align executive leadership around high-stakes structural decisions. We combine traditional management consulting rigor with digital-first execution strategies to design scalable, future-proof organizations.",
      capabilities: [
        { name: "Target State Architecture", desc: "Formulating unified corporate roadmaps to phase out legacy operational constraints." },
        { name: "Operating Model Design", desc: "Structuring cross-functional organizational architectures to eliminate project delivery silos." },
        { name: "Governance & Risk Mitigation", desc: "Establishing enterprise metrics systems, compliance guardrails, and data ethics boards." }
      ],
      schematic: (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
          {/* Tech Grid Gridlines */}
          <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke="rgba(250, 250, 248, 0.03)" strokeWidth="0.5" />
          
          {/* Timeline Axis */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(250, 250, 248, 0.3)" strokeWidth="1.25" strokeDasharray="4 4" />
          
          {/* Strategy Stage Cards */}
          {/* Stage 1 */}
          <g className="cursor-default group/stage">
            <rect x="58" y="95" width="84" height="50" rx="4" fill="rgba(25, 39, 63, 0.2)" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="1" className="transition-all duration-300 group-hover/stage:stroke-bridge-red/50" />
            <text x="100" y="116" textAnchor="middle" fill="rgba(250, 250, 248, 0.95)" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">01 / DIAGNOSE</text>
            <text x="100" y="131" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="sans-serif" fontSize="9">Assess Bottlenecks</text>
            <circle cx="100" cy="200" r="4.5" fill="rgba(250,250,248,0.4)" />
            <line x1="100" y1="145" x2="100" y2="196" stroke="rgba(250,250,248,0.25)" strokeWidth="0.75" strokeDasharray="2 2" />
          </g>

          {/* Stage 2 (Highlight) */}
          <g className="cursor-default group/stage">
            <rect x="158" y="65" width="84" height="50" rx="4" fill="rgba(25, 39, 63, 0.35)" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="1.25" className="transition-all duration-300 group-hover/stage:stroke-bridge-red/70" />
            <text x="200" y="86" textAnchor="middle" fill="#C2192A" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">02 / ARCHITECT</text>
            <text x="200" y="101" textAnchor="middle" fill="rgba(250, 250, 248, 0.85)" fontFamily="sans-serif" fontSize="9">Define Blueprint</text>
            <circle cx="200" cy="200" r="5" fill="#C2192A" className="animate-pulse" />
            <line x1="200" y1="115" x2="200" y2="195" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="0.75" strokeDasharray="2 2" />
          </g>

          {/* Stage 3 */}
          <g className="cursor-default group/stage">
            <rect x="258" y="95" width="84" height="50" rx="4" fill="rgba(25, 39, 63, 0.2)" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="1" className="transition-all duration-300 group-hover/stage:stroke-bridge-red/50" />
            <text x="300" y="116" textAnchor="middle" fill="rgba(250, 250, 248, 0.95)" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold">03 / GOVERN</text>
            <text x="300" y="131" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="sans-serif" fontSize="9">Measure & Guide</text>
            <circle cx="300" cy="200" r="4.5" fill="rgba(250,250,248,0.4)" />
            <line x1="300" y1="145" x2="300" y2="196" stroke="rgba(250,250,248,0.25)" strokeWidth="0.75" strokeDasharray="2 2" />
          </g>

          {/* Flowing connector paths */}
          <path d="M 142 120 C 150 120, 150 90, 158 90" stroke="rgba(250, 250, 248, 0.25)" strokeWidth="1.25" strokeDasharray="3 3" />
          <path d="M 242 90 C 250 90, 250 120, 258 120" stroke="rgba(250, 250, 248, 0.25)" strokeWidth="1.25" strokeDasharray="3 3" />

          {/* Decimals & status indicators */}
          <text x="100" y="245" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">ALIGN_INDEX: 98.4%</text>
          <text x="200" y="245" textAnchor="middle" fill="#C2192A" fontFamily="monospace" fontSize="9" fontWeight="bold">STAGE_GATE: ACTIVE</text>
          <text x="300" y="245" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">LEADERSHIP_INDEX: 9.2</text>
        </svg>
      )
    },
    {
      id: "experience",
      num: "02",
      title: "Experience Transformation (CX/EX)",
      shortDesc: "Journey optimization, engagement platforms, and cultural incentives.",
      icon: Users,
      description: "We optimize operations across the entire stakeholder loop. By aligning employee environments and incentives (EX) with customer touchpoint experiences (CX), we create high-retention cycles that drive growth.",
      capabilities: [
        { name: "Omnichannel CX Optimization", desc: "Aligning web, application, and live support platforms into a single, high-fidelity customer loop." },
        { name: "Employee Engagement Infrastructure", desc: "Designing collaborative workspaces, digital tools, and cultural framework programs." },
        { name: "Voice-of-Customer Signal Hubs", desc: "Deploying automated sentiment mapping systems to adapt service Delivery in real-time." }
      ],
      schematic: (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
          {/* Tech Grid Gridlines */}
          <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke="rgba(250, 250, 248, 0.03)" strokeWidth="0.5" />

          {/* Concentric feedback circles */}
          <circle cx="200" cy="140" r="80" stroke="rgba(250, 250, 248, 0.12)" strokeWidth="1" />
          <circle cx="200" cy="140" r="50" stroke="rgba(194, 25, 42, 0.2)" strokeWidth="1" />

          {/* CX Path (Outer Loop) */}
          <path d="M 120 140 A 80 80 0 0 1 280 140" stroke="#C2192A" strokeWidth="2.25" strokeDasharray="5 5" />
          {/* EX Path (Inner Loop) */}
          <path d="M 250 140 A 50 50 0 0 1 150 140" stroke="rgba(250, 250, 248, 0.65)" strokeWidth="1.75" strokeDasharray="3 3" />

          {/* Connecting data lines */}
          <line x1="200" y1="30" x2="200" y2="250" stroke="rgba(250, 250, 248, 0.18)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="90" y1="140" x2="310" y2="140" stroke="rgba(250, 250, 248, 0.18)" strokeWidth="1" strokeDasharray="2 2" />

          {/* Node intersections */}
          <circle cx="200" cy="60" r="5" fill="#C2192A" className="animate-pulse" />
          <circle cx="200" cy="90" r="4.5" fill="#FAFAF8" />
          <circle cx="200" cy="190" r="4.5" fill="#FAFAF8" />
          <circle cx="200" cy="220" r="5" fill="#C2192A" className="animate-pulse" />

          {/* Annotations */}
          <text x="212" y="64" fill="#C2192A" fontFamily="monospace" fontSize="10" fontWeight="bold">CX_TOUCHPOINT</text>
          <text x="212" y="94" fill="rgba(250, 250, 248, 0.95)" fontFamily="monospace" fontSize="10">EX_ALIGN_NODE</text>
          <text x="212" y="194" fill="rgba(250, 250, 248, 0.95)" fontFamily="monospace" fontSize="10">PRODUCTIVITY_KPI</text>
          <text x="212" y="224" fill="#C2192A" fontFamily="monospace" fontSize="10" fontWeight="bold">NPS_FEEDBACK_LOOP</text>

          <text x="100" y="260" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">SYSTEM: SYNCED</text>
          <text x="300" y="260" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">LATENCY: &lt;10ms</text>
        </svg>
      )
    },
    {
      id: "data",
      num: "03",
      title: "Data & Intelligence Engineering",
      shortDesc: "Real-time pipelines, enterprise fabrics, and custom ML runtimes.",
      icon: Database,
      description: "We build the high-speed data engines that translate behavioral indicators directly into target decisions. We engineer resilient processing schemas to unlock latent value safely.",
      capabilities: [
        { name: "Real-Time Ingestion Pipelines", desc: "Architecting sub-second ETL architectures built to ingest and clean raw telemetry streams." },
        { name: "Predictive ML & Decision Engines", desc: "Designing and deploying automated classification, scoring, and recommendation systems." },
        { name: "Enterprise Storage Fabrics", desc: "Constructing unified cloud database structures that break down organizational silos securely." }
      ],
      schematic: (
        <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
          {/* Tech Grid Gridlines */}
          <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke="rgba(250, 250, 248, 0.03)" strokeWidth="0.5" />

          {/* Pipelines lines */}
          {/* Channel 1 */}
          <path d="M 50 80 Q 150 80 200 130 T 350 180" stroke="rgba(250, 250, 248, 0.2)" strokeWidth="1.25" strokeDasharray="3 3" />
          {/* Channel 2 (Main active pipeline) */}
          <path d="M 50 150 Q 150 150 200 150 T 350 150" stroke="#C2192A" strokeWidth="2.25" />
          {/* Channel 3 */}
          <path d="M 50 220 Q 150 220 200 170 T 350 120" stroke="rgba(250, 250, 248, 0.2)" strokeWidth="1.25" strokeDasharray="3 3" />

          {/* Nodes */}
          <rect x="175" y="130" width="50" height="40" rx="4" fill="rgba(25, 39, 63, 0.75)" stroke="#C2192A" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="4.5" fill="#FAFAF8" className="animate-pulse" />

          {/* Ingestion & Output endpoints */}
          <circle cx="50" cy="150" r="5" fill="#FAFAF8" />
          <circle cx="350" cy="150" r="5" fill="#C2192A" />
          
          <circle cx="50" cy="80" r="4" fill="rgba(250, 250, 248, 0.55)" />
          <circle cx="50" cy="220" r="4" fill="rgba(250, 250, 248, 0.55)" />
          
          <circle cx="350" cy="180" r="4" fill="rgba(250, 250, 248, 0.55)" />
          <circle cx="350" cy="120" r="4" fill="rgba(250, 250, 248, 0.55)" />

          {/* Decimals / Blueprint annotations */}
          <text x="60" y="72" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">INGEST_STREAM_A</text>
          <text x="60" y="141" fill="#C2192A" fontFamily="monospace" fontSize="9.5" fontWeight="bold">INGEST_STREAM_B (PRIMARY)</text>
          <text x="60" y="212" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9">INGEST_STREAM_C</text>

          <text x="200" y="116" textAnchor="middle" fill="#FAFAF8" fontFamily="monospace" fontSize="11" fontWeight="bold">ML_COMPUTE_CORE</text>
          <text x="200" y="185" textAnchor="middle" fill="rgba(250, 250, 248, 0.75)" fontFamily="monospace" fontSize="9.5">LATENCY: 12ms</text>

          <text x="270" y="138" fill="#C2192A" fontFamily="monospace" fontSize="9.5" fontWeight="bold">SLA_OK: 99.999%</text>
          <text x="270" y="158" fill="rgba(250, 250, 248, 0.95)" fontFamily="monospace" fontSize="9.5">INGEST: 12.4 GB/s</text>
        </svg>
      )
    }
  ];

  const activeData = pillars.find((p) => p.id === activePillar) || pillars[0];
  const ActiveIcon = activeData.icon;

  return (
    <div className="w-full glass-panel rounded-lg p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden">
      {/* Background neon soft ambient lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-bridge-red/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-deep-navy/20 rounded-full filter blur-[70px] pointer-events-none" />

      {/* Left Column: Interactive Pillar Navigation */}
      <div className="lg:w-2/5 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
            Core Philosophy
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-8">
            What We Do
          </h3>

          <div className="flex flex-col gap-3">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              const isSelected = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`w-full text-left p-4 rounded border transition-all duration-500 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-white/5 border-bridge-red/35 shadow-lg shadow-bridge-red/5"
                      : "bg-transparent border-transparent hover:bg-white/2 hover:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs ${isSelected ? "text-bridge-red" : "text-cream/30 group-hover:text-cream/60"}`}>
                      {pillar.num}
                    </span>
                    <div>
                      <h4 className={`text-sm font-serif transition-colors duration-300 ${isSelected ? "text-cream" : "text-cream/60 group-hover:text-cream/95"}`}>
                        {pillar.title}
                      </h4>
                      <p className={`text-[10px] font-sans truncate max-w-[220px] transition-colors duration-300 ${isSelected ? "text-cream/55" : "text-cream/35"}`}>
                        {pillar.shortDesc}
                      </p>
                    </div>
                  </div>
                  <div className={`p-2 rounded bg-white/5 border border-white/5 transition-all duration-500 ${
                    isSelected
                      ? "text-bridge-red border-bridge-red/20 bg-bridge-red/5"
                      : "text-cream/40 group-hover:text-cream/70"
                  }`}>
                    <PillarIcon className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block pt-6 border-t border-white/5">
          <p className="text-[10px] font-mono text-cream/30 leading-relaxed uppercase tracking-widest">
            RED BRIDGE CONSULTING FRAMEWORK V2.04 //
            <br />
            EXPERIENCE & DATA ENGINE
          </p>
        </div>
      </div>

      {/* Right Column: Dynamic Deep-dive and Schematic */}
      <div className="lg:w-3/5 flex flex-col justify-between gap-8 min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Description & Header */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-bridge-red">
                <ActiveIcon className="w-5 h-5" />
                <span className="font-mono text-xs tracking-wider uppercase">Pillar {activePillar === "strategy" ? "01" : activePillar === "experience" ? "02" : "03"} Overview</span>
              </div>
              <h4 className="text-xl font-serif text-cream mb-3">{activeData.title}</h4>
              <p className="text-xs font-sans text-cream/70 leading-relaxed max-w-2xl">{activeData.description}</p>
            </div>

            {/* Interactive schematic visualizer */}
            <div className="w-full h-[260px] md:h-[285px] bg-black/40 border border-white/5 rounded relative overflow-hidden flex items-center justify-center p-4">
              <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[8px] font-mono text-cream/45 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                <span className="w-1 h-1 rounded-full bg-bridge-red animate-pulse" />
                SCHEMATIC_SIMULATION // {activeData.id.toUpperCase()}_CORE
              </div>
              
              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-3 right-4 flex items-center gap-1 text-[8px] font-mono text-cream/60 hover:text-bridge-red hover:border-bridge-red/35 transition-all duration-300 uppercase tracking-widest bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded border border-white/5 cursor-pointer z-10"
              >
                <Maximize2 className="w-3 h-3" />
                Expand View
              </button>
              
              <div className="w-full h-full max-w-[390px] max-h-[245px] flex items-center justify-center">
                {activeData.schematic}
              </div>
            </div>

            {/* Key Capabilities */}
            <div>
              <h5 className="text-[10px] font-mono text-cream/45 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Practice Sub-capabilities</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeData.capabilities.map((cap, i) => (
                  <div key={i} className="flex flex-col gap-1.5 p-3 rounded bg-white/2 border border-white/5 hover:border-bridge-red/20 transition-all duration-300">
                    <span className="text-[10px] font-mono text-bridge-red">{i + 1}. // {cap.name.toUpperCase()}</span>
                    <p className="text-[10px] font-sans text-cream/60 leading-normal">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Expanded Blueprint Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-5xl bg-zinc-950/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded bg-white/5 border border-white/5 text-cream/70 hover:text-bridge-red hover:border-bridge-red/30 transition-all duration-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Blueprint Schematic Viewport */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 min-h-[300px] md:min-h-0 bg-black/50">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
                    High-Fidelity Blueprint Simulation
                  </div>
                  <h3 className="font-serif text-2xl text-cream mb-6">
                    {activeData.title}
                  </h3>
                </div>

                <div className="flex-1 flex items-center justify-center max-w-[500px] mx-auto w-full max-h-[340px]">
                  {/* We render a larger version of the schematic by scaling it up */}
                  <div className="w-full h-full scale-105 md:scale-110 origin-center flex items-center justify-center">
                    {activeData.schematic}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-cream/40 uppercase tracking-wider">
                  <span>SCALE: 1.5X HIGH_RES</span>
                  <span>STATUS: SYSTEMS_NOMINAL</span>
                </div>
              </div>

              {/* Right Column: Documentation & Parameter Breakdown */}
              <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-zinc-900/20">
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-[10px] font-mono text-cream/45 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                      Technical Parameters
                    </h4>
                    
                    {/* Render different parameters based on active pillar */}
                    {activeData.id === "strategy" && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">01 // DIAGNOSE STAGE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Continuous diagnostics mapping operational friction points, organizational silos, and performance drag.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">02 // ARCHITECT STAGE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Formulating target state systems blueprint with direct alignment to core strategic objectives.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">03 // GOVERN STAGE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Establishing quantitative dashboards and operational guardrails to measure execution efficacy.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                          <div>
                            <span className="text-cream/40 block">ALIGNMENT</span>
                            <span className="text-cream font-bold">98.4%</span>
                          </div>
                          <div>
                            <span className="text-cream/40 block">GATE STATUS</span>
                            <span className="text-bridge-red font-bold">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeData.id === "experience" && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">CX_TOUCHPOINT NODE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Real-time monitoring of customer interaction layers, response times, and omnichannel satisfaction rates.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">EX_ALIGN_NODE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Correlating internal workforce tool performance and operational workload with external service quality.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">NPS_FEEDBACK_LOOP</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Automated loops driving client telemetry back into active development and service refinement models.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                          <div>
                            <span className="text-cream/40 block">LATENCY</span>
                            <span className="text-cream font-bold">&lt; 10ms</span>
                          </div>
                          <div>
                            <span className="text-cream/40 block">LOOP STATUS</span>
                            <span className="text-cream font-bold">SYNCED</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeData.id === "data" && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">INGEST_STREAM_B</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            High-capacity primary data pipeline streaming raw behavioral events and process logs directly.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">ML_COMPUTE_CORE</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Decentralized machine learning runtime processing real-time telemetry for immediate tactical scoring.
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-bridge-red">SLA_VERIFICATION</span>
                          <p className="text-[11px] text-cream/70 leading-relaxed">
                            Automated error-checking ensuring high precision (99.999% SLA) and sub-second ingestion rates.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                          <div>
                            <span className="text-cream/40 block">THROUGHPUT</span>
                            <span className="text-cream font-bold">12.4 GB/s</span>
                          </div>
                          <div>
                            <span className="text-cream/40 block">ML LATENCY</span>
                            <span className="text-cream font-bold">12ms</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-mono text-cream/30 leading-relaxed uppercase">
                    RED BRIDGE SYSTEMS BLUEPRINT //
                    <br />
                    UNIFIED SCHEMATIC DIAGRAM
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
