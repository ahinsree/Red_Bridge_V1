"use client";

import { useState } from "react";
import Link from "next/link";

export default function Advisory() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map coordinates to delta shift [-15px, 15px]
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
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
      delayClass: "",
    },
    {
      num: "02",
      slug: "ai-digital-data",
      title: "AI, Digital & Data",
      tagline: "Technology adopted with judgement, not haste.",
      desc: "There is a great deal of pressure to adopt AI and very little patience for the groundwork that makes it pay off. We help organisations tell the two apart, whether it is a company putting data to work across its operations or a department modernising a public service.",
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
          width: "350px", height: "350px",
          left: "2%", top: "18%",
          background: "radial-gradient(circle, rgba(178,32,48,0.035) 0%, transparent 70%)",
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(40px)",
          zIndex: 0
        }}
      />
      <div 
        className="absolute rounded-full border border-[rgba(255,255,255,0.8)] pointer-events-none hidden md:block"
        style={{
          width: "480px", height: "480px",
          right: "4%", bottom: "12%",
          background: "radial-gradient(circle, rgba(27,38,59,0.02) 0%, transparent 85%)",
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: "transform 0.15s ease-out",
          filter: "blur(30px)",
          zIndex: 0
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
              These are the kind of problems we are brought in to solve, whether the client is a company, a government or a founder.
            </p>
          </div>
          <Link
            href="/#contact"
            className="btn btn--ghost"
            style={{ flexShrink: 0, alignSelf: "flex-end" }}
          >
            Start a conversation &rarr;
          </Link>
        </div>

        <div className="advisory-grid">
          {practices.map((practice, index) => (
            <div key={index} className={`advisory-card reveal ${practice.delayClass}`} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="advisory-card__num">{practice.num}</span>
                <h3 className="advisory-card__title">{practice.title}</h3>
                <p className="advisory-card__tagline">{practice.tagline}</p>
                <p className="advisory-card__desc" style={{ minHeight: "100px" }}>{practice.desc}</p>
                <ul className="advisory-card__caps" style={{ marginTop: "20px" }}>
                  {practice.caps.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>
              <Link href={`/practices/${practice.slug}`} className="advisory-card__cta" style={{ marginTop: "auto" }}>
                Explore Practice Area &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Subtle scalable CTA */}
        <div className="section-footer-cta reveal">
          <Link href="/#contact">
            Discuss a specific mandate &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
