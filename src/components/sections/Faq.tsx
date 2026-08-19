"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    category: "PLATFORM",
    question: "Is Nexar Dispatch only for large fleets?",
    answer: "Not at all! Whether you are an owner-operator with a single truck or a growing fleet with 50+ assets, our platform scales to fit your exact needs. We tailor our dispatching strategies to maximize your specific revenue goals."
  },
  {
    category: "BILLING",
    question: "How does your invoicing and factoring work?",
    answer: "We handle it instantly. As soon as a load is delivered, we submit the BOLs and necessary paperwork to your factoring company. You get paid faster without spending your weekends catching up on administrative tasks."
  },
  {
    category: "COMPLIANCE",
    question: "Do you help with MC authority setup and compliance?",
    answer: "Yes. Our team manages the heavy paperwork including MC authority checks, W-9s, insurance certificates, and broker packet setups to ensure you remain fully compliant and ready to haul."
  },
  {
    category: "SUPPORT",
    question: "Is there 24/7 support for drivers on the road?",
    answer: "Absolutely. We provide round-clock support, managing check calls, route optimization, and acting as your dedicated back-office team from pickup to delivery."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Global Header */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black text-white leading-[1.05] tracking-tighter">
            <span className="block">Got questions?</span>
            <span className="block text-[#50C878]">We’ve got answers.</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column (1/3) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h3 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight mb-8">
              Frequently Asked<br/>Questions
            </h3>
            <p className="text-lg text-[#E6F4EA]/70 font-sans leading-relaxed mb-10">
              As a premier dispatching service, we are dedicated to providing transparency and clear answers to help you scale your fleet. Don't see what you're looking for?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Link 
                href="/contact"
                className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-colors"
              >
                More Questions
              </Link>
              <Link
                href="/contact"
                className="text-[#50C878] font-medium hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Column (2/3) - Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {FAQS.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                faq={faq} 
                isOpen={openIndex === idx} 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function AccordionItem({ faq, isOpen, onClick }: { faq: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <motion.button 
      layout
      onClick={onClick}
      className="w-full text-left group flex flex-col focus:outline-none cursor-pointer"
    >
      {/* Category Tab */}
      <motion.div 
        layout
        className="w-fit px-5 py-2 bg-[#0a0a0a] rounded-t-lg border border-white/10 group-hover:border-[#50C878] transition-colors duration-300 relative z-10 translate-y-[1px]"
      >
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#E6F4EA]/50 group-hover:text-[#50C878] transition-colors duration-300 uppercase">
          {faq.category}
        </span>
      </motion.div>
      
      {/* Interactive Body */}
      <motion.div 
        layout
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#1A1A1A] border border-white/10 group-hover:border-[#50C878] rounded-b-xl rounded-tr-xl relative z-0 overflow-hidden transition-colors duration-300"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isOpen ? (
            // OPEN STATE
            <motion.div 
              key="open"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex flex-col"
            >
              {/* White Answer Box Area */}
              <div className="px-3 pt-3 pb-8 md:px-5 md:pt-5 md:pb-10 relative z-0">
                <div className="bg-white rounded-t-xl p-6 md:p-8">
                  <p className="text-black text-base md:text-lg font-sans leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Green Question Footer */}
              <div className="bg-[#50C878] px-6 py-5 md:px-8 md:py-6 flex justify-between items-center -mt-10 rounded-b-xl relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                <h4 className="text-white text-lg md:text-xl font-display font-medium pr-8">
                  {faq.question}
                </h4>
                <div className="text-white text-xl font-light">✕</div>
              </div>
            </motion.div>
          ) : (
            // CLOSED STATE
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex justify-between items-center px-6 py-5 md:px-8 md:py-6"
            >
              <h4 className="text-white text-lg md:text-xl font-display font-medium pr-8">
                {faq.question}
              </h4>
              <div className="text-[#E6F4EA]/50 group-hover:text-[#50C878] text-2xl font-light leading-none transition-colors duration-300">+</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

