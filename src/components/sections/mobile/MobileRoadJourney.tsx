"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "../../../hooks/useReducedMotion";


export function MobileRoadJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !containerRef.current) return;

    // Fade in text blocks as they enter the screen
    (gsap.utils.toArray(".road-mobile-text") as Element[]).forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });

    // Animate the line filling down
    gsap.from(".road-mobile-line-fill", {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: ".road-mobile-timeline",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
      }
    });

    // Make the truck follow the scroll down the line
    gsap.to(".road-mobile-truck-pin", {
      y: () => {
        const timeline = document.querySelector('.road-mobile-timeline');
        return timeline ? timeline.clientHeight : 500;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".road-mobile-timeline",
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
      }
    });

  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section ref={containerRef} className="relative w-full bg-black py-20 overflow-hidden">
      
      {/* Header */}
      <div className="relative z-10 px-6 text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#50C878]" />
          <span className="text-[#50C878] font-bold tracking-[0.15em] text-[10px] uppercase">
            FEATURES
          </span>
        </div>
        <h2 className="text-3xl font-display font-black text-[#F1F5F9] uppercase leading-[1.1] mb-4">
          Smarter Booking. <span className="text-[#50C878]">Total Visibility.</span> Zero Downtime.
        </h2>
        <p className="text-[#94A3B8] text-[0.95rem] leading-relaxed max-w-sm mx-auto">
          We handle the back-office chaos so you can focus on driving.
        </p>
      </div>

      <div className="relative w-full max-w-sm mx-auto px-6 road-mobile-timeline">
        
        {/* The Vertical Road Line */}
        <div className="absolute left-10 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
        <div className="road-mobile-line-fill absolute left-10 top-0 bottom-0 w-1 bg-[#50C878] rounded-full shadow-[0_0_15px_#50C878]" />

        {/* The Truck moving down */}
        <div className="road-mobile-truck-pin absolute left-10 -ml-4 -mt-4 w-10 h-10 z-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#50C878]/20 blur-md rounded-full" />
          <Image
            src="/how-it-works-truck.png"
            alt="Truck"
            width={40}
            height={40}
            className="w-full h-auto object-contain rotate-90 drop-shadow-md"
            unoptimized
          />
        </div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-24 relative z-10 pt-10 pb-10 ml-10 pl-8">
          
          <div className="road-mobile-text relative">
            <div className="absolute -left-[45px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-[#50C878] shadow-[0_0_10px_#50C878] z-30" />
            <span className="text-[#50C878] text-[10px] font-bold tracking-widest uppercase mb-1 block">01</span>
            <h3 className="text-xl font-black text-[#F1F5F9] uppercase tracking-tight mb-2">Smarter Load Matching</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              We match loads to your lanes, equipment, and rate floor — not whatever&apos;s left on the board at the end of the day.
            </p>
          </div>

          <div className="road-mobile-text relative">
            <div className="absolute -left-[45px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-[#50C878] shadow-[0_0_10px_#50C878] z-30" />
            <span className="text-[#50C878] text-[10px] font-bold tracking-widest uppercase mb-1 block">02</span>
            <h3 className="text-xl font-black text-[#F1F5F9] uppercase tracking-tight mb-2">Always in the Loop</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Live updates on load status, so you and your dispatcher are always on the same page from pickup to delivery.
            </p>
          </div>

          <div className="road-mobile-text relative">
            <div className="absolute -left-[45px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-[#50C878] shadow-[0_0_10px_#50C878] z-30" />
            <span className="text-[#50C878] text-[10px] font-bold tracking-widest uppercase mb-1 block">03</span>
            <h3 className="text-xl font-black text-[#F1F5F9] uppercase tracking-tight mb-2">Paid On Time, Every Time</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              From BOL to invoice to factoring submission, we keep your paperwork moving so payment isn&apos;t held up on your end.
            </p>
          </div>

        </div>
      </div>
      
    </section>
  );
}
