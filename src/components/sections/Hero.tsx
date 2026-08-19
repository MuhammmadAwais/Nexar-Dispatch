"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COMPANY_LOGOS = [
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 48 48" className="h-8 md:h-10 w-auto">
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
      <svg viewBox="0 0 23 23" className="h-8 md:h-10 w-auto">
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
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto">
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
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto">
        <path fill="#E50914" d="M5.4 0v24L18.6 0v24h-4V4l-10.2 20H3.4V0z"/>
      </svg>
    )
  },
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 24 24" className="h-8 md:h-10 w-auto">
        <path fill="#635BFF" d="M22.8 10.3c0-4.6-3.4-7.5-8.3-7.5-5.2 0-8.8 3.5-8.8 8.6 0 4.8 3.3 7.8 8.5 7.8 2.6 0 5-.8 6.7-2.3l-1.3-2.6c-1.4 1.1-3 1.6-4.9 1.6-2.5 0-4.6-1.1-5-3.8h12.9c.1-.6.2-1.2.2-1.8zm-12.8-1.5c.3-2.1 2-3.4 4.5-3.4 2.5 0 4 1.2 4.1 3.4H10zM3.4 23.3V7.6h3.6v15.7zM7 3.8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
      </svg>
    )
  }
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
            className="font-display font-black uppercase text-[#F1F5F9] leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
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
            
            {/* Third line: Highlighted gradient text without neon glow */}
            <div className="pt-2 pb-2 w-max">
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
          <p
            className="hero-sub text-[#948E82] font-medium mb-10 max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", lineHeight: 1.6 }}
          >
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

        <div className="hero-truck absolute right-[-5%] md:right-[-10%] lg:right-[-15%] xl:right-[-20%] bottom-0 lg:bottom-[75px] flex items-end justify-end pointer-events-none w-[90%] md:w-[75%] lg:w-[65%] xl:w-[55%] z-[5]">
          {/* Refined, cinematic ambient glow */}
          <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(80,200,120,0.25)_0%,transparent_70%)] mix-blend-screen filter blur-[60px] z-0"></div>
          <Image
            src="/new-hero.webp"
            alt="Nexar Dispatch — Semi Truck"
            width={1600}
            height={1000}
            priority
            className="w-full h-auto object-contain object-bottom select-none drop-shadow-2xl relative z-10"
            style={{
              maxHeight: "85vh",
              // Realistic drop shadow for depth, without neon glow
              filter: "drop-shadow(-20px 30px 60px rgba(0,0,0,0.95)) drop-shadow(-5px 15px 25px rgba(0,0,0,0.85))",
            }}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          Infinite Marquee Strip 
          Fixed at bottom of screen, smoothly blended
      ═══════════════════════════════════════ */}
      <div
        className="group absolute bottom-0 left-0 w-full z-[10] overflow-hidden border-t border-white/5 bg-transparent backdrop-blur-[2px]"
        style={{
          // Fade out the left and right edges smoothly
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
        aria-label="Trusted by companies carousel"
      >
        <div
          className="animate-marquee group-hover:[animation-play-state:paused] flex items-center whitespace-nowrap py-4 md:py-6 cursor-pointer"
          style={{ willChange: "transform" }}
        >
          {/* Duplicate array to ensure infinite smooth scrolling */}
          {[...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
            <div 
              key={i} 
              className="group/logo flex items-center justify-center shrink-0 px-6 sm:px-8 md:px-12"
              title={logo.name}
            >
              <div className="grayscale opacity-40 transition-all duration-400 ease-out group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 cursor-pointer">
                {logo.svg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
