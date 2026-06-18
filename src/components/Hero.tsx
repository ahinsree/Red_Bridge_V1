"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (parallaxRef.current) {
            const scrolled = window.scrollY;
            if (scrolled <= window.innerHeight) {
              parallaxRef.current.style.transform = `translate3d(0, ${scrolled * 0.32}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__parallax-wrapper" ref={parallaxRef}>
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
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <span className="hero__eyebrow">Red Bridge Advisory</span>
        <h1 className="hero__primary">Different by Purpose.</h1>
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
