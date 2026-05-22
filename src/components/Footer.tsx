"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 px-6 md:px-8 relative overflow-hidden">
      {/* Soft dark red glow background */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-bridge-red/5 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start">
          
          {/* Logo Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-[24px] h-[36px] flex items-center justify-center">
                <Image
                  src="/images/logo-flat.svg"
                  alt="Red Bridge Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-medium text-cream tracking-wider leading-none">
                  Red Bridge
                </span>
                <span className="font-mono text-[9px] text-cream/40 uppercase tracking-widest mt-0.5 leading-none">
                  Advisory
                </span>
              </div>
            </div>
            
            <p className="text-xs font-sans text-cream/50 leading-relaxed max-w-sm mt-2">
              Bridging Insight to Impact. We partner with leading enterprises to build data-driven platforms, engineer experiences, and execute strategies that matter.
            </p>

            <div className="font-serif text-sm italic text-bridge-red mt-2 tracking-wide">
              &quot;Distinct by Design. Made to Matter.&quot;
            </div>
          </div>

          {/* Solutions Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-cream/30 uppercase tracking-widest">
              Capabilities
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-cream/60 font-sans">
              <li>
                <a href="#services" className="hover:text-bridge-red transition-colors">Strategic Advisory</a>
              </li>
              <li>
                <a href="#services" className="hover:text-bridge-red transition-colors">Customer Experience (CX)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-bridge-red transition-colors">Employee Experience (EX)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-bridge-red transition-colors">Experience Intelligence</a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-cream/30 uppercase tracking-widest">
              Company
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-cream/60 font-sans">
              <li>
                <a href="#case-studies" className="hover:text-bridge-red transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#insights" className="hover:text-bridge-red transition-colors">Insights Ledger</a>
              </li>
              <li>
                <a href="#about" className="hover:text-bridge-red transition-colors">Philosophy</a>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="hover:text-bridge-red transition-colors cursor-pointer">Careers</span>
                <span className="text-[9px] font-mono bg-bridge-red/25 text-bridge-red px-1 rounded uppercase tracking-wider scale-90">
                  Hiring
                </span>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-cream/30 uppercase tracking-widest">
              Contact Desk
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-cream/60 font-sans">
              <li>
                <span className="text-cream/40 block">Global HQ</span>
                <span className="text-cream/90">San Francisco, CA</span>
              </li>
              <li>
                <span className="text-cream/40 block">Direct Inquiries</span>
                <a href="mailto:briefing@redbridgeadvisory.com" className="hover:text-bridge-red text-cream/90 transition-colors">
                  briefing@redbridgeadvisory.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Fine Line separator */}
        <div className="w-full h-px bg-white/5 mt-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-cream/40 uppercase tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} Red Bridge Advisory. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-bridge-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-bridge-red transition-colors">Terms of Briefing</a>
            
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-1.5 hover:text-bridge-red transition-colors cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
