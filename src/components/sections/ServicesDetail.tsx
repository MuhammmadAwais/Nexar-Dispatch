'use client';
import { gsap, useGSAP } from "@/lib/gsap";

import React, { useRef, useState, useTransition } from 'react';
import { Truck, Snowflake, Package, Box, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';


const equipmentTypes = [
  {
    id: 'dry-van',
    name: 'Dry Van',
    icon: Truck,
    number: '/01',
    rate: '$2.10',
    subtitle: 'per mile',
    heroTitle: 'Dry Van',
    heroDesc: 'Consistent freight from retail and consumer goods shippers, with lane planning that keeps deadhead miles down.',
    highlights: [
      'Steady, year-round load volume',
      'Minimal deadhead between drop-offs',
    ],
    included: [
      '24/7 load search & booking',
      'Expert rate negotiation',
      'Complete paperwork handling'
    ]
  },
  {
    id: 'reefer',
    name: 'Reefer',
    icon: Snowflake,
    number: '/02',
    rate: '$2.45',
    subtitle: 'per mile',
    heroTitle: 'Reefer',
    heroDesc: 'We get you into seasonal produce lanes early — and handle the lumper fees, washouts, and late docks that come with the territory.',
    highlights: [
      'Early access to seasonal rate spikes',
      'Lumper and washout coordination'
    ],
    included: [
      'Dedicated dispatch support',
      'Expert rate negotiation',
      'Route optimization'
    ]
  },
  {
    id: 'flatbed',
    name: 'Flatbed',
    icon: Package,
    number: '/03',
    rate: '$2.65',
    subtitle: 'per mile',
    heroTitle: 'Flatbed',
    heroDesc: "Specialized and oversized freight from brokers we've vetted directly, so you're not chasing payment after delivery.",
    highlights: [
      'Access to specialized/oversized loads',
      'Broker vetting before you commit to a load'
    ],
    included: [
      '24/7 load search & booking',
      'Complete paperwork handling',
      'Route optimization'
    ]
  },
  {
    id: 'power-only',
    name: 'Power Only',
    icon: Zap,
    number: '/04',
    rate: '$1.90',
    subtitle: 'per mile',
    heroTitle: 'Power Only',
    heroDesc: 'Preloaded trailers lined up so you drop, hook, and go — including priority freight from major retail shippers.',
    highlights: [
      'Drop-and-hook loads ready to go',
      'Priority access to big-box retail lanes'
    ],
    included: [
      '24/7 load search & booking',
      'Expert rate negotiation',
      'Dedicated dispatch support'
    ]
  },
  {
    id: 'box-truck',
    name: 'Box Truck',
    icon: Box,
    number: '/05',
    rate: '$1.75',
    subtitle: 'per mile',
    heroTitle: 'Box Truck',
    heroDesc: "Expedited and LTL freight matched to maximize what you're hauling on every run.",
    highlights: [
      'LTL combination for fuller loads',
      'Access to expedited freight opportunities'
    ],
    included: [
      'Route optimization',
      'Complete paperwork handling',
      'Expert rate negotiation'
    ]
  }
];

export function ServicesDetail() {
  const containerRef = useRef<HTMLElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [, startTransition] = useTransition();
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !containerRef.current || !rightPanelRef.current) return;

    const scrollAmount = rightPanelRef.current.scrollWidth - window.innerWidth + (window.innerWidth * 0.35);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrub for premium feel
        onUpdate: (self: { progress: number }) => {
          const progress = self.progress;
          const totalItems = equipmentTypes.length;
          const index = Math.min(
            totalItems - 1,
            Math.floor(progress * totalItems * 1.1)
          );
          startTransition(() => {
            setActiveIndex(index);
          });
        }
      }
    });

    tl.to(rightPanelRef.current, {
      x: () => -scrollAmount,
      ease: 'none'
    });

  }, { scope: containerRef });

  return (
    // Make the outer section very tall (400vh) to allow for scrolling
    <section id="equipment" ref={containerRef} className="relative w-full h-[400vh] hidden md:block" style={{background: 'transparent'}}>
      
      {/* The sticky container that locks to the screen */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex bg-[#030502]">
        
        {/* Left Side (Index Menu) */}
        <div 
          className="w-[35%] h-full flex flex-col justify-center pt-24 pb-12 px-12 lg:px-24 z-20 relative shrink-0 border-r border-[#50C878]/10"
          style={{
            background: 'rgba(3, 5, 2, 0.65)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          
          {/* Atmospheric corner glow on left panel */}
          <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-[#50C878] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />
          
          {/* Subtle separator line between left and right panel */}
          <div className="absolute top-[10%] right-0 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#50C878]/15 to-transparent" />

          <h2 className="text-xs md:text-sm font-bold tracking-widest text-[#50C878] uppercase mb-4 relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#50C878] rounded-full animate-pulse"></span>
            EQUIPMENT
          </h2>
          
          <h3 className="text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight mb-12 relative z-10">
            Lanes For Every Load
          </h3>
          
          <div className="flex flex-col gap-8 relative z-10">
            {equipmentTypes.map((eq, i) => {
              const isActive = activeIndex === i;
              return (
                <div 
                  key={eq.id} 
                  className="flex items-center gap-6 cursor-default group"
                >
                  <div className={`relative text-3xl lg:text-4xl font-black uppercase tracking-tighter transition-all duration-500 ${
                    isActive 
                      ? 'text-[#F1F5F9] scale-105 origin-left' 
                      : 'text-[#94A3B8]/30 group-hover:text-[#94A3B8]/70'
                  }`}>
                    {eq.name}
                  </div>
                  
                  {/* Active item arrow */}
                  {isActive && (
                    <div className="text-[#50C878] transition-all duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side (Horizontally scrolling content) */}
        <div className="w-[65%] h-full relative shrink-0 flex items-center pt-24 pb-12">
          
          {/* The scrolling container */}
          <div ref={rightPanelRef} className="absolute left-0 flex items-center px-16 lg:px-32 gap-16 lg:gap-24 min-w-max">
            
            {equipmentTypes.map((eq) => {
              return (
                <div key={eq.id} className="w-[500px] lg:w-[600px] h-[600px] shrink-0 relative group">
                  
                  {/* No external glows as requested */}
                  
                  {/* The Premium Dark Glass Card */}
                  <div className="relative h-full w-full rounded-[24px] border border-white/5 p-10 lg:p-12 flex flex-col overflow-hidden shadow-2xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(5,5,5,1) 100%)', 
                      backdropFilter: 'blur(24px)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.8)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-[#F1F5F9] uppercase">
                          {eq.heroTitle}
                        </h3>
                      </div>
                      <span className="text-2xl lg:text-3xl font-light text-[#50C878]">
                        {eq.number}
                      </span>
                    </div>

                    <p className="text-[#a0a0a0] text-lg leading-relaxed mb-10 font-light">
                      {eq.heroDesc}
                    </p>

                    <div className="flex-grow flex flex-col gap-6">
                      <div>
                        <ul className="flex flex-col gap-4">
                          {eq.highlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#a8f060] text-sm mt-1 shrink-0">✦</span>
                              <span className="text-[#999] text-base leading-relaxed font-light">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Rate Footer */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-end justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.15em] text-[#666] mb-1">Average Rate</div>
                        <div className="text-[#888] font-light">{eq.subtitle}</div>
                      </div>
                      <div className="text-4xl font-normal text-[#F1F5F9] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                        {eq.rate}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
            
            {/* End spacer so the last card doesn't hug the edge */}
            <div className="w-[20vw] shrink-0" />
            
          </div>
        </div>
      </div>
    </section>
  );
}
