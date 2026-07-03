"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";
import { ArrowLeft, ArrowUpRight, LucideIcon, Target, Database, Users, TrendingUp, Compass, Layers, ChevronRight } from "lucide-react";

// Practices Visual and Color system dictionary
interface StyleSystem {
  gradient: string;
  glow: string;
  darkGlow: string;
  accent: string;
  image: string;
  bgX: number; // Mouse movement parallax multiplier
  bgY: number; // Scroll movement parallax multiplier
  shapeTransform: (mousePos: { x: number; y: number }, scrollVal: number) => string;
  imageFit?: "cover" | "contain";
  hideOverlay?: boolean;
}

const styleSystemData: Record<string, StyleSystem> = {
  "strategy-transformation": {
    gradient: "from-[#B22030] to-[#E31E24]",
    glow: "rgba(178, 32, 48, 0.45)",
    darkGlow: "rgba(178, 32, 48, 0.08)",
    accent: "#B22030",
    image: "/images/strategy-transformation-desktop.webp",
    bgX: -0.3,
    bgY: 0.28,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * 0.5}px, ${scrollVal * -0.15 + mousePos.y * 0.5}px, 0) rotate(${scrollVal * 0.06}deg)`
  },
  "ai-digital-data": {
    gradient: "from-[#00F2FE] to-[#4FACFE]",
    glow: "rgba(79, 172, 254, 0.45)",
    darkGlow: "rgba(0, 242, 254, 0.08)",
    accent: "#00F2FE",
    image: "/images/ai-digital-data-desktop.webp",
    bgX: -0.5,
    bgY: 0.18,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * -0.6}px, ${scrollVal * 0.22 + mousePos.y * -0.6}px, 0) scale(${1 + scrollVal * 0.0003})`
  },
  "experience-service-design": {
    gradient: "from-[#FF3366] to-[#FF8008]",
    glow: "rgba(255, 51, 102, 0.45)",
    darkGlow: "rgba(255, 51, 102, 0.08)",
    accent: "#FF3366",
    image: "/images/experience-service-design-desktop.webp",
    bgX: 0.4,
    bgY: 0.36,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * 0.8}px, ${scrollVal * -0.08 + mousePos.y * 0.2}px, 0) skewX(${mousePos.x * 0.5}deg)`,
    imageFit: "contain",
    hideOverlay: true
  },
  "investment-economic-infrastructure": {
    gradient: "from-[#11998e] to-[#38ef7d]",
    glow: "rgba(56, 239, 125, 0.45)",
    darkGlow: "rgba(17, 153, 142, 0.08)",
    accent: "#38ef7d",
    image: "/images/hero-velocity-bg-desktop.webp",
    bgX: -0.2,
    bgY: 0.42,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * 0.3}px, ${scrollVal * -0.28 + mousePos.y * 0.3}px, 0)`
  },
  "entrepreneurship-innovation-startup": {
    gradient: "from-[#F39C12] to-[#F1C40F]",
    glow: "rgba(243, 156, 18, 0.45)",
    darkGlow: "rgba(243, 156, 18, 0.08)",
    accent: "#F39C12",
    image: "/images/startup-ecosystem-desktop.webp",
    bgX: -0.4,
    bgY: 0.24,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * 0.6}px, ${scrollVal * -0.1 + mousePos.y * 0.6}px, 0) rotate(${scrollVal * 0.18}deg)`
  },
  "programme-management-monitoring": {
    gradient: "from-[#7B1FA2] to-[#E040FB]",
    glow: "rgba(123, 31, 162, 0.45)",
    darkGlow: "rgba(123, 31, 162, 0.08)",
    accent: "#E040FB",
    image: "/images/programme-monitoring-desktop.webp",
    bgX: 0.3,
    bgY: 0.33,
    shapeTransform: (mousePos, scrollVal) => 
      `translate3d(${mousePos.x * 0.4}px, ${scrollVal * 0.16 + mousePos.y * 0.4}px, 0) scale(${1 + Math.sin(scrollVal * 0.002) * 0.05})`
  }
};

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

const topicMap: Record<string, string> = {
  "strategy-transformation": "strategy",
  "ai-digital-data": "ai",
  "experience-service-design": "design",
  "investment-economic-infrastructure": "investment",
  "entrepreneurship-innovation-startup": "startup",
  "programme-management-monitoring": "pm"
};

const capContentData: Record<string, string> = {
  // Strategy, Transformation & Institution Building
  "Corporate, growth and sector strategy": "We help boards and leadership teams define clear, growth paths in complex market environments. Our strategy work is built on empirical market insights and operational mapping, ensuring recommendations align with financial limits and execution capacities. We address corporate diversification, market entry, and long-term sector positioning.",
  "Operating model and organisation design": "An organization's design must follow its strategic mandate. We structure clear reporting lines, functional boundaries, and decision rights that eliminate operational friction and accelerate execution. We design operating models that optimize internal resources, integrate digital workflows, and align institutional capacity.",
  "Institutional reform and restructuring": "We advise public sectors and enterprises undergoing structural transition. We manage functional overlap reviews, establish modern performance-linked governance systems, and guide organizations through change. Our restructuring frameworks balance institutional stability with operational agility.",
  "Governance, systems and capacity building": "Building enduring institutions requires robust governance boards, transparent monitoring protocols, and targeted training. We design corporate governance frameworks, integrate automated decision-support systems, and build internal capabilities.",
  "Transformation programme design and oversight": "Transformation programs fail in execution. We establish project management offices (PMOs) with strict timeline enforcement, risk matrices, and transparent reporting systems. We provide independent oversight to ensure strategic initiatives achieve target outcomes.",

  // AI, Digital & Data
  "AI readiness and adoption strategy": "We evaluate technical infrastructure, data quality, and team capabilities to define practical, high-impact artificial intelligence implementation paths. We help you cut through the hype to find clear use cases that generate real operational returns.",
  "Data strategy, architecture and governance": "Data is only an asset if it is structured and trusted. We design enterprise data architectures, access protocols, and data quality standards to ensure business decisions are supported by clean, real-time analytics.",
  "Digital and technology roadmaps": "We formulate step-by-step technological blueprints that align software purchases, cloud upgrades, and systems migration with your capital budgets and growth timelines.",
  "Analytics and decision support": "We build business intelligence dashboards and statistical forecast models that translate raw operations streams into clear, actionable boardroom insights.",
  "Technology governance and assurance": "We construct risk management frameworks, compliance audits, and security standards to protect your technology stack while ensuring transparency and regulatory alignment.",

  // Experience & Service Design
  "Customer and citizen experience strategy": "We research user patterns and friction points to define customer engagement strategies that increase satisfaction, retention, and service efficiency.",
  "Service design and journey mapping": "We map front-end user actions and back-end staff workflows step-by-step to design services that are intuitive, cohesive, and easy to navigate.",
  "Public service and delivery design": "We redesign public sector counters, portals, and service centers to shorten waiting times, simplify forms, and improve accessibility for all citizens.",
  "Customer and Brand Experience": "We align your visual communication, message tone, and customer support channels to deliver a consistent, high-value brand representation across every touchpoint.",
  "Employee experience and culture": "We analyze internal workspaces, software, and feedback systems to build productive organizational cultures that attract and retain top talent.",
  "Experience measurement and improvement": "We establish continuous feedback loops, Net Promoter Score (NPS) tracking, and operational audits to locate service failures and drive continuous updates.",

  // Investment, Economic & Infrastructure Advisory
  "Feasibility studies and business cases": "We provide independent market analysis, cost-benefit calculations, and financial modeling to determine whether a project stands up to institutional scrutiny before capital moves.",
  "Detailed project reports and project structuring": "We compile comprehensive technical and financial project reports, detailing execution phases, procurement strategies, and resource requirements.",
  "Public-private partnership advisory": "We structure risk sharing, concessions, and joint ventures between public bodies and private consortia, ensuring legal compliance and financial viability.",
  "Economic development and investment promotion": "We design policies, financial incentives, and marketing plans to attract domestic and foreign direct investments (FDI) into regional development zones.",
  "Sector, cluster and regional development strategy": "We map industrial clusters, trade links, and local resources to formulate strategies that accelerate economic growth across regions.",

  // Entrepreneurship, Innovation & Startup Ecosystems
  "Incubation and startup support design": "We design business incubators, accelerators, and lab spaces for universities and governments, establishing mentor networks, training curriculums, and entry criteria.",
  "Entrepreneurship and innovation programmes": "We structure innovation challenges, hackathons, and corporate venture programs that connect early-stage founders with funding and partnerships.",
  "Startup mission and policy advisory": "We advise regional development agencies on formulating regulatory policies, grant systems, and tax credits that encourage startup creation.",
  "MSME and enterprise development": "We help micro, small, and medium enterprises upgrade technology, access credit channels, and build marketing routes to scale their operations.",
  "Social enterprise and inclusive finance": "We design business models and financing programs that support social impact startups, micro-lending, and community development.",
  "Ecosystem and institutional partnerships": "We connect universities, corporate boards, investors, and startup networks to build collaborative, resource-rich innovation clusters.",

  // Programme Management, Monitoring & Evaluation
  "Programme and project management units (PMU)": "We operate dedicated project management units that track timelines, coordinate stakeholders, and resolve delivery bottlenecks for large initiatives.",
  "Monitoring and evaluation frameworks": "We design custom key performance indicator (KPI) frameworks and data collection tools to track project progress transparently.",
  "Baseline, outcome and impact studies": "We conduct systematic field surveys and quantitative evaluations to measure project success before, during, and after implementation.",
  "Third-party and concurrent monitoring": "We provide independent field monitoring and audits to verify construction quality, budget allocations, and service delivery.",
  "Implementation support and review": "We review running programs to find delivery issues, suggest corrective steps, and support project teams to get back on timeline."
};

export default function PracticeDetailPage() {
  const { slug } = useParams() as { slug: string };
  const practice = practicesData[slug];
  const style = styleSystemData[slug];

  if (!practice || !style) {
    notFound();
  }

  const IconComponent = practice.icon;

  // Parallax translation coordinates states
  const [scrollVal, setScrollVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Scroll reveal activation
    document.documentElement.classList.add("js-ready");

    const handleScroll = () => {
      setScrollVal(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const handleToggleCap = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  // Prepopulate capability in contact form when clicked
  const handleCapClick = (e: React.MouseEvent<HTMLAnchorElement>, cap: string) => {
    e.preventDefault();

    // Scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const topOffset = contactSection.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }

    // Set Area of Interest Select Dropdown
    const topicSelect = document.getElementById("cf-topic") as HTMLSelectElement;
    if (topicSelect) {
      const nativeSelectSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value")?.set;
      nativeSelectSetter?.call(topicSelect, topicMap[slug] || "general");
      topicSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Set Message text area
    const msgTextarea = document.getElementById("cf-msg") as HTMLTextAreaElement;
    if (msgTextarea) {
      const nativeTextareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
      nativeTextareaSetter?.call(msgTextarea, `Hello, I would like to enquire about: "${cap}"`);
      msgTextarea.dispatchEvent(new Event("input", { bubbles: true }));

      // Focus input field with brief timeout to allow smooth scroll completion
      setTimeout(() => {
        msgTextarea.focus();
      }, 750);
    }
  };

  // Custom vector layout geometry render by slug
  const renderFloatingShape = () => {
    switch (slug) {
      case "strategy-transformation":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 110 L110 10 L210 110 L110 210 Z" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M40 110 L110 40 L180 110 L110 180 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="110" cy="110" r="5" fill="#B22030" />
          </svg>
        );
      case "ai-digital-data":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="5,5" />
            <circle cx="110" cy="110" r="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="110" cy="110" r="30" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
            <circle cx="110" cy="110" r="4" fill="#00F2FE" />
            <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="170" cy="170" r="2" fill="rgba(255,255,255,0.15)" />
          </svg>
        );
      case "experience-service-design":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 Q 60 180, 110 80 T 210 80" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            <path d="M10 110 Q 60 210, 110 110 T 210 110" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d="M10 140 Q 60 240, 110 140 T 210 140" stroke="rgba(255, 51, 102, 0.25)" strokeWidth="1" />
            <circle cx="110" cy="110" r="5" fill="#FF3366" />
          </svg>
        );
      case "investment-economic-infrastructure":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="200" x2="200" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <rect x="40" y="140" width="24" height="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <rect x="80" y="100" width="24" height="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <rect x="120" y="60" width="24" height="140" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <path d="M40 140 L80 100 L120 60 L160 20" stroke="#38ef7d" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="160" cy="20" r="5" fill="#38ef7d" />
          </svg>
        );
      case "entrepreneurship-innovation-startup":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="110" y1="10" x2="110" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <line x1="10" y1="110" x2="210" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <line x1="39.29" y1="39.29" x2="180.71" y2="180.71" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="180.71" y1="39.29" x2="39.29" y2="180.71" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="110" cy="110" r="45" stroke="rgba(243, 156, 18, 0.25)" strokeWidth="1.5" />
            <circle cx="110" cy="110" r="5" fill="#F39C12" />
          </svg>
        );
      case "programme-management-monitoring":
        return (
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="110,20 190,65 190,155 110,200 30,155 30,65" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
            <polygon points="110,50 162,80 162,140 110,170 58,140 58,80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <polygon points="110,80 136,95 136,125 110,140 84,125 84,95" stroke="rgba(224, 64, 251, 0.25)" strokeWidth="1.5" />
            <circle cx="110" cy="110" r="4" fill="#E040FB" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#2E2E2E]">
      <Header />

      {/* Practice Hero Banner with Vibrant mesh gradients & real interactive parallax */}
      <section 
        className="hero relative overflow-hidden" 
        style={{ 
          height: "65vh", 
          minHeight: "520px",
          background: `radial-gradient(circle at 15% 30%, ${style.glow} 0%, transparent 65%), var(--navy)`
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="hero__bg">
          {/* Scroll and mouse driven background translation layer - custom speeds per area */}
          <div 
            className="hero__parallax-wrapper" 
            style={{ 
              transform: `translate3d(${mousePos.x * style.bgX}px, ${scrollVal * style.bgY + mousePos.y * style.bgX}px, 0) scale(1.08)` 
            }}
          >
            <div 
              style={{
                position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
                background: `url('${style.image}') center/cover no-repeat`,
                opacity: 0.16,
                filter: "grayscale(100%) contrast(1.1)",
                animation: "heroKenBurns 45s ease-in-out infinite alternate"
              }}
            />
          </div>
        </div>
        
        {/* Animated breathing light beam utilizing dynamic color overlay */}
        <div 
          className="hero__lightbeam" 
          style={{
            background: `linear-gradient(135deg, ${style.glow} 0%, transparent 60%)`
          }}
        />

        {/* Custom Parallax floating geometry - custom shapes and movements per area */}
        <div 
          className="hero__floating-geometry hidden md:block"
          style={{
            transform: style.shapeTransform(mousePos, scrollVal),
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="hero__floating-geometry-inner">
            {renderFloatingShape()}
          </div>
        </div>

        <div className="hero__content" style={{ paddingTop: "110px", paddingBottom: "40px" }}>
          <Link 
            href="/#advisory" 
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-8 transition-all hover:bg-white/10 hover:border-white/20"
          >
            <ArrowLeft size={12} className="text-[var(--red)]" /> Back to Advisory
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className={`bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent text-xs font-bold tracking-widest uppercase`}>
              {practice.num} / Practice Area
            </span>
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

      {/* Split Row Content Layout in Webandcrafts Style */}
      <section className="section section--cream py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Heading, Description & Link List */}
            <div className="lg:col-span-7 reveal">
              <div className="flex items-center gap-4 mb-6">
                <span 
                  className="p-3 rounded-full text-white bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${style.accent}, rgba(0,0,0,0.3))`
                  }}
                >
                  <IconComponent size={22} />
                </span>
                <h4 className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>
                  Scope &amp; Operations
                </h4>
              </div>

              <p className="font-serif italic text-2xl text-[var(--charcoal)] leading-relaxed" style={{ marginBottom: "32px" }}>
                {practice.desc}
              </p>

              <div className="text-[var(--body-c)] text-base leading-relaxed space-y-4" style={{ marginBottom: "48px" }}>
                <p>{practice.fullDesc}</p>
              </div>

              {/* Capabilities list acting as active anchor links back to inquiry form */}
              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]" style={{ marginBottom: "20px" }}>Specific Capabilities</h4>
                <div className="flex flex-col">
                  {practice.caps.map((cap, i) => (
                    <div 
                      key={i} 
                      className="border-t border-[var(--divider-soft)] transition-colors duration-300"
                      style={{ borderBottom: i === practice.caps.length - 1 ? "1px solid var(--divider-soft)" : "" }}
                    >
                      <button 
                        onClick={(e) => handleToggleCap(e, i)}
                        className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300 hover:text-[var(--red)] group"
                      >
                        <span className="text-base font-medium text-[var(--body-c)] group-hover:text-[var(--red)]">{cap}</span>
                        <ChevronRight 
                          size={16} 
                          className="text-[var(--muted)] transform transition-transform duration-300"
                          style={{ 
                            transform: expandedIndex === i ? "rotate(90deg)" : "rotate(0deg)",
                            color: expandedIndex === i ? "var(--red)" : "" 
                          }}
                        />
                      </button>
                      
                      {/* Expanded Detailed Copy Reveal Panel */}
                      <div 
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ 
                          maxHeight: expandedIndex === i ? "240px" : "0px",
                          opacity: expandedIndex === i ? 1 : 0
                        }}
                      >
                        <div className="pb-6 pr-4">
                          <p className="text-sm leading-relaxed text-[var(--muted)] mb-5">
                            {capContentData[cap] || "We partner with board members, public institutions, and corporate leaders on structuring plans, risk governance, and functional design."}
                          </p>
                          <a 
                            href="#contact"
                            onClick={(e) => handleCapClick(e, cap)}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--red)] hover:opacity-85 transition-opacity"
                          >
                            Enquire About Capability <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Premium glowing image container & Case Track record box */}
            <div className="lg:col-span-5 reveal d1 lg:sticky lg:top-28">
              
              {/* Media image container with floating accent borders and pulsating neon glow */}
              <div className="relative group" style={{ minHeight: style.imageFit === "contain" ? "auto" : "360px", marginBottom: "40px" }}>
                {/* Dynamic vibrant gradient backglow rings */}
                <div 
                  className="absolute inset-0 opacity-15 rounded-xl filter blur-2xl scale-105 pointer-events-none transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${style.accent}, transparent)`,
                    boxShadow: `0 24px 80px -15px ${style.darkGlow}`
                  }}
                />
                
                <div 
                  className="relative w-full rounded-xl overflow-hidden border border-[var(--divider-soft)]"
                  style={{
                    height: style.imageFit === "contain" ? "auto" : "400px",
                    aspectRatio: style.imageFit === "contain" ? "1.5" : "auto",
                    backgroundColor: style.imageFit === "contain" ? "#141724" : "transparent"
                  }}
                >
                  <Image
                    className={style.imageFit === "contain" ? "object-contain" : "object-cover transition-transform duration-700 group-hover:scale-105"}
                    src={style.image}
                    alt={practice.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {style.hideOverlay ? null : (
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,38,59,0.85)] via-[rgba(27,38,59,0.3)] to-transparent" />
                  )}
                  
                  {/* Floating caption overlay */}
                  {!style.hideOverlay && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-80 block mb-1">Mandate Profile</span>
                      <h5 className="font-serif text-white text-xl font-medium leading-snug">{practice.tagline}</h5>
                    </div>
                  )}
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
