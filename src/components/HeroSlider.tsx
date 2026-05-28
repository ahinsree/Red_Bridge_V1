"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideItem {
  id: number;
  tag: string;
  headline: string;
  sub: string;
  italicWord: string;
  visualUrl: string;
  tabLabel: string;
  cta1Text: string;
  cta1Href: string;
  cta2Text: string;
  cta2Href: string;
  bgPosition?: string;
  bgPositionMobile?: string;
}

const getOptimizedHeroImage = (url: string, mobile: boolean) => {
  if (!url) return "";
  const dotIndex = url.lastIndexOf(".");
  if (dotIndex === -1) return url;
  const base = url.substring(0, dotIndex);
  return `${base}-${mobile ? "mobile" : "desktop"}.webp`;
};

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const slides: SlideItem[] = [
    {
      id: 0,
      tag: "Strategy & Transformation",
      headline: "Advisory built for the work that follows the",
      italicWord: "decision.",
      sub: "Red Bridge Advisory partners with governments, institutions, and businesses — with the clarity of purpose and the discipline of delivery.",
      visualUrl: "/images/hero-bridge-bg.png",
      tabLabel: "Strategy & Transformation",
      cta1Text: "What We Do",
      cta1Href: "#services",
      cta2Text: "Engage Us",
      cta2Href: "#contact",
      bgPosition: "right center",
      bgPositionMobile: "right center"
    },
    {
      id: 1,
      tag: "AI & Digital Transformation",
      headline: "Building intelligence into how organisations",
      italicWord: "operate.",
      sub: "Our AI Transformation practice partners with enterprises to move from AI aspiration to implementation-ready capability — without losing operational integrity.",
      visualUrl: "/images/hero-ai-bg.png",
      tabLabel: "AI & Digital",
      cta1Text: "Explore AI Practice",
      cta1Href: "#services",
      cta2Text: "See Case Studies",
      cta2Href: "#case-studies",
      bgPosition: "right center",
      bgPositionMobile: "right center"
    },
    {
      id: 2,
      tag: "Public Sector & Government",
      headline: "Advisory for institutions that shape public",
      italicWord: "life.",
      sub: "From policy design and institutional capacity building to programme delivery — advisory that understands how government works, and what it takes to move it with purpose.",
      visualUrl: "/images/hero-experience-bg.png",
      tabLabel: "Public Sector",
      cta1Text: "Public Sector Work",
      cta1Href: "#services",
      cta2Text: "Read Perspectives",
      cta2Href: "#insights",
      bgPosition: "right center",
      bgPositionMobile: "right center"
    },
    {
      id: 3,
      tag: "Tourism & Destination Development",
      headline: "From destination vision to visitor",
      italicWord: "reality.",
      sub: "We help governments and institutions build tourism ecosystems that are coherent, competitive, and built to endure — from master planning to experience design.",
      visualUrl: "/images/hero-velocity-bg.png",
      tabLabel: "Tourism & Destination",
      cta1Text: "Coastal Corridor Study",
      cta1Href: "#case-studies",
      cta2Text: "Tourism Practice",
      cta2Href: "#services",
      bgPosition: "right center",
      bgPositionMobile: "right center"
    }
  ];

  // Duration of each slide in milliseconds (8 seconds)
  const SLIDE_DURATION = 8000;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden px-6 md:px-8 bg-background"
    >
      {/* 3D Parallax Background Layer Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0) scale(1.03)`,
              transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)",
            }}
          >
            <Image
              src={`${process.env.NODE_ENV === "production" ? "/Red_Bridge_" : ""}${getOptimizedHeroImage(activeSlide.visualUrl, isMobile)}`}
              alt={activeSlide.tag}
              fill
              priority={activeSlide.id === 0}
              fetchPriority={activeSlide.id === 0 ? "high" : "low"}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: isMobile 
                  ? (activeSlide.bgPositionMobile || "70% center") 
                  : (activeSlide.bgPosition || "center")
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Global Cinema Overlays */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-background/50 pointer-events-none z-10 lg:hidden" />

        {/* Glowing Orbs */}
        <div 
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-bridge-red/10 blur-[130px] animate-pulse pointer-events-none z-10" 
          style={{ animationDuration: "12s" }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-deep-navy/40 blur-[160px] animate-pulse pointer-events-none z-10" 
          style={{ animationDuration: "18s" }} 
        />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-10 xl:col-span-8 flex flex-col items-start gap-5 sm:gap-6 mt-6 lg:mt-0">
          
          {/* Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${activeSlide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-3 py-1 rounded bg-bridge-red/10 border border-bridge-red/20 text-xs font-mono tracking-widest text-bridge-red uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
              {activeSlide.tag}
            </motion.div>
          </AnimatePresence>

          {/* Main Headline */}
          <div className="overflow-hidden py-1">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${activeSlide.id}`}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -36 }}
                transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream leading-[1.05] tracking-tight max-w-4xl"
              >
                {activeSlide.headline} <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream/85 to-bridge-red">
                  {activeSlide.italicWord}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden py-1 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${activeSlide.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-cream/65 leading-relaxed font-sans"
              >
                {activeSlide.sub}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`ctas-${activeSlide.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 mt-2 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollTo(activeSlide.cta1Href)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-bridge-red/25 cursor-pointer border border-white/5"
              >
                {activeSlide.cta1Text}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollTo(activeSlide.cta2Href)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-white/5 border border-white/10 text-cream text-xs font-mono tracking-widest uppercase hover:text-bridge-red hover:border-bridge-red/30 transition-all duration-300 cursor-pointer"
              >
                {activeSlide.cta2Text}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Layout: Slide Indicators, Tabs, and Chevrons */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mt-12 flex flex-col md:flex-row justify-between items-end gap-6 border-t border-white/5 pt-8">
        
        {/* EY-Style Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-[85%] select-none">
          {slides.map((slide) => {
            const isActive = currentSlide === slide.id;
            return (
              <div
                key={slide.id}
                onClick={() => setCurrentSlide(slide.id)}
                className="flex flex-col gap-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between text-left">
                  <span className="font-mono text-[10px] tracking-wider text-cream/30 group-hover:text-bridge-red transition-colors leading-none">
                    0{slide.id + 1}
                  </span>
                  <span className={`font-sans text-[11px] font-medium tracking-wide leading-none transition-colors ${
                    isActive ? "text-cream" : "text-cream/45 group-hover:text-cream/80"
                  }`}>
                    {slide.tabLabel}
                  </span>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                  {isActive && (
                    <motion.div
                      key={`progress-${slide.id}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: isPaused ? 0 : SLIDE_DURATION / 1000, ease: "linear" }}
                      className="absolute inset-0 bg-bridge-red origin-left h-full w-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chevron Manual Controls */}
        <div className="flex items-center gap-2 select-none self-end md:self-auto">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-cream/60 hover:text-cream hover:border-white/35 transition-colors cursor-pointer bg-white/5 hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-cream/60 hover:text-cream hover:border-white/35 transition-colors cursor-pointer bg-white/5 hover:bg-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
