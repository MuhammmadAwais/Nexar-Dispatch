"use client";

import { useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const STATS = [
  { value: "$2.30+", label: "Avg. Rate Per Mile", sub: "vs industry avg $1.80" },
  { value: "98%", label: "On-Time Delivery", sub: "across all loads" },
  { value: "24/7", label: "Dispatcher Access", sub: "always reachable" },
  { value: "500+", label: "Active Drivers", sub: "owner-ops & fleets" },
];

const LOGOS = [
  "DAT", "Truckstop.com", "Amazon Freight", "Echo Global", "C.H. Robinson",
  "Echo Global", "Coyote Logistics", "Convoy", "Uber Freight", "Transfix",
];

export function TrustBar() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-black overflow-hidden border-y border-white/8">
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Green glow top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle at center, rgba(127,224,77,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Yellow glow bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px]"
        style={{
          background: "radial-gradient(circle at center, rgba(245,177,49,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Stats Grid ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888]">
            Proven Results
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 p-8 md:p-10 bg-black hover:bg-white/[0.03] transition-colors duration-300 group"
            >
              <span
                className="text-4xl md:text-5xl font-black font-display leading-none mb-2"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #7fe04d, #a8f07a)"
                    : "linear-gradient(135deg, #F5B131, #f7c96a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </span>
              <span className="text-sm font-bold text-white uppercase tracking-wide">{stat.label}</span>
              <span className="text-xs text-[#666] font-medium mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* ── Load Board Partner Logos Marquee ── */}
        <div className="mt-16">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#555] mb-8">
            We Find Loads On
          </p>
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

            <div className="animate-marquee flex items-center whitespace-nowrap gap-12">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span
                  key={i}
                  className="text-sm font-black uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors duration-300 shrink-0 px-4"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
