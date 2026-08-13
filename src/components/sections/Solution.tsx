"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Route, ShieldCheck, BarChart3, Headphones, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [
  {
    id: 1,
    label: "01 — SMART DISPATCH",
    accent: "Speed.",
    heading: "Routes built for\nprecision.",
    body: "Our dispatch engine evaluates thousands of route combinations in real-time — delivering the most profitable loads to the right drivers.",
    features: ["AI-Powered Load Matching", "Live Traffic Re-routing", "Zero Deadhead Miles"],
    stat: "40%",
    statLabel: "Fewer Empty Miles",
    stat2: "2x",
    stat2Label: "Driver Utilization",
    icon: Route,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=90",
    imageAlt: "Semi truck on open highway at dusk",
  },
  {
    id: 2,
    label: "02 — COMPLIANCE",
    accent: "Protected.",
    heading: "Every regulation.\nCovered.",
    body: "From ELD mandates to FMCSA rules, our compliance engine keeps your fleet operating within the law — flagging violations before they become fines.",
    features: ["ELD Integration", "FMCSA Auto-Reporting", "Driver HOS Monitoring"],
    stat: "100%",
    statLabel: "Compliance Rate",
    stat2: "$0",
    stat2Label: "Avg. Violation Cost",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=90",
    imageAlt: "Shipping containers at port",
  },
  {
    id: 3,
    label: "03 — LIVE INTEL",
    accent: "Visible.",
    heading: "See everything.\nMiss nothing.",
    body: "Real-time GPS, load status, and driver comms unified in one dashboard. Your clients stay informed — automatically.",
    features: ["Real-Time GPS Tracking", "Automated Client Updates", "Unified Comms Dashboard"],
    stat: "24/7",
    statLabel: "Live Tracking",
    stat2: "< 3min",
    stat2Label: "Update Frequency",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=90",
    imageAlt: "Logistics operations dashboard",
  },
  {
    id: 4,
    label: "04 — SUPPORT",
    accent: "Reliable.",
    heading: "A real team behind\nevery load.",
    body: "No bots. No hold music. Your dedicated dispatch team handles driver issues, shipper escalations, and rate negotiations around the clock.",
    features: ["Dedicated Dispatch Agent", "24/7 Phone & Chat", "Rate Negotiation Included"],
    stat: "< 2min",
    statLabel: "Avg. Response Time",
    stat2: "98%",
    stat2Label: "Client Satisfaction",
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=90",
    imageAlt: "Warehouse logistics team",
  },
];

export function Solution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || !stickyRef.current || reducedMotion) return;

    const n = slides.length;

    // ── SET ALL INITIAL STATES VIA GSAP (not inline style) ──
    // This is the key fix: GSAP must own all initial states, not React inline styles.

    // Slide 0 is visible
    gsap.set(".sol-slide-0", { opacity: 1 });
    for (let i = 1; i < n; i++) {
      gsap.set(`.sol-slide-${i}`, { opacity: 0 });
    }

    // All headings: slide 0 at home, rest off-screen bottom-right
    gsap.set(".sol-accent-0, .sol-heading-0, .sol-body-0, .sol-features-0", { opacity: 1, x: 0, y: 0 });
    for (let i = 1; i < n; i++) {
      gsap.set(`.sol-accent-${i}`, { opacity: 0, x: "8vw", y: "4vh" });
      gsap.set(`.sol-heading-${i}`, { opacity: 0, x: "10vw", y: "6vh" });
      gsap.set(`.sol-body-${i}`, { opacity: 0, y: "50px" });
      gsap.set(`.sol-features-${i}`, { opacity: 0, y: "40px" });
    }

    // Stat cards: slide 0 visible, rest off-screen
    gsap.set(".sol-stat-0", { opacity: 1, scale: 1, y: 0 });
    for (let i = 1; i < n; i++) {
      gsap.set(`.sol-stat-${i}`, { opacity: 0, scale: 0.8, y: "20px" });
    }

    // Images: slide 0 at home, rest off-screen right
    gsap.set(".sol-img-0", { opacity: 1, x: "0%" });
    for (let i = 1; i < n; i++) {
      gsap.set(`.sol-img-${i}`, { opacity: 0, x: "110%" });
    }

    // Progress dots
    gsap.set(".sol-dot-0", { width: "28px", backgroundColor: "var(--color-accent)" });
    for (let i = 1; i < n; i++) {
      gsap.set(`.sol-dot-${i}`, { width: "8px", backgroundColor: "var(--color-line-bright)" });
    }

    // ── TIMELINE ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    const seg = 1 / (n - 1); // duration per transition in tl units

    for (let i = 0; i < n - 1; i++) {
      const at = i * seg;           // when this transition starts
      const d = seg * 0.45;         // half of segment = outgoing
      const inAt = at + seg * 0.4;  // when incoming starts (slight overlap for smoothness)
      const inD = seg * 0.5;

      // OUTGOING (slide i)
      tl.to(`.sol-accent-${i}`,   { opacity: 0, x: "-25vw", y: "-15vh", duration: d, ease: "power3.in" }, at);
      tl.to(`.sol-heading-${i}`,  { opacity: 0, x: "-30vw", y: "-20vh", duration: d * 1.1, ease: "power2.inOut" }, at);
      tl.to(`.sol-body-${i}`,     { opacity: 0, x: "-20vw", y: "15vh",  duration: d, ease: "power2.in" }, at + 0.02);
      tl.to(`.sol-features-${i}`, { opacity: 0, x: "-15vw", duration: d * 0.8, ease: "power2.in" }, at + 0.04);
      tl.to(`.sol-stat-${i}`,     { opacity: 0, y: "30px", scale: 0.85, duration: d * 0.7, ease: "power2.in" }, at);
      // Image slides out left
      tl.to(`.sol-img-${i}`,  { opacity: 0, x: "-110%", duration: d * 1.3, ease: "power3.inOut" }, at);

      // INCOMING (slide i+1)
      tl.to(`.sol-slide-${i + 1}`, { opacity: 1, duration: 0.01 }, inAt);
      tl.to(`.sol-accent-${i + 1}`,   { opacity: 1, x: 0, y: 0, duration: inD * 0.7, ease: "power3.out" }, inAt);
      tl.to(`.sol-heading-${i + 1}`,  { opacity: 1, x: 0, y: 0, duration: inD * 0.8, ease: "power3.out" }, inAt + 0.03);
      tl.to(`.sol-body-${i + 1}`,     { opacity: 1, y: 0,        duration: inD * 0.7, ease: "power3.out" }, inAt + 0.06);
      tl.to(`.sol-features-${i + 1}`, { opacity: 1, y: 0,        duration: inD * 0.6, ease: "power3.out" }, inAt + 0.09);
      tl.to(`.sol-stat-${i + 1}`,     { opacity: 1, scale: 1, y: 0, duration: inD * 0.6, ease: "back.out(1.8)" }, inAt + 0.12);
      // Image slides in from right
      tl.to(`.sol-img-${i + 1}`, { opacity: 1, x: "0%", duration: inD * 1.2, ease: "power3.out" }, inAt - 0.04);

      // Dots
      tl.to(`.sol-dot-${i}`,     { width: "8px", backgroundColor: "var(--color-line-bright)", duration: d * 0.4 }, at + 0.05);
      tl.to(`.sol-dot-${i + 1}`, { width: "28px", backgroundColor: "var(--color-accent)",     duration: d * 0.4 }, inAt);
    }

    // Fade out at end
    tl.to(stickyRef.current, { opacity: 0, duration: 0.06, ease: "power2.inOut" }, 0.95);

  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={containerRef}
      // Negative top margin to sit flush under RoadJourney (same pattern as other sticky sections)
      className="relative w-full h-[500vh] bg-bg -mt-[100vh] z-25"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-bg"
      >
        {/* ── LAYOUT: Full-screen split ── */}
        <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden">

          {/* ── LEFT: Text content ── */}
          <div className="relative flex flex-col justify-center px-10 md:px-16 lg:px-20 overflow-hidden z-10">

            {/* Rotated side label — like reference */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
              <div className="relative h-4 w-44 overflow-hidden">
                {slides.map((slide, i) => (
                  <span
                    key={i}
                    className={`sol-slide-${i} absolute left-0 top-0 text-[10px] font-black tracking-[0.2em] text-text-muted uppercase whitespace-nowrap`}
                  >
                    {slide.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="relative ml-16 md:ml-20 max-w-[520px]">

              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs font-black tracking-[0.2em] uppercase text-accent">
                  Our Solutions
                </span>
              </div>

              {/* Stacked slide content — all absolute except slide 0 */}
              <div className="relative">
                {slides.map((slide, i) => {
                  const Icon = slide.icon;
                  return (
                    <div
                      key={slide.id}
                      className={`${i === 0 ? "relative" : "absolute inset-0"}`}
                    >
                      {/* Big accent word (colored) */}
                      <p className={`sol-accent-${i} text-display-xl font-display font-black text-accent leading-none mb-1`}>
                        {slide.accent}
                      </p>

                      {/* Main heading — mixed weight */}
                      <h2 className={`sol-heading-${i} font-display font-black text-text leading-[1.05] mb-6`}
                        style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", whiteSpace: "pre-line" }}
                      >
                        {slide.heading}
                      </h2>

                      {/* Body */}
                      <p className={`sol-body-${i} text-text-muted text-base md:text-lg leading-relaxed mb-8 max-w-[38ch]`}>
                        {slide.body}
                      </p>

                      {/* Feature checklist */}
                      <ul className={`sol-features-${i} space-y-3 mb-10`}>
                        {slide.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-sm font-semibold text-text-body">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Floating stat chips */}
                      <div className={`sol-stat-${i} flex items-center gap-4`}>
                        <div className="flex items-center gap-3 bg-surface border border-line rounded-2xl px-5 py-3 shadow-sm">
                          <span className="text-2xl md:text-3xl font-black font-display text-accent leading-none">
                            {slide.stat}
                          </span>
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-tight max-w-[60px]">
                            {slide.statLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 bg-accent/8 border border-accent/15 rounded-2xl px-5 py-3">
                          <span className="text-2xl md:text-3xl font-black font-display text-accent leading-none">
                            {slide.stat2}
                          </span>
                          <span className="text-[10px] font-bold text-accent/70 uppercase tracking-widest leading-tight max-w-[60px]">
                            {slide.stat2Label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-12">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`sol-dot-${i} h-1.5 rounded-full`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Full-bleed image carousel ── */}
          <div className="relative overflow-hidden bg-surface-2">
            {/* Left soft fade to blend with left panel */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />

            {/* Images */}
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className={`sol-img-${i} absolute inset-0`}
                style={{ zIndex: i === 0 ? 5 : 4 - i }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                {/* Bottom-to-top vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/25 via-transparent to-transparent pointer-events-none" />
                {/* Right edge fade */}
                <div className="absolute inset-0 bg-gradient-to-l from-bg/5 to-transparent pointer-events-none" />

                {/* Floating badge — top right */}
                <div className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-bg/85 backdrop-blur-md border border-line-bright rounded-full px-4 py-2 shadow-lg">
                  <span className="text-[10px] font-black text-accent tracking-[0.15em] uppercase">
                    {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Floating icon chip — bottom left inside image */}
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 bg-bg/85 backdrop-blur-md border border-line rounded-2xl px-5 py-3 shadow-lg">
                  {(() => { const Icon = slide.icon; return <Icon className="w-5 h-5 text-accent" />; })()}
                  <span className="text-sm font-bold text-text">{slide.features[0]}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Top gradient fade for smooth transition from RoadJourney */}
        <div className="absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-bg to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  );
}
