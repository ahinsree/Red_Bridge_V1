import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Red Bridge Advisory | Bridging Insight to Impact",
  description: "Red Bridge Advisory is a boutique management consulting firm working with governments, enterprises and investors across strategy, AI and digital, investment and economic advisory, entrepreneurship, skilling, sustainability and programme delivery.",
  metadataBase: new URL("https://www.redbridgeadvisory.com"),
  icons: {
    icon: [
      { url: "/images/logo-flat.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Red Bridge Advisory | Bridging Insight to Impact",
    description: "Red Bridge Advisory is a boutique management consulting firm working with governments, enterprises and investors across strategy, AI and digital, investment and economic advisory, entrepreneurship, skilling, sustainability and programme delivery.",
    url: "https://www.redbridgeadvisory.com",
    siteName: "Red Bridge Advisory",
    images: [
      {
        url: "/images/logo-flat.png",
        width: 800,
        height: 800,
        alt: "Red Bridge Advisory Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Bridge Advisory | Bridging Insight to Impact",
    description: "Red Bridge Advisory is a boutique management consulting firm working with governments, enterprises and investors across strategy, AI and digital, investment and economic advisory, entrepreneurship, skilling, sustainability and programme delivery.",
    images: ["/images/logo-flat.png"],
    creator: "@redbridgeadv",
  },
  verification: {
    google: "google7bb7daf0e708b41d",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Red Bridge Advisory",
    "legalName": "Red Bridge Advisory Pvt Ltd.",
    "url": "https://www.redbridgeadvisory.com",
    "logo": "https://www.redbridgeadvisory.com/images/logo-flat.png",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    "description": "Red Bridge Advisory is a boutique management consulting firm working with governments, enterprises and investors across strategy, AI and digital, investment and economic advisory, entrepreneurship, skilling, sustainability and programme delivery.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dotspace Business Center, TC 24/3088/2, Ushasandya Building, Devasom Board Road, Kowdiar",
      "addressLocality": "Thiruvananthapuram",
      "postalCode": "695003",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@redbridgeadvisory.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://linkedin.com/company/red-bridge-advisory",
      "https://x.com/redbridgeadv"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
