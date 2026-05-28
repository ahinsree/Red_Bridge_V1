"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  Cpu,
  Factory,
  Building2,
  Radio,
  ArrowUpRight,
  X,
  FileText,
  ArrowRight,
} from "lucide-react";

interface IndustryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  schematic: React.ReactNode;
  briefing: string[];
}

export default function Industries() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates from -1 to 1
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    
    // Set CSS custom variables on the card element
    card.style.setProperty("--tilt-x", `${normY * -8}deg`); // Max 8 degrees tilt
    card.style.setProperty("--tilt-y", `${normX * 8}deg`);
    card.style.setProperty("--shine-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--shine-y", `${e.clientY - rect.top}px`);
    card.setAttribute("data-active", "true");
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.removeAttribute("data-active");
  };

  const industries: IndustryItem[] = [
    {
      id: 1,
      title: "Government & Public Sector",
      description: "Smart city systems, open-data frameworks, and resilient civic portals delivering trusted public services.",
      icon: Building2,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full card-schematic transition-opacity duration-1000">
          <polygon points="100,30 150,75 130,140 70,140 50,75" stroke="rgba(250,250,248,0.08)" strokeWidth="0.75" />
          <line x1="100" y1="30" x2="100" y2="140" stroke="rgba(250,250,248,0.1)" strokeWidth="0.5" />
          <line x1="50" y1="75" x2="150" y2="75" stroke="#C2192A" strokeWidth="0.75" />
          <line x1="70" y1="140" x2="150" y2="75" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" />
          <line x1="130" y1="140" x2="50" y2="75" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" />
          <circle cx="100" cy="30" r="3" fill="#FAFAF8" />
          <circle cx="50" cy="75" r="2.5" fill="#C2192A" />
          <circle cx="150" cy="75" r="2.5" fill="#C2192A" />
          <circle cx="100" cy="92" r="3.5" fill="#C2192A" className="animate-pulse" />
          <text x="30" y="20" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">CIVIC_TRANS_SYS: L2</text>
          <text x="30" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">INFRA_LOAD: 34% (OK)</text>
        </svg>
      ),
      briefing: [
        "Public sector agencies operate under high standards of accessibility, data transparency, and structural resilience.",
        "We deploy secure citizen portals, municipal data sharing fabrics, and cloud-native database architectures that align with stringent policy requirements.",
        "Our design solutions guarantee universal accessibility compliance (WCAG) while delivering smooth, modern services to hundreds of thousands of users."
      ]
    },
    {
      id: 2,
      title: "Tourism & Hospitality",
      description: "Comprehensive master planning, destination flow telemetry, and seamless visitor experience networks.",
      icon: Radio,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full card-schematic transition-opacity duration-1000">
          <circle cx="100" cy="110" r="6" fill="rgba(194,25,42,0.3)" stroke="#C2192A" strokeWidth="1" />
          <circle cx="100" cy="110" r="2" fill="#FAFAF8" />
          <path d="M 85 95 A 20 20 0 0 1 115 95" stroke="rgba(250,250,248,0.12)" strokeWidth="0.75" />
          <path d="M 75 85 A 35 35 0 0 1 125 85" stroke="#C2192A" strokeWidth="0.75" />
          <path d="M 60 70 A 55 55 0 0 1 140 70" stroke="rgba(250,250,248,0.06)" strokeWidth="0.5" />
          <path d="M 45 55 A 75 75 0 0 1 155 55" stroke="rgba(250,250,248,0.04)" strokeWidth="0.5" />
          <line x1="100" y1="110" x2="100" y2="160" stroke="rgba(250,250,248,0.2)" strokeWidth="0.75" />
          <line x1="100" y1="110" x2="60" y2="40" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="100" y1="110" x2="140" y2="40" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="60" cy="40" r="2.5" fill="#C2192A" />
          <circle cx="140" cy="40" r="2.5" fill="#FAFAF8" />
          <text x="30" y="25" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">FREQUENCY_BAND: 5G_NSA</text>
          <text x="30" y="180" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">LATENCY: 4.2ms (EXCELLENT)</text>
        </svg>
      ),
      briefing: [
        "The global hospitality and tourism landscape requires a radical integration of digital experiences and physical spaces.",
        "We construct destination design frameworks, analyze visitor flow telemetry, and implement unified booking and discovery lattices.",
        "By optimizing the traveler lifecycle across physical and digital platforms, we help governments and operators build enduring, highly competitive destinations."
      ]
    },
    {
      id: 3,
      title: "Infrastructure & Real Estate",
      description: "Smart asset optimization, digital twins, and connected operating models for high-scale environments.",
      icon: Factory,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full card-schematic transition-opacity duration-1000">
          <path d="M 100 30 L 170 70 L 100 110 L 30 70 Z" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          <path d="M 100 80 L 170 120 L 100 160 L 30 120 Z" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          <line x1="30" y1="70" x2="30" y2="120" stroke="rgba(250,250,248,0.05)" strokeWidth="0.75" />
          <line x1="100" y1="110" x2="100" y2="160" stroke="#C2192A" strokeWidth="0.75" />
          <line x1="170" y1="70" x2="170" y2="120" stroke="rgba(250,250,248,0.05)" strokeWidth="0.75" />
          <circle cx="100" cy="70" r="3" fill="#C2192A" className="animate-pulse" />
          <circle cx="135" cy="95" r="2.5" fill="#FAFAF8" />
          <circle cx="65" cy="95" r="2.5" fill="#FAFAF8" />
          <text x="30" y="25" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">DIGITAL_TWIN: ACTIVE</text>
          <text x="110" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">SCALE: 1:500</text>
        </svg>
      ),
      briefing: [
        "Managing high-scale real estate portfolios and physical infrastructures requires continuous telemetry and digital twin models.",
        "We design smart asset architectures that combine IoT sensor streams, energy telemetry, and maintenance dispatch workflows.",
        "By building digital replicas of complex systems, we enable operators to achieve massive energy efficiencies and minimize lifecycle maintenance costs."
      ]
    },
    {
      id: 4,
      title: "Financial Services",
      description: "Microsecond-latency event ledgers and transaction networks for modern banking and financial operations.",
      icon: Landmark,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full card-schematic transition-opacity duration-1000">
          <path d="M 0 40 L 200 40 M 0 80 L 200 80 M 0 120 L 200 120 M 0 160 L 200 160 M 40 0 L 40 200 M 80 0 L 80 200 M 120 0 L 120 200 M 160 0 L 160 200" stroke="rgba(250, 250, 248, 0.05)" strokeWidth="0.5" />
          <line x1="20" y1="150" x2="180" y2="150" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="30" y1="30" x2="30" y2="160" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" strokeDasharray="3 3" />
          <path d="M 50 120 L 80 125 L 110 80 L 140 90 L 170 48" fill="none" stroke="rgba(250, 250, 248, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="110" x2="50" y2="145" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="46" y="120" width="8" height="18" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />
          <line x1="80" y1="90" x2="80" y2="135" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="0.75" />
          <rect x="76" y="100" width="8" height="25" fill="rgba(194, 25, 42, 0.15)" stroke="#C2192A" strokeWidth="0.75" />
          <line x1="110" y1="70" x2="110" y2="115" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="106" y="80" width="8" height="25" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />
          <line x1="140" y1="60" x2="140" y2="100" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="0.75" />
          <rect x="136" y="70" width="8" height="20" fill="rgba(194, 25, 42, 0.15)" stroke="#C2192A" stroke-width="0.75" />
          <line x1="170" y1="40" x2="170" y2="80" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="166" y="48" width="8" height="24" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />
          <circle cx="170" cy="48" r="3" fill="#C2192A" className="animate-pulse" />
          <text x="45" y="165" fill="rgba(250, 250, 248, 0.3)" fontFamily="monospace" fontSize="5.5">INDEX: RBX_8.04%</text>
          <text x="135" y="30" fill="rgba(194, 25, 42, 0.8)" fontFamily="monospace" fontSize="5.5">HIGH: 184.20</text>
          <text x="135" y="38" fill="rgba(250, 250, 248, 0.4)" fontFamily="monospace" fontSize="5.5">LOW: 120.45</text>
          <text x="145" y="165" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">TRANS_LEDGER_SYS</text>
        </svg>
      ),
      briefing: [
        "Banking and financial operations require secure, high-concurrency transaction cores that guarantee real-time data consistency.",
        "We engineer secure ledgers, design edge payment verification interfaces, and optimize processing pipeline latencies.",
        "Our strategic integrations help financial leaders safely bridge legacy backend databases with high-speed digital banking APIs."
      ]
    },
    {
      id: 5,
      title: "Technology & Digital",
      description: "Enterprise product advisory, AI infrastructure integration, and scalable data intelligence platforms.",
      icon: Cpu,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full card-schematic transition-opacity duration-1000">
          <rect x="65" y="65" width="70" height="70" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" />
          <path d="M 65 75 L 50 75 M 65 90 L 50 90 M 65 105 L 50 105 M 65 120 L 50 120 M 135 75 L 150 75 M 135 90 L 150 90 M 135 105 L 150 105 M 135 120 L 150 120 M 75 65 L 75 50 M 90 65 L 90 50 M 105 65 L 105 50 M 120 65 L 120 50 M 75 135 L 75 150 M 90 135 L 90 150 M 105 135 L 105 150 M 120 135 L 120 150" stroke="rgba(250,250,248,0.15)" strokeWidth="0.75" />
          <rect x="75" y="75" width="50" height="50" fill="rgba(194, 25, 42, 0.05)" stroke="#C2192A" strokeWidth="1" />
          <line x1="100" y1="75" x2="100" y2="125" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.5" />
          <line x1="75" y1="100" x2="125" y2="100" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="4" fill="#C2192A" className="animate-pulse" />
          <circle cx="85" cy="85" r="2.5" fill="#FAFAF8" />
          <circle cx="115" cy="115" r="2.5" fill="#FAFAF8" />
          <text x="25" y="30" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">AI_ENGINE_CORE_v1.0</text>
          <text x="135" y="170" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">NODE_SYS: OK</text>
        </svg>
      ),
      briefing: [
        "Building scalable SaaS products and integrating artificial intelligence requires robust system structures and low latency architectures.",
        "We advise high-growth technology platforms on multi-tenant core refactorings, zero-trust cloud security, and database design.",
        "Our teams accelerate developer velocity by standardizing build telemetry pipelines and reducing compile-to-deploy loop cycle times."
      ]
    }
  ];

  return (
    <section id="industries" className="py-28 px-6 md:px-8 border-t border-white/5 relative z-10 bg-background overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-deep-navy/15 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-bridge-red/3 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            {/* Tag */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-bridge-red/10 border border-bridge-red/20 text-xs font-mono tracking-widest text-bridge-red uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
              Industries We Serve
            </div>
            
            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] tracking-tight">
              Deep expertise <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream/85 to-bridge-red/70">across industries.</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 lg:pt-10">
            {/* Description */}
            <p className="font-sans text-sm md:text-base text-cream/60 leading-relaxed font-light">
              We understand the unique challenges of every sector and deliver experience-led transformation, strategic advisory, and data intelligence solutions that create measurable impact.
            </p>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onPointerUp={handlePointerLeave}
                onPointerCancel={handlePointerLeave}
                onClick={() => setActiveIndustry(ind)}
                className="group tilt-card relative flex flex-col justify-between p-7 min-h-[340px] rounded bg-[#0A0A0A]/40 border border-white/5 overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none glass-panel red-glow-hover"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                }}
              >
                {/* SVG Schematic Blueprint Background (Fades in on hover) */}
                {ind.schematic}

                {/* Card glow overlays */}
                {/* Subtle red core glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_140px_at_80%_80%,rgba(194,25,42,0.06),transparent)] card-core-glow pointer-events-none z-0" />
                
                {/* Interactive Flash-light reflection shine */}
                <div 
                  className="absolute inset-0 card-flashlight pointer-events-none z-0" 
                  style={{
                    background: "radial-gradient(circle 180px at var(--shine-x, 0px) var(--shine-y, 0px), rgba(250, 250, 248, 0.045), transparent 80%)"
                  }}
                />

                {/* Card Content Top: Icon & Tech indicator */}
                <div className="flex justify-between items-start z-10" style={{ transform: "translate3d(0, 0, 20px)" }}>
                  {/* Icon container */}
                  <div className="p-3.5 rounded border card-icon-container">
                    <Icon className="w-5 h-5 card-icon" />
                  </div>
                  {/* Decorative index / tech tag */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[8px] tracking-widest uppercase card-index-tag">
                      SEC_{ind.id.toString().padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 card-arrow" />
                  </div>
                </div>

                {/* Card Content Bottom: Typography */}
                <div className="flex flex-col gap-2.5 mt-8 z-10" style={{ transform: "translate3d(0, 0, 10px)" }}>
                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl text-cream leading-tight">
                    {ind.title}
                  </h3>
                  {/* Description */}
                  <p className="font-sans text-[11px] md:text-xs leading-relaxed font-light card-description">
                    {ind.description}
                  </p>
                </div>

                {/* Footer / Read Briefing */}
                <div 
                  className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto z-10 w-full"
                  style={{ transform: "translate3d(0, 0, 15px)" }}
                >
                  <span className="text-[10px] font-mono text-cream/35 uppercase tracking-widest">
                    Briefing Available
                  </span>
                  
                  <div className="flex items-center gap-1 text-[10px] font-mono text-bridge-red uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                    <FileText className="w-3.5 h-3.5 mr-1" />
                    Read Briefing
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>

                {/* Decorative bottom hairline accent that glows red on hover */}
                <div className="absolute bottom-0 inset-x-0 h-[1.5px] card-hairline pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Industry Detail Drawer Overlay & Drawer */}
      <AnimatePresence>
        {activeIndustry && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndustry(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-background/98 border-l border-white/5 z-50 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div>
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <span className="text-[10px] font-mono tracking-widest text-bridge-red uppercase">
                    Sector Briefing • SEC_{activeIndustry.id.toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setActiveIndustry(null)}
                    className="text-cream/50 hover:text-cream transition-colors p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* SVG Schematic Blueprint Box */}
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded border border-white/5 bg-black/45 flex items-center justify-center drawer-schematic-container">
                  <div className="w-48 h-48 relative">
                    {activeIndustry.schematic}
                  </div>
                </div>

                {/* Title and Icon */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 rounded border border-white/10 bg-white/5 text-bridge-red mt-1 shrink-0">
                    {React.createElement(activeIndustry.icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
                    {activeIndustry.title}
                  </h3>
                </div>

                {/* Briefing Content */}
                <div className="space-y-6 text-sm font-sans text-cream/75 leading-relaxed">
                  {activeIndustry.briefing.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Footer signature */}
              <div className="mt-12 pt-6 border-t border-white/5 text-[10px] font-mono text-cream/35 uppercase flex justify-between items-center">
                <span>Sector ID: SEC_{activeIndustry.id.toString().padStart(2, '0')}</span>
                <span className="text-bridge-red font-semibold">Red Bridge Advisory</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
