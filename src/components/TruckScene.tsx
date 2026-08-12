"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function TruckScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || reducedMotion) return;
    
    let ctx: gsap.Context | undefined;
    
    const setupScrollScrub = () => {
      const video = videoRef.current;
      if (!video) return;
      
      const duration = video.duration || 10;
      
      // We look up the closest ancestor with height > 100vh for our scrub trigger
      // Hero.tsx will have a 300vh parent.
      const container = containerRef.current;
      if (!container) return;
      
      const scrubTrigger = container.closest('.hero-scroll-container') || container;
      
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: scrubTrigger,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            if (video.readyState >= 2) {
              video.currentTime = duration * self.progress;
            }
          }
        });
      }, scrubTrigger);
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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-bg scene-wrapper flex flex-col justify-between">
      
      {/* Background Image (Top) fading into the video */}
      <div className="absolute top-0 left-0 w-full h-[65%] z-0">
        <Image 
          src="/OIP.webp" 
          alt="Clouds Background"
          fill
          priority
          className="object-cover object-bottom scale-y-100"
          style={{ 
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)", 
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)" 
          }}
        />
      </div>
      
      {/* Scroll-Scrub Video (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col justify-end pointer-events-none">
        <div className="relative w-full aspect-[32/9]" style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
        }}>
          <video 
            ref={videoRef}
            src="/Nexar-Dispached-Hero.mp4" 
            muted 
            playsInline 
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
