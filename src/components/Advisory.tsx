"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
      desc: "Most organisations have a rough sense of where they want to go. The harder questions are what to change, in what order, and who will own the result once the advisers have left. We work with company boards, management teams and public institutions on exactly that.",
      image: "/images/strategy-transformation-desktop.webp",
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
      title: "AI, Digital & Data",
      tagline: "Technology adopted with judgement, not haste.",
      desc: "There is a great deal of pressure to adopt AI and very little patience for the groundwork that makes it pay off. We help organisations tell the two apart, whether it is a company putting data to work across its operations or a department modernising a public service.",
      image: "/images/ai-digital-data-desktop.webp",
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
      image: "/images/experience-service-design-desktop.webp",
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
      image: "/images/hero-velocity-bg-desktop.webp",
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
      image: "/images/startup-ecosystem-desktop.webp",
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
      image: "/images/programme-monitoring-desktop.webp",
      caps: [
        "Programme and project management units (PMU)",
        "Monitoring and evaluation frameworks",
        "Baseline, outcome and impact studies",
        "Third-party and concurrent monitoring",
        "Implementation support and review",
      ],
    },
  ];

  const springConfig = { type: "spring" as const, stiffness: 300, damping: 25 };

  return (
    <section
      className="bg-[#fafafa] py-32 md:py-40 relative overflow-hidden transition-colors duration-300"
      id="advisory"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax background floating glass nodes */}
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.7)] pointer-events-none hidden md:block"
        style={{
          width: "350px",
          height: "350px",
          left: "2%",
          top: "18%",
          background: "radial-gradient(circle, rgba(178,32,48,0.03) 0%, transparent 70%)",
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute rounded-full border border-[rgba(255,255,255,0.8)] pointer-events-none hidden md:block"
        style={{
          width: "480px",
          height: "480px",
          right: "4%",
          bottom: "12%",
          background: "radial-gradient(circle, rgba(27,38,59,0.01) 0%, transparent 85%)",
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(30px)",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header Block - Left Aligned Vertical Stack for Optimal Hierarchy */}
        <header className="mb-16 max-w-3xl reveal">
          <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-4 block">
            ADVISORY AREAS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#09090b] font-medium tracking-tight mb-4 leading-tight">
            Our Capabilities.<br />Built for institutional complexity.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed font-sans mb-6">
            These are the strategic and operational mandates we are brought in to solve, working with company boards, management teams, and public institutions to ensure execution that lasts.
          </p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B22030] tracking-wider uppercase border-b-2 border-[#B22030] pb-1 transition-colors hover:text-zinc-900 hover:border-zinc-900"
          >
            Start a conversation
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
        </header>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((practice) => (
            <Link
              key={practice.slug}
              href={`/practices/${practice.slug}`}
              className="block w-full h-full"
            >
              <motion.article
                whileHover="hover"
                initial="initial"
                className="relative h-[480px] rounded-[24px] overflow-hidden border border-zinc-200/60 bg-white group cursor-pointer w-full flex flex-col justify-end"
              >
                {/* The Image Layer (fills top 55%) */}
                <div className="absolute top-0 left-0 w-full h-[55%] overflow-hidden bg-zinc-100">
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={springConfig}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={practice.image}
                      alt={practice.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* The Floating Content Card */}
                <motion.div
                  variants={{
                    initial: { y: 0 },
                    hover: { 
                      y: -140,
                      boxShadow: "0 -15px 30px rgba(9, 9, 11, 0.05)"
                    }
                  }}
                  transition={springConfig}
                  className="absolute bottom-[-140px] left-0 right-0 h-[75%] bg-white rounded-t-[24px] border-t border-zinc-100/80 flex flex-col justify-between z-10"
                  style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "24px",
                    paddingBottom: "164px",
                    boxSizing: "border-box"
                  }}
                >
                  <div>
                    {/* Category Tag */}
                    <span className="text-[9px] font-mono tracking-widest text-[#B22030] uppercase mb-2 block font-bold">
                      PRACTICE AREA {practice.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-base md:text-[17px] font-serif font-bold text-zinc-900 leading-snug mb-1 group-hover:text-[#B22030] transition-colors duration-300">
                      {practice.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[11px] font-serif italic text-zinc-400 mb-4">
                      &ldquo;{practice.tagline}&rdquo;
                    </p>

                    {/* Body snippet text that fades in on hover */}
                    <motion.div
                      variants={{
                        initial: { opacity: 0 },
                        hover: { opacity: 1, transition: { delay: 0.1 } }
                      }}
                      className="mt-4 border-t border-zinc-100 pt-4"
                    >
                      <p className="text-[10.5px] text-zinc-500 leading-relaxed font-sans line-clamp-3">
                        {practice.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[9px] font-mono font-semibold text-[#B22030] uppercase tracking-wider">
                    <span>Explore Practice Area</span>
                    <motion.span
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 4, transition: { type: "spring", stiffness: 400, damping: 10 } }
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Structured Bottom Section Footer CTA */}
        <div className="mt-20 border-t border-zinc-200/60 pt-10 flex justify-center reveal">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B22030] tracking-widest uppercase transition-colors hover:text-zinc-950"
          >
            Discuss a specific mandate
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
