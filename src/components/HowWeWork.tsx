"use client";

import { useEffect, useState, useRef } from "react";

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const total = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const principles = [
    {
      num: "01",
      title: "Context Before Recommendation",
      desc: "Every engagement begins with the problem, not a methodology. We invest the time needed to understand what is genuinely at stake — the institutional context, the constraints, and what a failed outcome looks like.",
    },
    {
      num: "02",
      title: "Senior Judgement Throughout",
      desc: "The advisors engaged at the start remain engaged throughout. There is no handoff to junior teams once the brief is set. The quality of thinking present at the outset is what you receive at every stage.",
    },
    {
      num: "03",
      title: "Built Around Implementation Reality",
      desc: "A strategy designed without regard for how organisations actually move is incomplete. Our recommendations account for stakeholder dynamics, institutional constraints, and implementation conditions.",
    },
    {
      num: "04",
      title: "Measured by What Changes",
      desc: "We hold ourselves to what shifts — in structures, systems, decisions, or on the ground. Our engagement does not end with the report. We stay present until the objective is met.",
    },
  ];

  return (
    <section className="section section--offwhite approach-section" id="how-we-work" ref={sectionRef}>
      <div className="container">
        <div className="approach__header reveal">
          <span className="sec-label">Our Approach</span>
          <h2 className="sec-title">How we work</h2>
          <div className="divider"></div>
          <p className="sec-sub" style={{ marginTop: "4px" }}>
            The way an engagement is conducted matters as much as what it produces. These principles shape how we work —
            consistently, regardless of the mandate.
          </p>
        </div>

        {/* Scroll-driven growing timeline connector */}
        <div className="approach__timeline-container">
          <div 
            className="approach__timeline-line-grow" 
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
          <div className="approach__timeline-line-bg" />
        </div>

        <div className="approach__grid">
          {principles.map((principle, index) => (
            <div key={index} className="approach-item reveal">
              <div className="approach-item__node">
                <span className="approach-item__num">{principle.num}</span>
                <div className="approach-item__dot" style={{ opacity: scrollProgress > (index + 0.5) / 4 ? 1 : 0.3 }} />
              </div>
              <h3 className="approach-item__title">{principle.title}</h3>
              <p className="approach-item__desc">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
