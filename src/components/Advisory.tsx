"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PracticeArea {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  caps: string[];
}

export default function Advisory() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const practices: PracticeArea[] = [
    {
      num: "01",
      slug: "strategy-transformation",
      title: "Strategy, Transformation & Institution Building",
      tagline: "Deciding what to change, and making it hold.",
      desc: "Most organisations have a rough sense of where they want to go. The harder questions are what to change, in what order, and who will own the result once advisers leave.",
      image: "/images/strategy-transformation-desktop.webp",
      caps: [
        "Corporate & Growth Strategy",
        "Operating Model Design",
        "Institutional Reform",
        "Governance & Capacity Building"
      ],
    },
    {
      num: "02",
      slug: "ai-digital-data",
      title: "AI, Digital & Data",
      tagline: "Technology adopted with judgement, not haste.",
      desc: "There is immense pressure to adopt AI and little patience for groundwork that makes it pay off. We help organisations build foundational data governance and scalable roadmaps.",
      image: "/images/ai-digital-data-desktop.webp",
      caps: [
        "AI Adoption Strategy",
        "Data Architecture",
        "Digital Roadmaps",
        "Technology Assurance"
      ],
    },
    {
      num: "03",
      slug: "experience-service-design",
      title: "Experience & Service Design",
      tagline: "Designing what people actually receive.",
      desc: "A service fails in the gap between what an organisation designs and what a person gets at the counter, on the call, or in the app. We bridge that gap.",
      image: "/images/experience-service-design-desktop.webp",
      caps: [
        "Citizen & Customer Strategy",
        "Service Journey Mapping",
        "Public Service Design",
        "Employee Experience"
      ],
    },
    {
      num: "04",
      slug: "investment-economic-infrastructure",
      title: "Investment, Economic & Infrastructure Advisory",
      tagline: "The analysis behind sound investment decisions.",
      desc: "Before capital moves, hard questions must be answered about project viability. We prepare feasibility studies and project structures behind investment decisions.",
      image: "/images/hero-velocity-bg-desktop.webp",
      caps: [
        "Feasibility Studies",
        "Detailed Project Reports",
        "PPP Advisory",
        "Economic Development"
      ],
    },
    {
      num: "05",
      slug: "entrepreneurship-innovation-startup",
      title: "Entrepreneurship, Innovation & Startup Ecosystems",
      tagline: "Building the conditions for enterprise to grow.",
      desc: "Enterprise needs incubation, mentoring, routes to funding, and supportive policy. We design and strengthen innovation support systems for institutions.",
      image: "/images/startup-ecosystem-desktop.webp",
      caps: [
        "Incubation Design",
        "Innovation Programmes",
        "Startup Policy Advisory",
        "MSME Scaling"
      ],
    },
    {
      num: "06",
      slug: "programme-management-monitoring",
      title: "Programme Management, Monitoring & Evaluation",
      tagline: "Delivery that is managed and verified.",
      desc: "A sound strategy poorly delivered is just an expensive document. We handle project management units and independent evaluation to verify actual impact.",
      image: "/images/programme-monitoring-desktop.webp",
      caps: [
        "PMU Operations",
        "M&E Frameworks",
        "Baseline & Impact Studies",
        "Field Monitoring"
      ],
    },
  ];

  return (
    <section
      className="bg-[#fafafa] py-24 md:py-36 relative overflow-hidden transition-colors duration-300"
      id="advisory"
      onMouseMove={handleMouseMove}
    >
      {/* Background ambient lighting accents */}
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.7)] pointer-events-none hidden md:block"
        style={{
          width: "420px",
          height: "420px",
          left: "1%",
          top: "12%",
          background: "radial-gradient(circle, rgba(178,32,48,0.04) 0%, transparent 70%)",
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.8)] pointer-events-none hidden md:block"
        style={{
          width: "550px",
          height: "550px",
          right: "2%",
          bottom: "8%",
          background: "radial-gradient(circle, rgba(27,38,59,0.02) 0%, transparent 85%)",
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Expanded Max-Width Container (max-w-[1440px]) for Maximum Visibility */}
      <div className="container mx-auto px-6 md:px-12 max-w-[1440px] relative z-10">
        
        {/* Reorganized Section Header Block */}
        <header className="mb-16 reveal">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-zinc-200/80">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B22030]/10 border border-[#B22030]/20 text-[11px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B22030] animate-pulse" />
                ADVISORY PRACTICE AREAS
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#09090b] font-medium tracking-tight leading-[1.1]">
                Our Capabilities.<br />Built for institutional complexity.
              </h2>
            </div>
            
            {/* Header Right Action & Clickable Navigation Controls */}
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2.5 text-xs font-mono font-bold text-white bg-[#B22030] hover:bg-[#8e1926] px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#B22030] focus-visible:outline-none"
              >
                <span>Start a Mandate Scoping</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </header>

        {/* Grant Thornton Style 3-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {practices.map((practice) => (
            <Link
              key={practice.slug}
              href={`/practices/${practice.slug}`}
              className="block w-full h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B22030] focus-visible:ring-offset-2 rounded-2xl"
            >
              <motion.article
                whileHover="hover"
                initial="initial"
                className="flex flex-col h-full rounded-2xl overflow-hidden border border-zinc-200/90 bg-white cursor-pointer w-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 ease-out will-change-transform"
              >
                {/* Thumbnail Top Container with Image Zoom */}
                <div className="relative w-full aspect-[16/9] min-h-[210px] overflow-hidden bg-zinc-950">
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.04 }
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={practice.image}
                      alt={practice.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </motion.div>
                  
                  {/* Subtle Gradient & Badge Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      PRACTICE {practice.num}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#B22030] group-hover:border-[#B22030] transition-colors duration-300 shadow-sm">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Uncrowded Card Body - Clean Grant Thornton Typography Stack */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 bg-white">
                  <div>
                    {/* Practice Area Tagline Accent */}
                    <span className="text-xs font-mono font-bold text-[#B22030] tracking-wider uppercase mb-2.5 block">
                      &ldquo;{practice.tagline}&rdquo;
                    </span>

                    {/* Headline Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#09090b] leading-tight mb-3.5 group-hover:text-[#B22030] transition-colors duration-300">
                      {practice.title}
                    </h3>

                    {/* Concise Excerpt Description */}
                    <p className="text-sm text-zinc-600 leading-relaxed font-sans mb-6">
                      {practice.desc}
                    </p>
                  </div>

                  {/* Clean Bottom Action Bar */}
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono font-bold text-[#B22030] uppercase tracking-wider group-hover:text-zinc-950 transition-colors duration-300">
                    <span>Explore Practice</span>
                    <motion.span
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 5 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="text-base"
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Structured Bottom Section CTA Bar */}
        <div className="mt-16 sm:mt-20 border-t border-zinc-200/80 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 reveal">
          <p className="text-xs sm:text-sm font-sans text-zinc-500 mb-0">
            Looking for specialized cross-sector transformation or sovereign advisory?
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B22030] tracking-widest uppercase transition-colors hover:text-zinc-950"
          >
            <span>Schedule a senior partner consultation</span>
            <motion.span
              className="inline-block"
              variants={{
                initial: { x: 0 },
                hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 10 } }
              }}
            >
              →
            </motion.span>
          </Link>
        </div>

      </div>
    </section>
  );
}

