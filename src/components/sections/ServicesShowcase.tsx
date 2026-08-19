'use client';
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import React, { useRef } from 'react';
import Image from 'next/image';


import { Plane, Ship, ShieldCheck, Warehouse, Truck, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const services = [
  {
    title: 'AIR FREIGHT',
    description: 'Express, priority, and deferred options across global trade lanes — managed end to end for speed.',
    icon: Plane,
  },
  {
    title: 'OCEAN FREIGHT',
    description: 'FCL, LCL, and specialized cargo movements, with structured carrier selection for cost and reliability.',
    icon: Ship,
  },
  {
    title: 'CUSTOMS BROKERAGE',
    description: 'In-house licensed brokerage covering classification, compliance, and quarantine — full control.',
    icon: ShieldCheck,
  },
  {
    title: 'WAREHOUSING & 3PL',
    description: 'Scalable storage, pick and pack, and distribution — fully integrated with freight and transport operations.',
    icon: Warehouse,
  },
  {
    title: 'DOMESTIC TRANSPORT',
    description: 'Local, metro, and interstate transport managed for consistent service levels and full delivery visibility.',
    icon: Truck,
  },
];

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const servicesWrapperRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    tl.fromTo(
      truckRef.current,
      { xPercent: -20, x: '0vw' },
      { xPercent: 100, x: '100vw', ease: 'none', duration: 1 },
      0.3
    );

    const wrapperWidth = servicesWrapperRef.current?.scrollWidth || 0;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

    tl.fromTo(
      servicesWrapperRef.current,
      { x: windowWidth - 600 },
      { x: -wrapperWidth, ease: 'none', duration: 1 },
      0.3
    );

    tl.fromTo(
      bgTextRef.current,
      { xPercent: -5 },
      { xPercent: 5, ease: 'none', duration: 1 },
      0.3
    );

    tl.to(stickyRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.inOut'
    }, 1.3);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] z-10 pointer-events-none">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center pointer-events-auto bg-[#000000]">

        {/* Subtle Ambient background glows to match How It Works section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 12% 28%, rgba(55,105,15,0.38) 0%, transparent 65%), radial-gradient(ellipse 42% 40% at 88% 68%, rgba(40,90,10,0.28) 0%, transparent 65%)",
          }}
        />

        {/* GHOST "SERVICES" TEXT - Adjusted for perfect placement */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <div
            ref={bgTextRef}
            className="whitespace-nowrap text-[25vw] md:text-[20vw] font-display font-black uppercase tracking-tighter select-none"
            style={{ 
              color: 'rgba(241, 245, 249, 0.04)',
              maskImage: 'linear-gradient(to bottom, transparent 10%, black 50%, transparent 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 50%, transparent 90%)'
            }}
          >
            SERVICES
          </div>
        </div>

        {/* Top Left label */}
        <div className="absolute top-8 left-8 text-xs md:text-sm font-bold tracking-widest text-[#50C878] z-10 uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-[#50C878] rounded-full animate-pulse"></span>
          Our Expertise
        </div>

        {/* ── THE STUDIO SHOWCASE SCENE ── */}
        <div className="relative w-full max-w-[1800px] h-full flex flex-col items-center justify-center pt-24 z-10 overflow-hidden md:overflow-visible">
          
          {/* Stage for Truck and Road */}
          <div className="relative w-[90vw] lg:w-[65vw] max-w-[1100px] flex flex-col items-center mb-16 lg:mb-24">
            
            {/* STATIONARY ROAD (Spans full viewport width) */}
            <div className="absolute -bottom-[4.5%] left-1/2 -translate-x-1/2 w-[100vw] z-0 pointer-events-none flex flex-col items-center">
              {/* Very subtle studio floor line */}
              <div className="w-[90vw] md:w-[70vw] h-[1px] bg-gradient-to-r from-transparent via-[#50C878]/20 to-transparent" />
              <div className="absolute top-0 w-[60vw] md:w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* TRUCK ASSET (Moving) */}
            <div
              ref={truckRef}
              className="relative z-20 w-full pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            >
              <Image
                src="/truck-sideView.png"
                alt="Semi Truck Side Profile"
                width={1200}
                height={400}
                className="w-full h-auto object-contain relative z-10"
                priority
              />
              
              {/* Dynamic Floor Highlight (Moves with truck to illuminate the stationary floor) */}
              <div className="absolute -bottom-[4.5%] left-[15%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-[#50C878]/60 to-transparent shadow-[0_0_15px_rgba(80,200,120,0.5)] z-10" />

              {/* Contact Shadows (Moves with the truck) */}
              <div className="absolute -bottom-[5%] left-[5%] w-[90%] h-[8px] md:h-[12px] bg-black rounded-[100%] blur-[4px] md:blur-[6px] opacity-100 z-[5]" />
              {/* Massive Ambient Shadow */}
              <div className="absolute -bottom-[10%] left-[10%] w-[80%] h-[30px] md:h-[50px] bg-black rounded-[100%] blur-[16px] md:blur-[24px] opacity-100 z-[-1]" />
            </div>
          </div>

          {/* CARDS FOREGROUND (Positioned strictly below the truck) */}
          <div className="relative w-full flex items-center z-30 pointer-events-none h-[40vh]">
            {/* SVG Gradient Definition for Icons */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
              <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#50C878" />
                <stop offset="100%" stopColor="#0B3D2E" />
              </linearGradient>
            </svg>

            <div
              ref={servicesWrapperRef}
              className="flex items-center gap-6 lg:gap-8 absolute left-0 lg:left-[5vw] min-w-max pointer-events-auto"
            >
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <React.Fragment key={idx}>
                    <div 
                      className="flex flex-col gap-3 w-[300px] md:w-[360px] px-8 py-8 group cursor-pointer rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
                      style={{ 
                        background: 'rgba(6, 18, 14, 0.45)', 
                        border: '1px solid rgba(80, 200, 120, 0.15)', 
                        backdropFilter: 'blur(24px)' 
                      }}
                    >
                      {/* Inner border glow highlight */}
                      <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" />

                      <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-black/60 rounded-xl border border-white/10 relative overflow-hidden shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#50C878] to-[#0B3D2E] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                          <Icon className="w-8 h-8 md:w-9 md:h-9 relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} style={{ stroke: 'url(#brand-gradient)' }} />
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-[#E2E8F0] uppercase tracking-tight leading-tight transition-all duration-300 mt-2">
                        <span className="bg-clip-text transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#50C878] group-hover:to-[#0B3D2E]">
                          {service.title}
                        </span>
                      </h3>
                      <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed transition-colors mt-1">
                        {service.description}
                      </p>
                    </div>

                    {idx < services.length - 1 && (
                      <div className="shrink-0 px-2 opacity-30 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} style={{ stroke: 'url(#brand-gradient)' }} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


