"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    // If mobile menu is open, close it
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = "";
    }

    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      // Scroll with offset of nav height (68px)
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 68;
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
                <circle cx="37" cy="62.5" r="24" fill="white" />
                <rect x="-13" y="56" width="100" height="13" fill="black" transform="rotate(30 37 62.5)" />
              </mask>
            </defs>
            <rect x="0" y="13" width="13" height="99" fill="#B22030" />
            <rect x="61" y="13" width="13" height="99" fill="#B22030" />
            <rect x="0" y="0" width="74" height="13" fill="#B22030" />
            <circle cx="37" cy="62.5" r="24" fill="#B22030" mask="url(#header-logo-cut-mask)" />
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
          <div className="nav__item">
            <a href="#advisory" className="nav__link" onClick={handleAdvisoryClick}>
              Advisory
              <svg className="nav__chevron" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <div className={`nav__dropdown ${mobileDropdownOpen ? "mobile-open" : ""}`}>
              <span className="nav__dropdown__label">Practice Areas</span>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Strategy &amp; Transformation</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>AI &amp; Digital</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Experience Advisory</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Institutional Transformation</a>
              <a href="#advisory" onClick={(e) => handleLinkClick(e, "#advisory")}>Investment &amp; Economic Advisory</a>
              <hr />
              <span className="nav__dropdown__label">Sectors</span>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Government &amp; Public Systems</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>Tourism &amp; Destinations</a>
              <a href="#sectors" onClick={(e) => handleLinkClick(e, "#sectors")}>MSME &amp; Entrepreneurship</a>
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
