"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "../../hooks/useReducedMotion";
// Register plugins

export function RoadJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<SVGImageElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || !stickyRef.current || !truckRef.current || reducedMotion) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top -100vh", // Wait for TrustBar to completely fade out before starting
        end: "bottom bottom",
        scrub: 1, // Smooth scrub
      }
    });

    // Animate truck along the path
    scrollTl.to(truckRef.current, {
      motionPath: {
        path: "#road-path",
        align: "#road-path",
        alignOrigin: [0.5, 0.5],
        autoRotate: true, // Let it align naturally, if it was facing DOWN before, 90 was too much
      },
      duration: 1,
      ease: "none"
    }, 0);

    // Pan the road up while the truck drives down
    // The road is 200vw tall (when rotated). 
    // Start with the top of the road exactly at the top of the screen: y = 100vw - 50vh
    // End with the bottom of the road exactly at the bottom of the screen: y = -100vw + 50vh
    scrollTl.fromTo(".road-pan-wrapper",
      { y: 'calc(100vw - 50vh)' },
      { y: 'calc(-100vw + 50vh)', ease: "none", duration: 1 },
      0
    );

    // Left Panel Animations (Timeline and Features)
    // Timeline Progress Bar
    scrollTl.fromTo(".timeline-progress",
      { height: "0%" },
      { height: "100%", ease: "none", duration: 1 },
      0
    );

    // Feature 1 pops in when line reaches it (~0.1 progress)
    scrollTl.fromTo(".feature-1", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.1, ease: "back.out(2)" }, 
      0.1
    );
    scrollTl.to(".indicator-1", { borderColor: "#50C878", boxShadow: "0 0 15px rgba(80,200,120,0.6)", duration: 0.1 }, 0.1);
    scrollTl.to(".feature-1", { opacity: 0.4, duration: 0.1 }, 0.4);
    scrollTl.to(".indicator-1", { borderColor: "rgba(255,255,255,0.2)", boxShadow: "none", duration: 0.1 }, 0.4);

    // Feature 2 pops in when line reaches it (~0.4 progress)
    scrollTl.fromTo(".feature-2", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.1, ease: "back.out(2)" }, 
      0.4
    );
    scrollTl.to(".indicator-2", { borderColor: "#50C878", boxShadow: "0 0 15px rgba(80,200,120,0.6)", duration: 0.1 }, 0.4);
    scrollTl.to(".feature-2", { opacity: 0.4, duration: 0.1 }, 0.7);
    scrollTl.to(".indicator-2", { borderColor: "rgba(255,255,255,0.2)", boxShadow: "none", duration: 0.1 }, 0.7);

    // Feature 3 pops in when line reaches it (~0.7 progress)
    scrollTl.fromTo(".feature-3", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.1, ease: "back.out(2)" }, 
      0.7
    );
    scrollTl.to(".indicator-3", { borderColor: "#50C878", boxShadow: "0 0 15px rgba(80,200,120,0.6)", duration: 0.1 }, 0.7);

    // Fade out the entire section at the end to seamlessly transition to the next static section
    scrollTl.to(stickyRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.inOut"
    }, 0.9);

  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section ref={containerRef} className="road-scroll-container relative w-full h-[400vh] bg-black z-10 pointer-events-none">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-auto bg-black">
        
        {/* Architectural Background Grid */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Panning Wrapper (moves up as user scrolls) - Shifted Right */}
        <div className="road-pan-wrapper absolute inset-0 left-[20vw] md:left-[35vw] flex items-center justify-center pointer-events-none">
          
          {/* Rotated Container for Road and SVG (Top-to-Bottom) */}
          <div className="relative w-[200vw] h-[100vw] flex items-center justify-center overflow-visible origin-center rotate-90 pointer-events-none">
            
            {/* Background Road Image */}
            <Image 
              src="/road-bg.png"
              alt="Curvy Road Background"
              fill
              className="object-contain"
              priority
            />

            {/* SVG Overlay for Motion Path & Truck */}
            <svg 
              width="2882" 
              height="1440" 
              viewBox="0 0 2882 1440" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(1.5, 187)">
                <path 
                  id="road-path"
                  d="M0.121216 28L34.1212 19.5L72.1212 12H112.121H170.621L211.621 19.5L257.121 37L302.621 62L341.121 85.5L377.621 118L407.121 154.5L427.621 188L448.121 231L458.621 282V304V323.5V423V568.5V706.5V784.5L470.121 840L484.621 881.5L512.621 927L543.621 963.5L574.621 991.5L618.621 1019.5L656.621 1038.5L697.621 1054.5L747.621 1065H794.621H831.621L887.121 1054.5L925.121 1038.5L973.621 1019.5L1023.62 991.5L1057.62 963.5L1098.62 909L1122.12 865L1139.62 828.5L1147.12 727V304V266L1158.62 217.5L1183.62 169L1208.62 132.5L1249.62 94.5L1279.12 65L1361.62 22.5L1415.62 9L1496.62 0.5H1549.62L1599.12 9L1690.12 51.5L1741.62 81L1796.12 145.5L1828.62 185.5L1847.62 250L1856.12 276.5V743.5V805L1888.62 894.5L1934.12 959L1988.62 1000L2041.12 1028L2100.12 1048.5L2173.62 1060.5H2214.62C2214.62 1060.5 2219.12 1069.5 2310.12 1038.5C2401.12 1007.5 2429.12 978 2429.12 978L2489.12 866.5L2511.12 734.5V590.5V455.5V314.5V269L2550.62 175L2584.62 123.5L2644.62 71L2710.62 32.5L2785.62 6H2863.62H2878.12" 
                  stroke="transparent"
                  fill="none"
                />
              </g>
              
              {/* Moving Truck Object (Increased Size) */}
              <image 
                ref={truckRef}
                href="/truck-image.png"
                width="350"
                height="490"
              />
            </svg>
          </div>
        </div>

        {/* Blending Gradients */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
          <div className="w-full h-[25vh] bg-gradient-to-b from-black to-transparent"></div>
          <div className="w-full h-[25vh] bg-gradient-to-t from-black to-transparent"></div>
        </div>
        {/* Left Edge Gradient to smoothly blend the shifted road into the background */}
        <div className="absolute inset-y-0 left-0 w-[40vw] bg-gradient-to-r from-black via-black to-transparent pointer-events-none z-10"></div>

        {/* Left Side Structured Content - Fixed in place while right side pans */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[45vw] px-6 md:px-[clamp(1.25rem,4vw,4rem)] flex flex-col justify-center h-full z-20 pointer-events-none">
          
          <div className="w-full max-w-lg mt-10 md:mt-0">
            {/* Header */}
            <div className="mb-6 md:mb-10">
              {/* Eyebrow Reference Match */}
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-12 h-[1px] bg-[#50C878]" />
                <span className="text-[#50C878] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">Features</span>
              </div>
              
              <h2 className="text-[2.5rem] md:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] font-display font-black leading-[0.95] tracking-tighter text-white drop-shadow-md">
                Intelligent routing.<br/>
                <span className="text-[#50C878]">Total control.</span><br/>
                Zero delays.
              </h2>
            </div>

            {/* Vertical Features List */}
            <div className="relative pl-8 md:pl-10">
              {/* Timeline Track (Background line) */}
              <div className="absolute top-2 bottom-2 left-[3px] w-[1px] bg-white/10" />
              
              {/* Animated Progress Line */}
              <div className="timeline-progress absolute top-2 left-[3px] w-[1px] bg-[#50C878] shadow-[0_0_10px_#50C878] origin-top h-0" />

              <div className="flex flex-col gap-6 md:gap-8">
                {/* Item 1 */}
                <div className="feature-item feature-1 opacity-0 -translate-x-[50px]">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                    <div className="indicator-1 w-5 h-5 rounded flex items-center justify-center border border-white/20 bg-white/5 shadow-sm shrink-0 transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Navigating Complex Routes
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm max-w-[90%] pl-8 leading-relaxed">
                    Our advanced algorithms calculate the most efficient path for your fleet, adapting to live traffic and weather conditions seamlessly.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="feature-item feature-2 opacity-0 -translate-x-[50px]">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                    <div className="indicator-2 w-5 h-5 rounded flex items-center justify-center border border-white/20 bg-white/5 shadow-sm shrink-0 transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Always on Track
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm max-w-[90%] pl-8 leading-relaxed">
                    Experience the peace of mind that comes with a dispatch service dedicated to keeping your trucks moving forward, no matter the obstacles.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="feature-item feature-3 opacity-0 -translate-x-[50px]">
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                    <div className="indicator-3 w-5 h-5 rounded flex items-center justify-center border border-white/20 bg-white/5 shadow-sm shrink-0 transition-all duration-300">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#50C878" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    On Time, Every Time
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm max-w-[90%] pl-8 leading-relaxed">
                    From pickup to drop-off, our robust tracking ensures you and your clients are always updated on the exact location of the freight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
