"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import {
  ClipboardCheck,
  Container,
  Truck,
  BadgePercent,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    id: 1,
    Icon: ClipboardCheck,
    title: "Submit Required Paperwork",
    desc: "Get started instantly by submitting your MC authority, insurance, and carrier packet. Our onboarding team reviews and approves same-day so you're dispatching within 24 hours.",
  },
  {
    id: 2,
    Icon: Container,
    title: "Get Matched With Your First 2 Free Loads",
    desc: "We scout the load boards and broker networks to find high-paying freight that matches your equipment, preferred lanes, and rate expectations — no guesswork.",
  },
  {
    id: 3,
    Icon: Truck,
    title: "Worry-Free As A VIP Carrier",
    desc: "Sit back while your dedicated dispatcher handles rate negotiations, broker communications, check calls, and paperwork — keeping your wheels turning profitably.",
  },
  {
    id: 4,
    Icon: BadgePercent,
    title: "Continue Dispatching At Unbeatable Rates",
    desc: "Lock in consistent revenue with our proven dispatch process. We continuously optimize your lane mix and rate-per-mile so your earnings only go up over time.",
  },
];

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4 L20 22 L36 4" stroke="#555" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileStepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  return (
    <div
      className={`hiw-mobile-card-${index} relative rounded-2xl p-6`}
      style={{
        background: "rgba(6, 18, 14, 0.8)",
        border: "1px solid rgba(80, 200, 120, 0.15)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        width: "100%",
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(80,200,120,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="mb-4 relative z-10 flex justify-center">
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
      <h3 className="relative z-10 font-display font-black text-[#F1F5F9] mb-3 leading-tight text-center text-[1.1rem]">
        {step.title}
      </h3>
      <p className="relative z-10 text-[#94A3B8] leading-relaxed text-center text-[0.85rem]">
        {step.desc}
      </p>
    </div>
  );
}

export function MobileHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      gsap.from(".hiw-mobile-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".hiw-mobile-header",
          start: "top 85%",
        },
      });

      STEPS.forEach((_, i) => {
        gsap.from(`.hiw-mobile-card-${i}`, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.hiw-mobile-card-${i}`,
            start: "top 88%",
          },
        });
      });

      gsap.from(".hiw-mobile-truck", {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-mobile-truck",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="how-it-works-mobile"
      className="relative w-full overflow-hidden bg-black pt-16 pb-0"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 20%, rgba(55,105,15,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full px-5">
        <div className="hiw-mobile-header text-center mb-12">
          <p className="font-black uppercase mb-3 text-[0.75rem] text-[#50C878] tracking-[0.2em]">
            How It Works
          </p>
          <h2 className="font-display font-black text-[#F1F5F9] uppercase leading-[1.1] mb-4 text-3xl">
            Seamless Logistics In 4 Steps
          </h2>
          <p className="text-[#94A3B8] mx-auto text-[0.9rem] leading-relaxed max-w-[300px]">
            Finally, A Dispatch Service That Helps Truckers Like You Operate Profitably And Stress-Free
          </p>
        </div>

        <div className="flex flex-col relative max-w-sm mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center gap-4 py-3">
              <div
                className="flex items-center justify-center rounded-full z-10 relative"
                style={{
                  width: 44,
                  height: 44,
                  background: "radial-gradient(circle, #2a2a2a, #111)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 0 16px rgba(127,224,77,0.14)",
                }}
              >
                {(() => { const { Icon } = step; return <Icon style={{ width: 20, height: 20, color: "#50C878", strokeWidth: 1.5 }} />; })()}
              </div>
              
              <MobileStepCard step={step} index={i} />
              
              {i < STEPS.length - 1 && (
                <div className="flex flex-col items-center gap-1 py-1 opacity-50">
                  <div style={{ width: 1, height: 24, background: "#555" }} />
                  <ArrowDown className="w-5 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full mt-10 h-[380px] overflow-hidden flex flex-col justify-end">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 100% 70% at 50% 100%, rgba(45,110,10,0.4) 0%, transparent 80%)",
          }}
        />

        {/* ── Giant NEXAR text (Adjusted for mobile) ── */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex items-end justify-center pointer-events-none">
          <span
            className="font-display font-black uppercase leading-none block w-full text-center text-[28vw]"
            style={{
              letterSpacing: "-0.02em",
              backgroundImage: "url('/text-bg-image.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
            }}
          >
            NEXAR
          </span>
        </div>

        {/* ── Orange undercarriage glow ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute z-20"
          style={{
            bottom: "35%",
            left: "50%",
            transform: "translateX(-40%)",
            width: "80%",
            height: 30,
            background: "radial-gradient(ellipse 90% 100% at 50% 50%, rgba(245,140,30,0.3) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* ── Truck image ── */}
        <div className="hiw-mobile-truck absolute z-30 pointer-events-none bottom-[25%] left-1/2 -translate-x-1/2 w-[110%] max-w-[500px]">
          <Image
            src="/how-it-works-truck.png"
            alt="Nexar Dispatch Semi Truck"
            width={600}
            height={300}
            unoptimized
            className="w-full h-auto object-contain"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.9))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
