"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useEffect, useRef, useState, useTransition } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";




export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [, startTransition] = useTransition();

  const handleLineMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

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
      .from(".hero-h1-line",  { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.2)
      .from(".hero-sub",      { opacity: 0, y: 15, duration: 0.6 }, 0.6)
      .from(".hero-cta",      { opacity: 0, y: 15, duration: 0.6 }, 0.7)
      .from(".hero-truck",    { opacity: 0, x: 80, duration: 1.2, ease: "power3.out" }, 0.3);
  }, { scope: containerRef, dependencies: [reducedMotion] });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      startTransition(() => {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Base Grid background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(127,224,77,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,224,77,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "center top",
        }}
      />

      {/* ── Interactive Hover Grid (Spotlight effect) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "center top",
          maskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />

      {/* ── Faded green glow behind the truck to match reference ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle 55vw at 80% 50%, rgba(80,200,120,0.3) 0%, rgba(80,200,120,0.1) 40%, transparent 70%)",
        }}
      />

      {/* ── Ghost word "NEXAR" — tall font, dark gray, resting on bottom ── */}
      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute inset-0 z-[2] flex items-end justify-center overflow-hidden pb-[80px]" // 80px padding bottom to sit on carousel
      >
        <span
          className="uppercase select-none whitespace-nowrap leading-[0.8]"
          style={{
            fontFamily: "Impact, 'Arial Narrow Bold', 'Oswald', sans-serif", // Tall, condensed font
            fontSize: "clamp(15rem, 33vw, 40rem)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.0) 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.02em",
            transform: "translateX(-2%)", // slightly off-center
          }}
        >
          NEXAR
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════
          Main layout — full screen, split into 2 columns
      ═══════════════════════════════════════════════════ */}
      <div
        className="relative z-[3] w-full h-full flex flex-col lg:flex-row pb-[80px]" // 80px padding bottom for carousel
        style={{ paddingTop: "var(--navbar-h, 80px)" }}
      >
        {/* ══════════════════════════════
            LEFT — Text Content
        ══════════════════════════════ */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 w-full lg:w-[55%] z-10">
          
          {/* Headline — 3 lines, glow added */}
          <h1
            className="font-display font-black uppercase leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {/* Line 1 */}
            <span 
              className="block pb-1 w-max relative group cursor-default"
              onMouseMove={handleLineMouseMove}
            >
              <span className="hero-h1-line block whitespace-nowrap relative font-sans font-bold tracking-normal">
                {/* Base Text */}
                <span style={{ 
                  color: "rgba(255, 255, 255, 0.1)", 
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                  textShadow: "0 0 20px rgba(80, 200, 120, 0.2), 0 0 10px rgba(255, 255, 255, 0.1)"
                }}>
                  DISPATCH SERVICES
                </span>
                {/* Hover Glow */}
                <span 
                  className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    color: "transparent",
                    backgroundImage: "radial-gradient(circle 250px at var(--x, 50%) var(--y, 50%), #FFFFFF 0%, #50C878 20%, rgba(80,200,120,0.6) 50%, transparent 80%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  DISPATCH SERVICES
                </span>
              </span>
            </span>

            {/* Line 2 */}
            <span 
              className="block pb-1 w-max relative group cursor-default"
              onMouseMove={handleLineMouseMove}
            >
              <span className="hero-h1-line block whitespace-nowrap relative font-sans font-bold tracking-normal">
                {/* Base Text */}
                <span style={{ 
                  color: "rgba(255, 255, 255, 0.1)", 
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                  textShadow: "0 0 20px rgba(80, 200, 120, 0.2), 0 0 10px rgba(255, 255, 255, 0.1)"
                }}>
                  THAT MAXIMIZE
                </span>
                {/* Hover Glow */}
                <span 
                  className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    color: "transparent",
                    backgroundImage: "radial-gradient(circle 250px at var(--x, 50%) var(--y, 50%), #FFFFFF 0%, #50C878 20%, rgba(80,200,120,0.6) 50%, transparent 80%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  THAT MAXIMIZE
                </span>
              </span>
            </span>
            
            {/* Third line: Highlighted gradient text without neon glow */}
            <span className="block pt-2 pb-2 w-max">
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

          <p
            className="hero-sub text-[#948E82] font-medium mb-10 max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", lineHeight: 1.6 }}
          >
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
          <div className="hero-cta flex items-center gap-4 mb-6">
            <a
              href="#services"
              className="group relative inline-flex items-center justify-center rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-[15px] font-bold text-black bg-[#50C878] transition-all duration-300 shadow-[0_4px_20px_rgba(80,200,120,0.15)] hover:shadow-[0_8px_30px_rgba(80,200,120,0.3)] hover:scale-105 hover:bg-[#5CE08A]"
            >
              Get Started Free
            </a>
            <a
              href="#how-it-works"
              className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#50C878] text-black transition-all duration-300 shadow-[0_4px_20px_rgba(80,200,120,0.15)] hover:shadow-[0_8px_30px_rgba(80,200,120,0.3)] hover:scale-110 hover:bg-[#5CE08A] shrink-0"
              aria-label="Talk to a Dispatcher"
            >
              <ArrowUpRight size={24} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <div className="hero-truck absolute right-[-2%] md:right-[-5%] lg:right-[-8%] xl:right-[-10%] bottom-0 lg:bottom-[65px] flex items-end justify-end pointer-events-none w-[90%] md:w-[78%] lg:w-[64%] xl:w-[56%] z-[5]">
          {/* Refined, cinematic ambient glow */}
          <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(80,200,120,0.25)_0%,transparent_70%)] mix-blend-screen filter blur-[60px] z-0"></div>
          <Image
            src="/hero-truck-1-red.png"
            alt="Nexar Dispatch — Semi Truck"
            width={1800}
            height={950}
            priority
            className="w-full h-auto object-contain object-bottom select-none drop-shadow-2xl relative z-10"
            style={{
              maxHeight: "84vh",
              // Realistic drop shadow for depth, without neon glow
              filter: "drop-shadow(-20px 30px 60px rgba(0,0,0,0.95)) drop-shadow(-5px 15px 25px rgba(0,0,0,0.85))",
            }}
          />
        </div>
      </div>


    </section>
  );
}
