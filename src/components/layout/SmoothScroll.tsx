"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "../../hooks/useReducedMotion";


export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
