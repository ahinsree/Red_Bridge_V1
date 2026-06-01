"use client";

export default function Footer() {
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
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="nav__logo" style={{ gap: "8px" }} aria-label="Red Bridge Advisory">
                <svg
                  className="logo-mark"
                  viewBox="0 0 74 112"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  overflow="visible"
                >
                  <defs>
                    <mask id="footer-logo-cut-mask">
                      <circle cx="37" cy="66.5" r="24" fill="white" />
                      <rect x="-13" y="60" width="100" height="13" fill="black" transform="rotate(30 37 66.5)" />
                    </mask>
                  </defs>
                  <rect x="0" y="13" width="13" height="99" fill="#B22030" />
                  <rect x="61" y="13" width="13" height="99" fill="#B22030" />
                  <rect x="0" y="0" width="74" height="13" fill="#B22030" />
                  <circle cx="37" cy="66.5" r="24" fill="#B22030" mask="url(#footer-logo-cut-mask)" />
                </svg>
                <div className="logo-wordmark" aria-hidden="true">
                  <span className="logo-wm-red logo-wm-red--lt">Red</span>
                  <span className="logo-wm-bridge logo-wm-bridge--lt">Bridge</span>
                  <span className="logo-wm-advisory logo-wm-adv--lt">Advisory</span>
                </div>
              </div>
            </div>
            <p className="footer__brand-text">
              A boutique advisory firm built for the work that follows the decision — strategy, transformation, and institutional
              advisory for governments, enterprises, and public systems.
            </p>
            <span className="footer__tagline">Different by purpose. Proven to deliver.</span>
            <div className="footer__socials">
              <a href="https://linkedin.com/company/red-bridge-advisory" className="footer__social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/redbridgeadv" className="footer__social-btn" title="Twitter / X" target="_blank" rel="noopener noreferrer">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="mailto:hello@redbridgeadvisory.com" className="footer__social-btn" title="Email">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Navigate</p>
            <div className="footer__links">
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                Advisory Areas
              </a>
              <a href="#sectors" className="footer__link" onClick={(e) => handleScrollTo(e, "#sectors")}>
                Sectors
              </a>
              <a href="#engagements" className="footer__link" onClick={(e) => handleScrollTo(e, "#engagements")}>
                Engagements
              </a>
              <a href="#insights" className="footer__link" onClick={(e) => handleScrollTo(e, "#insights")}>
                Insights
              </a>
              <a href="#work-with" className="footer__link" onClick={(e) => handleScrollTo(e, "#work-with")}>
                Work With Us
              </a>
              <a href="#why-rba" className="footer__link" onClick={(e) => handleScrollTo(e, "#why-rba")}>
                About
              </a>
              <a href="#contact" className="footer__link" onClick={(e) => handleScrollTo(e, "#contact")}>
                Enquire
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Practice Areas</p>
            <div className="footer__links">
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                Strategy &amp; Transformation
              </a>
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                AI &amp; Digital
              </a>
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                Experience Advisory
              </a>
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                Institutional Transformation
              </a>
              <a href="#advisory" className="footer__link" onClick={(e) => handleScrollTo(e, "#advisory")}>
                Investment &amp; Economic
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Connect</p>
            <div className="footer__links">
              <a href="mailto:hello@redbridgeadvisory.com" className="footer__link">
                hello@redbridgeadvisory.com
              </a>
              <a href="#" className="footer__link">
                LinkedIn
              </a>
              <div className="footer__link" style={{ pointerEvents: "none", lineHeight: "1.5" }}>
                Dotspace Business Center, Kowdiar,
                <br />
                Thiruvananthapuram - 695003
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 Red Bridge Advisory. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
