"use client";

import { motion } from "framer-motion";
import { Layers, Gauge, Zap } from "lucide-react";

interface PillarItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export default function About() {
  const pillars: PillarItem[] = [
    {
      icon: Layers,
      title: "Radical Integration",
      desc: "Our strategy advisors and engineering clusters operate as a single unified force. We design the blueprints and directly write the codebases that execute them.",
    },
    {
      icon: Gauge,
      title: "Scientific Precision",
      desc: "We replace intuition with signal intelligence. Every journey optimization and operating model shift is validated by real-time telemetry and custom ML runtimes.",
    },
    {
      icon: Zap,
      title: "Uncompromising Delivery",
      desc: "No bloated corporate consulting overhead. We run lean, high-velocity engagements that prioritize immediate production value and long-term architectural health.",
    },
  ];

  const people = [
    {
      name: "Marcus Vance",
      role: "Managing Partner // Strategy & Transformation",
      bio: "Former Tier-1 advisory director specializing in institutional operating models, capital restructuring, and sovereign master planning.",
      email: "m.vance@redbridgeadvisory.com",
      linkedin: "linkedin.com/in/marcus-vance-rba",
      initials: "MV"
    },
    {
      name: "Dr. Evelyn Chen",
      role: "Partner // AI & Digital Transformation",
      bio: "Systems architect and former lead ML research engineer. Evelyn directs our secure enterprise intelligence and high-velocity data platforms.",
      email: "e.chen@redbridgeadvisory.com",
      linkedin: "linkedin.com/in/evelyn-chen-rba",
      initials: "EC"
    },
    {
      name: "Siddharth Rao",
      role: "Partner // Destination & Experience Advisory",
      bio: "Pioneer in tourism destination designs and grassroots economic ecosystems. Siddharth has orchestrated master corridor plans globally.",
      email: "s.rao@redbridgeadvisory.com",
      linkedin: "linkedin.com/in/siddharth-rao-rba",
      initials: "SR"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-bridge-red/5 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Grid Layout for Narrative & Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Narrative (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
            Philosophy // 02
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight tracking-tight">
            Built for Complexity.<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream/80 to-bridge-red">
              Engineered for Value.
            </span>
          </h2>
          
          <div className="flex flex-col gap-4 text-xs font-sans text-cream/70 leading-relaxed max-w-xl">
            <p>
              Red Bridge was founded to solve a critical friction point in enterprise growth: the widening chasm between strategic business consulting and software engineering reality. Traditional advisors deliver conceptual slides that gather dust, while standard developers build lines of code without business perspective. We bridge this divide.
            </p>
            <p>
              We operate as an elite advisory and experience engineering partner. We combine top-tier management consulting governance with raw software engineering precision to construct high-speed streaming data fabrics, optimize employee experience (EX) networks, and execute customer-facing transformations (CX).
            </p>
            <p>
              By aligning executive incentives with target systems architectures, we eliminate internal silos and ensure that every technology capital deployment translates directly into verified financial and organizational outcome metrics.
            </p>
          </div>
        </div>

        {/* Right Column: Pillars (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <h3 className="text-[10px] font-mono text-cream/35 uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
            Execution Standards
          </h3>
          
          <div className="flex flex-col gap-4">
            {pillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel p-6 rounded border border-white/5 hover:border-bridge-red/20 hover:bg-white/2 transition-all duration-500 flex gap-5 items-start group"
                >
                  <div className="p-3 rounded bg-white/5 border border-white/10 text-cream/60 group-hover:text-bridge-red group-hover:border-bridge-red/30 transition-all duration-500">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-cream mb-1.5 group-hover:text-bridge-red transition-colors duration-300">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] font-sans text-cream/60 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
           LEADERSHIP / PRINCIPAL ADVISORS
         ════════════════════════════════════════ */}
      <div className="w-full h-px bg-white/5 my-20 relative z-10" />

      <div className="relative z-10">
        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
            Leadership // 03
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
            Principal Leadership
          </h3>
          <p className="font-sans text-xs md:text-sm text-cream/50 max-w-xl leading-relaxed">
            Elite strategic consultants, systems architects, and destination designers operating as a single unified force to steer compound enterprise results.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded border border-white/5 hover:border-bridge-red/25 transition-all duration-500 group overflow-hidden flex flex-col justify-between hover:bg-white/2"
            >
              {/* Profile Card Header (Custom Silhouette) */}
              <div className="relative w-full h-56 bg-black/35 flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Tech blueprint background overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 bg-[radial-gradient(#FAFAF8_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                
                {/* SVG Stylized silhouette logo mark representing professional advisor */}
                <svg className="w-24 h-24 text-cream/5 group-hover:text-bridge-red/10 group-hover:scale-105 transition-all duration-700 ease-out z-0" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 20 C61 20 70 29 70 40 C70 51 61 60 50 60 C39 60 30 51 30 40 C30 29 39 20 50 20 Z M50 65 C25 65 15 78 15 90 L85 90 C85 78 75 65 50 65 Z" />
                </svg>

                {/* Initials badge overlay */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-cream/40 group-hover:text-bridge-red group-hover:border-bridge-red/30 transition-all duration-500 z-20">
                  {person.initials}
                </div>
              </div>

              {/* Profile Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-serif text-xl text-cream font-medium mb-1 group-hover:text-bridge-red transition-colors duration-300">
                  {person.name}
                </h4>
                <div className="text-[9px] font-mono text-bridge-red uppercase tracking-widest mb-4">
                  {person.role}
                </div>
                <p className="text-xs font-sans text-cream/60 leading-relaxed mb-6">
                  {person.bio}
                </p>
              </div>

              {/* Profile Card Footer */}
              <div className="px-6 py-4 border-t border-white/5 flex gap-4 items-center">
                <a
                  href={`https://${person.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-cream/40 hover:text-bridge-red transition-colors uppercase tracking-wider"
                >
                  LinkedIn
                </a>
                <span className="text-white/10 text-xs font-sans select-none">•</span>
                <a
                  href={`mailto:${person.email}`}
                  className="text-[10px] font-mono text-cream/40 hover:text-bridge-red transition-colors uppercase tracking-wider"
                >
                  Brief
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
