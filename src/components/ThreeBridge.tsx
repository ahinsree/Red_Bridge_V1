"use client";

import { useEffect, useState } from "react";

export default function ThreeBridge() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return; // Disable parallax on mobile/tablet to save battery/CPU
      
      // Calculate normalized coordinates (-0.5 to 0.5)
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

  // Soft zoom-out effect on mount, combined with mouse parallax
  const scaleVal = mounted ? 1.03 : 1.1;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-background">
      {/* 3D Bridge Visual Layer */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-all"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "70% center" : "center",
          backgroundRepeat: "no-repeat",
          transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0) scale(${scaleVal})`,
          transition: mounted
            ? "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 1.5s ease-out"
            : "none",
          opacity: mounted ? 0.65 : 0,
        }}
      />

      {/* Global Vignette Overlays for Cinema Aesthetics */}
      
      {/* Top Overlay: Blends header area */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none z-10" />

      {/* Bottom Overlay: Blends into marquee section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />

      {/* Left-to-Right Overlay (Desktop Only): Fades the image to solid background on the left so hero text is completely legible */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none z-10 hidden lg:block" />

      {/* Dark tint overlay (Mobile Only): Ensures high-contrast legibility for text over the bridge graphic */}
      <div className="absolute inset-0 bg-background/55 pointer-events-none z-10 lg:hidden" />

      {/* Ambient Red and Navy Glowing Orbs */}
      <div 
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-bridge-red/10 blur-[130px] animate-pulse pointer-events-none z-10" 
        style={{ animationDuration: "12s" }} 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-deep-navy/40 blur-[160px] animate-pulse pointer-events-none z-10" 
        style={{ animationDuration: "18s" }} 
      />
    </div>
  );
}
