"use client";
import { useState, useEffect, RefObject } from "react";

export function useScrollProgress(ref: RefObject<Element | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // 0 = top of element hits bottom of viewport
            // 1 = bottom of element hits top of viewport
            const total = windowHeight + rect.height;
            const current = windowHeight - rect.top;
            const p = Math.min(Math.max(current / total, 0), 1);
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  return progress;
}
