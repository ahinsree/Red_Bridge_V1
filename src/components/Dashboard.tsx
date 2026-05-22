"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Database, ShieldCheck, ArrowUpRight, LucideIcon } from "lucide-react";

interface MetricData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  desc: string;
}

interface DashboardTab {
  id: string;
  name: string;
  icon: LucideIcon;
  chartPath: string;
  dots: { x: number; y: number; val: string; label: string }[];
  metrics: MetricData[];
  summaryText: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("cx");

  const tabs: DashboardTab[] = [
    {
      id: "cx",
      name: "Customer Experience",
      icon: Users,
      chartPath: "M 20 180 C 80 160, 140 100, 200 90 C 260 80, 320 140, 380 70 C 440 0, 500 50, 560 30",
      dots: [
        { x: 200, y: 90, val: "+14%", label: "Brand NPS Increase" },
        { x: 380, y: 70, val: "94%", label: "Retention Peak" },
        { x: 560, y: 30, val: "+76", label: "Final NPS Score" }
      ],
      summaryText: "Optimized client touchpoints across digital channel systems, driving loyalty gains and engagement metrics.",
      metrics: [
        { title: "Net Promoter Score", value: "+76", change: "+44pts gain", changeType: "positive", desc: "Industry benchmark is +35" },
        { title: "Customer Effort Score", value: "1.8 / 7", change: "-42% effort", changeType: "positive", desc: "Lower scores represent easier experiences" },
        { title: "Digital Touchpoint Rate", value: "94.2%", change: "+18.5% growth", changeType: "positive", desc: "Omnichannel customer interaction rate" }
      ]
    },
    {
      id: "ex",
      name: "Employee Experience",
      icon: TrendingUp,
      chartPath: "M 20 170 C 80 150, 140 130, 200 70 C 260 10, 320 80, 380 50 C 440 20, 500 40, 560 10",
      dots: [
        { x: 200, y: 70, val: "89%", label: "Cohesion Index" },
        { x: 380, y: 50, val: "+22%", label: "eNPS Uptick" },
        { x: 560, y: 10, val: "95%", label: "Talent Retained" }
      ],
      summaryText: "Modern workspace structures, culture frameworks, and digital enablement packages to maximize workforce retention.",
      metrics: [
        { title: "Employee NPS", value: "+54", change: "+32pts gain", changeType: "positive", desc: "Prior baseline: +22" },
        { title: "Workforce Retention", value: "95.1%", change: "+5.4% improvement", changeType: "positive", desc: "Year-over-year key talent retained" },
        { title: "Onboarding Velocity", value: "4.2 days", change: "-35% time-to-output", changeType: "positive", desc: "Average time to full productivity" }
      ]
    },
    {
      id: "data",
      name: "Experience Intelligence",
      icon: Database,
      chartPath: "M 20 190 C 80 140, 140 120, 200 110 C 260 100, 320 40, 380 30 C 440 20, 500 10, 560 5",
      dots: [
        { x: 200, y: 110, val: "99.99%", label: "Pipeline SLA" },
        { x: 380, y: 30, val: "1.2 TB/d", label: "Ingestion Volume" },
        { x: 560, y: 5, val: "4.8M", label: "Realtime Predictions" }
      ],
      summaryText: "Highly robust data engineering pipelines, AI analytics pipelines, and executive dashboard automation systems.",
      metrics: [
        { title: "Data Processing Speed", value: "480k msg/s", change: "4.2x capacity", changeType: "positive", desc: "Sub-second event streaming SLA" },
        { title: "Recommendation Accuracy", value: "92.8%", change: "+14.2% lift", changeType: "positive", desc: "AI-driven next best action precision" },
        { title: "Cloud ROI Efficiency", value: "+38%", change: "-22% cost optimization", changeType: "positive", desc: "Optimized infrastructure architectures" }
      ]
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full glass-panel rounded-lg p-6 md:p-8 flex flex-col gap-6 md:gap-8 relative overflow-hidden">
      {/* Background neon soft blur */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-bridge-red/5 rounded-full filter blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-deep-navy/30 rounded-full filter blur-[60px] pointer-events-none" />

      {/* Dashboard Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-bridge-red animate-pulse" />
            Advisory Insights Engine v1.4
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-cream">Impact Ledger</h3>
        </div>

        {/* Action tabs */}
        <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded border border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-bridge-red text-cream shadow-lg shadow-bridge-red/25"
                    : "text-cream/50 hover:text-cream/90 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive content area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        
        {/* Left side: Animated SVG Chart */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-black/35 rounded border border-white/5 p-4 md:p-6 min-h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xs font-mono text-cream/50 uppercase tracking-widest">
              Performance Curve (12-Month Progression)
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
              <ShieldCheck className="w-4 h-4" /> Verified Impact
            </div>
          </div>

          <div className="relative w-full h-[180px] mt-2 mb-6">
            {/* Custom SVG line graph */}
            <svg
              viewBox="0 0 580 200"
              className="w-full h-full overflow-visible"
              fill="none"
            >
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="580" y2="50" stroke="rgba(250,250,248,0.03)" strokeWidth="1" />
              <line x1="0" y1="100" x2="580" y2="100" stroke="rgba(250,250,248,0.03)" strokeWidth="1" />
              <line x1="0" y1="150" x2="580" y2="150" stroke="rgba(250,250,248,0.03)" strokeWidth="1" />

              {/* Gradient Area under curve */}
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C2192A" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C2192A" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <AnimatePresence mode="wait">
                <motion.path
                  key={`area-${activeTab}`}
                  d={`${currentTab.chartPath} L 560 200 L 20 200 Z`}
                  fill="url(#chart-grad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Glowing Line */}
              <AnimatePresence mode="wait">
                <motion.path
                  key={`line-${activeTab}`}
                  d={currentTab.chartPath}
                  stroke="#C2192A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </AnimatePresence>

              {/* Animated Interactive Data Points */}
              <AnimatePresence>
                {currentTab.dots.map((dot, index) => (
                  <g key={`dot-${activeTab}-${index}`}>
                    {/* Pulsing ring */}
                    <motion.circle
                      cx={dot.x}
                      cy={dot.y}
                      r="9"
                      fill="rgba(194, 25, 42, 0.2)"
                      stroke="#C2192A"
                      strokeWidth="1"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.4 }}
                    />
                    {/* Center point */}
                    <circle cx={dot.x} cy={dot.y} r="4" fill="#FAFAF8" />

                    {/* Tooltip Overlay */}
                    <foreignObject
                      x={dot.x - 60}
                      y={dot.y - 45}
                      width="120"
                      height="38"
                      className="overflow-visible pointer-events-none"
                    >
                      <div className="flex flex-col items-center justify-center bg-black/80 border border-white/10 rounded px-1.5 py-0.5 text-[9px] font-mono text-center">
                        <span className="text-bridge-red font-bold">{dot.val}</span>
                        <span className="text-cream/50 leading-none">{dot.label}</span>
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </AnimatePresence>
            </svg>
          </div>

          <p className="text-xs font-sans text-cream/70 italic leading-relaxed border-t border-white/5 pt-4">
            {currentTab.summaryText}
          </p>
        </div>

        {/* Right side: Numerical Metric KPI Cards */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4 h-full justify-between"
            >
              {currentTab.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-black/25 rounded border border-white/5 p-5 flex flex-col justify-between flex-1 group hover:border-bridge-red/35 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-mono text-cream/50 tracking-wider uppercase">
                      {metric.title}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cream/30 group-hover:text-bridge-red transition-colors duration-300" />
                  </div>

                  <div className="my-2 flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-semibold text-cream tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs font-mono text-green-400">
                      {metric.change}
                    </span>
                  </div>

                  <span className="text-[10px] font-sans text-cream/40 leading-snug">
                    {metric.desc}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
