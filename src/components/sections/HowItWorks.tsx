"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  ClipboardCheck,
  Container,
  Truck,
  BadgePercent,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Step data ───────────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    side: "right" as const,
    Icon: ClipboardCheck,
    title: "Submit Required Paperwork",
    desc: "Get started instantly by submitting your MC authority, insurance, and carrier packet. Our onboarding team reviews and approves same-day so you're dispatching within 24 hours.",
  },
  {
    id: 2,
    side: "left" as const,
    Icon: Container,
    title: "Get Matched With Your First 2 Free Loads",
    desc: "We scout the load boards and broker networks to find high-paying freight that matches your equipment, preferred lanes, and rate expectations — no guesswork.",
  },
  {
    id: 3,
    side: "right" as const,
    Icon: Truck,
    title: "Worry-Free As A VIP Carrier",
    desc: "Sit back while your dedicated dispatcher handles rate negotiations, broker communications, check calls, and paperwork — keeping your wheels turning profitably.",
  },
  {
    id: 4,
    side: "left" as const,
    Icon: BadgePercent,
    title: "Continue Dispatching At Unbeatable Rates",
    desc: "Lock in consistent revenue with our proven dispatch process. We continuously optimize your lane mix and rate-per-mile so your earnings only go up over time.",
  },
];

/* ─── Arrow chevron SVG ─────────────────────────────────────── */
function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4 L20 22 L36 4" stroke="#555" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Step Card ───────────────────────────────────────────────── */
function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <div
      className={`hiw-card hiw-card-${index} relative rounded-2xl p-6 md:p-7`}
      style={{
        background: "rgba(6, 18, 14, 0.8)",
        border: "1px solid rgba(80, 200, 120, 0.15)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        maxWidth: 380,
        width: "100%",
      }}
    >
      {/* Subtle ambient green corner */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            step.side === "right"
              ? "radial-gradient(ellipse 80% 60% at 90% 10%, rgba(80,200,120,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(80,200,120,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Step badge */}
      <div className="mb-4 relative z-10">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase"
          style={{
            background: "linear-gradient(90deg, #50C878 0%, #a8f060 100%)",
            color: "#0a1f00",
            boxShadow: "0 0 12px rgba(127,224,77,0.55), 0 0 28px rgba(127,224,77,0.22)",
          }}
        >
          Step {step.id}
        </span>
      </div>
      {/* Title */}
      <h3
        className="relative z-10 font-display font-black text-[#F1F5F9] mb-3 leading-tight"
        style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)" }}
      >
        {step.title}
      </h3>
      {/* Body */}
      <p
        className="relative z-10 text-[#94A3B8] leading-relaxed"
        style={{ fontSize: "clamp(0.75rem, 1vw, 0.88rem)" }}
      >
        {step.desc}
      </p>
    </div>
  );
}

/* ─── Icon Bubble ─────────────────────────────────────────────── */
function IconBubble({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const { Icon } = step;
  return (
    <div
      className={`hiw-bubble hiw-bubble-${index} relative flex items-center justify-center rounded-full shrink-0`}
      style={{
        width: 72,
        height: 72,
        background: "rgba(6, 18, 14, 0.85)",
        border: "1px solid rgba(80, 200, 120, 0.15)",
        boxShadow:
          "0 0 0 7px rgba(80,200,120,0.05), 0 4px 30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(80,200,120,0.1)",
      }}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "0 0 18px rgba(80,200,120,0.15), 0 0 45px rgba(80,200,120,0.08)",
        }}
      />
      <Icon
        className="relative z-10"
        style={{ width: 28, height: 28, color: "#50C878", strokeWidth: 1.5 }}
      />
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      /* Header fade in */
      gsap.from(".hiw-header", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      /* Dashed line draw */
      gsap.from(".hiw-line-inner", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hiw-line-wrap",
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      /* Cards + bubbles — staggered per row, cards pop from sides */
      STEPS.forEach((step, i) => {
        const fromX = step.side === "right" ? 90 : -90;

        gsap.from(`.hiw-card-${i}`, {
          opacity: 0,
          x: fromX,
          scale: 0.92,
          duration: 0.9,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: `.hiw-row-${i}`,
            start: "top 83%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(`.hiw-bubble-${i}`, {
          opacity: 0,
          scale: 0.55,
          duration: 0.65,
          ease: "back.out(2.2)",
          delay: 0.12,
          scrollTrigger: {
            trigger: `.hiw-row-${i}`,
            start: "top 83%",
            toggleActions: "play none none none",
          },
        });

        /* Arrows between steps */
        if (i < STEPS.length - 1) {
          gsap.from(`.hiw-arrow-${i}`, {
            opacity: 0,
            y: -18,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.hiw-row-${i}`,
              start: "bottom 88%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      /* Truck slide in */
      gsap.from(".hiw-truck", {
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-truck",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      /* Giant NEXAR text reveal */
      gsap.from(".hiw-nexar-text", {
        opacity: 0,
        y: 70,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-nexar-text",
          start: "top 98%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative w-full overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ── Ambient background glows ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 12% 28%, rgba(55,105,15,0.38) 0%, transparent 65%), radial-gradient(ellipse 42% 40% at 88% 68%, rgba(40,90,10,0.28) 0%, transparent 65%)",
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 md:pt-28 pb-0">

        {/* ── Section header ── */}
        <div className="hiw-header text-center mb-16 md:mb-20">
          <p
            className="font-black uppercase mb-4"
            style={{
              fontSize: "clamp(0.68rem, 1vw, 0.82rem)",
              color: "#50C878",
              letterSpacing: "0.2em",
            }}
          >
            How It Works
          </p>
          <h2
            className="font-display font-black text-[#F1F5F9] uppercase leading-tight mb-5"
            style={{ fontSize: "clamp(1.85rem, 4.2vw, 3.4rem)", letterSpacing: "-0.02em" }}
          >
            Seamless Logistics In 4 Steps
            <br />
            With Nexar
          </h2>
          <p
            className="text-[#94A3B8] mx-auto"
            style={{
              fontSize: "clamp(0.82rem, 1.2vw, 0.97rem)",
              maxWidth: 480,
              lineHeight: 1.68,
            }}
          >
            Finally, A Dispatch Service That Helps Truckers Like You Operate Profitably And Stress-Free
          </p>
        </div>

        {/* ── Timeline grid ── */}
        <div className="relative">

          {/* Vertical dashed line — desktop only */}
          <div
            className="hiw-line-wrap hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 z-0 pointer-events-none"
            style={{ width: 2 }}
          >
            <div
              className="hiw-line-inner w-full h-full"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #555 0px, #555 10px, transparent 10px, transparent 22px)",
                borderRadius: 999,
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div key={step.id} className={`hiw-row-${i} relative`}>

                {/* Top arrow (before each step except first) */}
                {i > 0 && (
                  <div
                    className={`hiw-arrow-${i - 1} hidden md:flex justify-center items-center`}
                    style={{ height: 48 }}
                  >
                    <ArrowDown className="w-9 h-8 opacity-65" />
                  </div>
                )}

                {/* Desktop 3-column row */}
                <div
                  className="hidden md:grid w-full items-center"
                  style={{ gridTemplateColumns: "1fr 100px 1fr" }}
                >
                  {/* Left slot */}
                  <div className="flex justify-end pr-10 py-5">
                    {step.side === "left" ? (
                      <StepCard step={step} index={i} />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Center: icon bubble */}
                  <div className="flex justify-center relative z-10">
                    <IconBubble step={step} index={i} />
                  </div>

                  {/* Right slot */}
                  <div className="flex justify-start pl-10 py-5">
                    {step.side === "right" ? (
                      <StepCard step={step} index={i} />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>

                {/* Mobile stacked row */}
                <div className="flex md:hidden w-full flex-col items-center gap-4 py-4">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 48,
                      height: 48,
                      background: "radial-gradient(circle, #2a2a2a, #111)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 0 16px rgba(127,224,77,0.14)",
                    }}
                  >
                    {(() => { const { Icon } = step; return <Icon style={{ width: 22, height: 22, color: "#50C878", strokeWidth: 1.5 }} />; })()}
                  </div>
                  <StepCard step={step} index={i} />
                  {i < STEPS.length - 1 && (
                    <div className="flex flex-col items-center gap-1 py-1 opacity-40">
                      <div style={{ width: 1, height: 20, background: "#555" }} />
                      <ArrowDown className="w-6 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Truck + NEXAR footer — shared stacking container ── */}
      <div
        className="relative w-full"
        style={{ height: "clamp(320px, 38vw, 560px)" }}
      >
        {/* Deep green floor glow — bleeds up behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 110%, rgba(45,110,10,0.45) 0%, rgba(20,60,5,0.25) 45%, transparent 72%)",
          }}
        />

        {/* ── Giant NEXAR — bottom layer, image-clipped ── */}
        <div
          className="hiw-nexar-text absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center overflow-hidden select-none pointer-events-none"
          style={{ height: "75%" }}
        >
          <span
            className="font-display font-black uppercase leading-none block w-full text-center"
            style={{
              fontSize: "clamp(7rem, 20vw, 18rem)",
              letterSpacing: "-0.02em",
              /* Image clipped through letters */
              backgroundImage: "url('/text-bg-image.png')",
              backgroundSize: "110% auto",
              backgroundPosition: "center 60%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              /* Fade top edge so truck sits above it naturally */
              maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 100%)",
            }}
          >
            NEXAR
          </span>
        </div>

        {/* ── Orange undercarriage glow — between truck and text ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-20"
          style={{
            bottom: "58%",
            left: "50%",
            transform: "translateX(10%)",
            width: "clamp(280px, 40vw, 620px)",
            height: 40,
            background:
              "radial-gradient(ellipse 90% 100% at 50% 50%, rgba(245,140,30,0.38) 0%, rgba(245,140,30,0.12) 55%, transparent 80%)",
            filter: "blur(8px)",
          }}
        />

        {/* ── Truck image — sits above the NEXAR text ── */}
        <div
          className="hiw-truck absolute z-50 pointer-events-none"
          style={{
            /* Position right side, front cab near center line */
            left: "50%",
            transform: "translateX(-5%)",
            /* Push truck ABOVE the text block */
            bottom: "60%",
            width: "clamp(400px, 50vw, 850px)",
          }}
        >
          <Image
            src="/how-it-works-truck.png"
            alt="Nexar Dispatch Semi Truck"
            width={850}
            height={425}
            unoptimized
            priority={false}
            className="w-full h-auto object-contain"
            style={{
              filter:
                "drop-shadow(-20px 30px 60px rgba(0,0,0,1)) drop-shadow(0 10px 40px rgba(0,0,0,0.95)) drop-shadow(0 0 80px rgba(0,0,0,0.9))",
            }}
          />
        </div>

        {/* Top fade — blends section into the steps above */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0 z-40"
          style={{
            height: "30%",
            background: "linear-gradient(to bottom, #000 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
