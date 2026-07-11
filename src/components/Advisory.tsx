"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Advisory() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const practices = [
    {
      num: "01",
      slug: "strategy-transformation",
      title: "Strategy, Transformation & Institution Building",
      tagline: "Deciding what to change, and making it hold.",
      desc: "Most organisations have a rough sense of where they want to go. The harder questions are what to change, in what order, and who will own the result once the advisers have left. We work with company boards, management teams and public institutions on exactly that.",
      caps: [
        "Corporate, growth and sector strategy",
        "Operating model and organisation design",
        "Institutional reform and restructuring",
        "Governance, systems and capacity building",
        "Transformation programme design and oversight",
      ],
    },
    {
      num: "02",
      slug: "ai-digital-data",
      title: "AI, Digital & Data Advisory",
      tagline: "Technology adopted with judgement, not haste.",
      desc: "There is a great deal of pressure to adopt AI and very little patience for the groundwork that makes it pay off. We help organisations tell the two apart, whether it is a company putting data to work across its operations or a department modernising a public service.",
      caps: [
        "AI readiness and adoption strategy",
        "Data strategy, architecture and governance",
        "Digital and technology roadmaps",
        "Analytics and decision support",
        "Technology governance and assurance",
      ],
    },
    {
      num: "03",
      slug: "experience-service-design",
      title: "Experience & Service Design",
      tagline: "Designing what people actually receive.",
      desc: "A service rarely fails because someone meant it to. It fails in the gap between what an organisation designs and what a person actually gets at the counter, on the call, or in the app. We work in that gap, for companies shaping what their customers and employees receive.",
      caps: [
        "Customer and citizen experience strategy",
        "Service design and journey mapping",
        "Public service and delivery design",
        "Customer and Brand Experience",
        "Employee experience and culture",
        "Experience measurement and improvement",
      ],
    },
    {
      num: "04",
      slug: "investment-economic-infrastructure",
      title: "Investment, Economic & Infrastructure Advisory",
      tagline: "The analysis behind sound investment decisions.",
      desc: "Before capital moves, someone has to answer hard questions about whether a project actually stands up. That is our work. We prepare the feasibility studies, business cases and project structures behind investment decisions for companies, promoters and investors.",
      caps: [
        "Feasibility studies and business cases",
        "Detailed project reports and project structuring",
        "Public-private partnership advisory",
        "Economic development and investment promotion",
        "Sector, cluster and regional development strategy",
      ],
    },
    {
      num: "05",
      slug: "entrepreneurship-innovation-startup",
      title: "Entrepreneurship, Innovation & Startup Ecosystems",
      tagline: "Building the conditions for enterprise to grow.",
      desc: "Enterprise does not grow on its own. It needs incubation, mentoring, routes to funding, and a policy environment that does not quietly work against it. We design and strengthen that support system for governments, universities, corporates and development agencies.",
      caps: [
        "Incubation and startup support design",
        "Entrepreneurship and innovation programmes",
        "Startup mission and policy advisory",
        "MSME and enterprise development",
        "Social enterprise and inclusive finance",
        "Ecosystem and institutional partnerships",
      ],
    },
    {
      num: "06",
      slug: "programme-management-monitoring",
      title: "Programme Management, Monitoring & Evaluation",
      tagline: "Delivery that is managed and verified.",
      desc: "A sound strategy that is poorly delivered is just an expensive document. We handle the delivery, and we check the results. This covers programme and project management for large initiatives, and independent monitoring and evaluation that tells the sponsor.",
      caps: [
        "Programme and project management units (PMU)",
        "Monitoring and evaluation frameworks",
        "Baseline, outcome and impact studies",
        "Third-party and concurrent monitoring",
        "Implementation support and review",
      ],
    },
  ];

  const cardVariants = {
    hover: {
      y: -4,
      boxShadow: "0 16px 32px rgba(9, 9, 11, 0.05)",
      borderColor: "rgba(178, 32, 48, 0.25)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 22,
      },
    },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 4, transition: { type: "spring" as const, stiffness: 400, damping: 10 } },
  };

  return (
    <section
      className="bg-[#fafafa] py-24 relative overflow-hidden transition-colors duration-300"
      id="advisory"
      onMouseMove={handleMouseMove}
      aria-labelledby="advisory-heading"
    >
      {/* Decorative Parallax elements */}
      <div
        className="absolute rounded-full border border-[#B22030]/5 pointer-events-none hidden md:block"
        style={{
          width: "400px",
          height: "400px",
          left: "5%",
          top: "15%",
          background: "radial-gradient(circle, rgba(178,32,48,0.02) 0%, transparent 70%)",
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute rounded-full border border-zinc-200/40 pointer-events-none hidden md:block"
        style={{
          width: "500px",
          height: "500px",
          right: "5%",
          bottom: "10%",
          background: "radial-gradient(circle, rgba(24,24,27,0.01) 0%, transparent 80%)",
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <header className="mb-16">
          <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-4 block">
            ADVISORY AREAS
          </span>
          <h2
            id="advisory-heading"
            className="text-3xl md:text-5xl font-serif text-[#09090b] font-medium tracking-tight mb-6 leading-tight"
          >
            Our Capabilities.<br />Built for institutional complexity.
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-sm text-zinc-500 max-w-xl leading-relaxed font-sans">
              These are the strategic and operational mandates we are brought in to solve, working with company boards, management teams, and public institutions to ensure execution that lasts.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#09090b] tracking-wider uppercase border-b border-[#09090b] pb-1 transition-colors hover:text-[#B22030] hover:border-[#B22030] shrink-0 self-start md:self-auto"
            >
              Start a conversation
              <motion.span
                className="inline-block"
                variants={arrowVariants}
                initial="initial"
                whileHover="hover"
              >
                →
              </motion.span>
            </Link>
          </div>
        </header>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((practice) => (
            <motion.article
              key={practice.slug}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white border border-zinc-200/80 rounded-xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all duration-300 h-full group"
            >
              <div>
                {/* Index badge */}
                <div className="inline-block px-2.5 py-1 bg-zinc-50 border border-zinc-200/60 rounded-md text-[10px] font-mono font-bold text-[#B22030] tracking-wider mb-6">
                  {practice.num}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold text-[#09090b] tracking-tight leading-snug mb-2 group-hover:text-[#B22030] transition-colors duration-300">
                  {practice.title}
                </h3>

                {/* Core Thesis Tagline */}
                <p className="text-xs font-serif italic text-zinc-400 mb-5">
                  &ldquo;{practice.tagline}&rdquo;
                </p>

                {/* Descriptive Paragraph */}
                <p className="text-xs text-zinc-500 leading-relaxed font-sans mb-6">
                  {practice.desc}
                </p>

                {/* Sub-capabilities list */}
                <ul className="space-y-3 mb-8 border-t border-zinc-100 pt-6">
                  {practice.caps.map((cap, i) => (
                    <li
                      key={i}
                      className="text-xs text-zinc-600 flex items-start gap-2.5 leading-normal"
                    >
                      <span className="text-[#B22030] font-light select-none">—</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Text Link Footer */}
              <Link
                href={`/practices/${practice.slug}`}
                className="group/btn inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#B22030] hover:text-[#B22030]/80 tracking-widest uppercase mt-auto transition-colors"
              >
                Explore Practice Area
                <motion.span
                  className="inline-block"
                  variants={arrowVariants}
                >
                  →
                </motion.span>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Subtle Footer mandate discussion link */}
        <div className="mt-16 text-center reveal">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 hover:text-[#B22030] tracking-widest uppercase transition-colors"
          >
            Discuss a specific mandate
            <motion.span
              className="inline-block text-[#B22030]"
              variants={arrowVariants}
              initial="initial"
              whileHover="hover"
            >
              →
            </motion.span>
          </Link>
        </div>

      </div>
    </section>
  );
}
