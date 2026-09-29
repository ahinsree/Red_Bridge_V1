"use client";

import { useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // 0 when the section top enters the viewport bottom, 1 when its bottom leaves the top
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Number of principle dots lit so far; only re-renders when this count changes
  const [activeDots, setActiveDots] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const count = [0, 1, 2, 3].filter((i) => progress > (i + 0.5) / 4).length;
    setActiveDots((prev) => (prev === count ? prev : count));
  });

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
          <motion.div
            className="approach__timeline-line-grow"
            style={{ scaleX: scrollYProgress }}
          />
          <div className="approach__timeline-line-bg" />
        </div>

        <div className="approach__grid">
          {principles.map((principle, index) => (
            <div key={index} className="approach-item reveal">
              <div className="approach-item__node">
                <span className="approach-item__num">{principle.num}</span>
                <div className="approach-item__dot" style={{ opacity: index < activeDots ? 1 : 0.3 }} />
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
