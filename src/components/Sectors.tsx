"use client";

export default function Sectors() {
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

  const sectorsList = [
    {
      num: "01",
      name: "Government & Public Systems",
      desc: "Policy, strategy, institutional reform, and programme delivery for government bodies and public authorities.",
    },
    {
      num: "02",
      name: "Tourism & Destinations",
      desc: "Destination development, tourism ecosystem design, and experience strategy for governments and institutions.",
    },
    {
      num: "03",
      name: "MSME & Entrepreneurship",
      desc: "Enterprise support architecture, ecosystem design, and skilling strategy for development-oriented bodies.",
    },
    {
      num: "04",
      name: "Infrastructure",
      desc: "Advisory across infrastructure investment, cluster development, and strategic planning for large-scale programmes.",
    },
    {
      num: "05",
      name: "Maritime & Blue Economy",
      desc: "Strategy and institutional advisory for coastal development, port ecosystems, and blue economy programmes.",
    },
    {
      num: "06",
      name: "Education & Skilling",
      desc: "Skilling strategy, workforce development, and education system design for institutions and government bodies.",
    },
  ];

  return (
    <section className="section section--cream" id="sectors">
      <div className="container">
        <div className="sectors__header reveal">
          <div style={{ maxWidth: "480px" }}>
            <span className="sec-label">Sectors &amp; Domains</span>
            <h2 className="sec-title">
              Where we apply
              <br />
              our advisory.
            </h2>
            <div className="divider"></div>
            <p className="sec-sub">
              The sectors listed here are representative. Red Bridge works across specialised domains where the mandate
              requires it — our capability is defined by the nature of the challenge, not by the sectors we have catalogued.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn--ghost"
            style={{ flexShrink: 0, alignSelf: "flex-end" }}
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            Explore sector experience &rarr;
          </a>
        </div>

        <div className="sectors__grid reveal d1">
          {sectorsList.map((sector, index) => (
            <a
              key={index}
              href="#contact"
              className="sector-item"
              aria-label={`${sector.name} — explore this sector`}
              onClick={(e) => handleScrollTo(e, "#contact")}
            >
              <span className="sector-item__num">{sector.num}</span>
              <h3 className="sector-item__name">{sector.name}</h3>
              <p className="sector-item__desc">{sector.desc}</p>
            </a>
          ))}
        </div>

        {/* Subtle scalable CTA */}
        <div className="section-footer-cta reveal d2">
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
            Discuss sector-specific mandates &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
