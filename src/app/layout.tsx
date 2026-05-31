import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const basePath = process.env.NODE_ENV === "production" ? "/Red_Bridge_" : "";

export const metadata: Metadata = {
  title: "Red Bridge Advisory | Bridging Insight to Impact",
  description: "World-class advisory and transformation partner. Specializing in Strategic Advisory, CX, EX, Data Engineering, Experience Transformation, and AI-driven insights. Distinct by Design. Made to Matter.",
  icons: {
    icon: `${basePath}/images/logo-flat.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
