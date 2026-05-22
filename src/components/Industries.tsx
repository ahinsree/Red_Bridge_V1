"use client";

import React, { useState } from "react";
import {
  Landmark,
  Activity,
  ShoppingBag,
  Cpu,
  Factory,
  Building2,
  Radio,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

interface IndustryItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  schematic: React.ReactNode;
}

export default function Industries() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const industries: IndustryItem[] = [
    {
      id: 1,
      title: "Banking & Financial Services",
      description: "High-velocity transformation and secure experience networks for global banks and financial institutions.",
      icon: Landmark,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          {/* Tech Grid Gridlines */}
          <path d="M 0 40 L 200 40 M 0 80 L 200 80 M 0 120 L 200 120 M 0 160 L 200 160 M 40 0 L 40 200 M 80 0 L 80 200 M 120 0 L 120 200 M 160 0 L 160 200" stroke="rgba(250, 250, 248, 0.05)" strokeWidth="0.5" />
          {/* Analytical coordinate lines */}
          <line x1="20" y1="150" x2="180" y2="150" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="30" y1="30" x2="30" y2="160" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" strokeDasharray="3 3" />
          
          {/* Dotted Trendline connecting the candle closes */}
          <path d="M 50 120 L 80 125 L 110 80 L 140 90 L 170 48" fill="none" stroke="rgba(250, 250, 248, 0.25)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Candle 1 (Bullish - White/Cream) */}
          <line x1="50" y1="110" x2="50" y2="145" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="46" y="120" width="8" height="18" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />

          {/* Candle 2 (Bearish - Brand Red #C2192A) */}
          <line x1="80" y1="90" x2="80" y2="135" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="0.75" />
          <rect x="76" y="100" width="8" height="25" fill="rgba(194, 25, 42, 0.15)" stroke="#C2192A" strokeWidth="0.75" />

          {/* Candle 3 (Bullish - White/Cream) */}
          <line x1="110" y1="70" x2="110" y2="115" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="106" y="80" width="8" height="25" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />

          {/* Candle 4 (Bearish - Brand Red #C2192A) */}
          <line x1="140" y1="60" x2="140" y2="100" stroke="rgba(194, 25, 42, 0.4)" strokeWidth="0.75" />
          <rect x="136" y="70" width="8" height="20" fill="rgba(194, 25, 42, 0.15)" stroke="#C2192A" strokeWidth="0.75" />

          {/* Candle 5 (Bullish - White/Cream) */}
          <line x1="170" y1="40" x2="170" y2="80" stroke="rgba(250, 250, 248, 0.4)" strokeWidth="0.75" />
          <rect x="166" y="48" width="8" height="24" fill="rgba(250, 250, 248, 0.15)" stroke="rgba(250, 250, 248, 0.7)" strokeWidth="0.75" />

          {/* Pulsing glow at the latest active close point */}
          <circle cx="170" cy="48" r="3" fill="#C2192A" className="animate-pulse" />
          
          {/* Blueprint/Technical Decimals & Annotations */}
          <text x="45" y="165" fill="rgba(250, 250, 248, 0.3)" fontFamily="monospace" fontSize="5.5">INDEX: RBX_8.04%</text>
          <text x="135" y="30" fill="rgba(194, 25, 42, 0.8)" fontFamily="monospace" fontSize="5.5">HIGH: 184.20</text>
          <text x="135" y="38" fill="rgba(250, 250, 248, 0.4)" fontFamily="monospace" fontSize="5.5">LOW: 120.45</text>
          <text x="145" y="165" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">TRANS_LEDGER_SYS</text>
        </svg>
      )
    },
    {
      id: 2,
      title: "Healthcare & Life Sciences",
      description: "Digital health interfaces and data fabrics connecting providers, researchers, and patients.",
      icon: Activity,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          <path d="M 20 100 L 180 100" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" strokeDasharray="4 4" />
          {/* DNA Double Helix structure */}
          <path d="M 30 100 Q 55 50 80 100 T 130 100 T 180 100" fill="none" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="1" />
          <path d="M 30 100 Q 55 150 80 100 T 130 100 T 180 100" fill="none" stroke="#C2192A" strokeWidth="1" />
          {/* Connecting Base pairs */}
          <line x1="55" y1="75" x2="55" y2="125" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.75" />
          <line x1="80" y1="100" x2="80" y2="100" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.75" />
          <line x1="105" y1="75" x2="105" y2="125" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.75" />
          <line x1="155" y1="75" x2="155" y2="125" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.75" />
          {/* Pulsing health monitor scanner lines */}
          <circle cx="55" cy="75" r="2" fill="#FAFAF8" />
          <circle cx="55" cy="125" r="2" fill="#C2192A" />
          <circle cx="105" cy="125" r="2.5" fill="#C2192A" className="animate-pulse" />
          {/* Metadata labels */}
          <text x="30" y="45" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">GEN_SEQUENCE: AT-CG-TA</text>
          <text x="30" y="165" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">DATA_FABRIC_NODE_L4</text>
        </svg>
      )
    },
    {
      id: 3,
      title: "Retail & E-Commerce",
      description: "Unified omnichannel experiences and consumer analytics mapping the modern customer journey.",
      icon: ShoppingBag,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          <circle cx="100" cy="100" r="60" stroke="rgba(250, 250, 248, 0.05)" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="35" stroke="rgba(250, 250, 248, 0.03)" strokeWidth="0.5" />
          {/* Retail Global Connection Arcs */}
          <path d="M 40 100 A 60 60 0 0 1 160 100" fill="none" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" strokeDasharray="3 2" />
          <path d="M 100 40 A 60 60 0 0 1 100 160" fill="none" stroke="#C2192A" strokeWidth="1" />
          {/* E-commerce grid charts */}
          <rect x="75" y="85" width="12" height="30" fill="rgba(250,250,248,0.06)" stroke="rgba(250,250,248,0.15)" strokeWidth="0.5" />
          <rect x="94" y="70" width="12" height="45" fill="rgba(194,25,42,0.1)" stroke="#C2192A" strokeWidth="0.5" />
          <rect x="113" y="60" width="12" height="55" fill="rgba(250,250,248,0.06)" stroke="rgba(250,250,248,0.15)" strokeWidth="0.5" />
          <circle cx="100" cy="40" r="2.5" fill="#FAFAF8" />
          <circle cx="160" cy="100" r="2.5" fill="#C2192A" />
          <text x="30" y="30" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">OMNICHANNEL_MAP_V3</text>
          <text x="30" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">CONSUMER_NPS: +84%</text>
        </svg>
      )
    },
    {
      id: 4,
      title: "Technology & SaaS",
      description: "Enterprise-grade product advisory, AI integration, and scalable data intelligence platforms.",
      icon: Cpu,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          <rect x="65" y="65" width="70" height="70" stroke="rgba(250, 250, 248, 0.15)" strokeWidth="0.75" />
          {/* Chip circuit pins */}
          <path d="M 65 75 L 50 75 M 65 90 L 50 90 M 65 105 L 50 105 M 65 120 L 50 120 M 135 75 L 150 75 M 135 90 L 150 90 M 135 105 L 150 105 M 135 120 L 150 120 M 75 65 L 75 50 M 90 65 L 90 50 M 105 65 L 105 50 M 120 65 L 120 50 M 75 135 L 75 150 M 90 135 L 90 150 M 105 135 L 105 150 M 120 135 L 120 150" stroke="rgba(250,250,248,0.15)" strokeWidth="0.75" />
          {/* Central CPU matrix core */}
          <rect x="75" y="75" width="50" height="50" fill="rgba(194, 25, 42, 0.05)" stroke="#C2192A" strokeWidth="1" />
          {/* Neural link connections */}
          <line x1="100" y1="75" x2="100" y2="125" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.5" />
          <line x1="75" y1="100" x2="125" y2="100" stroke="rgba(250, 250, 248, 0.1)" strokeWidth="0.5" />
          {/* Pulsing core nodes */}
          <circle cx="100" cy="100" r="4" fill="#C2192A" className="animate-pulse" />
          <circle cx="85" cy="85" r="2.5" fill="#FAFAF8" />
          <circle cx="115" cy="115" r="2.5" fill="#FAFAF8" />
          <text x="25" y="30" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">AI_ENGINE_CORE_v1.0</text>
          <text x="135" y="170" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">NODE_SYS: OK</text>
        </svg>
      )
    },
    {
      id: 5,
      title: "Manufacturing & Industrial",
      description: "Smart factory automation, digital twins, and connected value chain experiences.",
      icon: Factory,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          {/* Isometric smart factory floor layout */}
          <path d="M 100 30 L 170 70 L 100 110 L 30 70 Z" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          <path d="M 100 80 L 170 120 L 100 160 L 30 120 Z" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          {/* Connecting structural pillar lines */}
          <line x1="30" y1="70" x2="30" y2="120" stroke="rgba(250,250,248,0.05)" strokeWidth="0.75" />
          <line x1="100" y1="110" x2="100" y2="160" stroke="#C2192A" strokeWidth="0.75" />
          <line x1="170" y1="70" x2="170" y2="120" stroke="rgba(250,250,248,0.05)" strokeWidth="0.75" />
          {/* Automation loops */}
          <circle cx="100" cy="70" r="3" fill="#C2192A" className="animate-pulse" />
          <circle cx="135" cy="95" r="2.5" fill="#FAFAF8" />
          <circle cx="65" cy="95" r="2.5" fill="#FAFAF8" />
          <text x="30" y="25" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">DIGITAL_TWIN: ACTIVE</text>
          <text x="110" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">SCALE: 1:500</text>
        </svg>
      )
    },
    {
      id: 6,
      title: "Government & Public Sector",
      description: "Smart city infrastructure and civic technology platforms delivering trusted public services.",
      icon: Building2,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          {/* Smart city mesh network */}
          <polygon points="100,30 150,75 130,140 70,140 50,75" stroke="rgba(250,250,248,0.08)" strokeWidth="0.75" />
          <line x1="100" y1="30" x2="100" y2="140" stroke="rgba(250,250,248,0.1)" strokeWidth="0.5" />
          <line x1="50" y1="75" x2="150" y2="75" stroke="#C2192A" strokeWidth="0.75" />
          <line x1="70" y1="140" x2="150" y2="75" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" />
          <line x1="130" y1="140" x2="50" y2="75" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" />
          {/* Node hubs */}
          <circle cx="100" cy="30" r="3" fill="#FAFAF8" />
          <circle cx="50" cy="75" r="2.5" fill="#C2192A" />
          <circle cx="150" cy="75" r="2.5" fill="#C2192A" />
          <circle cx="100" cy="92" r="3.5" fill="#C2192A" className="animate-pulse" />
          <text x="30" y="20" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">CIVIC_TRANS_SYS: L2</text>
          <text x="30" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">INFRA_LOAD: 34% (OK)</text>
        </svg>
      )
    },
    {
      id: 7,
      title: "Telecommunications",
      description: "High-speed network analytics and 5G experience transformation connecting global domains.",
      icon: Radio,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          <circle cx="100" cy="110" r="6" fill="rgba(194,25,42,0.3)" stroke="#C2192A" strokeWidth="1" />
          <circle cx="100" cy="110" r="2" fill="#FAFAF8" />
          {/* Transmission towers and 5G wave propagation arcs */}
          <path d="M 85 95 A 20 20 0 0 1 115 95" stroke="rgba(250,250,248,0.12)" strokeWidth="0.75" />
          <path d="M 75 85 A 35 35 0 0 1 125 85" stroke="#C2192A" strokeWidth="0.75" />
          <path d="M 60 70 A 55 55 0 0 1 140 70" stroke="rgba(250,250,248,0.06)" strokeWidth="0.5" />
          <path d="M 45 55 A 75 75 0 0 1 155 55" stroke="rgba(250,250,248,0.04)" strokeWidth="0.5" />
          {/* Network coordinate nodes */}
          <line x1="100" y1="110" x2="100" y2="160" stroke="rgba(250,250,248,0.2)" strokeWidth="0.75" />
          <line x1="100" y1="110" x2="60" y2="40" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="100" y1="110" x2="140" y2="40" stroke="rgba(250,250,248,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="60" cy="40" r="2.5" fill="#C2192A" />
          <circle cx="140" cy="40" r="2.5" fill="#FAFAF8" />
          <text x="30" y="25" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">FREQUENCY_BAND: 5G_NSA</text>
          <text x="30" y="180" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">LATENCY: 4.2ms (EXCELLENT)</text>
        </svg>
      )
    },
    {
      id: 8,
      title: "Education & Learning",
      description: "Interactive digital learning environments and knowledge network intelligence engines.",
      icon: GraduationCap,
      color: "from-bridge-red/20 to-transparent",
      schematic: (
        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-25 transition-opacity duration-1000">
          {/* Knowledge network matrix map */}
          <circle cx="100" cy="80" r="30" stroke="rgba(250,250,248,0.08)" strokeWidth="0.75" strokeDasharray="3 3" />
          <line x1="100" y1="80" x2="50" y2="130" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          <line x1="100" y1="80" x2="150" y2="130" stroke="rgba(250,250,248,0.1)" strokeWidth="0.75" />
          <line x1="100" y1="80" x2="100" y2="40" stroke="#C2192A" strokeWidth="0.75" />
          <polygon points="100,28 106,40 94,40" fill="#C2192A" />
          {/* Academic data nodes */}
          <circle cx="100" cy="80" r="4.5" fill="rgba(194,25,42,0.2)" stroke="#C2192A" strokeWidth="1" className="animate-pulse" />
          <circle cx="100" cy="80" r="1.5" fill="#FAFAF8" />
          <circle cx="50" cy="130" r="3" fill="#FAFAF8" />
          <circle cx="150" cy="130" r="3" fill="#C2192A" />
          {/* Tech annotations */}
          <text x="30" y="25" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">KNOWLEDGE_LINK_ENGINE</text>
          <text x="30" y="175" fill="rgba(250, 250, 248, 0.2)" fontFamily="monospace" fontSize="5">PROP_SCORE: 0.994</text>
        </svg>
      )
    },
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
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex flex-col justify-between p-7 min-h-[290px] rounded bg-[#0A0A0A]/40 border border-white/5 overflow-hidden transition-all duration-500 ease-out cursor-default select-none glass-panel red-glow-hover"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                }}
              >
                {/* SVG Schematic Blueprint Background (Fades in on hover) */}
                {ind.schematic}

                {/* Card glow overlays */}
                {/* Subtle red core glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_140px_at_80%_80%,rgba(194,25,42,0.06),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                
                {/* Interactive Flash-light reflection shine */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" 
                  style={{
                    background: "radial-gradient(circle 180px at var(--shine-x, 0px) var(--shine-y, 0px), rgba(250, 250, 248, 0.045), transparent 80%)"
                  }}
                />

                {/* Card Content Top: Icon & Tech indicator */}
                <div className="flex justify-between items-start z-10" style={{ transform: "translate3d(0, 0, 20px)" }}>
                  {/* Icon container */}
                  <div className="p-3.5 rounded bg-white/5 border border-white/5 text-cream/70 group-hover:text-bridge-red group-hover:border-bridge-red/30 group-hover:bg-bridge-red/5 transition-all duration-500 ease-out">
                    <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  {/* Decorative index / tech tag */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[8px] tracking-widest text-cream/30 group-hover:text-bridge-red/50 transition-colors uppercase">
                      SEC_{ind.id.toString().padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cream/20 group-hover:text-bridge-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>

                {/* Card Content Bottom: Typography */}
                <div className="flex flex-col gap-2.5 mt-12 z-10" style={{ transform: "translate3d(0, 0, 10px)" }}>
                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl text-cream group-hover:text-cream transition-colors leading-tight">
                    {ind.title}
                  </h3>
                  {/* Description */}
                  <p className="font-sans text-[11px] md:text-xs text-cream/50 leading-relaxed font-light group-hover:text-cream/75 transition-colors duration-500">
                    {ind.description}
                  </p>
                </div>

                {/* Decorative bottom hairline accent that glows red on hover */}
                <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-bridge-red/40 transition-all duration-700 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
