"use client";

import Image from "next/image";

export default function WhyRBA() {
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
            <a href="#contact" className="btn btn--ghost" style={{ marginTop: "8px" }} onClick={(e) => handleScrollTo(e, "#contact")}>
              Start a Conversation &rarr;
            </a>

            {/* Custom Interactive Graphic representing Built Different. By Design */}
            <div className="why-rba__image-wrapper" style={{ 
              marginTop: "40px", 
              position: "relative", 
              borderRadius: "6px", 
              overflow: "hidden", 
              boxShadow: "0 20px 48px rgba(0,0,0,0.06), 0 0 24px rgba(178,32,48,0.05)", 
              border: "1px solid var(--divider-soft)" 
            }}>
              <Image 
                src="/images/why-rba-concept.png" 
                alt="Built different. By design. Structural connectivity model" 
                width={600} 
                height={600} 
                style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                className="hover-zoom"
              />
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(28,28,28,0.85))",
                pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
                color: "var(--cream)",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "13.5px",
                opacity: 0.9,
                letterSpacing: "0.015em"
              }}>
                Red Bridge Connectivity Architecture
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
