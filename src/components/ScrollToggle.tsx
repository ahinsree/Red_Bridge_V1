"use client";

import { useEffect, useState } from "react";

export default function ScrollToggle() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle button direction based on scroll position (400px threshold)
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToggle = () => {
    if (scrolled) {
      // Smooth scroll back to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Smooth scroll directly to bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScrollToggle}
      className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[#1B263B] text-[#EDEAE2] flex items-center justify-center shadow-lg border border-white/10 hover:bg-[#B22030] hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
      aria-label={scrolled ? "Scroll to Top" : "Scroll to Bottom"}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-500 ${scrolled ? "" : "rotate-180"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  );
}
