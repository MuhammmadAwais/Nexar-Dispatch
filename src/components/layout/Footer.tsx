"use client";

import * as React from "react";
import Image from "next/image";
import { useRef } from "react";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty("--x", `${x}%`);
    containerRef.current.style.setProperty("--y", `${y}%`);
  };

  return (
    <footer className="w-full bg-black pt-10 pb-16 px-6 md:px-12 border-t border-white/5 relative z-20">
      
      {/* Massive Hover Text */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full flex justify-center mb-20 overflow-hidden relative group cursor-default"
      >
        {/* Base Hollow Text */}
        <h1 
          className="text-[20vw] md:text-[22vw] font-display font-black uppercase tracking-tighter leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
          }}
        >
          NEXAR
        </h1>
        
        {/* Cursor Tracking Glow Overlay */}
        <h1 
          className="absolute inset-0 text-[20vw] md:text-[22vw] text-center font-display font-black uppercase tracking-tighter leading-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            color: "transparent",
            backgroundImage: "radial-gradient(circle 25vw at var(--x, 50%) var(--y, 50%), #50C878 0%, rgba(80,200,120,0.6) 15%, transparent 40%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          NEXAR
        </h1>
      </div>

      {/* Footer Content Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Logo & Socials */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start">
          <a href="#" className="flex items-center gap-2.5 shrink-0 z-10 mb-8 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/longForm-white-logo.png"
              alt="Nexar Dispatch"
              width={300}
              height={90}
              unoptimized
              className="object-contain w-auto h-[36px] md:h-[48px] xl:h-[56px]"
              style={{ width: "auto" }}
            />
          </a>
          
          <div className="flex gap-5 text-white/70">
            {/* Instagram */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            {/* Discord (Mock) */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-10">
          
          {/* ABOUT */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">About</h4>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">About Us</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Support</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Pricing and Refund</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms and Conditions</a>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Company</h4>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Carrier Agreement</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Hire From Us</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Discord</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Jobs</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Submit Freight</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Feedback</a>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Contact</h4>
            <p className="text-white/60 text-sm">Online: 24/7 Support<br/><span className="text-white/40">+1 (800) 555-0199</span></p>
            <p className="text-white/60 text-sm">Offline: 9am - 6pm EST<br/><span className="text-white/40">+1 (800) 555-0200</span></p>
            <a href="mailto:hello@nexardispatch.com" className="text-white/60 hover:text-white text-sm transition-colors">hello@nexardispatch.com</a>
            <p className="text-white/60 text-sm mt-2 max-w-[200px]">100 Logistics Way, Suite 400<br/>Atlanta, GA 30301</p>
          </div>

        </div>
      </div>

    </footer>
  );
}
