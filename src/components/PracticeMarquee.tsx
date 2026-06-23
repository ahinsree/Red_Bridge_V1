"use client";

export default function PracticeMarquee() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#advisory");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const items = [
    "Strategy & Transformation",
    "AI, Digital & Data",
    "Experience & Service Design",
    "Investment & Infrastructure",
    "Startups & Innovation",
    "Programme Delivery & M&E",
  ];

  return (
    <a href="#advisory" className="practice-marquee" onClick={handleScrollTo} aria-label="Scroll to Advisory Areas">
      <div className="practice-marquee__wrap">
        {/* Render twice for infinite loop effect */}
        <div className="practice-marquee__list">
          {items.map((item, index) => (
            <span key={`list1-${index}`} className="practice-marquee__item">
              <span>{item}</span>
              <span className="practice-marquee__bullet">•</span>
            </span>
          ))}
        </div>
        <div className="practice-marquee__list" aria-hidden="true">
          {items.map((item, index) => (
            <span key={`list2-${index}`} className="practice-marquee__item">
              <span>{item}</span>
              <span className="practice-marquee__bullet">•</span>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
