"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useParallaxEnabled } from "@/hooks/useParallaxEnabled";

export default function VisualPause() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useParallaxEnabled();

  // 0 when the section top enters the viewport bottom, 1 when its bottom leaves the top
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const bgX = useTransform(smoothX, (m) => m * -0.6);
  const bgY = useTransform(
    [scrollYProgress, smoothY],
    ([p, m]: number[]) => {
      // Matches the previous (rect.top - viewHeight) * 0.16 speed
      // Also evaluated once during server render, where window is unavailable
      if (typeof window === "undefined") return 0;
      const height = sectionRef.current?.offsetHeight ?? 0;
      const travel = window.innerHeight + height;
      return -p * travel * 0.16 + m * -0.6;
    }
  );
  const contentX = useTransform(smoothX, (m) => m * 0.4);
  const contentY = useTransform(smoothY, (m) => m * 0.4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 35); // Max 35px translation
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={parallax ? handleMouseMove : undefined}
      onMouseLeave={parallax ? handleMouseLeave : undefined}
      className={`visual-pause ${isVisible ? "is-visible" : ""}`}
      id="visual-pause"
    >
      <div className="visual-pause__bg">
        <motion.div
          className="visual-pause__parallax-wrapper"
          style={parallax ? { x: bgX, y: bgY, scale: 1.1 } : { scale: 1.1 }}
        >
          <Image
            className="visual-pause__bg-img"
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt=""
            fill
            sizes="100vw"
          />
        </motion.div>
      </div>
      <div className="visual-pause__overlay"></div>
      <motion.div
        className="visual-pause__content"
        style={parallax ? { x: contentX, y: contentY } : undefined}
      >
        <span className="visual-pause__rule"></span>
        <p className="visual-pause__statement">
          Execution changes
          <br />
          the meaning of strategy.
        </p>
        <p className="visual-pause__attr">Red Bridge Advisory</p>
      </motion.div>
    </section>
  );
}
