"use client";

import { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";
import { ArrowLeft, Target, Database, Users, TrendingUp, Compass, Layers, CheckCircle2, LucideIcon } from "lucide-react";

// Practices Data dictionary
const practicesData: Record<string, {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  caps: string[];
  fullDesc: string;
  impact: string;
  icon: LucideIcon;
}> = {
  "strategy-transformation": {
    num: "01",
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
    fullDesc: "Red Bridge Advisory works at the highest level of institutional development. We believe that strategy is only as good as the organization's capacity to deliver it. Our practice combines analytical rigor with deep engagement to align structures, systems, and people behind strategic goals. We serve government ministries, public sector corporations, and private enterprises to design transformations that endure.",
    impact: "Designed the organizational restructuring and governance frameworks for several large-scale public enterprises and national development programs.",
    icon: Target
  },
  "ai-digital-data": {
    num: "02",
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
    fullDesc: "We bring strategic judgement to technology decisions. In an era of rapid AI deployment and hype, we help clients build the foundational data governance and systems integration required to sustain innovation. From digital service blueprints to enterprise analytics, we design technology models focused strictly on performance, not novelty.",
    impact: "Established the digital roadmaps and AI governance architecture for large-scale logistics operations and municipal service platforms.",
    icon: Database
  },
  "experience-service-design": {
    num: "03",
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
    fullDesc: "Organizations tend to view services from the inside out, whereas users experience them from the outside in. We bridge this gap by mapping user journeys, testing service touchpoints, and designing operational frameworks that guarantee reliable delivery across every counter, call, and screen.",
    impact: "Redesigned citizen service journeys for state agencies and optimized service delivery models for high-growth consumer organizations.",
    icon: Users
  },
  "investment-economic-infrastructure": {
    num: "04",
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
    fullDesc: "We provide the rigorous analytics and strategic structuring that underpins successful public and private capital deployment. Our team delivers clear market feasibility, structured business cases, and regional development frameworks that stand up to institutional investor scrutiny.",
    impact: "Structured feasibility studies and strategic business cases for major infrastructure networks and economic trade zones.",
    icon: TrendingUp
  },
  "entrepreneurship-innovation-startup": {
    num: "05",
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
    fullDesc: "Building a thriving ecosystem requires connecting capital, policy, talent, and infrastructure. We partner with innovation agencies, universities, and development partners to design incubation platforms, construct startup promotion policies, and forge ecosystem partnerships.",
    impact: "Formulated state-wide startup initiatives and designed corporate incubation programs that accelerated hundreds of early-stage startups.",
    icon: Compass
  },
  "programme-management-monitoring": {
    num: "06",
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
    fullDesc: "We establish the project coordination frameworks and rigorous evaluation standards that guarantee transparency, timeline compliance, and performance tracking. By combining concurrent field monitoring with detailed baseline and impact studies, we ensure project outcomes are verified.",
    impact: "Operated multi-year project management support units and led third-party program evaluations for major national development initiatives.",
    icon: Layers
  }
};

export default function PracticeDetailPage() {
  const { slug } = useParams() as { slug: string };
  const practice = practicesData[slug];

  if (!practice) {
    notFound();
  }

  const IconComponent = practice.icon;

  useEffect(() => {
    // Scroll reveal activation
    document.documentElement.classList.add("js-ready");

    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 16) {
        el.classList.add("in");
      }
    });

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -16px 0px" }
    );

    revealEls.forEach((el) => {
      if (!el.classList.contains("in")) {
        revealObs.observe(el);
      }
    });

    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 2000);

    // Scroll to top on load
    window.scrollTo(0, 0);

    return () => {
      clearTimeout(timer);
      revealObs.disconnect();
    };
  }, [slug]);

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#2E2E2E]">
      <Header />

      {/* Practice Hero Banner */}
      <section className="hero" style={{ height: "65vh", minHeight: "480px" }}>
        <div className="hero__bg">
          <div className="hero__parallax-wrapper" style={{ transform: "scale(1.06)" }}>
            <div 
              style={{
                position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
                background: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80') center/cover no-repeat",
                opacity: 0.14,
                filter: "grayscale(100%) contrast(1.1)",
                animation: "heroKenBurns 45s ease-in-out infinite alternate"
              }}
            />
          </div>
        </div>
        <div className="hero__overlay" style={{ background: "linear-gradient(112deg, rgba(27, 38, 59, 0.97) 0%, rgba(27, 38, 59, 0.88) 50%, rgba(27, 38, 59, 0.5) 100%)" }} />
        <div className="hero__lightbeam" />

        <div className="hero__content" style={{ marginTop: "40px" }}>
          <Link href="/#advisory" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--red)] mb-8 transition-colors hover:text-white">
            <ArrowLeft size={12} /> Back to Advisory
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--red)] text-xs font-bold tracking-widest uppercase">{practice.num} / Practice Area</span>
            <div className="w-12 h-[1px] bg-[var(--red)]" />
          </div>
          
          <h1 className="hero__primary" style={{ fontSize: "clamp(34px, 5.5vw, 62px)", lineHeight: 1.1 }}>
            {practice.title}
          </h1>
          <p className="hero__secondary" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "rgba(255,255,255,0.8)", marginBottom: 0 }}>
            {practice.tagline}
          </p>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="section section--cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Summary & Case Details */}
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-4 mb-6">
                <span className="p-3 bg-[rgba(178,32,48,0.06)] rounded-full text-[var(--red)]">
                  <IconComponent size={24} />
                </span>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--red)]">Scope & Overview</h4>
              </div>
              <p className="font-serif italic text-xl md:text-2xl text-[var(--charcoal)] leading-relaxed mb-8">
                {practice.desc}
              </p>
              <div className="text-[var(--body-c)] text-base leading-relaxed mb-10 space-y-4">
                <p>{practice.fullDesc}</p>
              </div>

              {/* Highlight Box */}
              <div className="p-8 bg-white border border-[var(--divider-soft)] rounded-lg shadow-sm">
                <span className="text-[var(--red)] font-semibold text-xs uppercase tracking-widest block mb-3">Proven Track Record</span>
                <p className="font-serif italic text-lg text-[var(--charcoal)] leading-relaxed mb-0">
                  &ldquo;{practice.impact}&rdquo;
                </p>
              </div>
            </div>

            {/* Right: Capabilities Checklist */}
            <div className="lg:col-span-5 reveal d1">
              <div className="bg-white border border-[var(--divider-soft)] rounded-xl p-8 shadow-sm">
                <h3 className="font-serif text-2xl text-[var(--charcoal)] mb-6">Core Capabilities</h3>
                <ul className="space-y-4">
                  {practice.caps.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3 py-1">
                      <span className="text-[var(--red)] mt-1 flex-shrink-0">
                        <CheckCircle2 size={16} />
                      </span>
                      <span className="text-sm font-medium text-[var(--body-c)] leading-tight">{cap}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[var(--divider-soft)]">
                  <p className="text-xs text-[var(--muted)] mb-4">Have an operational directive or specific mandate in this space?</p>
                  <a href="#contact" className="btn btn--primary w-full text-center py-3 flex justify-center items-center">
                    Engage Our Partners
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Unified Contact Form Section */}
      <ContactForm />

      <Footer />
      <Chatbot />
      <ScrollToggle />
    </div>
  );
}
