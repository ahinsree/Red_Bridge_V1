"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [scrollVal, setScrollVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollVal(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map mouse position to range of [-15px, 15px]
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
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

  // Combine scroll parallax and mouse movement parallax
  const bgTransform = `translate3d(${mousePos.x * -0.5}px, ${scrollVal * 0.35 + mousePos.y * -0.5}px, 0) scale(1.06)`;

  return (
    <section className="hero" id="hero" onMouseMove={handleMouseMove}>
      <div className="hero__bg">
        <div 
          className="hero__parallax-wrapper" 
          style={{ 
            transform: bgTransform,
            transition: "transform 0.1s ease-out" 
          }}
        >
          <Image
            className="hero__bg-img"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Red Bridge Advisory corporate operational background"
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      
      {/* Cinematic light beam */}
      <div className="hero__lightbeam" />

      {/* Floating abstract bridge geometry */}
      <div 
        className="hero__floating-geometry"
        style={{
          position: "absolute",
          top: "28%",
          right: "12%",
          width: "220px",
          height: "220px",
          opacity: 0.12,
          pointerEvents: "none",
          transform: `translate3d(${mousePos.x * 0.6}px, ${scrollVal * -0.08 + mousePos.y * 0.6}px, 0)`,
          transition: "transform 0.1s ease-out"
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
      </div>

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
