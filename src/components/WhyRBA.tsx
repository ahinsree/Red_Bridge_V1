"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function WhyRBA() {
  const [scrollVal, setScrollVal] = useState(0);
  const [offset, setOffset] = useState(800); // default fallback offset
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Find offset relative to document top
      const rect = containerRef.current.getBoundingClientRect();
      setOffset(rect.top + window.scrollY);
    }
    const handleScroll = () => {
      setScrollVal(window.scrollY);
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

  // Parallax translation: moves slower than text scroll rate
  const translationY = (scrollVal - (offset - 350)) * -0.06;
  const boundedTranslationY = Math.max(-30, Math.min(30, translationY));

  return (
    <section className="section section--cream" id="why-rba">
      <div className="container">
        <div className="why-rba__layout">
          <div className="why-rba__left reveal">
            <span className="sec-label">Why Red Bridge</span>
            <h2 className="sec-title">
              Built different.
              <br />
              By design.
            </h2>
            <div className="divider"></div>
            <p>
              We are not a full-service consultancy competing on headcount. We are a boutique advisory firm built on a specific
              conviction: that strategy which does not reach implementation has not been completed.
            </p>
            <a href="#contact" className="btn btn--ghost" onClick={(e) => handleScrollTo(e, "#contact")}>
              Start a Conversation &rarr;
            </a>

            {/* Premium branded strategy desk illustration */}
            <div className="why-rba__image-container" ref={containerRef}>
              <Image 
                className="why-rba__image"
                src="/images/built-different-desktop.webp"
                alt="Strategic advisory bridging strategy to implementation"
                width={500}
                height={500}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  display: "block",
                  transform: `translate3d(0, ${boundedTranslationY}px, 0) scale(1.08)`,
                  transition: "transform 0.1s ease-out"
                }}
              />
              <div 
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(28,28,28,0.7) 0%, transparent 100%)",
                  padding: "16px 20px", pointerEvents: "none"
                }}
              >
                <span style={{ color: "#FAFAF8", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Corporate Strategy to Impact
                </span>
              </div>
            </div>
          </div>

          <div className="why-items">
            <div className="why-item reveal">
              <span className="why-item__n">01</span>
              <div>
                <h3 className="why-item__title">Strategy that doesn&apos;t stop at the boardroom door</h3>
                <p className="why-item__desc">
                  Most advisory ends at the recommendation. We are built for what comes next — engagements designed from the outset
                  for implementation, not just insight.
                </p>
              </div>
            </div>
            <div className="why-item reveal d1">
              <span className="why-item__n">02</span>
              <div>
                <h3 className="why-item__title">Cross-sector intelligence, applied with context</h3>
                <p className="why-item__desc">
                  We carry depth across sectors without being captured by any one of them. The intersection is where the most useful
                  institutional thinking tends to live.
                </p>
              </div>
            </div>
            <div className="why-item reveal d2">
              <span className="why-item__n">03</span>
              <div>
                <h3 className="why-item__title">Institutional understanding, practically applied</h3>
                <p className="why-item__desc">
                  We understand how governments, institutions, and enterprises actually operate — and what it genuinely takes to move
                  them. This is not theoretical. It is earned.
                </p>
              </div>
            </div>
            <div className="why-item reveal d3">
              <span className="why-item__n">04</span>
              <div>
                <h3 className="why-item__title">Senior counsel, not analyst output</h3>
                <p className="why-item__desc">
                  Every engagement draws on advisors who have led, not just observed. The quality of thinking present at the outset
                  is what you receive throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
