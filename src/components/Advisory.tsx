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
      title: "Strategy, Transformation & Institution Building",
      tagline: "Deciding what to change, and making it hold.",
      desc: "Most organisations have a rough sense of where they want to go. The harder questions are what to change, in what order, and who will own the result once the advisers have left. We work with company boards, management teams and public institutions on exactly that.",
      caps: [
        "Corporate, growth and sector strategy",
        "Operating model and organisation design",
        "Institutional reform and restructuring",
        "Governance, systems and capacity building",
        "Transformation programme design and oversight",
      ],
      delayClass: "",
    },
    {
      num: "02",
      title: "AI, Digital & Data",
      tagline: "Technology adopted with judgement, not haste.",
      desc: "There is a great deal of pressure to adopt AI and very little patience for the groundwork that makes it pay off. We help organisations tell the two apart, whether it is a company putting data to work across its operations or a department modernising a public service.",
      caps: [
        "AI readiness and adoption strategy",
        "Data strategy, architecture and governance",
        "Digital and technology roadmaps",
        "Analytics and decision support",
        "Technology governance and assurance",
      ],
      delayClass: "d1",
    },
    {
      num: "03",
      title: "Experience & Service Design",
      tagline: "Designing what people actually receive.",
      desc: "A service rarely fails because someone meant it to. It fails in the gap between what an organisation designs and what a person actually gets at the counter, on the call, or in the app. We work in that gap, for companies shaping what their customers and employees receive.",
      caps: [
        "Customer and citizen experience strategy",
        "Service design and journey mapping",
        "Public service and delivery design",
        "Customer and Brand Experience",
        "Employee experience and culture",
        "Experience measurement and improvement",
      ],
      delayClass: "d2",
    },
    {
      num: "04",
      title: "Investment, Economic & Infrastructure Advisory",
      tagline: "The analysis behind sound investment decisions.",
      desc: "Before capital moves, someone has to answer hard questions about whether a project actually stands up. That is our work. We prepare the feasibility studies, business cases and project structures behind investment decisions for companies, promoters and investors.",
      caps: [
        "Feasibility studies and business cases",
        "Detailed project reports and project structuring",
        "Public-private partnership advisory",
        "Economic development and investment promotion",
        "Sector, cluster and regional development strategy",
      ],
      delayClass: "",
    },
    {
      num: "05",
      title: "Entrepreneurship, Innovation & Startup Ecosystems",
      tagline: "Building the conditions for enterprise to grow.",
      desc: "Enterprise does not grow on its own. It needs incubation, mentoring, routes to funding, and a policy environment that does not quietly work against it. We design and strengthen that support system for governments, universities, corporates and development agencies.",
      caps: [
        "Incubation and startup support design",
        "Entrepreneurship and innovation programmes",
        "Startup mission and policy advisory",
        "MSME and enterprise development",
        "Social enterprise and inclusive finance",
        "Ecosystem and institutional partnerships",
      ],
      delayClass: "d1",
    },
    {
      num: "06",
      title: "Programme Management, Monitoring & Evaluation",
      tagline: "Delivery that is managed and verified.",
      desc: "A sound strategy that is poorly delivered is just an expensive document. We handle the delivery, and we check the results. This covers programme and project management for large initiatives, and independent monitoring and evaluation that tells the sponsor.",
      caps: [
        "Programme and project management units (PMU)",
        "Monitoring and evaluation frameworks",
        "Baseline, outcome and impact studies",
        "Third-party and concurrent monitoring",
        "Implementation support and review",
      ],
      delayClass: "d2",
    },
  ];

  return (
    <section className="section section--offwhite" id="advisory">
      <div className="container">
        <div className="advisory-header reveal">
          <div className="advisory-header__left">
            <span className="sec-label">Advisory Areas</span>
            <h2 className="sec-title">
              Our Capabilities.
              <br />
              Built for institutional complexity.
            </h2>
            <div className="divider"></div>
            <p className="sec-sub">
              These are the kind of problems we are brought in to solve, whether the client is a company, a government or a founder.
            </p>
          </div>
          <a
            href="#contact"
            className="btn btn--ghost"
            style={{ flexShrink: 0, alignSelf: "flex-end" }}
            onClick={(e) => handleScrollTo(e, "#contact")}
          >
            Start a conversation &rarr;
          </a>
        </div>

        <div className="advisory-grid">
          {practices.map((practice, index) => (
            <div key={index} className={`advisory-card reveal ${practice.delayClass}`} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="advisory-card__num">{practice.num}</span>
                <h3 className="advisory-card__title">{practice.title}</h3>
                <p className="advisory-card__tagline">{practice.tagline}</p>
                <p className="advisory-card__desc" style={{ minHeight: "100px" }}>{practice.desc}</p>
                <ul className="advisory-card__caps" style={{ marginTop: "20px" }}>
                  {practice.caps.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="advisory-card__cta" style={{ marginTop: "auto" }} onClick={(e) => handleScrollTo(e, "#contact")}>
                Discuss this practice &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Subtle scalable CTA */}
        <div className="section-footer-cta reveal">
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
            Discuss a specific mandate &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
