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

  return (
    <section className="work-with" id="work-with">
      <div className="container">
        <div className="work-with__header reveal">
          <span className="sec-label sec-label--muted">Work With Red Bridge</span>
          <h2>
            The quality of the people determines
            <br />
            the quality of the work.
          </h2>
        </div>

        <div className="work-with__layout">
          <div className="work-with__col reveal">
            <span className="work-with__icon"></span>
            <span className="work-with__col-label">For Practitioners &amp; Specialists</span>
            <h3 className="work-with__col-title">
              Advisors, domain experts,
              <br />
              and independent practitioners.
            </h3>
            <p className="work-with__col-body">
              We work with a selective network of advisors, researchers, specialists, and independent operators who bring deep
              knowledge to specific mandates. We are not organised as a large firm. We are organised around capability — and we are
              always open to a conversation with people who understand how complex institutional work actually gets done.
            </p>
            <a href="#contact" className="work-with__col-cta" onClick={(e) => handleScrollTo(e, "#contact")}>
              Introduce yourself &rarr;
            </a>
          </div>

          <div className="work-with__col reveal d1">
            <span className="work-with__icon"></span>
            <span className="work-with__col-label">For Institutions &amp; Collaborators</span>
            <h3 className="work-with__col-title">
              Aligned institutions, firms,
              <br />
              and implementation partners.
            </h3>
            <p className="work-with__col-body">
              There are mandates where the right outcome depends on the right partnership. We work selectively with institutions,
              research bodies, and advisory firms where complementary capability creates a materially better result for the client.
              If your work is aligned with ours in quality and intent, we would value the conversation.
            </p>
            <a href="#contact" className="work-with__col-cta" onClick={(e) => handleScrollTo(e, "#contact")}>
              Start a conversation &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
