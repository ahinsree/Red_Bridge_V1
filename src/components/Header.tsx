"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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

    if (pathname === "/") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const topOffset = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({
          top: topOffset,
          behavior: "smooth",
        });
      }
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
            <Link href={pathname === "/" ? "#advisory" : "/#advisory"} className="nav__link" onClick={handleAdvisoryClick}>
              Advisory
              <svg className="nav__chevron" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>

            {/* Desktop Mega Menu Dropdown */}
            <div className="nav__megamenu" aria-label="Advisory Capabilities">
              <div className="nav__megamenu-grid">
                
                {/* Column 1: Capabilities */}
                <div className="nav__megamenu-col">
                  <span className="nav__megamenu-header">Practice Areas</span>
                  <div className="nav__megamenu-list">
                    <Link href="/practices/strategy-transformation" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><Target size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Strategy &amp; Transformation</h6>
                        <p>Deciding what to change, and making it hold.</p>
                      </div>
                    </Link>
                    <Link href="/practices/ai-digital-data" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><Database size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>AI, Digital &amp; Data</h6>
                        <p>Technology adopted with judgement, not haste.</p>
                      </div>
                    </Link>
                    <Link href="/practices/experience-service-design" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><Users size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Experience &amp; Service Design</h6>
                        <p>Designing what people actually receive.</p>
                      </div>
                    </Link>
                    <Link href="/practices/investment-economic-infrastructure" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><TrendingUp size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Investment &amp; Economic Advisory</h6>
                        <p>Feasibility and structuring behind investment.</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Additional Capabilities & Sectors Link */}
                <div className="nav__megamenu-col">
                  <span className="nav__megamenu-header">Specialist Areas</span>
                  <div className="nav__megamenu-list">
                    <Link href="/practices/entrepreneurship-innovation-startup" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><Compass size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Startups &amp; Innovation</h6>
                        <p>Building support systems for enterprise growth.</p>
                      </div>
                    </Link>
                    <Link href="/practices/programme-management-monitoring" className="nav__megamenu-link" onClick={() => setMobileMenuOpen(false)}>
                      <span className="nav__megamenu-icon"><Layers size={14} /></span>
                      <div className="nav__megamenu-text">
                        <h6>Programme Management</h6>
                        <p>Delivery that is managed, monitored, and verified.</p>
                      </div>
                    </Link>
                  </div>

                  <span className="nav__megamenu-header" style={{ marginTop: "24px" }}>Sectors &amp; Domains</span>
                  <div className="nav__megamenu-sectors">
                    <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Infrastructure</Link>
                    <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Tourism &amp; Destination</Link>
                    <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Government Public</Link>
                    <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Livelihoods &amp; Climate</Link>
                  </div>
                </div>

                {/* Column 3: Featured Executive Spotlight Panel */}
                <div className="nav__megamenu-col nav__megamenu-col--spotlight">
                  <div className="nav__megamenu-card">
                    <div className="nav__megamenu-card-glow" />
                    <h6>Mandate Engagement</h6>
                    <p>Discuss custom advisory mandates, institutional design plans, or digital strategy scopes with our senior partners.</p>
                    <Link href={pathname === "/" ? "#contact" : "/#contact"} className="btn btn--primary" style={{ padding: "8px 16px", fontSize: "10.5px" }} onClick={(e) => handleLinkClick(e, "#contact")}>
                      Connect With Us <ArrowUpRight size={12} style={{ marginLeft: "4px" }} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Dropdown (Falls back under standard block menu on smaller screens) */}
            <div className={`nav__dropdown ${mobileDropdownOpen ? "mobile-open" : ""}`}>
              <span className="nav__dropdown__label">Practice Areas</span>
              <Link href="/practices/strategy-transformation" onClick={() => setMobileMenuOpen(false)}>Strategy &amp; Transformation</Link>
              <Link href="/practices/ai-digital-data" onClick={() => setMobileMenuOpen(false)}>AI, Digital &amp; Data</Link>
              <Link href="/practices/experience-service-design" onClick={() => setMobileMenuOpen(false)}>Experience &amp; Service Design</Link>
              <Link href="/practices/investment-economic-infrastructure" onClick={() => setMobileMenuOpen(false)}>Investment &amp; Infrastructure</Link>
              <Link href="/practices/entrepreneurship-innovation-startup" onClick={() => setMobileMenuOpen(false)}>Startups &amp; Innovation</Link>
              <Link href="/practices/programme-management-monitoring" onClick={() => setMobileMenuOpen(false)}>Programme Management &amp; M&amp;E</Link>
              <hr />
              <span className="nav__dropdown__label">Sectors</span>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Infrastructure &amp; Economic</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Tourism &amp; Hospitality</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Government &amp; Public</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>MSME &amp; Startups</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Sustainability &amp; Climate</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Education &amp; Skilling</Link>
              <Link href={pathname === "/" ? "#sectors" : "/#sectors"} onClick={(e) => handleLinkClick(e, "#sectors")}>Maritime &amp; Blue Economy</Link>
            </div>
          </div>

          <div className="nav__item">
            <Link href={pathname === "/" ? "#engagements" : "/#engagements"} className="nav__link" onClick={(e) => handleLinkClick(e, "#engagements")}>
              Engagements
            </Link>
          </div>
          <div className="nav__item">
            <Link href={pathname === "/" ? "#insights" : "/#insights"} className="nav__link" onClick={(e) => handleLinkClick(e, "#insights")}>
              Insights
            </Link>
          </div>
          <div className="nav__item">
            <Link href={pathname === "/" ? "#why-rba" : "/#why-rba"} className="nav__link" onClick={(e) => handleLinkClick(e, "#why-rba")}>
              About
            </Link>
          </div>

          <Link href={pathname === "/" ? "#contact" : "/#contact"} className="nav__cta" onClick={(e) => handleLinkClick(e, "#contact")}>
            Enquire
          </Link>
        </div>
      </div>
    </nav>
  );
}
