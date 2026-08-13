'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plane, Ship, ShieldCheck, Warehouse, Truck } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const services = [
  {
    title: 'AIR FREIGHT',
    description: 'Express, priority, and deferred options across global trade lanes — managed end to end for speed.',
    icon: <Plane className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
  },
  {
    title: 'OCEAN FREIGHT',
    description: 'FCL, LCL, and specialized cargo movements, with structured carrier selection for cost and reliability.',
    icon: <Ship className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
  },
  {
    title: 'CUSTOMS BROKERAGE',
    description: 'In-house licensed brokerage covering classification, compliance, and quarantine — full control.',
    icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
  },
  {
    title: 'WAREHOUSING & 3PL',
    description: 'Scalable storage, pick and pack, and distribution — fully integrated with freight and transport operations.',
    icon: <Warehouse className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
  },
  {
    title: 'DOMESTIC TRANSPORT',
    description: 'Local, metro, and interstate transport managed for consistent service levels and full delivery visibility.',
    icon: <Truck className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
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

    // Animate Truck: starts partially on-screen
    tl.fromTo(
      truckRef.current,
      { xPercent: -20, x: '0vw' },
      { xPercent: 100, x: '100vw', ease: 'none', duration: 1 },
      0
    );

    // Animate Services Cards: start with 1-2 cards visible on the right
    const wrapperWidth = servicesWrapperRef.current?.scrollWidth || 0;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    
    tl.fromTo(
      servicesWrapperRef.current,
      { x: windowWidth - 600 },
      { x: -wrapperWidth, ease: 'none', duration: 1 },
      0
    );

    // Subtle parallax on the background "SERVICES" text (moves slightly left to right)
    tl.fromTo(
      bgTextRef.current,
      { xPercent: -5 },
      { xPercent: 5, ease: 'none', duration: 1 },
      0
    );

    // Fade out the entire section at the end for smooth transition to the next section
    tl.to(stickyRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.inOut'
    }, 0.9);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] -mt-[100vh] z-15 pointer-events-none">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col pointer-events-auto">
        
        {/* TOP LIGHT HALF */}
        <div className="relative w-full h-[60%] bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
          {/* BACKGROUND TEXT */}
          <div 
            ref={bgTextRef} 
            className="absolute whitespace-nowrap text-[25vw] md:text-[22vw] font-black text-gray-300/40 uppercase tracking-tighter select-none z-0"
            style={{ transform: 'translateX(-5%)' }}
          >
            SERVICES
          </div>
          
          {/* Top Left Speed indicator / Label */}
          <div className="absolute top-8 left-8 text-xs md:text-sm font-bold tracking-widest text-gray-400 z-10 uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Our Expertise
          </div>
        </div>

        {/* BOTTOM DARK HALF */}
        <div className="relative w-full h-[40%] bg-[#1F2937] flex items-center overflow-hidden border-t border-primary/20">
          
          {/* Services Scroller */}
          <div ref={servicesWrapperRef} className="flex gap-16 md:gap-32 px-[10vw] min-w-max z-10 absolute top-1/2 -translate-y-1/2">
            {services.map((service, idx) => (
              <div key={idx} className="flex flex-col gap-4 w-[280px] md:w-[320px] group cursor-pointer">
                <div className="mb-2 transition-transform duration-300 group-hover:-translate-y-2 opacity-80 group-hover:opacity-100">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRUCK - OVERLAPPING BOTH HALVES */}
        {/* Adjusted vertical translation from -93% to -88% to close the gap with the road line */}
        <div 
          ref={truckRef}
          className="absolute top-[70%] left-0 -translate-y-[88%] z-20 w-[70vw] md:w-[50vw] max-w-[900px] pointer-events-none drop-shadow-2xl"
        >
          <Image 
            src="/truck.png"
            alt="Semi Truck Side Profile"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}
