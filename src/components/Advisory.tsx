"use client";

export default function Advisory() {
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

  const practices = [
    {
      num: "01",
      title: "Strategy & Transformation",
      desc: "Directional clarity and execution discipline for organisations navigating consequential change — from strategic vision through operating model design and transformation delivery.",
      caps: [
        "Strategic vision & direction setting",
        "Operating model & structure design",
        "Transformation programme management",
      ],
      delayClass: "",
    },
    {
      num: "02",
      title: "AI & Digital",
      desc: "For organisations treating AI as a strategic imperative. Building genuine readiness — capability assessment, data strategy, governance design, and phased implementation advisory.",
      caps: [
        "AI readiness assessment & roadmap",
        "Data strategy & governance framework",
        "Digital transformation programme",
      ],
      delayClass: "d1",
    },
    {
      num: "03",
      title: "Experience Advisory",
      desc: "Human-centred design for customer and employee experience — where operational decisions become felt outcomes, integrated with business strategy rather than added afterwards.",
      caps: [
        "Customer experience strategy & design",
        "Service design & journey mapping",
        "Employee experience framework",
      ],
      delayClass: "d2",
    },
    {
      num: "04",
      title: "Institutional Transformation",
      desc: "Advisory for institutions navigating structural change — government bodies, public authorities, and complex organisations that must evolve while continuing to function.",
      caps: [
        "Institutional reform & restructuring",
        "Capacity building & development",
        "Stakeholder engagement & change management",
      ],
      delayClass: "",
    },
    {
      num: "05",
      title: "Investment & Economic Advisory",
      desc: "Strategic advisory supporting investment decisions, economic development programmes, and sector growth initiatives — from feasibility through to policy design and delivery.",
      caps: [
        "Investment strategy & feasibility",
        "Economic development advisory",
        "Sector policy & programme design",
      ],
      delayClass: "d1",
    },
  ];

  return (
    <section className="section section--offwhite" id="advisory">
      <div className="container">
        <div className="advisory-header reveal">
          <div className="advisory-header__left">
            <span className="sec-label">Advisory Areas</span>
            <h2 className="sec-title">
              Selected practice areas.
              <br />
              Built for institutional complexity.
            </h2>
            <div className="divider"></div>
            <p className="sec-sub">
              These are the areas where Red Bridge operates most actively. Our advisory capability extends across a wider range
              of institutional challenges — each engagement shaped around the mandate.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn--ghost"
            style={{ flexShrink: 0, alignSelf: "flex-end" }}
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            Explore all practice areas &rarr;
          </a>
        </div>

        <div className="advisory-grid">
          {practices.map((practice, index) => (
            <div key={index} className={`advisory-card reveal ${practice.delayClass}`}>
              <span className="advisory-card__num">{practice.num}</span>
              <h3 className="advisory-card__title">{practice.title}</h3>
              <p className="advisory-card__desc">{practice.desc}</p>
              <ul className="advisory-card__caps">
                {practice.caps.map((cap, i) => (
                  <li key={i}>{cap}</li>
                ))}
              </ul>
              <a href="#contact" className="advisory-card__cta" onClick={(e) => handleScrollTo(e, "#contact")}>
                Discuss this practice &rarr;
              </a>
            </div>
          ))}

          {/* Capability cell — selected practices, not the full picture */}
          <div className="advisory-card advisory-card--expand reveal d2">
            <p>
              These are selected areas. Red Bridge also works across niche mandates where the challenge calls for specialist
              capability, institutional depth, and an approach shaped around the work itself.
            </p>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
              Discuss a specific mandate &rarr;
            </a>
          </div>
        </div>

        {/* Subtle scalable CTA */}
        <div className="section-footer-cta reveal">
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
            Explore all advisory areas &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
