"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TruckScene } from "../TruckScene";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { HudCard } from "../scene/HudCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (reducedMotion) {
        tl.from(".hero-anim", { opacity: 0, duration: 0.12, stagger: 0.02, ease: "none" });
        return;
      }

      // 1. Initial Entrance Animation
      tl.from(".hero-anim-h1", { y: "100%", duration: 0.7, stagger: 0.09, ease: "power4.out" }, 0.1)
        .from(".hero-anim-p", { opacity: 0, y: 16, duration: 0.6 }, 0.3)
        .from(".hero-anim-cta", { opacity: 0, y: 16, duration: 0.6 }, 0.4)
        .from(".hero-anim-trust", { opacity: 0, duration: 0.6 }, 0.5)
        .from(".scene-wrapper", { opacity: 0, duration: 1.0 }, 0.3);

      // 2. Scroll-driven Text Transitions (Parallax)
      // The container is 300vh.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        }
      });

      // From 0 to 40% scroll: Text 1 moves up and fades out
      scrollTl.to(".hero-text-1", { y: -100, opacity: 0, ease: "power2.in" }, 0);

      // From 30% to 70% scroll: Text 2 enters from bottom and stays
      scrollTl.fromTo(".hero-text-2", 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, 
        0.3 // starts at 30% of scroll
      );

      // Fade out the entire hero sticky content at the very end to seamlessly reveal the next section
      scrollTl.to(stickyRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut"
      }, 0.9);
      
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={containerRef} className="hero-scroll-container relative w-full h-[300vh] z-30 pointer-events-none bg-transparent">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen min-h-[750px] overflow-hidden flex items-center pt-24 lg:pt-0 pointer-events-auto bg-surface">
        
        {/* Background Scene (Handles its own scroll scrubbing via TruckScene) */}
        <div className="absolute inset-0 z-0">
          <TruckScene />
        </div>



        {/* Content Column */}
        <div className="mx-auto w-full max-w-7xl px-4 md:px-[clamp(1.25rem,4vw,4rem)] relative z-20 pointer-events-none h-full flex items-center">
          <div className="relative w-full lg:w-7/12 pointer-events-auto h-full flex flex-col justify-center">
            
            {/* Phase 1 Text */}
            <div className="hero-text-1 absolute inset-x-0 flex flex-col items-start justify-center">           
              <h1 className="text-display-l font-display text-text mb-6 leading-[1.1] drop-shadow-md">
                <div className="overflow-hidden"><div className="hero-anim-h1 hero-anim">Keep Your Trucks Moving.</div></div>
                <div className="overflow-hidden"><div className="hero-anim-h1 hero-anim">We Handle the Rest.</div></div>
              </h1>
              
              <p className="hero-anim-p hero-anim text-text-body text-lg max-w-xl mb-10 font-medium drop-shadow-sm">
                A premium dispatch service built to keep owner-operators and small fleets moving. We handle the paperwork, negotiations, and route planning so you can focus on the drive.
              </p>
              
              <div className="hero-anim-cta hero-anim flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center">Get Started</Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center bg-surface/50 backdrop-blur-md border-line/40 hover:bg-surface/80">Talk to a Dispatcher</Button>
              </div>
              
              <div className="hero-anim-trust hero-anim flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-label border-t border-line/50 pt-6 w-full font-semibold">
                <span>Dry Van</span>
                <span className="w-1 h-1 rounded-full bg-accent/50 hidden sm:block"></span>
                <span>Reefer</span>
                <span className="w-1 h-1 rounded-full bg-accent/50 hidden sm:block"></span>
                <span>Flatbed</span>
                <span className="w-1 h-1 rounded-full bg-accent/50 hidden sm:block"></span>
                <span>Step Deck</span>
              </div>
            </div>

            {/* Phase 2 Text (Enters as you scroll) */}
            <div className="hero-text-2 absolute inset-x-0 flex flex-col items-start justify-center opacity-0 translate-y-[100px]">
              <h2 className="text-display-l font-display text-text mb-6 leading-[1.1] drop-shadow-md">
                Precision Loading. <br />
                Seamless Logistics.
              </h2>
              <p className="text-text-body text-lg max-w-xl mb-10 font-medium drop-shadow-sm">
                As your container is loaded, our team is already negotiating the next top-paying freight. 
                Zero downtime.
              </p>
              <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center">
                Get Started
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
