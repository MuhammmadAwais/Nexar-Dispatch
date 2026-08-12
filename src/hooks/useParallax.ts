"use client";
import { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useParallax(factor: number) {
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setOffset(0);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.scrollY * factor);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [factor, reducedMotion]);

  return reducedMotion ? 0 : offset;
}
