"use client";

export default function Engagements() {
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

  const engagementsList = [
    {
      type: "Tourism • Government • Strategy",
      title: "Coastal destination strategy for a state government",
      desc: "A multi-phase engagement across destination master planning, multi-stakeholder co-design, and policy framework development. The real work was navigating the distance between institutional aspiration and what could actually be implemented — across competing interests, constrained timelines, and a system unused to structured advisory. The strategy was formally adopted at state level and is in active pilot across multiple districts.",
      delayClass: "",
    },
    {
      type: "MSME • Institutional",
      title: "Enterprise development programme design for a multi-state ecosystem",
      desc: "The mandate was not to design a programme on paper — it was to design one that could be delivered by the institutions meant to run it. Advisory spanning policy architecture, delivery structure, and institutional alignment across state bodies and industry partners in three states. The distinction between a written programme and a delivered one shaped every recommendation.",
      delayClass: "d1",
    },
    {
      type: "AI & Digital • Financial Services",
      title: "AI transformation advisory for a national financial institution",
      desc: "Institutional appetite for AI is rarely the problem. Readiness is. This engagement began with an honest assessment of data infrastructure, governance gaps, and organisational capability — before a single implementation decision was made. What followed was a phased programme the institution could own, sequence, and execute without external dependency.",
      delayClass: "d2",
    },
  ];

  return (
    <section className="section section--charcoal" id="engagements">
      <div className="container">
        <div className="engagements__header reveal">
          <div>
            <span className="sec-label sec-label--muted">Selected Engagements</span>
            <h2 className="sec-title sec-title--light">Advisory in practice</h2>
          </div>
          <a href="#contact" className="btn btn--ghost-light" onClick={(e) => handleScrollTo(e, "#contact")}>
            Discuss your engagement &rarr;
          </a>
        </div>

        <div className="engagements__grid">
          {engagementsList.map((eng, index) => (
            <div key={index} className={`eng-card reveal ${eng.delayClass}`}>
              <span className="eng-card__type">{eng.type}</span>
              <h3 className="eng-card__title">{eng.title}</h3>
              <p className="eng-card__desc">{eng.desc}</p>
              <a href="#contact" className="eng-card__link" onClick={(e) => handleScrollTo(e, "#contact")}>
                Read engagement &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
