"use client";

import { motion } from "framer-motion";

interface StatItem {
  number: string;
  sup?: string;
  label: string;
}

export default function StatsBar() {
  const stats: StatItem[] = [
    {
      number: "18+",
      sup: "Months",
      label: "Average engagement length",
    },
    {
      number: "94%",
      label: "Implementation retention rate",
    },
    {
      number: "3",
      label: "Continents active",
    },
    {
      number: "$1.2Bn+",
      label: "Capital under advisory",
    },
  ];

  return (
    <section className="relative z-20 py-10 bg-background border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 rounded border border-white/5 hover:border-bridge-red/35 red-glow-hover transition-all duration-500 flex flex-col justify-center min-h-[120px] group"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl md:text-4xl italic text-cream font-medium group-hover:text-bridge-red transition-colors duration-300">
                  {stat.number}
                </span>
                {stat.sup && (
                  <sup className="text-xs md:text-sm font-mono tracking-wider text-bridge-red font-semibold uppercase">
                    {stat.sup}
                  </sup>
                )}
              </div>
              <p className="text-[10px] md:text-[11px] font-mono tracking-wider text-cream/40 uppercase mt-2 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
