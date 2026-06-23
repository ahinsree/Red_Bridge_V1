import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Globe, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Ahinsree B | Digital Business Card",
  description: "Digital contact details for Ahinsree B, Associate Director, Experience Practice at Red Bridge Advisory. Scan the QR code or click to save contact directly to your phone.",
  openGraph: {
    title: "Ahinsree B | Digital Business Card",
    description: "Associate Director, Experience Practice at Red Bridge Advisory. Click to save contact directly or visit website.",
    url: "https://www.redbridgeadvisory.com/ahinsree-b",
    type: "profile",
    images: [
      {
        url: "https://www.redbridgeadvisory.com/images/ahinsree-qr.png",
        width: 300,
        height: 300,
        alt: "Ahinsree B Contact QR Code",
      }
    ]
  }
};

export default function AhinsreeVCard() {
  return (
    <main className="vcard-page">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%", maxWidth: "400px" }}>
        
        {/* Card Component matching the mockup exactly */}
        <div className="vcard-card">
          {/* Halftone dotted side panels */}
          <div className="vcard-halftone-left" />
          <div className="vcard-halftone-right" />

          {/* Logo Section */}
          <div className="vcard-logo">
            <div className="nav__logo" style={{ pointerEvents: "none" }}>
              <svg
                className="logo-mark"
                viewBox="0 0 74 112"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                overflow="visible"
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
                <span className="logo-wm-red">Red</span>
                <span className="logo-wm-bridge">Bridge</span>
                <span className="logo-wm-advisory">Advisory</span>
              </div>
            </div>
          </div>

          {/* Name and Designation */}
          <h1 className="vcard-name">Ahinsree B</h1>
          <p className="vcard-title">Associate Director, Experience Practice</p>

          {/* Contact details */}
          <div className="vcard-details">
            <a href="tel:+919061211135" className="vcard-detail-item">
              <span className="vcard-icon">
                <Phone size={11} />
              </span>
              <span>+91 90612 11135</span>
            </a>
            <a href="mailto:contact@redbridgeadvisory.com" className="vcard-detail-item">
              <span className="vcard-icon">
                <Mail size={11} />
              </span>
              <span>contact@redbridgeadvisory.com</span>
            </a>
            <a href="https://www.redbridgeadvisory.com" className="vcard-detail-item" target="_blank" rel="noopener noreferrer">
              <span className="vcard-icon">
                <Globe size={11} />
              </span>
              <span>www.redbridgeadvisory.com</span>
            </a>
          </div>

          {/* QR Section */}
          <p className="vcard-qr-label">Scan to Save Contact</p>
          <div className="vcard-qr-container" style={{ position: "relative" }}>
            <Image
              src="/images/ahinsree-qr.png"
              alt="Ahinsree B Contact QR Code"
              width={156}
              height={156}
              className="vcard-qr-img"
              priority
            />
            {/* Embedded Logo in the Center of the QR Code */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "28px",
              height: "28px",
              background: "var(--white)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              pointerEvents: "none"
            }}>
              <svg
                viewBox="0 0 74 112"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "14px", height: "20px", margin: "auto", display: "block" }}
              >
                <defs>
                  <mask id="qr-logo-cut-mask">
                    <circle cx="37" cy="70.5" r="24" fill="white" />
                    <rect x="-13" y="64" width="100" height="13" fill="black" transform="rotate(30 37 70.5)" />
                  </mask>
                </defs>
                <rect x="0" y="13" width="13" height="99" fill="#B22030" />
                <rect x="61" y="13" width="13" height="99" fill="#B22030" />
                <rect x="0" y="0" width="74" height="13" fill="#B22030" />
                <circle cx="37" cy="70.5" r="24" fill="#B22030" mask="url(#qr-logo-cut-mask)" />
              </svg>
            </div>
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
        </div>

        {/* Action Buttons outside the card */}
        <div className="vcard-actions">
          <Link href="/ahinsree-b.vcf" download="ahinsree-b.vcf" className="vcard-btn vcard-btn--primary">
            <Download size={14} />
            Save Contact directly
          </Link>
          <a
            href="https://api.whatsapp.com/send?text=Connect%20with%20Ahinsree%20B%2C%20Associate%20Director%2C%20Experience%20Practice%20at%20Red%20Bridge%20Advisory.%20View%20digital%20card%20and%20save%20contact%20directly%3A%20https%3A%2F%2Fwww.redbridgeadvisory.com%2Fahinsree-b"
            className="vcard-btn vcard-btn--whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginRight: "4px" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.56 0 11.9-5.336 11.902-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </a>
          <a href="https://www.redbridgeadvisory.com" className="vcard-btn vcard-btn--secondary">
            Visit Website
          </a>
        </div>
      </div>
    </main>
  );
}
