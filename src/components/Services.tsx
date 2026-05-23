"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Users, Smile, Cpu, Database, Eye, LucideIcon, X, FileText, ArrowRight } from "lucide-react";
import ThreeDCard from "./ThreeDCard";
import ThreeDWidget from "./ThreeDWidget";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string[];
  type: "strategy" | "cx" | "ex" | "data" | "intelligence" | "transformation";
  briefing: string[];
}

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      icon: Compass,
      title: "Strategic Advisory",
      desc: "Align executive leadership on high-stakes choices, market positioning, and corporate transformation pathways.",
      details: ["Corporate Strategy", "Market Entry & Scaling", "Operating Model Design"],
      type: "strategy",
      briefing: [
        "In high-stakes corporate situations, traditional slide decks fall short of managing operational reality. We bridge strategy with engineering validation to ensure leadership directives translate directly into execution.",
        "Our strategic advisory helps organizations define operational models, evaluate market expansions, and align cross-functional priorities around measurable business impact.",
        "By verifying choices using real-world data telemetry, executive leadership gains high-fidelity clarity before committing capital to long-term digital investments."
      ]
    },
    {
      icon: Users,
      title: "Customer Experience (CX)",
      desc: "Redesign the customer lifecycle, optimizing across channels to turn client satisfaction into recurring revenue growth.",
      details: ["Journey Mapping", "Channel Strategy", "NPS Growth Engineering"],
      type: "cx",
      briefing: [
        "Modern digital experiences are the primary engine of customer retention and advocacy. We redesign customer lifecycles across every brand touchpoint to build seamless omnichannel user journeys.",
        "We deploy behavior telemetry pipelines and predictive CX dashboards that measure satisfaction indices (NPS, CSAT) in real-time, matching user interactions with engineering metrics.",
        "By bridging design systems with fast-rendering clientside architectures, we enable platforms to deliver lag-free experiences that directly boost conversion and customer loyalty."
      ]
    },
    {
      icon: Smile,
      title: "Employee Experience (EX)",
      desc: "Align workforce incentives, culture, and workspaces to drive retention and attract elite global talent.",
      details: ["Culture Audit & Reform", "Digital Workplace Architectures", "Incentive Alignment"],
      type: "ex",
      briefing: [
        "Enterprise software friction degrades staff productivity and leads to engineering team burnout. We audit developer and workspace environments to build friction-free internal systems.",
        "Our EX frameworks optimize local developer virtualization, streamline CI/CD compile cycles, and automate compliance workflows to reduce environment fatigue.",
        "Optimizing employee experience lowers engineering workforce turn by up to 62%, preserving intellectual property and driving cleaner, faster software delivery to production."
      ]
    },
    {
      icon: Database,
      title: "Data Engineering",
      desc: "Architect enterprise ingestion systems, clean pipelines, and real-time streaming engines to unlock insight.",
      details: ["Real-time Data Pipelines", "Cloud Ingestion Engines", "Enterprise Storage Fabric"],
      type: "data",
      briefing: [
        "Enterprise scaling requires robust real-time data streaming engines, clean ingestion pipelines, and secure storage fabrics that serve consistent truth.",
        "We architect high-throughput data pipelines that ingest telemetry streams from distributed nodes, maintaining ACID compliance and zero-loss guarantees under peak loads.",
        "By organizing federated databases into structured data lakes, we allow business analysts and ML models to query signals with microsecond latency."
      ]
    },
    {
      icon: Eye,
      title: "Experience Intelligence",
      desc: "Deploy automated ML pipelines to convert customer behavioral signals directly into real-time business action.",
      details: ["Signal-to-Insight AI", "Customer Intelligence hubs", "Predictive Retention Modeling"],
      type: "intelligence",
      briefing: [
        "Transforming raw behavioral signals into commercial action requires automated, low-latency machine learning pipelines operating at the edge.",
        "We construct Signal-to-Insight AI systems that track client interactions, model predictive retention scores, and trigger real-time custom product recommendations.",
        "Our experience intelligence engines help enterprises anticipate user intent, mitigate customer churn, and orchestrate real-time behavioral personalization."
      ]
    },
    {
      icon: Cpu,
      title: "Digital Transformation",
      desc: "Inject cutting-edge AI capability matrices directly into your existing enterprise software stacks.",
      details: ["Legacy modernization", "Cloud Native migrations", "AI Platform Integrations"],
      type: "transformation",
      briefing: [
        "Injecting advanced AI capability into legacy enterprise structures requires careful orchestration, cloud-native migration protocols, and robust gateway design.",
        "We modernize old monolithic application nodes, moving workloads to elastic containerized services secured by zero-trust identity networks.",
        "Our teams design and build safe AI platform integration boundaries, enabling teams to utilize large language models securely while preserving corporate data integrity."
      ]
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
              className="w-full h-full"
            >
              <ThreeDCard 
                onClick={() => setActiveService(service)}
                className="glass-panel p-8 rounded-lg flex flex-col justify-between min-h-[465px] red-glow-hover border border-white/5 cursor-pointer group relative overflow-hidden h-full"
              >
                <div>
                  {/* 3D Interactive Widget Container */}
                  <div className="w-full h-36 flex items-center justify-center relative mb-6 overflow-hidden rounded bg-black/15 border border-white/5">
                    {/* Corner badge for standard Icon */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cream/70 group-hover:text-bridge-red group-hover:border-bridge-red/30 transition-all duration-500 z-20">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Interactive 3D Canvas Visual */}
                    <ThreeDWidget type={service.type} />
                  </div>

                  {/* Service Title */}
                  <h3 className="font-serif text-2xl text-cream mb-3 group-hover:text-bridge-red transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-sans text-cream/60 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Sub items / Details */}
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <ul className="flex flex-col gap-2 mb-6">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-cream/40 uppercase">
                        <span className="w-1 h-1 bg-bridge-red/60 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Read Briefing Footer trigger */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 w-full">
                    <span className="text-[10px] font-mono text-cream/35 uppercase tracking-widest">
                      Advisory Briefing
                    </span>
                    
                    <div className="flex items-center gap-1 text-[10px] font-mono text-bridge-red uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      Read Briefing
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>
          );
        })}
      </div>

      {/* Service Detail Drawer Overlay & Drawer */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
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
                    Advisory Briefing • {activeService.title}
                  </span>
                  <button
                    onClick={() => setActiveService(null)}
                    className="text-cream/50 hover:text-cream transition-colors p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Interactive 3D Canvas Box */}
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded border border-white/5 bg-black/45 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    <ThreeDWidget type={activeService.type} />
                  </div>
                </div>

                {/* Title and Icon */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 rounded border border-white/10 bg-white/5 text-bridge-red mt-1 shrink-0">
                    {(() => {
                      const ActiveIcon = activeService.icon;
                      return <ActiveIcon className="w-6 h-6" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-2">
                      {activeService.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {activeService.details.map((detail, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-cream/50 uppercase">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Briefing Content */}
                <div className="space-y-6 text-sm font-sans text-cream/75 leading-relaxed">
                  {activeService.briefing.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Footer signature */}
              <div className="mt-12 pt-6 border-t border-white/5 text-[10px] font-mono text-cream/35 uppercase flex justify-between items-center">
                <span>Capability Category: {activeService.type.toUpperCase()}</span>
                <span className="text-bridge-red font-semibold">Red Bridge Advisory</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

