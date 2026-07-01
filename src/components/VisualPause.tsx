"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VisualPause() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [scrollVal, setScrollVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Check if the section is in the viewport
            if (rect.top < viewHeight && rect.bottom > 0) {
              const relativeY = rect.top - viewHeight;
              setScrollVal(relativeY * 0.16); // parallax speed factor
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 35; // Max 35px translation
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 35;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`visual-pause ${isVisible ? "is-visible" : ""}`} 
      id="visual-pause"
    >
      <div className="visual-pause__bg">
        <div 
          className="visual-pause__parallax-wrapper" 
          style={{ 
            transform: `translate3d(${mousePos.x * -0.6}px, ${scrollVal + mousePos.y * -0.6}px, 0) scale(1.1)`,
            transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        >
          <Image
            className="visual-pause__bg-img"
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Red Bridge Advisory system network cinematic interlude"
            aria-hidden="true"
            fill
            sizes="100vw"
          />
        </div>
      </div>
      <div className="visual-pause__overlay"></div>
      <div 
        className="visual-pause__content"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          transition: "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }}
      >
        <span className="visual-pause__rule"></span>
        <p className="visual-pause__statement">
          Execution changes
          <br />
          the meaning of strategy.
        </p>
        <p className="visual-pause__attr">Red Bridge Advisory</p>
      </div>
    </section>
  );
}
