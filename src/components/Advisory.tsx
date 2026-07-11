"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface PracticeArea {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  caps: string[];
  delayClass: string;
}

function ParallaxCard({ practice }: { practice: PracticeArea }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to lag and soften cursor updates
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  // Map coordinates to translate range [-10px, 10px] and subtle zoom scale
  const imageX = useTransform(springX, [-100, 100], [-10, 10]);
  const imageY = useTransform(springY, [-100, 100], [-10, 10]);
  const imageScale = useTransform(springY, [-100, 100], [1.12, 1.06]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Set motion values based on cursor relative offset percentage
    x.set((mouseX / (width / 2)) * 100);
    y.set((mouseY / (height / 2)) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="advisory-card reveal flex flex-col justify-between"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {/* Parallax Image Container */}
        <div className="relative w-full h-[180px] overflow-hidden rounded-lg mb-6 border border-zinc-200/50 bg-zinc-100/50">
          <motion.div
            style={{
              x: imageX,
              y: imageY,
              scale: imageScale,
              width: "112%",
              height: "112%",
              position: "absolute",
              top: "-6%",
              left: "-6%",
            }}
          >
            <Image
              src={practice.image}
              alt={practice.title}
              fill
              sizes="(max-width: 760px) 100vw, 33vw"
              className="object-cover pointer-events-none"
              priority={practice.num === "01"}
            />
          </motion.div>
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>

        <span className="advisory-card__num">{practice.num}</span>
        <h3 className="advisory-card__title">{practice.title}</h3>
        <p className="advisory-card__tagline">{practice.tagline}</p>
        <p className="advisory-card__desc" style={{ minHeight: "100px" }}>
          {practice.desc}
        </p>

        <ul className="advisory-card__caps" style={{ marginTop: "20px" }}>
          {practice.caps.map((cap, i) => (
            <li key={i}>{cap}</li>
          ))}
        </ul>
      </div>

      <Link
        href={`/practices/${practice.slug}`}
        className="advisory-card__cta"
        style={{ marginTop: "auto" }}
      >
        Explore Practice Area &rarr;
      </Link>
    </div>
  );
}

export default function Advisory() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
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
      delayClass: "",
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
      delayClass: "d1",
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
      delayClass: "d2",
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
      delayClass: "",
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
      delayClass: "d1",
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
      delayClass: "d2",
    },
  ];

  return (
    <section
      className="section section--offwhite advisory-section relative overflow-hidden"
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
          background: "radial-gradient(circle, rgba(178,32,48,0.035) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(27,38,59,0.02) 0%, transparent 85%)",
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(30px)",
          zIndex: 0,
        }}
      />

      <div className="container relative z-10">
        <div className="advisory-header reveal">
          <div className="advisory-header__left">
            <span className="sec-label">Advisory Areas</span>
            <h2 className="sec-title">
              Our Capabilities.
              <br />
              Built for institutional complexity.
            </h2>
            <div className="divider"></div>
            <p className="sec-sub">
              These are the kind of problems we are brought in to solve, whether
              the client is a company, a government or a founder.
            </p>
          </div>
          <Link
            href="/#contact"
            className="btn btn--ghost advisory-header__btn"
          >
            Start a conversation &rarr;
          </Link>
        </div>

        <div className="advisory-grid">
          {practices.map((practice) => (
            <ParallaxCard key={practice.slug} practice={practice} />
          ))}
        </div>

        {/* Subtle scalable CTA */}
        <div className="section-footer-cta reveal">
          <Link href="/#contact">Discuss a specific mandate &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
