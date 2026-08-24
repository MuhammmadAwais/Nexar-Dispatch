"use client";

import React from 'react';
import { Truck, Snowflake, Package, Box, Zap } from 'lucide-react';

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
  }
];

export function MobileServicesDetail() {
  return (
    <section id="equipment-mobile" className="w-full bg-[#030502] py-16 flex flex-col relative border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[20%] w-[200px] h-[200px] bg-[#50C878] opacity-[0.05] blur-[80px] rounded-full" />
      </div>

      <div className="px-5 mb-10 relative z-10">
        <h2 className="text-[10px] font-bold tracking-widest text-[#50C878] uppercase mb-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#50C878] rounded-full animate-pulse"></span>
          Equipment Specialization
        </h2>
        <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight">
          Lanes For Every Load
        </h3>
      </div>

      <div className="px-5 flex flex-col gap-6 relative z-10">
        {equipmentTypes.map((eq) => {
          const Icon = eq.icon;
          return (
            <div 
              key={eq.id} 
              className="relative w-full rounded-2xl border border-white/5 p-6 flex flex-col overflow-hidden shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(5,5,5,1) 100%)',
              }}
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-lg border border-white/10 shadow-lg">
                    <Icon className="w-5 h-5 text-[#50C878]" strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-black tracking-tight text-[#F1F5F9] uppercase">
                    {eq.heroTitle}
                  </h4>
                </div>
                <span className="text-xl font-light text-[#50C878]">
                  {eq.number}
                </span>
              </div>

              <p className="text-[#a0a0a0] text-[0.9rem] leading-relaxed mb-6 font-light">
                {eq.heroDesc}
              </p>

              <div className="flex-grow flex flex-col gap-4 mb-8">
                <ul className="flex flex-col gap-3">
                  {eq.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#a8f060] text-[10px] mt-1 shrink-0">✦</span>
                      <span className="text-[#999] text-[0.85rem] leading-relaxed font-light">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rate Footer */}
              <div className="mt-auto pt-5 border-t border-white/5 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#666] mb-0.5">Average Rate</div>
                  <div className="text-[#888] font-light text-[11px]">{eq.subtitle}</div>
                </div>
                <div className="text-3xl font-normal text-[#F1F5F9] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                  {eq.rate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
