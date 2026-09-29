"use client";

import { useEffect, useRef } from "react";
import { useParallaxEnabled } from "@/hooks/useParallaxEnabled";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], .clickable, .insight-link, .why-item, .sector-item";

export default function CustomCursor() {
  // Only enable on fine pointers (mouse) without a reduced-motion preference
  const enabled = useParallaxEnabled();
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    // Hide the default cursor while the custom one is active
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = `
      body, a, button, input, select, textarea, [role="button"], .insight-link, .sector-item, .btn {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const target = { x: 0, y: 0 };
    const trail = { x: 0, y: 0 };
    let frame = 0;
    let visible = false;

    const setVisible = (value: boolean) => {
      visible = value;
      const opacity = value ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (trailRef.current) trailRef.current.style.opacity = opacity;
    };

    // Lag the outer ring behind the pointer; stop the loop once it has caught up
    const tick = () => {
      trail.x += (target.x - trail.x) * 0.16;
      trail.y += (target.y - trail.y) * 0.16;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }
      if (Math.abs(target.x - trail.x) > 0.1 || Math.abs(target.y - trail.y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        trail.x = target.x;
        trail.y = target.y;
        setVisible(true);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleMouseLeave = () => setVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const hovered = !!el?.closest?.(INTERACTIVE_SELECTOR);
      trailRef.current?.classList.toggle("is-hovered", hovered);
      dotRef.current?.classList.toggle("is-hovered", hovered);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      style.remove();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Lagging Parallax Ring */}
      <div ref={trailRef} className="custom-cursor-trail" aria-hidden="true" />
      {/* Inner Real-time Red Dot */}
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
