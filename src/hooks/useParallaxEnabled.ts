"use client";

import { useEffect, useState } from "react";

// Parallax and pointer-driven effects run only on mouse devices without a reduced-motion preference
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function useParallaxEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return enabled;
}
