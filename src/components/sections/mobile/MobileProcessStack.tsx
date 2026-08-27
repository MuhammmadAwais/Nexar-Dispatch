"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PROCESS_STEPS = [
  {
    num: "/01",
    title: "Carrier Onboarding",
    desc: "We analyze your fleet's capabilities, preferred lanes, and revenue goals to tailor a strategy specifically for you.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  },
  {
    num: "/02",
    title: "Setup & Compliance",
    desc: "We handle all the heavy paperwork—MC authority checks, W-9s, insurance certificates, and broker packet setups.",
    img: "/process/setup-compliance.jpg",
  },
  {
    num: "/03",
    title: "Strategic Booking",
    desc: "Leveraging our broker network and market analytics, we negotiate the highest-paying freight for your trucks.",
    img: "/process/strategic-booking.jpg",
  },
  {
    num: "/04",
    title: "24/7 Load Management",
    desc: "We manage check calls, route optimization, and act as your dedicated back-office support from pickup to delivery.",
    img: "/process/ongoing-load-management.jpg",
  },
  {
    num: "/05",
    title: "Invoicing & Factoring",
    desc: "Once the load is delivered, we immediately handle the invoicing, BOL submissions, and factoring so you get paid faster.",
    img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&q=80",
  },
];

export function MobileProcessStack() {
  return (
    <section className="relative w-full bg-black py-16 px-5 overflow-hidden border-t border-white/5">
      
      {/* Header */}
      <div className="relative z-10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#50C878]" />
          <span className="text-[#50C878] font-mono text-[11px] tracking-widest uppercase font-bold">PROCESS</span>
        </div>
        
        <h2 className="text-4xl font-display font-black leading-[1.05] tracking-tight">
          <span className="block text-white">One partner.</span>
          <span className="block text-[#50C878]">Total control.</span>
          <span className="block text-[#50C878]">Zero hassle.</span>
        </h2>
      </div>

      {/* Vertical Stack */}
      <div className="flex flex-col gap-8 relative z-10">
        {PROCESS_STEPS.map((step, i) => (
          <MobileCard key={i} step={step} />
        ))}
      </div>
      
    </section>
  );
}

function MobileCard({ step }: { step: typeof PROCESS_STEPS[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]/80 flex flex-col shadow-xl"
    >
      {/* Top Image Area */}
      <div className="w-full h-[180px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        <Image
          src={step.img}
          alt={step.title}
          fill
          className="object-cover opacity-60 mix-blend-luminosity"
        />
      </div>

      {/* Bottom Content Area */}
      <div className="px-5 pb-6 pt-2 relative z-20">
        <span className="text-lg font-mono text-[#50C878] font-bold mb-1 block">
          {step.num}
        </span>
        <h3 className="text-2xl font-display font-medium text-white tracking-tight mb-3">
          {step.title}
        </h3>
        <p className="text-[0.9rem] text-[#999] leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
