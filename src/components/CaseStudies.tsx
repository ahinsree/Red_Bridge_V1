"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Flame, Cpu, LucideIcon } from "lucide-react";

interface CaseStudyItem {
  id: string;
  industry: string;
  title: string;
  challenge: string;
  strategy: string;
  outcomes: string[];
  kpis: { val: string; label: string }[];
  tagIcon: LucideIcon;
}

export default function CaseStudies() {
  const cases: CaseStudyItem[] = [
    {
      id: "banking",
      industry: "Financial Services",
      title: "Rebuilding Onboarding Flows for a Global Neo-Bank",
      challenge: "A leading digital bank was losing 42% of prospective applicants during identity verification due to sluggish latency and confusing form flows.",
      strategy: "We redesigned the onboarding workflow around user psychology (CX), built automated real-time verification pipelines (Data), and retrained the customer ops desk on a unified insights dashboard.",
      outcomes: [
        "Onboarding drops fell from 42% to less than 8%.",
        "Overall Customer Satisfaction (CSAT) rose to 96%.",
        "Net Promoter Score (NPS) scaled from +12 to +68 in 6 months."
      ],
      kpis: [
        { val: "+56pts", label: "NPS Growth" },
        { val: "2.4x", label: "Onboarding Conversion" }
      ],
      tagIcon: Cpu
    },
    {
      id: "retail",
      industry: "Omnichannel Retail",
      title: "Unifying Data Pipelines for an Enterprise Retailer",
      challenge: "A retail conglomerate struggled with siloed data across 1,200 physical locations and three separate online e-commerce setups, preventing personalization.",
      strategy: "Engineered a unified data lakehouse to aggregate real-time customer behavior signals. Integrated custom recommendation modules directly into marketing channels.",
      outcomes: [
        "Established a sub-second messaging SLA across all stores.",
        "Increased targeted campaign conversion rates by 34%.",
        "Generated $42M in verified incremental revenue within Year 1."
      ],
      kpis: [
        { val: "+34%", label: "Conversion Lift" },
        { val: "$42M", label: "Year 1 Added Revenue" }
      ],
      tagIcon: Flame
    },
    {
      id: "healthcare",
      industry: "Healthcare Systems",
      title: "Redesigning Employee Workflows for Clinical Providers",
      challenge: "A medical network suffered from a 24% annual nursing staff turnover rate, largely caused by administrative burnouts and poor dashboard systems.",
      strategy: "Audited and rebuilt the internal clinical coordinator systems (EX). Eliminated redundant data entry logs and streamlined scheduling communication channels.",
      outcomes: [
        "Nursing and administrative turnover fell from 24% to 9%.",
        "Daily documentation hours reduced by 2.2 hours per provider.",
        "Employee Net Promoter Score (eNPS) leaped by 38 points."
      ],
      kpis: [
        { val: "-62%", label: "Staff Turnover Rate" },
        { val: "2.2h", label: "Daily Admin Hours Saved" }
      ],
      tagIcon: Award
    }
  ];

  return (
    <section id="case-studies" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col gap-3 mb-16 max-w-xl">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-bridge-red" />
          Case Studies
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
          Advising in Action
        </h2>
        <p className="text-xs font-sans text-cream/50 mt-2 leading-relaxed">
          Detailed breakdowns of how our advisory practices translate directly into measurable financial and organizational outcomes.
        </p>
      </div>

      {/* Case studies list */}
      <div className="flex flex-col gap-20">
        {cases.map((cs, index) => {
          const TagIcon = cs.tagIcon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* KPIs & Stats Block (Left/Right depending on odd/even) */}
              <div
                className={`lg:col-span-5 bg-black/40 border border-white/5 rounded-lg p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-bridge-red/5 rounded-full filter blur-[50px] pointer-events-none" />
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-mono text-cream/40 uppercase tracking-widest">
                    {cs.industry}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-bridge-red">
                    <TagIcon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-8 my-auto">
                  {cs.kpis.map((kpi, kpiIdx) => (
                    <div key={kpiIdx} className="flex flex-col">
                      <span className="font-mono text-4xl lg:text-5xl font-semibold text-cream tracking-tight">
                        {kpi.val}
                      </span>
                      <span className="text-[10px] font-sans text-cream/40 uppercase tracking-wider mt-1">
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-bridge-red uppercase tracking-widest flex items-center gap-1.5 border-t border-white/5 pt-4 mt-6">
                  Verified Outcome Ledger <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              {/* Text Narrative Block */}
              <div
                className={`lg:col-span-7 flex flex-col justify-between gap-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl text-cream mb-6 hover:text-bridge-red transition-colors duration-300">
                    {cs.title}
                  </h3>

                  {/* Challenge & Strategy split */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-white/5 pb-8">
                    <div>
                      <h4 className="text-[10px] font-mono text-bridge-red uppercase tracking-widest mb-2">
                        01 / Challenge
                      </h4>
                      <p className="text-xs font-sans text-cream/70 leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono text-bridge-red uppercase tracking-widest mb-2">
                        02 / Strategy
                      </h4>
                      <p className="text-xs font-sans text-cream/70 leading-relaxed">
                        {cs.strategy}
                      </p>
                    </div>
                  </div>

                  {/* Execution Outcomes list */}
                  <div>
                    <h4 className="text-[10px] font-mono text-bridge-red uppercase tracking-widest mb-3">
                      03 / Outcomes
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {cs.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-3 text-xs font-sans text-cream/80">
                          <span className="w-1.5 h-1.5 bg-bridge-red rounded-full mt-1.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
