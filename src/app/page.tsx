"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PracticeMarquee from "@/components/PracticeMarquee";
import WhyRBA from "@/components/WhyRBA";
import Advisory from "@/components/Advisory";
import Sectors from "@/components/Sectors";
import VisualPause from "@/components/VisualPause";
import Engagements from "@/components/Engagements";
import HowWeWork from "@/components/HowWeWork";
import Insights from "@/components/Insights";
import WorkWithRBA from "@/components/WorkWithRBA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";

export default function Home() {
  useEffect(() => {
    // Scroll reveal activation
    document.documentElement.classList.add("js-ready");

    // Immediately reveal elements already in the viewport
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 16) {
        el.classList.add("in");
      }
    });

    // Observe elements for reveal on scroll
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

    // Safety net reveal all hidden elements after 2.5s
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    }, 2500);

    return () => {
      clearTimeout(timer);
      revealObs.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#2E2E2E]">
      {/* Navigation */}
      <Header />

      {/* Hero Banner */}
      <Hero />

      {/* Scrolling Practice Areas Marquee Bar */}
      <PracticeMarquee />

      {/* Why Red Bridge */}
      <WhyRBA />

      {/* Advisory Practice Areas */}
      <Advisory />

      {/* Sectors We Serve */}
      <Sectors />

      {/* Parallax Visual Pause */}
      <VisualPause />

      {/* Selected Engagements */}
      <Engagements />

      {/* Our Approach (Principles) */}
      <HowWeWork />

      {/* Insights Publications */}
      <Insights />

      {/* Partner / Collaboration Columns */}
      <WorkWithRBA />

      {/* Enquiry Contact Desk */}
      <ContactForm />

      {/* Footer Navigation */}
      <Footer />

      {/* Floating Strategic Chatbot */}
      <Chatbot />

      {/* Floating Dynamic Scroll Toggle */}
      <ScrollToggle />
    </div>
  );
}
