"use client";

import React, { createContext, useContext, useState, useRef, ReactNode } from "react";

interface ThreeDCardContextType {
  mouseX: number; // -1 to 1
  mouseY: number; // -1 to 1
  isHovered: boolean;
}

const ThreeDCardContext = createContext<ThreeDCardContextType>({
  mouseX: 0,
  mouseY: 0,
  isHovered: false,
});

export const useThreeDCard = () => useContext(ThreeDCardContext);

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ThreeDCard({ children, className = "", onClick }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative coordinates inside the card: 0 to width/height
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates to range [-1, 1]
    const relativeX = (x / rect.width) * 2 - 1;
    const relativeY = (y / rect.height) * 2 - 1;
    
    setCoords({ x: relativeX, y: relativeY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Rotation angles (max 8 degrees for clean, elegant movement)
  const rotateX = coords.y * -8;
  const rotateY = coords.x * 8;

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  // On hover we want direct tracking (no latency or slight ease), on leave we ease it back smoothly
  const transitionStyle = isHovered
    ? "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)"
    : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";

  return (
    <ThreeDCardContext.Provider value={{ mouseX: coords.x, mouseY: coords.y, isHovered }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: transformStyle,
          transition: transitionStyle,
          transformStyle: "preserve-3d",
        }}
        className={`transform-gpu ${className}`}
      >
        {children}
      </div>
    </ThreeDCardContext.Provider>
  );
}

