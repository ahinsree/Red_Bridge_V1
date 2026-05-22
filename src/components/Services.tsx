"use client";

import { motion } from "framer-motion";
import { Compass, Users, Smile, Cpu, Database, Eye, LucideIcon } from "lucide-react";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
}

export default function Services() {
  const services: ServiceItem[] = [
    {
      icon: Compass,
      title: "Strategic Advisory",
      desc: "Align executive leadership on high-stakes choices, market positioning, and corporate transformation pathways.",
      details: ["Corporate Strategy", "Market Entry & Scaling", "Operating Model Design"]
    },
    {
      icon: Users,
      title: "Customer Experience (CX)",
      desc: "Redesign the customer lifecycle, optimizing across channels to turn client satisfaction into recurring revenue growth.",
      details: ["Journey Mapping", "Channel Strategy", "NPS Growth Engineering"]
    },
    {
      icon: Smile,
      title: "Employee Experience (EX)",
      desc: "Align workforce incentives, culture, and workspaces to drive retention and attract elite global talent.",
      details: ["Culture Audit & Reform", "Digital Workplace Architectures", "Incentive Alignment"]
    },
    {
      icon: Database,
      title: "Data Engineering",
      desc: "Architect enterprise ingestion systems, clean pipelines, and real-time streaming engines to unlock insight.",
      details: ["Real-time Data Pipelines", "Cloud Ingestion Engines", "Enterprise Storage Fabric"]
    },
    {
      icon: Eye,
      title: "Experience Intelligence",
      desc: "Deploy automated ML pipelines to convert customer behavioral signals directly into real-time business action.",
      details: ["Signal-to-Insight AI", "Customer Intelligence hubs", "Predictive Retention Modeling"]
    },
    {
      icon: Cpu,
      title: "Digital Transformation",
      desc: "Inject cutting-edge AI capability matrices directly into your existing enterprise software stacks.",
      details: ["Legacy modernization", "Cloud Native migrations", "AI Platform Integrations"]
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient lighting element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ambient-bg-glow" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-10">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-bridge-red uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-bridge-red" />
            Capabilities
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight">
            High-Stakes Advisory. Built for the AI Era.
          </h2>
        </div>
        <p className="text-sm font-sans text-cream/50 max-w-sm leading-relaxed">
          We orchestrate high-stakes digital experiences, engineer robust intelligence fabrics, and align executive strategies to deliver compound enterprise value.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-lg flex flex-col justify-between min-h-[380px] red-glow-hover border border-white/5 cursor-default group"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cream group-hover:text-bridge-red group-hover:border-bridge-red/30 transition-colors duration-500 mb-8">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Service Title */}
                <h3 className="font-serif text-2xl text-cream mb-4 group-hover:text-bridge-red transition-colors duration-500">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs font-sans text-cream/60 leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Sub items / Details */}
              <div className="border-t border-white/5 pt-6">
                <ul className="flex flex-col gap-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-cream/40 uppercase">
                      <span className="w-1 h-1 bg-bridge-red/60 rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
