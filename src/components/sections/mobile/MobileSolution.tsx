"use client";

import { XCircle, CheckCircle2 } from "lucide-react";

export function MobileSolution() {
  const badPoints = [
    "Disorganized group chats and lost load details",
    "Manual tracking, paper BOLs",
    "No visibility into rate trends",
    "Chasing brokers for updates yourself",
    "Invoicing and factoring on your own time"
  ];

  const goodPoints = [
    "One dashboard with real-time load status",
    "Digital docs and live load tracking",
    "Rate history and performance tracking per lane",
    "Dedicated dispatcher handling all broker comms",
    "Invoicing and factoring submitted same-day"
  ];

  return (
    <section className="relative w-full bg-black py-20 overflow-hidden z-20 border-t border-white/5">
      
      {/* Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem'
        }}
      />

      <div className="relative px-6 flex flex-col items-center z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#50C878]" />
          <span className="text-[#50C878] font-bold tracking-[0.15em] text-[10px] uppercase">
            WHY NEXAR DISPATCH
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-display font-black text-white text-center leading-[1.1] tracking-tight mb-12">
          A Smarter Way to Run Your Truck
        </h2>

        {/* Comparison Stack */}
        <div className="w-full flex flex-col gap-6">
          
          {/* Top (Traditional) */}
          <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-[1.25rem] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Doing It Yourself / Other Services</h3>
            <ul className="space-y-4">
              {badPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500/80 shrink-0 mt-0.5 opacity-80" />
                  <span className="text-white/50 text-[13px] font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom (Nexar Dispatch) */}
          <div className="w-full bg-[#0a1a10] border border-[#50C878]/30 rounded-[1.25rem] p-6 shadow-[0_0_30px_rgba(80,200,120,0.05)] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#50C878]/10 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#50C878]/10 blur-[40px] rounded-full pointer-events-none" />

            <h3 className="text-lg font-bold text-white mb-6 relative z-10">Nexar Dispatch</h3>
            <ul className="space-y-4 relative z-10">
              {goodPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#50C878] shrink-0 mt-0.5" />
                  <span className="text-white/95 text-[13px] font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
