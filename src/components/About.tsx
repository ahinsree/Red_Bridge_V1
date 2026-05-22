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

  return (
    <section id="about" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-bridge-red/5 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Grid Layout for Narrative & Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Narrative (5 cols) */}
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
    </section>
  );
}
