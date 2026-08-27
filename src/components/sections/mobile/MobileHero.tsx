"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";



export function MobileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (reducedMotion) {
      tl.from([".hero-h1-line", ".hero-sub", ".hero-cta", ".hero-ghost"], {
        opacity: 0, duration: 0.15, stagger: 0.04,
      });
      return;
    }
    tl.from(".hero-ghost",    { opacity: 0, duration: 1.0 }, 0)
      .from(".hero-h1-line",  { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.2)
      .from(".hero-sub",      { opacity: 0, y: 15, duration: 0.6 }, 0.6)
      .from(".hero-cta",      { opacity: 0, y: 15, duration: 0.6 }, 0.7)
      .from(".hero-truck",    { opacity: 0, x: 40, duration: 1.0, ease: "power3.out" }, 0.3);
  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black flex flex-col justify-between"
    >
      {/* ── Base Grid background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127,224,77,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,224,77,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: "center top",
        }}
      />

      {/* ── Faded green glow behind the text ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle 80vw at 50% 30%, rgba(80,200,120,0.15) 0%, transparent 60%)",
        }}
      />

      {/* ── Ghost word "NEXAR" ── */}
      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute inset-0 z-[2] flex items-center justify-center opacity-30 mt-16"
      >
        <span
          className="uppercase select-none whitespace-nowrap leading-[0.8]"
          style={{
            fontFamily: "Impact, 'Arial Narrow Bold', 'Oswald', sans-serif",
            fontSize: "20vw", 
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.0) 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.02em",
          }}
        >
          NEXAR
        </span>
      </div>

      {/* ── Text Content Area (Top Half) ── */}
      <div className="relative z-10 w-full px-5 pt-28 pb-4 flex flex-col">
        <h1
          className="font-display font-black uppercase text-[#F1F5F9] leading-[1.05] mb-4"
          style={{ fontSize: "7.5vw", letterSpacing: "-0.02em" }}
        >
          <span className="block pb-1 w-max">
            <span className="hero-h1-line block whitespace-nowrap font-sans font-bold tracking-normal">
              DISPATCH SERVICES
            </span>
          </span>
          <span className="block pb-1 w-max">
            <span className="hero-h1-line block whitespace-nowrap font-sans font-bold tracking-normal">
              THAT MAXIMIZE
            </span>
          </span>
          
          <span className="block pt-1 pb-1 w-max">
            <span 
              className="hero-h1-line block whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg, #50C878 0%, #004D40 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              YOUR REVENUE!
            </span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="hero-sub text-[#948E82] font-medium mb-8 max-w-sm text-[15px] leading-relaxed">
          <strong className="text-[#F1F5F9] font-bold">Real dispatchers.</strong>{" "}
          <strong className="text-[#F1F5F9] font-bold">Real negotiation.</strong>{" "}
          <strong
            style={{
              background: "linear-gradient(90deg, #50C878, #004D40)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Better rate-per-mile
          </strong>
          , every week.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex items-center gap-3">
          <a
            href="#services"
            className="group relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-bold text-black bg-[#50C878] transition-all duration-300 shadow-[0_4px_20px_rgba(80,200,120,0.15)] active:scale-95"
          >
            Get Started Free
          </a>
          <a
            href="#how-it-works"
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#50C878] text-black transition-all duration-300 shadow-[0_4px_20px_rgba(80,200,120,0.15)] active:scale-95 shrink-0"
            aria-label="Talk to a Dispatcher"
          >
            <ArrowUpRight size={22} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* ── Truck Image (Bottom Half) ── */}
      <div className="hero-truck relative flex-1 w-full z-10 flex items-end justify-end overflow-hidden pb-14">
        <Image
          src="/hero-truck-1-red.png"
          alt="Nexar Dispatch — Semi Truck"
          width={900}
          height={500}
          priority
          className="w-[110%] max-w-none h-auto object-contain translate-x-[5%]"
          style={{
            filter: "drop-shadow(-10px 15px 30px rgba(0,0,0,0.9))",
          }}
        />
      </div>


    </section>
  );
}
