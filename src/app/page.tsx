"use client";

import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import WhatWeDo from "@/components/WhatWeDo";
import CaseStudies from "@/components/CaseStudies";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import About from "@/components/About";
import Insights from "@/components/Insights";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-bridge-red/30 selection:text-cream">
      {/* Global Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Header */}
      <Header />

      {/* Hero Slider Carousel Section */}
      <HeroSlider />

      {/* Quantitative Stats Bar */}
      <StatsBar />

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

      {/* Insights Section */}
      <Insights />

      {/* About Section */}
      <About />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
