"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VisualPause() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

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
          if (sectionRef.current && parallaxRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Check if the section is in the viewport
            if (rect.top < viewHeight && rect.bottom > 0) {
              const relativeY = rect.top - viewHeight;
              const yTranslation = relativeY * 0.15; // parallax speed factor
              parallaxRef.current.style.transform = `translate3d(0, ${yTranslation}px, 0)`;
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

  return (
    <section ref={sectionRef} className={`visual-pause ${isVisible ? "is-visible" : ""}`} id="visual-pause">
      <div className="visual-pause__bg">
        <div className="visual-pause__parallax-wrapper" ref={parallaxRef}>
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
      <div className="visual-pause__content">
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
