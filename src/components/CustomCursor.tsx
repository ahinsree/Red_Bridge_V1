"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  // Track mouse movements
  useEffect(() => {
    // Hide default cursor globally on desktop
    const addCursorStyles = () => {
      const style = document.createElement("style");
      style.id = "custom-cursor-hide";
      style.innerHTML = `
        @media (min-width: 769px) {
          body, a, button, input, select, textarea, [role="button"], .insight-link, .sector-item, .btn {
            cursor: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    };
    
    addCursorStyles();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      const styleEl = document.getElementById("custom-cursor-hide");
      if (styleEl) styleEl.remove();
    };
  }, []);

  // Animate the outer lagging trail ring (using requestAnimationFrame for smooth spring lag)
  useEffect(() => {
    let animationFrameId: number;
    
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        
        // Adjust speed factor (0.16 is the perfect soft lag)
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16
        };
      });
      
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Set up hover listeners for interactive items
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") !== null || 
        target.closest("button") !== null ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable") ||
        target.classList.contains("insight-link") ||
        target.classList.contains("why-item") ||
        target.classList.contains("sector-item");
      
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Lagging Parallax Ring */}
      <div
        ref={trailRef}
        className="custom-cursor-trail pointer-events-none fixed z-[9999] rounded-full hidden md:block"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          width: isHovered ? "48px" : "32px",
          height: isHovered ? "48px" : "32px",
          transform: "translate(-50%, -50%)",
          border: isHovered ? "1px solid rgba(178, 32, 48, 0.85)" : "1px solid rgba(178, 32, 48, 0.42)",
          backgroundColor: isHovered ? "rgba(178, 32, 48, 0.08)" : "transparent",
          boxShadow: isHovered ? "0 0 16px rgba(178, 32, 48, 0.15)" : "none",
          transition: "width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.2s, background-color 0.2s",
          willChange: "left, top, width, height"
        }}
      />
      {/* Inner Real-time Red Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none fixed z-[9999] rounded-full hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#B22030",
          boxShadow: "0 0 8px rgba(178, 32, 48, 0.6)",
          transition: "width 0.2s, height 0.2s",
          willChange: "left, top"
        }}
      />
    </>
  );
}
