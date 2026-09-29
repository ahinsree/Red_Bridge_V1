"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useParallaxEnabled } from "@/hooks/useParallaxEnabled";

export default function Hero() {
  const parallax = useParallaxEnabled();
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Combine scroll parallax and mouse movement parallax
  const bgX = useTransform(smoothX, (m) => m * -0.5);
  const bgY = useTransform([scrollY, smoothY], ([s, m]: number[]) => s * 0.35 + m * -0.5);
  const patternX = useTransform(smoothX, (m) => m * 0.4);
  const patternY = useTransform([scrollY, smoothY], ([s, m]: number[]) => s * -0.22 + m * 0.4);
  const geometryX = useTransform(smoothX, (m) => m * 0.6);
  const geometryY = useTransform([scrollY, smoothY], ([s, m]: number[]) => s * -0.08 + m * 0.6);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map mouse position to range of [-15px, 15px]
    mouseX.set((clientX / innerWidth - 0.5) * 30);
    mouseY.set((clientY / innerHeight - 0.5) * 30);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero" id="hero" onMouseMove={parallax ? handleMouseMove : undefined}>
      <div className="hero__bg">
        <motion.div
          className="hero__parallax-wrapper"
          style={parallax ? { x: bgX, y: bgY, scale: 1.06 } : { scale: 1.06 }}
        >
          <Image
            className="hero__bg-img"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Floating layered pattern overlay */}
        <motion.div
          className="hero__pattern"
          style={parallax ? { x: patternX, y: patternY } : undefined}
        />
      </div>
      
      {/* Cinematic light beam */}
      <div className="hero__lightbeam" />

      {/* Floating abstract bridge geometry */}
      <motion.div
        className="hero__floating-geometry"
        style={{
          position: "absolute",
          top: "28%",
          right: "12%",
          width: "220px",
          height: "220px",
          opacity: 0.12,
          pointerEvents: "none",
          ...(parallax ? { x: geometryX, y: geometryY } : {}),
        }}
      >
        <div className="hero__floating-geometry-inner">
          <svg viewBox="0 0 100 100" fill="none" stroke="var(--red)" strokeWidth="0.5" className="animate-pulse">
            <line x1="5" y1="90" x2="95" y2="90" />
            <line x1="20" y1="90" x2="35" y2="35" />
            <line x1="80" y1="90" x2="65" y2="35" />
            <line x1="35" y1="35" x2="65" y2="35" />
            <path d="M10,90 Q50,15 90,90" />
            <circle cx="50" cy="35" r="8" />
          </svg>
        </div>
      </motion.div>

      <div className="hero__overlay"></div>
      
      <div className="hero__content">
        <span className="hero__eyebrow">Red Bridge Advisory</span>
        <h1 className="hero__primary">
          <span className="hero__reveal-word d1">Different</span>{" "}
          <span className="hero__reveal-word d2">by</span>{" "}
          <span className="hero__reveal-word d3">Purpose.</span>
        </h1>
        <p className="hero__secondary">Proven to deliver.</p>
        <p className="hero__sub">
          Built for the work that follows the decision — advisory for governments, institutions, and enterprises navigating
          consequential change.
        </p>
        <div className="hero__actions">
          <a href="#advisory" className="btn btn--primary" onClick={(e) => handleScrollTo(e, "#advisory")}>
            Our Advisory
          </a>
          <a href="#contact" className="btn btn--ghost-light" onClick={(e) => handleScrollTo(e, "#contact")}>
            Enquire &rarr;
          </a>
        </div>
      </div>
      
      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
}
