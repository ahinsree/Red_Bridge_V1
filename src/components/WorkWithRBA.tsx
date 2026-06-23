"use client";

export default function WorkWithRBA() {
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

  const segments = [
    {
      label: "Governments & Public Institutions",
      body: "Central and state departments, missions, authorities and public sector undertakings, where the work is policy, reform and delivery at scale.",
      delayClass: "",
    },
    {
      label: "Enterprises & Corporates",
      body: "Boards and leadership teams in established companies, on strategy, transformation, technology, and the experience their customers and employees receive.",
      delayClass: "d1",
    },
    {
      label: "Startups, Founders & Innovators",
      body: "Early and growth-stage ventures, and the incubators and universities, on building, funding and scaling what they have started.",
      delayClass: "d2",
    },
    {
      label: "Investors, Agencies & Foundations",
      body: "Investors, development agencies, foundations and CSR funds, on where to commit capital and how to know it is working.",
      delayClass: "d3",
    },
  ];

  return (
    <section className="work-with" id="work-with">
      <div className="container">
        <div className="work-with__header reveal" style={{ maxWidth: "800px", margin: "0 auto 52px", textAlign: "center" }}>
          <span className="sec-label sec-label--muted">Who We Work With</span>
          <h2 style={{ fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: "1.35", color: "var(--cream)", marginTop: "12px", fontStyle: "normal" }}>
            We are built to work on both sides of the table: with the public institutions that set the rules, and with the enterprises and founders who operate within them.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.8", color: "rgba(237, 234, 226, 0.48)", marginTop: "18px", maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }}>
            It is also what lets us bring private-sector discipline to public assignments, and public-sector context to private decisions.
          </p>
        </div>

        <div className="work-with__layout">
          {segments.map((seg, index) => (
            <div key={index} className={`work-with__col reveal ${seg.delayClass}`}>
              <span className="work-with__icon"></span>
              <span className="work-with__col-label">Client Type</span>
              <h3 className="work-with__col-title" style={{ fontSize: "18px", fontStyle: "normal", marginBottom: "14px", minHeight: "50px" }}>
                {seg.label}
              </h3>
              <p className="work-with__col-body" style={{ minHeight: "100px", marginBottom: "24px" }}>
                {seg.body}
              </p>
              <a href="#contact" className="work-with__col-cta" onClick={(e) => handleScrollTo(e, "#contact")}>
                Start a conversation &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
