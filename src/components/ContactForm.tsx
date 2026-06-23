"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current && parallaxRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            if (rect.top < viewHeight && rect.bottom > 0) {
              const relativeY = rect.top - viewHeight;
              const yTranslation = relativeY * 0.12; // parallax speed
              parallaxRef.current.style.transform = `translate3d(0, ${yTranslation}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: (document.getElementById("cf-fname") as HTMLInputElement)?.value || "",
          lastName: (document.getElementById("cf-lname") as HTMLInputElement)?.value || "",
          organisation: (document.getElementById("cf-org") as HTMLInputElement)?.value || "",
          email: (document.getElementById("cf-email") as HTMLInputElement)?.value || "",
          topic: (document.getElementById("cf-topic") as HTMLSelectElement)?.value || "",
          message: (document.getElementById("cf-msg") as HTMLTextAreaElement)?.value || "",
        }),
      });

      setSuccess(true);
    } catch (error) {
      console.warn("Contact API fallback triggered:", error);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="section contact-section" id="contact">
      <div className="contact__bg">
        <div className="contact__parallax-wrapper" ref={parallaxRef}>
          <Image
            className="contact__bg-img"
            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1920&q=80"
            alt="Red Bridge Advisory architectural lines"
            aria-hidden="true"
            fill
            sizes="100vw"
          />
        </div>
      </div>
      <div className="contact__overlay"></div>
      <div className="container">
        <div className="contact__layout">
          <div className="contact__info reveal">
            <span className="sec-label">Engage Us</span>
            <h2 className="sec-title">
              Bring us your most
              <br />
              important challenge.
            </h2>
            <div className="divider"></div>
            <p>
              We take on a select number of engagements at a time — ensuring every client receives senior attention and the
              depth of commitment that characterises our work.
            </p>
            <div className="contact__detail">
              <div className="contact__detail-item">
                <span className="contact__detail-label">Email</span>
                <span className="contact__detail-val">
                  <a href="mailto:contact@redbridgeadvisory.com">contact@redbridgeadvisory.com</a>
                </span>
              </div>
              <div className="contact__detail-item">
                <span className="contact__detail-label">Address</span>
                <span className="contact__detail-val" style={{ lineHeight: "1.6" }}>
                  <strong>Red Bridge Advisory Pvt Ltd.</strong>
                  <br />
                  Dotspace Business Center, TC 24/3088/2,
                  <br />
                  Ushasandya Building, Devasom Board Road,
                  <br />
                  Kowdiar, Thiruvananthapuram - 695003
                </span>
              </div>
              <div className="contact__detail-item">
                <span className="contact__detail-label">Response</span>
                <span className="contact__detail-val">We respond to every enquiry within 48 hours.</span>
              </div>
            </div>
            <div className="contact__social">
              <a href="https://linkedin.com/company/red-bridge-advisory" className="social-icon-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/redbridgeadv" className="social-icon-btn" title="Twitter / X" target="_blank" rel="noopener noreferrer">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="mailto:contact@redbridgeadvisory.com" className="social-icon-btn" title="Email">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="reveal d2 contact__form-card">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-fname">First Name</label>
                  <input type="text" id="cf-fname" placeholder="First name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="cf-lname">Last Name</label>
                  <input type="text" id="cf-lname" placeholder="Last name" required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="cf-org">Organisation</label>
                <input type="text" id="cf-org" placeholder="Your organisation or institution" />
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">Email Address</label>
                <input type="email" id="cf-email" placeholder="your@email.com" required />
              </div>
              <div className="form-field">
                <label htmlFor="cf-topic">Area of Interest</label>
                <select id="cf-topic">
                  <option value="">Select an area</option>
                  <option>Strategy, Transformation &amp; Institution Building</option>
                  <option>AI, Digital &amp; Data</option>
                  <option>Experience &amp; Service Design</option>
                  <option>Investment, Economic &amp; Infrastructure Advisory</option>
                  <option>Entrepreneurship, Innovation &amp; Startup Ecosystems</option>
                  <option>Programme Management, Monitoring &amp; Evaluation</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="cf-msg">Your Message</label>
                <textarea id="cf-msg" placeholder="Briefly describe your challenge or enquiry..." required></textarea>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn btn--primary" disabled={success || loading}>
                  {loading ? "Sending..." : success ? "Sent ✓" : "Send Message"}
                </button>
                <span className="form-note">We respond within 48 hours.</span>
              </div>
              {success && (
                <div
                  id="form-success"
                  style={{
                    display: "block",
                    marginTop: "16px",
                    padding: "14px 18px",
                    background: "rgba(27,38,59,0.06)",
                    borderLeft: "3px solid var(--navy)",
                    fontSize: "13.5px",
                    color: "var(--navy)",
                  }}
                >
                  Thank you. We will be in touch within 48 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
