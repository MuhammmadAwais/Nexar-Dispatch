"use client";

import * as React from "react";
import Image from "next/image";

export function MobileFooter() {
  return (
    <footer className="w-full bg-black pt-10 pb-16 px-6 border-t border-white/5 relative z-20">
      
      {/* Massive Static Text for Mobile */}
      <div className="w-full flex justify-center mb-16 overflow-hidden relative group cursor-default">
        {/* Base Hollow Text */}
        <h1 
          className="text-[25vw] font-display font-black uppercase tracking-tighter leading-none select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
          }}
        >
          NEXAR
        </h1>
      </div>

      {/* Footer Content Stack */}
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* Logo & Socials */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <a href="#" className="flex items-center gap-2.5 shrink-0 z-10 mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/logo.png"
              alt="Nexar Dispatch"
              width={160}
              height={36}
              className="object-contain w-auto h-[28px] brightness-0 invert"
              style={{ width: "auto" }}
            />
          </a>
          
          <div className="flex justify-center sm:justify-start gap-6 text-white/70">
            {/* Instagram */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
            </a>
          </div>
        </div>
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10">
          
          {/* ABOUT */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1">About</h4>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">About Us</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Support</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Refunds</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Terms</a>
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1">Company</h4>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Carrier Agreement</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Hire From Us</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Discord</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Jobs</a>
            <a href="#" className="text-white/60 hover:text-white text-[15px] transition-colors">Feedback</a>
          </div>
        </div>

        {/* CONTACT (Full Width on mobile) */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-2">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-1">Contact</h4>
          <p className="text-white/60 text-[15px]">Online: 24/7 Support<br/><span className="text-white/40">+1 (800) 555-0199</span></p>
          <p className="text-white/60 text-[15px]">Offline: 9am - 6pm EST<br/><span className="text-white/40">+1 (800) 555-0200</span></p>
          <a href="mailto:hello@nexardispatch.com" className="text-white/60 hover:text-white text-[15px] transition-colors">hello@nexardispatch.com</a>
          <p className="text-white/60 text-[15px] mt-2">100 Logistics Way, Suite 400<br/>Atlanta, GA 30301</p>
        </div>

      </div>
    </footer>
  );
}
