"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Section } from "../ui/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !videoRef.current || reducedMotion) return;

    let ctx: gsap.Context | undefined;

    const setupScrollScrub = () => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration || 8; // fallback to 8s if metadata not loaded

      ctx = gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          }
        });

        // 1. Scrub the video
        scrollTl.to(video, {
          currentTime: duration,
          ease: "none",
          duration: 1
        }, 0);

        // 2. Parallax and fading for text elements
        // Text 1 (Left) - enters early, exits mid
        scrollTl.fromTo(".trust-text-1", 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
          0.1
        );
        scrollTl.to(".trust-text-1", 
          { y: -100, opacity: 0, duration: 0.15, ease: "power2.in" },
          0.4
        );

        // Text 2 (Right) - enters mid, exits late
        scrollTl.fromTo(".trust-text-2", 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
          0.5
        );
        scrollTl.to(".trust-text-2", 
          { y: -100, opacity: 0, duration: 0.15, ease: "power2.in" },
          0.8
        );

      }, containerRef);
    };

    if (videoRef.current.readyState >= 1) {
      setupScrollScrub();
    } else {
      videoRef.current.addEventListener('loadedmetadata', setupScrollScrub);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', setupScrollScrub);
      }
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section ref={containerRef} className="trustbar-scroll-container relative w-full h-[400vh] bg-bg -mt-[100vh] z-0">
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-surface">
          <video
            ref={videoRef}
            src="/Cardboard_parcel_floating_from_t…_202608122043.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Removed Gradient Overlays for Readability to fix white blurry fade */}

        {/* Text Layers */}
        <div className="mx-auto w-full max-w-7xl px-4 md:px-[clamp(1.25rem,4vw,4rem)] relative z-20 pointer-events-none h-full flex items-center">
          
          {/* Left Text Block */}
          <div className="trust-text-1 absolute left-4 md:left-[clamp(1.25rem,4vw,4rem)] w-full max-w-md pointer-events-auto opacity-0 translate-y-[100px]">
            <Eyebrow className="mb-4 text-accent">Total Visibility</Eyebrow>
            <h2 className="text-display-m font-display text-text mb-4 leading-tight drop-shadow-sm">
              Track Every Load. <br /> Zero Guesswork.
            </h2>
            <p className="text-text-body text-base md:text-lg mb-8 font-medium drop-shadow-sm">
              From pickup to delivery, our platform provides real-time tracking so you always know exactly where your freight is and when it will arrive.
            </p>
          </div>

          {/* Right Text Block */}
          <div className="trust-text-2 absolute right-4 md:right-[clamp(1.25rem,4vw,4rem)] w-full max-w-md pointer-events-auto text-left md:text-right opacity-0 translate-y-[100px]">
            <Eyebrow className="mb-4 text-accent">Reliable Transport</Eyebrow>
            <h2 className="text-display-m font-display text-text mb-4 leading-tight drop-shadow-sm">
              Safe. Secure. <br /> Delivered.
            </h2>
            <p className="text-text-body text-base md:text-lg mb-8 font-medium drop-shadow-sm ml-auto">
              Our network of verified owner-operators ensures your goods are handled with the utmost care, maximizing profit without sacrificing reliability.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
