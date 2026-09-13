"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Engagements() {

  const engagementsList = [
    {
      type: "Automotive • Middle East",
      title: "From Customer Feedback to Customer Action",
      desc: "Transforming Customer Experience across Presales, Sales, Service, and Bodyshop for a leading automotive dealer in the Middle Eastern region with closed-loop ticketing.",
      link: "/work",
      featured: true,
      delayClass: "",
    },
    {
      type: "Tourism • Government • Strategy",
      title: "Coastal destination strategy for a state government",
      desc: "A multi-phase engagement across destination master planning, multi-stakeholder co-design, and policy framework development. Adopted at state level and active across pilot districts.",
      link: "/work",
      featured: false,
      delayClass: "d1",
    },
    {
      type: "MSME • Institutional",
      title: "Enterprise development programme design for a multi-state ecosystem",
      desc: "Advisory spanning policy architecture, delivery structure, and institutional alignment across state bodies and industry partners in three states.",
      link: "/work",
      featured: false,
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
          <Link href="/work" className="btn btn--ghost-light inline-flex items-center gap-2">
            <span>Explore All Work</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="engagements__grid">
          {engagementsList.map((eng, index) => (
            <div key={index} className={`eng-card reveal ${eng.delayClass}`}>
              <span className="eng-card__type">{eng.type}</span>
              <h3 className="eng-card__title">{eng.title}</h3>
              <p className="eng-card__desc">{eng.desc}</p>
              <Link href={eng.link} className="eng-card__link inline-flex items-center gap-1">
                <span>View Case Study</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
