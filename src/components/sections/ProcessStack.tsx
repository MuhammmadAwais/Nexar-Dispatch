"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const PROCESS_STEPS = [
  {
    num: "/01",
    title: "Carrier Onboarding",
    desc: "We learn your equipment, preferred lanes, and revenue goals so your dispatch strategy is built around you, not a generic playbook.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
  },
  {
    num: "/02",
    title: "Setup & Compliance",
    desc: "MC authority checks, W-9s, insurance certificates, and broker packet setup — handled before you're ever waiting on a load.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
  },
  {
    num: "/03",
    title: "Strategic Booking",
    desc: "We use our broker relationships and market data to book freight that matches your rate expectations, not just whatever's available.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
  },
  {
    num: "/04",
    title: "Ongoing Load Management",
    desc: "Check calls, route coordination, and back-office support from pickup to delivery.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
  },
  {
    num: "/05",
    title: "Invoicing & Factoring",
    desc: "Once delivered, we handle BOL submission and invoicing and coordinate with your factoring company so payment isn't delayed on our end.",
    img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=1200&q=80",
  },
];

export function ProcessStack() {
  return (
    <section className="relative w-full bg-black pt-32 pb-48 px-6 md:px-10 overflow-hidden">
      
      {/* ── Header: Bold & Staggered ── */}
      <div className="relative max-w-5xl mx-auto mb-32 z-10">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 -top-20 -bottom-20 -left-20 -right-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_30%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#50C878]" />
              <span className="text-[#50C878] font-mono text-sm tracking-widest uppercase font-bold">PROCESS</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-black leading-[1.05] tracking-tighter">
              <span className="block text-white">One Dispatcher.</span>
              <span className="block text-[#50C878]">Total Control.</span>
              <span className="block text-[#50C878]">Zero Hassle.</span>
            </h2>
          </div>
          
          {/* Dashed Arrow Graphic */}
          <div className="hidden lg:block pb-10 pr-10">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              <path d="M10 10 C 60 10, 100 50, 100 100" stroke="#50C878" strokeWidth="2" strokeDasharray="6 6" fill="none" />
              <path d="M85 100 L 100 100 L 100 85" stroke="#50C878" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── 3D Rolodex Container ── */}
      <div className="relative max-w-5xl mx-auto flex flex-col mt-20" style={{ perspective: '1500px' }}>
        {PROCESS_STEPS.map((step, i) => (
          <Card key={i} step={step} />
        ))}
      </div>
    </section>
  );
}

function Card({ step }: { step: typeof PROCESS_STEPS[0] }) {
  const cardRef = useRef(null);
  
  // Track scroll position of this individual card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Start tracking when the top of the card hits the bottom of the screen
    // Stop tracking when the bottom of the card hits the top of the screen
    offset: ["start end", "end start"],
  });
  
  // 3D Transforms based on scroll progress (0 to 1)
  // 0 = Entering from bottom (tilted up 45deg)
  // 0.5 = Dead center (flat 0deg)
  // 1 = Exiting out top (tilted down -45deg)
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [45, 0, 0, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={cardRef}
      className="w-full flex justify-center mb-32 md:mb-48 last:mb-0"
    >
      <motion.div
        style={{ 
          rotateX, 
          scale, 
          opacity, 
          transformOrigin: "center center",
          transformStyle: "preserve-3d"
        }}
        className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl bg-[#0a0a0a]/60 group"
      >
        {/* Intense Ambient Glow behind the card contents */}
        <div className="absolute inset-0 bg-[#50C878] opacity-5 blur-[120px] rounded-full scale-110 pointer-events-none transition-opacity duration-700 group-hover:opacity-15" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[400px]">
          {/* ── Left Side: Content ── */}
          <div className="flex-1 px-8 py-12 md:px-16 md:py-16 flex flex-col justify-between z-20">
            <div>
               <span className="text-2xl md:text-3xl font-mono text-[#50C878] font-bold mb-6 block">
                {step.num}
              </span>
              <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-8">
                {step.title}
              </h3>
            </div>
            
            <p className="text-lg md:text-xl text-[#E6F4EA]/70 font-sans leading-relaxed max-w-xl">
              {step.desc}
            </p>
          </div>

          {/* ── Right Side: Embedded Image Asset ── */}
          <div className="w-full md:w-5/12 relative min-h-[250px] md:min-h-full opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-90 transition-all duration-700 overflow-hidden">
            {/* Fade gradients to seamlessly blend image into the dark glass */}
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent z-10" />
            
            <Image
              src={step.img}
              alt={step.title}
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
