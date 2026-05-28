"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  const announcements = [
    "AI Transformation Practice formally launched — supporting enterprises navigating the AI-readiness gap",
    "New report: Tourism Destination Design — building ecosystems, not just attractions. Available now.",
    "Red Bridge Advisory expands Public Sector practice — strategy, policy design & programme delivery",
    "Inaugural MSME Ecosystem Report: 50,000+ enterprise survey across three states"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Vertical ticker announcement interval
    const ticker = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(ticker);
    };
  }, [announcements.length]);

  const navLinks = [
    { name: "Solutions", href: "#services", hasDropdown: true },
    { name: "Industries", href: "#industries", hasDropdown: true },
    { name: "What We Do", href: "#what-we-do" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Insights", href: "#insights" },
    { name: "About", href: "#about" }
  ];

  const solutionsDropdown = [
    { name: "Strategy & Transformation", href: "#services" },
    { name: "Experience Advisory", href: "#services" },
    { name: "AI & Digital Transformation", href: "#services" },
    { name: "Public Sector & Government", href: "#services" },
    { name: "Tourism & Destination Development", href: "#services" },
    { name: "Entrepreneurship, MSME & Skilling", href: "#services" }
  ];

  const industriesDropdown = [
    { name: "Government & Public Sector", href: "#industries" },
    { name: "Tourism & Hospitality", href: "#industries" },
    { name: "Infrastructure & Real Estate", href: "#industries" },
    { name: "Financial Services", href: "#industries" },
    { name: "Technology & Digital", href: "#industries" },
    { name: "View All Industries →", href: "#industries", highlight: true }
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      // Offset scroll position slightly to account for the top bar and fixed header
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ════════════════════════════════════════
           ANNOUNCEMENT BAR (TOPBAR)
         ════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 w-full h-[40px] z-50 bg-[#1B263B] border-b border-white/5 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between w-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="flex-shrink-0 text-[9px] font-mono font-semibold uppercase tracking-widest text-bridge-red bg-bridge-red/10 border border-bridge-red/20 px-2 py-0.5 rounded">
              Latest
            </span>
            <div className="relative flex-1 height-[40px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeAnnouncement}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 flex items-center text-[11px] md:text-[12px] font-sans text-cream/70 truncate w-full"
                >
                  {announcements[activeAnnouncement]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <a
            href="#insights"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#insights");
            }}
            className="flex-shrink-0 text-[10px] font-mono font-semibold uppercase tracking-wider text-cream/45 hover:text-cream border-b border-cream/20 hover:border-cream ml-4 transition-all duration-300 hidden sm:inline"
          >
            Read More →
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════
           NAVIGATION HEADER
         ════════════════════════════════════════ */}
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/10"
            : "bg-transparent py-5"
        }`}
        style={{ top: "40px" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo Brand Layout */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 cursor-pointer group -ml-3 md:-ml-6"
          >
            {/* SVG Mark */}
            <div className="relative w-[28px] h-[28px] flex items-center justify-center shrink-0">
              <svg className="w-full h-full text-bridge-red" viewBox="0 0 100 92" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="100" height="18" />
                <rect x="0" y="18" width="18" height="74" />
                <rect x="82" y="18" width="18" height="74" />
                <circle cx="50" cy="55" r="31" fill="#1B263B" />
              </svg>
            </div>
            {/* HTML Wordmark */}
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg font-medium text-cream tracking-wider leading-none">
                Red Bridge
              </span>
              <span className="font-mono text-[9px] text-cream/40 uppercase tracking-widest mt-1 leading-none">
                Advisory
              </span>
            </div>
          </a>

          {/* Desktop Navigation with CSS Dropdowns */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.name === "Solutions") {
                return (
                  <div key={link.name} className="relative group/dropdown py-2">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      }}
                      className="text-xs font-mono tracking-widest text-cream/60 hover:text-bridge-red hover:red-text-glow transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-cream/35 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                    </a>

                    {/* Solutions Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-panel bg-background/95 border border-white/5 rounded shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50 py-3 flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest text-cream/35 uppercase px-4 pb-2 mb-2 border-b border-white/5 block">
                        Practice Areas
                      </span>
                      {solutionsDropdown.map((subLink, idx) => (
                        <a
                          key={idx}
                          href={subLink.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollTo(subLink.href);
                          }}
                          className="px-4 py-2 text-xs font-sans text-cream/70 hover:text-bridge-red hover:bg-white/5 transition-all duration-200"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              if (link.name === "Industries") {
                return (
                  <div key={link.name} className="relative group/dropdown py-2">
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      }}
                      className="text-xs font-mono tracking-widest text-cream/60 hover:text-bridge-red hover:red-text-glow transition-all duration-300 uppercase flex items-center gap-1 cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-cream/35 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                    </a>

                    {/* Industries Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-panel bg-background/95 border border-white/5 rounded shadow-2xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 z-50 py-3 flex flex-col">
                      <span className="text-[9px] font-mono tracking-widest text-cream/35 uppercase px-4 pb-2 mb-2 border-b border-white/5 block">
                        Sectors We Serve
                      </span>
                      {industriesDropdown.map((subLink, idx) => (
                        <a
                          key={idx}
                          href={subLink.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollTo(subLink.href);
                          }}
                          className={`px-4 py-2 text-xs font-sans transition-all duration-200 ${
                            subLink.highlight
                              ? "text-bridge-red font-mono tracking-wider pt-3 border-t border-white/5 mt-1 hover:bg-transparent"
                              : "text-cream/70 hover:text-bridge-red hover:bg-white/5"
                          }`}
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className="text-xs font-mono tracking-widest text-cream/60 hover:text-bridge-red hover:red-text-glow transition-all duration-300 uppercase py-2"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-6 py-3 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-bridge-red/20 group cursor-pointer border border-white/5"
            >
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-cream/80 hover:text-cream cursor-pointer p-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[108px] z-30 bg-background/98 backdrop-blur-lg border-t border-white/5 md:hidden flex flex-col justify-between p-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 mt-4">
              {navLinks.map((link, i) => (
                <div key={link.name} className="flex flex-col gap-2">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (!link.hasDropdown) {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      }
                    }}
                    className="text-lg font-serif text-cream hover:text-bridge-red transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-[10px] font-mono text-cream/20">0{i + 1}</span>
                  </a>

                  {/* Render nested items in mobile menu immediately for quick access */}
                  {link.name === "Solutions" && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-white/5 py-1 mt-1">
                      {solutionsDropdown.slice(0, 4).map((subLink, idx) => (
                        <a
                          key={idx}
                          href={subLink.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollTo(subLink.href);
                          }}
                          className="text-xs font-sans text-cream/50 hover:text-bridge-red py-1"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  )}

                  {link.name === "Industries" && (
                    <div className="pl-4 flex flex-col gap-2 border-l border-white/5 py-1 mt-1">
                      {industriesDropdown.slice(0, 4).map((subLink, idx) => (
                        <a
                          key={idx}
                          href={subLink.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScrollTo(subLink.href);
                          }}
                          className="text-xs font-sans text-cream/50 hover:text-bridge-red py-1"
                        >
                          {subLink.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-6 mt-8 mb-4">
              <p className="text-[9px] font-mono text-cream/40 uppercase tracking-widest">
                Direct Desk
              </p>
              <a href="mailto:briefing@redbridgeadvisory.com" className="text-xs font-mono text-cream/80 hover:text-bridge-red">
                briefing@redbridgeadvisory.com
              </a>
              <button
                onClick={() => handleScrollTo("#contact")}
                className="w-full py-3.5 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all text-center flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

