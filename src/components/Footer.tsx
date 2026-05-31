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
                      <circle cx="37" cy="62.5" r="24" fill="white" />
                      <rect x="-13" y="56" width="100" height="13" fill="black" transform="rotate(30 37 62.5)" />
                    </mask>
                  </defs>
                  <rect x="0" y="13" width="13" height="99" fill="#B22030" />
                  <rect x="61" y="13" width="13" height="99" fill="#B22030" />
                  <rect x="0" y="0" width="74" height="13" fill="#B22030" />
                  <circle cx="37" cy="62.5" r="24" fill="#B22030" mask="url(#footer-logo-cut-mask)" />
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
              <a href="#" className="footer__social-btn" title="LinkedIn">
                in
              </a>
              <a href="#" className="footer__social-btn" title="Twitter / X">
                𝕏
              </a>
              <a href="mailto:hello@redbridgeadvisory.com" className="footer__social-btn" title="Email">
                @
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
