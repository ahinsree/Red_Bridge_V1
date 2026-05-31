"use client";

import { useEffect, useRef, useState } from "react";

export default function VisualPause() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className={`visual-pause ${isVisible ? "is-visible" : ""}`} id="visual-pause">
      <div className="visual-pause__bg">
        <img
          className="visual-pause__bg-img"
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
          alt="Red Bridge Advisory system network cinematic interlude"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
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
