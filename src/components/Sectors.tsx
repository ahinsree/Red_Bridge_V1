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
      name: "Infrastructure & Economic Development",
      tagline: "Planning and financing the assets that drive growth.",
      desc: "Infrastructure choices shape an economy for decades. We advise developers, investors and governments on the planning, structuring and financing of infrastructure, and on the wider strategies that help regions, industries and clusters grow alongside it.",
      subs: [
        "Infrastructure planning and advisory",
        "Investment, PPP and project development",
        "Regional and economic development",
        "Industrial and cluster strategy",
      ],
    },
    {
      num: "02",
      name: "Tourism, Hospitality & Destinations",
      tagline: "Turning a place's character into a tourism economy.",
      desc: "Tourism is one of the most direct ways a place turns its character into jobs and income. We work with tourism boards, hospitality operators and investors. We help destinations decide what they want to be known for, build the products and institutions to support that, and attract the investment that sustains it.",
      subs: [
        "Destination strategy and development",
        "Tourism product and experience design",
        "Hospitality and tourism investment advisory",
        "Tourism institutions and skilling",
      ],
    },
    {
      num: "03",
      name: "Government & Public Systems",
      tagline: "Policy and delivery for the public sector.",
      desc: "We work alongside governments, departments and public authorities on the parts that are genuinely hard: policy that survives implementation, institutions with the capacity to deliver, and programmes that reach the people they were written for.",
      subs: [
        "Policy and programme design",
        "Institutional and administrative reform",
        "Public service delivery and citizen experience",
        "Mission and scheme implementation support",
      ],
    },
    {
      num: "04",
      name: "MSME, Startups & Livelihoods",
      tagline: "Enterprise and livelihoods across the spectrum.",
      desc: "This covers the full range of how India creates work: established small and medium enterprises, high-growth startups, and the community livelihood programmes that bring people into the formal economy for the first time. We work with the enterprises themselves and with the institutions that back them.",
      subs: [
        "MSME and enterprise development",
        "Startup and incubation support",
        "Livelihood and inclusion programmes",
        "Social enterprise and inclusive finance",
        "Market access and enterprise finance",
      ],
    },
    {
      num: "05",
      name: "Sustainability, Climate & Green Growth",
      tagline: "Environmental intent, made measurable.",
      desc: "The shift to a low-carbon economy has moved from pledges to delivery. We advise companies setting net-zero and ESG commitments and governments designing green growth, and we produce the studies and frameworks that turn environmental intent into something measurable and credible.",
      subs: [
        "Climate, carbon and net-zero strategy",
        "ESG and sustainability frameworks",
        "Green growth and just transition",
        "Environmental and impact studies",
      ],
    },
    {
      num: "06",
      name: "Education, Skills & Workforce Development",
      tagline: "Skilling that connects to real demand.",
      desc: "A skill is only worth something if it leads somewhere. We help governments, employers and training institutions design skilling, education and workforce programmes that connect to real demand in the economy, along with the human capital systems that keep them running and improving.",
      subs: [
        "Skilling strategy and missions",
        "Workforce and human capital development",
        "Education and training system design",
        "Sector skill councils and employer partnerships",
      ],
    },
    {
      num: "07",
      name: "Maritime, Blue Economy & Coastal Development",
      tagline: "Strategy for the coast and the blue economy.",
      desc: "India's coastline is becoming an economic priority in its own right. We advise governments, port operators and investors on coastal and blue economy strategy, port-led development, fisheries, and the livelihoods of the communities who depend on the sea.",
      subs: [
        "Blue economy and coastal strategy",
        "Port-led and maritime development",
        "Fisheries and coastal livelihoods",
        "Coastal infrastructure and investment",
      ],
    },
  ];

  return (
    <section className="section section--cream" id="sectors">
      <div className="container">
        <div className="sectors__header reveal">
          <div style={{ maxWidth: "480px" }}>
            <span className="sec-label">Sectors &amp; Domains</span>
            <h2 className="sec-title">
              Our Sectors.
              <br />
              Deep domain expertise.
            </h2>
            <div className="divider"></div>
            <p className="sec-sub">
              These are the key sectors we know well, most of them with a public and a private side, where our experience runs deep enough to be useful from the first conversation.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn--ghost sectors__header-btn"
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            Start a conversation &rarr;
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
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <span className="sector-item__num">{sector.num}</span>
                <h3 className="sector-item__name">{sector.name}</h3>
                <p className="sector-item__tagline">{sector.tagline}</p>
                <p className="sector-item__desc" style={{ minHeight: "80px" }}>{sector.desc}</p>
                <ul className="sector-item__sublist" style={{ marginTop: "16px" }}>
                  {sector.subs.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>
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
