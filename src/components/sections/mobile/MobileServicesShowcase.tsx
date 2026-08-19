"use client";

import React from 'react';
import Image from 'next/image';
import { Plane, Ship, ShieldCheck, Warehouse, Truck } from 'lucide-react';

const services = [
  {
    title: 'AIR FREIGHT',
    description: 'Express, priority, and deferred options across global trade lanes — managed end to end for speed.',
    icon: Plane,
  },
  {
    title: 'OCEAN FREIGHT',
    description: 'FCL, LCL, and specialized cargo movements, with structured carrier selection for cost and reliability.',
    icon: Ship,
  },
  {
    title: 'CUSTOMS BROKERAGE',
    description: 'In-house licensed brokerage covering classification, compliance, and quarantine — full control.',
    icon: ShieldCheck,
  },
  {
    title: 'WAREHOUSING & 3PL',
    description: 'Scalable storage, pick and pack, and distribution — fully integrated with freight and transport operations.',
    icon: Warehouse,
  },
  {
    title: 'DOMESTIC TRANSPORT',
    description: 'Local, metro, and interstate transport managed for consistent service levels and full delivery visibility.',
    icon: Truck,
  },
];

export function MobileServicesShowcase() {
  return (
    <section className="relative w-full bg-[#000000] py-16 flex flex-col items-center">
      
      {/* Subtle Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(55,105,15,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 text-center mb-8 px-5">
        <h2 className="text-[10px] font-bold tracking-widest text-[#50C878] uppercase flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-[#50C878] rounded-full animate-pulse"></span>
          Our Expertise
        </h2>
        
        {/* Ghost Text Header */}
        <div
          className="text-5xl font-display font-black uppercase tracking-tighter select-none relative"
          style={{ 
            color: 'rgba(241, 245, 249, 0.08)',
          }}
        >
          SERVICES
        </div>
      </div>

      {/* Hero Asset for Mobile (Truck) */}
      <div className="relative w-[90vw] max-w-[400px] mb-12 z-10 flex justify-center">
        {/* Floor Line */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#50C878]/30 to-transparent" />
        
        <Image
          src="/truck-sideView.png"
          alt="Semi Truck Side Profile"
          width={500}
          height={200}
          className="w-[90%] h-auto object-contain relative z-20"
        />
        
        {/* Contact Shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-[8px] bg-black rounded-[100%] blur-[4px] opacity-100 z-10" />
      </div>

      {/* Cards Stack */}
      <div className="relative z-20 w-full px-5 flex flex-col gap-5">
        <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
          <linearGradient id="brand-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#50C878" />
            <stop offset="100%" stopColor="#0B3D2E" />
          </linearGradient>
        </svg>

        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div 
              key={idx}
              className="flex flex-col gap-2 w-full p-6 rounded-2xl relative overflow-hidden"
              style={{ 
                background: 'rgba(6, 18, 14, 0.6)', 
                border: '1px solid rgba(80, 200, 120, 0.2)', 
              }}
            >
              {/* Inner border glow highlight */}
              <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-1">
                <div className="p-2.5 bg-black/80 rounded-lg border border-white/10 shadow-lg">
                  <Icon className="w-6 h-6" strokeWidth={2} style={{ stroke: 'url(#brand-gradient-mobile)' }} />
                </div>
                <h3 className="text-[1.05rem] font-black text-[#E2E8F0] uppercase tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>
              <p className="text-[0.85rem] text-[#94A3B8] leading-relaxed pl-[3.25rem]">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
