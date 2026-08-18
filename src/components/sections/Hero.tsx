"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "EFFICIENCY", "RELIABILITY", "INNOVATION", "PRECISION",
  "SAFETY", "TRACKING", "LOGISTICS", "CUSTOMIZATION",
  "DEDICATION", "PERFORMANCE",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
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

      {/* ── Large green glow — left/center behind text to match reference ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 40% 50%, rgba(127,224,77,0.4) 0%, rgba(127,224,77,0.15) 40%, transparent 70%)",
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
            className="font-display font-black uppercase text-white leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            <div className="pb-1 w-max">
              <span 
                className="hero-h1-line block whitespace-nowrap"
                style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.15))" }}
              >
                DISPATCH SERVICES
              </span>
            </div>
            <div className="pb-1 w-max">
              <span 
                className="hero-h1-line block whitespace-nowrap"
                style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.15))" }}
              >
                THAT MAXIMIZE
              </span>
            </div>
            
            {/* Third line: Highlighted gradient text with glow */}
            <div className="pt-2 pb-2 w-max">
              <span 
                className="hero-h1-line block whitespace-nowrap"
                style={{
                  background: "linear-gradient(90deg, #7fe04d 0%, #F5B131 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 25px rgba(127,224,77,0.45)) drop-shadow(0 0 45px rgba(245,177,49,0.3))",
                }}
              >
                YOUR REVENUE!
              </span>
            </div>
          </h1>

          {/* Sub-headline */}
          <p
            className="hero-sub text-[#aaa] font-medium mb-10 max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", lineHeight: 1.6 }}
          >
            While You&apos;re Fighting for{" "}
            <strong className="text-white font-bold">$1.80/Mile</strong>,{" "}
            We&apos;re Getting Our Drivers{" "}
            <strong
              style={{
                background: "linear-gradient(90deg, #7fe04d, #F5B131)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              $2.30+
            </strong>
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex items-center gap-4 mb-6">
            <a
              href="#services"
              className="group relative inline-flex items-center justify-center rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-sm sm:text-[15px] font-bold text-black bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 hover:bg-gray-50"
            >
              Get Started Free
            </a>
            <a
              href="#how-it-works"
              className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-black transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-110 hover:bg-gray-50 shrink-0"
              aria-label="Talk to a Dispatcher"
            >
              <ArrowUpRight size={24} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Truck Image
        ══════════════════════════════ */}
        <div className="hero-truck absolute right-[-5%] lg:right-[-10%] xl:right-[-12%] bottom-[80px] flex items-end justify-end pointer-events-none w-[85%] md:w-[75%] lg:w-[60%] xl:w-[55%] z-[5]">
          <Image
            src="/fullrange-mtn-removebg-preview3.png?v=2"
            alt="Nexar Dispatch — Semi Truck"
            width={1600}
            height={1000}
            priority
            unoptimized
            className="w-full h-auto object-contain object-bottom select-none drop-shadow-2xl"
            style={{
              maxHeight: "70vh",
              // Realistic drop shadow instead of neon glow, matching reference
              filter: "drop-shadow(-20px 30px 60px rgba(0,0,0,0.95)) drop-shadow(-5px 15px 25px rgba(0,0,0,0.85)) drop-shadow(0 0 50px rgba(127,224,77,0.2))",
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          Infinite Marquee Strip 
          Fixed at bottom of screen with VERTICAL gradient
      ═══════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 w-full z-[10] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t border-white/10"
        style={{
          // Vertical gradient: top is green, bottom is yellow
          background: "linear-gradient(180deg, #7fe04d 0%, #F5B131 100%)",
        }}
        aria-label="Services carousel"
      >
        <div
          className="animate-marquee flex items-center whitespace-nowrap py-5 md:py-7 hover:[animation-play-state:paused] cursor-pointer"
          style={{ willChange: "transform" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span className="font-display text-[16px] sm:text-[22px] md:text-[28px] font-black uppercase tracking-[0.1em] text-[#1a1a1a] px-6 sm:px-10">
                {item}
              </span>
              {/* Star separator ✦ */}
              <span className="text-[#1a1a1a] text-xl sm:text-2xl md:text-3xl mx-2" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
