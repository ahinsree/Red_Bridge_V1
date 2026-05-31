"use client";

export default function Insights() {
  return (
    <section className="section section--cream" id="insights">
      <div className="container">
        <div className="insights__header reveal">
          <div>
            <span className="sec-label">Insights</span>
            <h2 className="sec-title">Perspectives from the field</h2>
          </div>
          <a href="#" className="btn btn--ghost">
            All Insights &rarr;
          </a>
        </div>

        <div className="insight-featured reveal d1">
          <div className="insight-featured__img">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
              alt="Institutional leadership insight"
            />
          </div>
          <div className="insight-featured__body">
            <span className="insight-featured__cat">Leadership &middot; Essay</span>
            <h2 className="insight-featured__title">
              The quiet crisis in institutional leadership — why the talent at the top is no longer enough
            </h2>
            <p className="insight-featured__excerpt">
              Leadership quality has never been higher in many of the organisations we advise. And yet delivery has never felt
              more precarious. The gap between capability at the top and execution throughout the system is the defining challenge
              of the moment.
            </p>
            <a href="#" className="insight-featured__read">
              Read the Essay &rarr;
            </a>
          </div>
        </div>

        <div className="insight-links reveal d2">
          <a href="#" className="insight-link">
            <div className="insight-link__left">
              <span className="insight-link__cat">Strategy</span>
              <span className="insight-link__title">The execution gap in public policy — why strategy documents gather dust</span>
            </div>
            <span className="insight-link__cta">Read &rarr;</span>
          </a>
          <a href="#" className="insight-link">
            <div className="insight-link__left">
              <span className="insight-link__cat">AI &amp; Digital</span>
              <span className="insight-link__title">When AI readiness matters more than AI adoption</span>
            </div>
            <span className="insight-link__cta">Read &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
