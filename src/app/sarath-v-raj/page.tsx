import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Globe, Download } from "lucide-react";

export default function SarathVCard() {
  return (
    <main className="vcard-page">
      <div className="vcard-card">
        {/* Logo Section */}
        <div className="vcard-logo">
          <div className="nav__logo" style={{ gap: "8px", pointerEvents: "none" }}>
            <svg
              className="logo-mark"
              viewBox="0 0 74 112"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              overflow="visible"
              style={{ width: "32px", height: "48px" }}
            >
              <defs>
                <mask id="vcard-logo-cut-mask">
                  <circle cx="37" cy="70.5" r="24" fill="white" />
                  <rect x="-13" y="64" width="100" height="13" fill="black" transform="rotate(30 37 70.5)" />
                </mask>
              </defs>
              <rect x="0" y="13" width="13" height="99" fill="#B22030" />
              <rect x="61" y="13" width="13" height="99" fill="#B22030" />
              <rect x="0" y="0" width="74" height="13" fill="#B22030" />
              <circle cx="37" cy="70.5" r="24" fill="#B22030" mask="url(#vcard-logo-cut-mask)" />
            </svg>
            <div className="logo-wordmark" style={{ textAlign: "left" }}>
              <span className="logo-wm-red" style={{ fontSize: "14px", letterSpacing: "0.08em" }}>Red</span>
              <span className="logo-wm-bridge" style={{ fontSize: "14px", letterSpacing: "0.08em" }}>Bridge</span>
              <span className="logo-wm-advisory" style={{ fontSize: "7px", letterSpacing: "0.22em" }}>Advisory</span>
            </div>
          </div>
        </div>

        {/* Name and Designation */}
        <h1 className="vcard-name">Sarath V Raj</h1>
        <p className="vcard-title">Managing Principal</p>

        {/* Contact details */}
        <div className="vcard-details">
          <a href="tel:+919633777829" className="vcard-detail-item">
            <span className="vcard-icon">
              <Phone size={13} />
            </span>
            <span>+91 9633777829</span>
          </a>
          <a href="mailto:contact@redbridgeadvisory.com" className="vcard-detail-item">
            <span className="vcard-icon">
              <Mail size={13} />
            </span>
            <span>contact@redbridgeadvisory.com</span>
          </a>
          <a href="https://www.redbridgeadvisory.com" className="vcard-detail-item" target="_blank" rel="noopener noreferrer">
            <span className="vcard-icon">
              <Globe size={13} />
            </span>
            <span>www.redbridgeadvisory.com</span>
          </a>
        </div>

        {/* QR Section */}
        <p className="vcard-qr-label">Scan to Save Contact</p>
        <div className="vcard-qr-container">
          <Image
            src="/images/sarath-qr.png"
            alt="Sarath V Raj Contact QR Code"
            width={160}
            height={160}
            className="vcard-qr-img"
            priority
          />
        </div>

        {/* Address */}
        <p className="vcard-address">
          Dotspace Business Center, TC 24/3088/2,
          <br />
          Ushasandya Building, Devasom Board Road,
          <br />
          Kowdiar, Thiruvananthapuram - 695003
        </p>

        {/* Tagline */}
        <p className="vcard-tagline">“Different by purpose. Proven to deliver.”</p>

        {/* Decorative corner stripes */}
        <div className="vcard-stripes" />

        {/* Action Buttons */}
        <div className="vcard-actions">
          <Link href="/sarath-v-raj.vcf" download="sarath-v-raj.vcf" className="vcard-btn vcard-btn--primary">
            <Download size={14} />
            Save Contact directly
          </Link>
          <a href="https://www.redbridgeadvisory.com" className="vcard-btn vcard-btn--secondary">
            Visit Website
          </a>
        </div>
      </div>
    </main>
  );
}
