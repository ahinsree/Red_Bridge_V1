"use client";

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
