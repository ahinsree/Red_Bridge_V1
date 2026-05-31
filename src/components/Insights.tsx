"use client";

import insightsData from "@/data/insights.json";

export default function Insights() {
  // Find the featured post, fallback to the first post if none are explicitly flagged
  const featuredPost = insightsData.find((post) => post.featured) || insightsData[0];
  
  // All other posts are listed as standard rows
  const regularPosts = insightsData.filter((post) => post.slug !== featuredPost?.slug);

  return (
    <section className="section section--cream" id="insights">
      <div className="container">
        <div className="insights__header reveal">
          <div>
            <span className="sec-label">Insights</span>
            <h2 className="sec-title">Perspectives from the field</h2>
          </div>
          <a href="#contact" className="btn btn--ghost">
            All Insights &rarr;
          </a>
        </div>

        {featuredPost && (
          <div className="insight-featured reveal d1">
            <div className="insight-featured__img">
              <img
                src={featuredPost.image || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"}
                alt={featuredPost.title}
              />
            </div>
            <div className="insight-featured__body">
              <span className="insight-featured__cat">{featuredPost.category}</span>
              <h2 className="insight-featured__title">
                {featuredPost.title}
              </h2>
              <p className="insight-featured__excerpt">
                {featuredPost.excerpt}
              </p>
              <a href="#contact" className="insight-featured__read">
                Read the Essay &rarr;
              </a>
            </div>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="insight-links reveal d2">
            {regularPosts.map((post) => (
              <a key={post.slug} href="#contact" className="insight-link">
                <div className="insight-link__left">
                  <span className="insight-link__cat">{post.category}</span>
                  <span className="insight-link__title">{post.title}</span>
                </div>
                <span className="insight-link__cta">Read &rarr;</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
