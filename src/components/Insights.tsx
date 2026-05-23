"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { insightsData } from "@/data/insights";

export default function Insights() {
  return (
    <section id="insights" className="py-24 px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Background ambient lighting element */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ambient-bg-glow" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red" />
            Insights Ledger
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
            Perspectives on Complexity.
          </h2>
        </div>
        <p className="text-sm font-sans text-cream/50 max-w-sm leading-relaxed">
          Briefings, research insights, and whitepapers on strategic engineering and digital transformation architectures.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {insightsData.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="glass-panel p-8 rounded-lg border border-white/5 hover:border-bridge-red/20 hover:bg-white/2 transition-all duration-500 h-full flex flex-col justify-between cursor-default">
              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center mb-6 text-[10px] font-mono tracking-wider text-cream/45 uppercase border-b border-white/5 pb-4">
                  <span className="text-bridge-red">{article.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-cream/30" />
                      {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Article Graphic Header */}
                {article.imageUrl && (
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded border border-white/5 bg-black/45">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${process.env.NODE_ENV === "production" ? "/Red_Bridge_" : ""}${article.imageUrl}`}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="font-serif text-2xl text-cream mb-4 group-hover:text-bridge-red transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs font-sans text-cream/65 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              {/* Footer / Read Briefing */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                <span className="text-[10px] font-mono text-cream/35 uppercase tracking-widest">
                  Authored by {article.author}
                </span>
                
                <div className="flex items-center gap-1 text-[10px] font-mono text-bridge-red uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Read Briefing
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
