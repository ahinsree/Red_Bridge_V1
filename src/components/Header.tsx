"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Compass, 
  Database, 
  Layers, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Target 
} from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const open = !mobileMenuOpen;
    setMobileMenuOpen(open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = "";
    }

    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const handleAdvisoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 960) {
      e.preventDefault();
      setMobileDropdownOpen(!mobileDropdownOpen);
    } else {
      handleLinkClick(e, "#advisory");
    }
  };

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="main-nav">
      <div className="nav__container">
        <Link href="/" className="nav__logo" aria-label="Red Bridge Advisory">
          <svg className="logo-mark" viewBox="0 0 74 112" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">
            <defs>
              <mask id="header-logo-cut-mask">
                <circle cx="37" cy="70.5" r="24" fill="white" />
                <rect x="-13" y="64" width="100" height="13" fill="black" transform="rotate(30 37 70.5)" />
              </mask>
            </defs>
            <rect x="0" y="13" width="13" height="99" fill="#C2192A" />
            <rect x="61" y="13" width="13" height="99" fill="#C2192A" />
            <rect x="0" y="0" width="74" height="13" fill="#C2192A" />
            <circle cx="37" cy="70.5" r="24" fill="#C2192A" mask="url(#header-logo-cut-mask)" />
          </svg>
          <div className="logo-wordmark" aria-hidden="true">
            <span className="logo-wm-red">Red</span>
            <span className="logo-wm-bridge">Bridge</span>
            <span className="logo-wm-advisory">Advisory</span>
          </div>
        </Link>

        <button
          className={`nav__hamburger ${mobileMenuOpen ? "open" : ""}`}
          id="nav-toggle"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav__links ${mobileMenuOpen ? "open" : ""}`} id="nav-links">
          {/* Advisory Item with Mega Menu */}
          <div className="nav__item nav__item--has-mega">
            <a href="#advisory" className="nav__link" onClick={handleAdvisoryClick}>
              Advisory
              <svg className="nav__chevron" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>

            {/* Desktop Mega Menu Dropdown */}
            <div className="nav__megamenu" aria-label="Advisory Capabilities">
              <div className="nav__megamenu-grid">
                
                {/* Column 1: Capabilities */}
                <div className="nav__megamenu-col">
                  <span className="nav__megamenu-header">Practice Areas</span>
                  <div className="nav__megamenu-list">
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><Target size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Strategy &amp; Transformation</h6>
                        <p>Deciding what to change, and making it hold.</p>
                      </div>
                    </a>
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><Database size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>AI, Digital &amp; Data</h6>
                        <p>Technology adopted with judgement, not haste.</p>
                      </div>
                    </a>
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><Users size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Experience &amp; Service Design</h6>
                        <p>Designing what people actually receive.</p>
                      </div>
                    </a>
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><TrendingUp size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Investment &amp; Economic Advisory</h6>
                        <p>Feasibility and structuring behind investment.</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 2: Additional Capabilities & Sectors Link */}
                <div className="nav__megamenu-col">
                  <span className="nav__megamenu-header">Specialist Areas</span>
                  <div className="nav__megamenu-list">
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><Compass size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Startups &amp; Innovation</h6>
                        <p>Building support systems for enterprise growth.</p>
                      </div>
                    </a>
                    <a href="#advisory" className="nav__megamenu-link" onClick={(e) => handleLinkClick(e, "#advisory")}>
                      <span className="nav__megamenu-icon"><Layers size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Programme Management</h6>
                        <p>Delivery that is managed, monitored, and verified.</p>
                      </div>
                    </a>
                  </div>

                  <span className="nav__megamenu-header" style={{ marginTop: "24px" }}>Sectors &amp; Domains</span>
                  <div className="nav__megamenu-sectors">
                    <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Infrastructure</a>
                    <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Tourism &amp; Destination</a>
                    <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Government Public</a>
                    <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Livelihoods &amp; Climate</a>
                  </div>
                </div>

                {/* Column 3: Featured Executive Spotlight Panel */}
                <div className="nav__megamenu-col nav__megamenu-col--spotlight">
                  <div className="nav__megamenu-card">
                    <div className="nav__megamenu-card-glow" />
                    <h6>Mandate Engagement</h6>
                    <p>Discuss custom advisory mandates, institutional design plans, or digital strategy scopes with our senior partners.</p>
                    <a href="#contact" className="btn btn--primary" style={{ padding: "8px 16px", fontSize: "10.5px" }} onClick={(e) => handleLinkClick(e, "#contact")}>
                      Connect With Us <ArrowUpRight size={12} style={{ marginLeft: "4px" }} />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Dropdown (Falls back under standard block menu on smaller screens) */}
            <div className={`nav__dropdown ${mobileDropdownOpen ? "mobile-open" : ""}`}>
              <span className="nav__dropdown__label">Practice Areas</span>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Strategy &amp; Transformation</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>AI, Digital &amp; Data</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Experience &amp; Service Design</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Investment &amp; Infrastructure</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Startups &amp; Innovation</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Programme Management &amp; M&amp;E</a>
              <hr />
              <span className="nav__dropdown__label">Sectors</span>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Infrastructure &amp; Economic</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Tourism &amp; Hospitality</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Government &amp; Public</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>MSME &amp; Startups</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Sustainability &amp; Climate</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Education &amp; Skilling</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Maritime &amp; Blue Economy</a>
            </div>
          </div>

          <div className="nav__item">
            <a href="#engagements" className="nav__link" onClick={(e) => handleLinkClick(e, "#engagements")}>
              Engagements
            </a>
          </div>
          <div className="nav__item">
            <a href="#insights" className="nav__link" onClick={(e) => handleLinkClick(e, "#insights")}>
              Insights
            </a>
          </div>
          <div className="nav__item">
            <a href="#why-rba" className="nav__link" onClick={(e) => handleLinkClick(e, "#why-rba")}>
              About
            </a>
          </div>

          <a href="#contact" className="nav__cta" onClick={(e) => handleLinkClick(e, "#contact")}>
            Enquire
          </a>
        </div>
      </div>
    </nav>
  );
}
