"use client";

import Header from "@/components/Header";
import ThreeBridge from "@/components/ThreeBridge";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhatWeDo from "@/components/WhatWeDo";
import CaseStudies from "@/components/CaseStudies";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-bridge-red/30 selection:text-cream">
      {/* Global Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 md:px-8">
        {/* 3D WebGL / Image Backdrop */}
        <ThreeBridge />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-6 mt-12 lg:mt-0">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-3 py-1 rounded bg-bridge-red/10 border border-bridge-red/20 text-xs font-mono tracking-widest text-bridge-red uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bridge-red animate-pulse" />
              Advisory & Transformation
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] tracking-tight max-w-4xl"
            >
              Bridging Insight <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream/80 to-bridge-red">to Impact.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-cream/60 max-w-xl leading-relaxed font-sans"
            >
              World-class advisory and experience transformation partner. We combine deep strategic design with raw engineering excellence to solve high-stakes enterprise bottlenecks.
            </motion.p>

            {/* Philosophy callout */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-lg md:text-xl italic text-bridge-red font-medium tracking-wide mt-2"
            >
              &quot;Distinct by Design. Made to Matter.&quot;
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollTo("#contact")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-bridge-red text-cream text-xs font-mono tracking-widest uppercase hover:bg-bridge-red/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-bridge-red/25 cursor-pointer border border-white/5"
              >
                Schedule Briefing
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollTo("#services")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-white/5 border border-white/10 text-cream text-xs font-mono tracking-widest uppercase hover:text-bridge-red hover:border-bridge-red/30 transition-all duration-300 cursor-pointer"
              >
                Explore Capabilities
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/35 z-10">
          <span className="text-[9px] font-mono tracking-widest uppercase">Scroll to brief</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-cream/40" />
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-black/20 border-y border-white/5 overflow-hidden w-full select-none relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-4">
          <p className="text-[10px] font-mono text-cream/35 uppercase tracking-widest text-center">
            Partnering across enterprise domains
          </p>
        </div>
        <div className="w-full relative flex items-center overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-mono tracking-widest text-cream/45 uppercase items-center">
            <span>FINANCIAL SERVICES TRANSFORMATION</span>
            <span className="text-bridge-red">•</span>
            <span>CLINICAL PROVIDER SYSTEMS</span>
            <span className="text-bridge-red">•</span>
            <span>OMNICHANNEL RETAIL NETWORKS</span>
            <span className="text-bridge-red">•</span>
            <span>PREDICTIVE EXPERIENCE INTELLIGENCE</span>
            <span className="text-bridge-red">•</span>
            <span>ENTERPRISE DATA FABRICS</span>
            <span className="text-bridge-red">•</span>
            
            {/* Duplicate for infinite loop */}
            <span>FINANCIAL SERVICES TRANSFORMATION</span>
            <span className="text-bridge-red">•</span>
            <span>CLINICAL PROVIDER SYSTEMS</span>
            <span className="text-bridge-red">•</span>
            <span>OMNICHANNEL RETAIL NETWORKS</span>
            <span className="text-bridge-red">•</span>
            <span>PREDICTIVE EXPERIENCE INTELLIGENCE</span>
            <span className="text-bridge-red">•</span>
            <span>ENTERPRISE DATA FABRICS</span>
            <span className="text-bridge-red">•</span>
          </div>
        </div>
      </section>



      {/* Services Section */}
      <Services />

      {/* Industries We Serve Section */}
      <Industries />

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 px-6 md:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/5">
        <WhatWeDo />
      </section>

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
