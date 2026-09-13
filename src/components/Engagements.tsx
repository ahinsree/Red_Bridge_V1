"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Engagements() {
  return (
    <section className="section section--charcoal" id="engagements">
      <div className="container">
        <div className="engagements__header reveal">
          <div>
            <span className="sec-label sec-label--muted">Featured Engagement</span>
            <h2 className="sec-title sec-title--light">Advisory in practice</h2>
          </div>
          <Link href="/work" className="btn btn--ghost-light inline-flex items-center gap-2">
            <span>Read Full Case Study</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured Spotlight Card for Single Closed Case Study */}
        <div className="reveal mt-8">
          <div className="relative rounded-[28px] bg-gradient-to-r from-[#121827] via-[#0E1322] to-[#1A0B10] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden group hover:border-[#B22030] transition-all duration-300">
            
            {/* Glowing Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#B22030]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#B22030]/25 transition-all" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#B22030] text-white">
                    Spotlight Case Study
                  </span>
                  <span className="text-xs font-mono text-white/50">Automotive • Middle East</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight group-hover:text-[#E31E24] transition-colors">
                  From Customer Feedback to Customer Action
                </h3>

                <p className="text-sm sm:text-base font-sans text-white/80 font-light leading-relaxed max-w-2xl">
                  Transforming Customer Experience across Presales, Sales, Service, and Bodyshop for a leading automotive dealer in the Middle Eastern region with closed-loop ticketing and role-based intelligence.
                </p>

                <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-white/60">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Presales</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Sales</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Service</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">Bodyshop</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <div className="space-y-2 text-left lg:text-right text-xs font-mono text-white/70">
                  <div className="flex items-center lg:justify-end gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 size={14} />
                    <span>Closed-Loop Issue Resolution</span>
                  </div>
                  <div className="text-white/50">Listen → Understand → Act</div>
                </div>

                <Link
                  href="/work"
                  className="btn btn--primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-lg"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
