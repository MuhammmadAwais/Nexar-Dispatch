"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";

// Register plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

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

    // Text Animations (Parallax & Fading)
    // Left Text Block (enters early, exits mid)
    scrollTl.fromTo(".road-text-1", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
      0.1
    );
    // Pan the road up while the truck drives down
    // The road is 200vw tall (when rotated). 
    // Start with the top of the road exactly at the top of the screen: y = 100vw - 50vh
    // End with the bottom of the road exactly at the bottom of the screen: y = -100vw + 50vh
    scrollTl.fromTo(".road-pan-wrapper",
      { y: 'calc(100vw - 50vh)' },
      { y: 'calc(-100vw + 50vh)', ease: "none", duration: 1 },
      0
    );

    // Parallax Text Blocks on the Left Side
    // Text 1
    scrollTl.fromTo(".road-text-1", 
      { y: '100vh', opacity: 0 },
      { y: '20vh', opacity: 1, duration: 0.15, ease: "power2.out" },
      0.05
    );
    scrollTl.to(".road-text-1", 
      { y: '-50vh', opacity: 0, duration: 0.15, ease: "power2.in" },
      0.25
    );

    // Text 2
    scrollTl.fromTo(".road-text-2", 
      { y: '100vh', opacity: 0 },
      { y: '20vh', opacity: 1, duration: 0.15, ease: "power2.out" },
      0.35
    );
    scrollTl.to(".road-text-2", 
      { y: '-50vh', opacity: 0, duration: 0.15, ease: "power2.in" },
      0.55
    );

    // Text 3
    scrollTl.fromTo(".road-text-3", 
      { y: '100vh', opacity: 0 },
      { y: '20vh', opacity: 1, duration: 0.15, ease: "power2.out" },
      0.65
    );
    scrollTl.to(".road-text-3", 
      { y: '-50vh', opacity: 0, duration: 0.15, ease: "power2.in" },
      0.85
    );

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

        {/* Text Layers (Left Side Parallax) */}
        <div className="absolute inset-0 mx-auto w-full max-w-7xl px-6 md:px-[clamp(1.25rem,4vw,4rem)] z-20 pointer-events-none">
          
          {/* Text 1 */}
          <div className="road-text-1 absolute left-6 md:left-[clamp(1.25rem,4vw,4rem)] w-full max-w-md pointer-events-auto opacity-0 flex flex-col justify-center h-full">
            <div>
              <Eyebrow className="mb-4 text-accent">Intelligent Routing</Eyebrow>
              <h2 className="text-display-m font-display text-text mb-4 leading-tight drop-shadow-sm">
                Navigating Complex Routes.
              </h2>
              <p className="text-text-body text-base md:text-lg mb-8 font-medium drop-shadow-sm">
                Our advanced algorithms calculate the most efficient path for your fleet, adapting to live traffic and weather conditions seamlessly.
              </p>
            </div>
          </div>

          {/* Text 2 */}
          <div className="road-text-2 absolute left-6 md:left-[clamp(1.25rem,4vw,4rem)] w-full max-w-md pointer-events-auto opacity-0 flex flex-col justify-center h-full">
            <div>
              <Eyebrow className="mb-4 text-accent">Smooth Journey</Eyebrow>
              <h2 className="text-display-m font-display text-text mb-4 leading-tight drop-shadow-sm">
                Always on Track.
              </h2>
              <p className="text-text-body text-base md:text-lg mb-8 font-medium drop-shadow-sm">
                Experience the peace of mind that comes with a dispatch service dedicated to keeping your trucks moving forward, no matter the obstacles.
              </p>
            </div>
          </div>

          {/* Text 3 */}
          <div className="road-text-3 absolute left-6 md:left-[clamp(1.25rem,4vw,4rem)] w-full max-w-md pointer-events-auto opacity-0 flex flex-col justify-center h-full">
            <div>
              <Eyebrow className="mb-4 text-accent">Reliable Delivery</Eyebrow>
              <h2 className="text-display-m font-display text-text mb-4 leading-tight drop-shadow-sm">
                On Time, Every Time.
              </h2>
              <p className="text-text-body text-base md:text-lg mb-8 font-medium drop-shadow-sm">
                From pickup to drop-off, our robust tracking ensures you and your clients are always updated on the exact location of the freight.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
