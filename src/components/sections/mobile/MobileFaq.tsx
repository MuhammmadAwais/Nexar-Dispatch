"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    category: "OPERATIONS",
    question: "Is Nexar Dispatch only for large fleets?",
    answer: "Not at all. Whether you're running one truck or fifty, we build a dispatch strategy around your specific equipment, lanes, and revenue goals."
  },
  {
    category: "BILLING",
    question: "How does your invoicing and factoring work?",
    answer: "Once a load delivers, we submit your BOL and invoice and coordinate directly with your factoring company so payment isn't held up waiting on paperwork from our end."
  },
  {
    category: "COMPLIANCE",
    question: "Do you help with MC authority and compliance setup?",
    answer: "Yes — we review your MC authority, insurance, and carrier packet during onboarding, and handle the paperwork for new broker relationships as we book loads for you."
  },
  {
    category: "SUPPORT",
    question: "Is there support for drivers on the road?",
    answer: "Yes, our dispatch team is available for check calls, load issues, and rate negotiation support during active loads (Monday-Friday, 7am-6pm EST)."
  },
  {
    category: "PRICING",
    question: "What does Nexar Dispatch charge?",
    answer: "We charge a flat 5% - 8% fee per load depending on equipment type and lane. No hidden fees, no subscriptions, and we only get paid when you do."
  }
];

export function MobileFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black py-16 px-5 border-t border-white/5">
      
      {/* Header Area */}
      <div className="mb-12">
        <h2 className="text-4xl font-display font-black text-white leading-[1.1] tracking-tight mb-6">
          <span className="block">Got questions?</span>
          <span className="block text-[#50C878]">We’ve got answers.</span>
        </h2>
        
        <p className="text-[0.9rem] text-[#E6F4EA]/70 font-sans leading-relaxed mb-6">
          As a premier dispatching service, we are dedicated to providing transparency and clear answers to help you scale your fleet. Don&apos;t see what you&apos;re looking for?
        </p>
        
        <div className="flex flex-col gap-4">
          <Link 
            href="/contact"
            className="w-full text-center py-3.5 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            More Questions
          </Link>
          <Link
            href="/contact"
            className="text-[#50C878] font-medium text-center hover:underline underline-offset-4"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Accordion Stack */}
      <div className="flex flex-col gap-4">
        {FAQS.map((faq, idx) => (
          <AccordionItem 
            key={idx} 
            faq={faq} 
            isOpen={openIndex === idx} 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)} 
          />
        ))}
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
        className="w-fit px-4 py-1.5 bg-[#0a0a0a] rounded-t-lg border border-white/10 group-hover:border-[#50C878] transition-colors duration-300 relative z-10 translate-y-[1px]"
      >
        <span className="text-[9px] font-mono font-bold tracking-widest text-[#E6F4EA]/50 group-hover:text-[#50C878] transition-colors duration-300 uppercase">
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
              <div className="px-3 pt-3 pb-6 relative z-0">
                <div className="bg-white rounded-t-xl p-5">
                  <p className="text-black text-[0.95rem] font-sans leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Green Question Footer */}
              <div className="bg-[#50C878] px-5 py-4 flex justify-between items-center -mt-8 rounded-b-xl relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                <h4 className="text-white text-[1.05rem] font-display font-medium pr-4 leading-snug">
                  {faq.question}
                </h4>
                <div className="text-white text-lg font-light shrink-0">✕</div>
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
              className="w-full flex justify-between items-center px-5 py-4"
            >
              <h4 className="text-white text-[1.05rem] font-display font-medium pr-4 leading-snug">
                {faq.question}
              </h4>
              <div className="text-[#E6F4EA]/50 group-hover:text-[#50C878] text-2xl font-light leading-none transition-colors duration-300 shrink-0">+</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
