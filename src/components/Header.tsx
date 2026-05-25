"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "What We Do", href: "#what-we-do" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Insights", href: "#insights" },
    { name: "About", href: "#about" }
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
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
            <div className="relative w-[24px] h-[36px] flex items-center justify-center">
              <Image
                src={`${process.env.NODE_ENV === "production" ? "/Red_Bridge_" : ""}/images/logo-flat.svg`}
                alt="Red Bridge Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-medium text-cream tracking-wider leading-none">
                Red Bridge
              </span>
              <span className="font-mono text-[9px] text-cream/40 uppercase tracking-widest mt-0.5 leading-none">
                Advisory
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="text-xs font-mono tracking-widest text-cream/60 hover:text-bridge-red hover:red-text-glow transition-all duration-300 uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: CTA button & Mobile trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleScrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-bridge-red/20 group cursor-pointer border border-white/5"
            >
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Icon */}
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
            className="fixed inset-0 top-[68px] z-30 bg-background/98 backdrop-blur-lg border-t border-white/5 md:hidden flex flex-col justify-between p-8"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-lg font-serif text-cream hover:text-bridge-red transition-colors flex items-center justify-between"
                >
                  {link.name}
                  <span className="text-[10px] font-mono text-cream/20">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-8 mb-8">
              <p className="text-[10px] font-mono text-cream/40 uppercase tracking-widest mb-2">
                Get in Touch
              </p>
              <a href="mailto:briefing@redbridgeadvisory.com" className="text-sm font-mono text-cream/80 hover:text-bridge-red">
                briefing@redbridgeadvisory.com
              </a>
              <button
                onClick={() => handleScrollTo("#contact")}
                className="w-full py-3 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all text-center flex items-center justify-center gap-2"
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
