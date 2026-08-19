"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const COMPANY_LOGOS = [
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 48 48" className="h-6 w-auto">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    )
  },
  {
    name: "Microsoft",
    svg: (
      <svg viewBox="0 0 23 23" className="h-6 w-auto">
        <path fill="#f35325" d="M0 0h11v11H0z"/>
        <path fill="#81bc06" d="M12 0h11v11H12z"/>
        <path fill="#05a6f0" d="M0 12h11v11H0z"/>
        <path fill="#ffba08" d="M12 12h11v11H12z"/>
      </svg>
    )
  },
  {
    name: "Slack",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto">
        <path fill="#e01e5a" d="M9 3.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 3h3v9H9v-9z"/>
        <path fill="#36c5f0" d="M20.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3 0v-3h-9v3h9z"/>
        <path fill="#2eb67d" d="M15 20.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm0-3h-3v-9h3v9z"/>
        <path fill="#ecb22e" d="M3.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm3 0v3h9v-3h-9z"/>
      </svg>
    )
  },
  {
    name: "Netflix",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto">
        <path fill="#E50914" d="M5.4 0v24L18.6 0v24h-4V4l-10.2 20H3.4V0z"/>
      </svg>
    )
  },
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 24 24" className="h-6 w-auto">
        <path fill="#635BFF" d="M22.8 10.3c0-4.6-3.4-7.5-8.3-7.5-5.2 0-8.8 3.5-8.8 8.6 0 4.8 3.3 7.8 8.5 7.8 2.6 0 5-.8 6.7-2.3l-1.3-2.6c-1.4 1.1-3 1.6-4.9 1.6-2.5 0-4.6-1.1-5-3.8h12.9c.1-.6.2-1.2.2-1.8zm-12.8-1.5c.3-2.1 2-3.4 4.5-3.4 2.5 0 4 1.2 4.1 3.4H10zM3.4 23.3V7.6h3.6v15.7zM7 3.8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
      </svg>
    )
  }
];

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
        {/* Headline */}
        <h1
          className="font-display font-black uppercase text-[#F1F5F9] leading-[1.05] mb-4"
          style={{ fontSize: "7.5vw", letterSpacing: "-0.02em" }}
        >
          <div className="pb-1 w-max">
            <span className="hero-h1-line block whitespace-nowrap">
              DISPATCH SERVICES
            </span>
          </div>
          <div className="pb-1 w-max">
            <span className="hero-h1-line block whitespace-nowrap">
              THAT MAXIMIZE
            </span>
          </div>
          
          <div className="pt-1 pb-1 w-max">
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
          </div>
        </h1>

        {/* Sub-headline */}
        <p className="hero-sub text-[#948E82] font-medium mb-8 max-w-sm text-[15px] leading-relaxed">
          While You&apos;re Fighting for{" "}
          <strong className="text-[#F1F5F9] font-bold">$1.80/Mile</strong>,{" "}
          We&apos;re Getting Our Drivers{" "}
          <strong
            style={{
              background: "linear-gradient(90deg, #50C878, #004D40)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            $2.30+
          </strong>
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
      <div className="hero-truck relative flex-1 w-full z-10 flex items-end justify-end overflow-hidden pb-16">
        <Image
          src="/new-hero.webp"
          alt="Nexar Dispatch — Semi Truck"
          width={800}
          height={500}
          priority
          className="w-[105%] max-w-none h-auto object-contain translate-x-[5%]"
          style={{
            filter: "drop-shadow(-10px 15px 30px rgba(0,0,0,0.9))",
          }}
        />
      </div>

      {/* ── Marquee Strip (Fixed at Bottom) ── */}
      <div
        className="absolute bottom-0 left-0 w-full z-20 overflow-hidden border-t border-white/5 bg-black/60 backdrop-blur-md"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="animate-marquee flex items-center whitespace-nowrap py-4"
          style={{ willChange: "transform" }}
        >
          {[...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
            <div key={i} className="flex items-center justify-center shrink-0 px-6">
              <div className="grayscale opacity-50">
                {logo.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
