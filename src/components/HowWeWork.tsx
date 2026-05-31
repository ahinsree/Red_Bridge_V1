"use client";

export default function HowWeWork() {
  const principles = [
    {
      num: "01",
      title: "Context Before Recommendation",
      desc: "Every engagement begins with the problem, not a methodology. We invest the time needed to understand what is genuinely at stake — the institutional context, the constraints, and what a failed outcome looks like — before recommending anything.",
      delayClass: "",
    },
    {
      num: "02",
      title: "Senior Judgement Throughout",
      desc: "The advisors engaged at the start remain engaged throughout. There is no handoff to junior teams once the brief is set. The quality of thinking present at the outset is what you receive at every stage of the work.",
      delayClass: "d1",
    },
    {
      num: "03",
      title: "Built Around Implementation Reality",
      desc: "A strategy designed without regard for how organisations actually move is incomplete. Our recommendations account for stakeholder dynamics, institutional constraints, and the conditions that determine whether change takes hold.",
      delayClass: "d2",
    },
    {
      num: "04",
      title: "Measured by What Changes",
      desc: "We hold ourselves to what shifts — in structures, systems, decisions, or on the ground. Our engagement does not end with the report. We stay present until the objective is met.",
      delayClass: "d3",
    },
  ];

  return (
    <section className="section section--offwhite" id="how-we-work">
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
        <p className="approach__context reveal">
          Not as a methodology — as a discipline. Four principles that hold across every engagement, every sector, and every
          stage of the work.
        </p>
        <div className="approach__grid">
          {principles.map((principle, index) => (
            <div key={index} className={`approach-item reveal ${principle.delayClass}`}>
              <span className="approach-item__num">{principle.num}</span>
              <h3 className="approach-item__title">{principle.title}</h3>
              <p className="approach-item__desc">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
