"use client";
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP } from "@/lib/gsap";

import { useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";


const STATS = [
  { value: "500+", label: "Active Drivers" },
  { value: "4.9", label: "Rating", isStar: true },
  { value: "98%", label: "Satisfaction" },
];

const TOP_ROW = [
  {
    quote: "My performance is up 20% since I started dispatching with Nexar. The rate negotiations keep me profitable every day.",
    name: "Carlos Medina",
    role: "Owner-Operator · Texas",
    avatar: "/avatars/Girlmage1.png",
  },
  {
    quote: "Finally a dispatch service that respects serious drivers. Check calls, routes, and brokers — all dialed in perfectly.",
    name: "Priya Sharma",
    role: "Fleet Owner · California",
    avatar: "/avatars/Girlmage2.png",
  },
  {
    quote: "Running my fleet used to be a headache. Now paperwork, rate cons, and load tracking are all handled seamlessly.",
    name: "James Okonkwo",
    role: "Logistics Manager · Illinois",
    avatar: "/avatars/Girlmage3.png",
  },
  {
    quote: "The dedicated dispatcher is a hidden gem. Got me a great dedicated lane and found a backhaul the same afternoon.",
    name: "Yuki Tanaka",
    role: "Reefer Carrier · Oregon",
    avatar: "/avatars/Girlmage4.png",
  },
];

const BOTTOM_ROW = [
  {
    quote: "Nexar completely changed how I manage my trucks. Less downtime, better paying loads — it's all there and it works.",
    name: "Ahmed Al-Rashidi",
    role: "Flatbed Driver · Ohio",
    avatar: "/avatars/Girlmage5.png",
  },
  {
    quote: "I manage 10 trucks. The transparency lets me and my drivers have completely separate access to load info — perfect.",
    name: "Amara Diallo",
    role: "Fleet Manager · Georgia",
    avatar: "/avatars/Girlmage6.png",
  },
  {
    quote: "Saved time, reduced stress — everything is there, fast, and clean. Built by people who actually get what truckers need.",
    name: "Lucas Ferreira",
    role: "Dry Van Owner · Florida",
    avatar: "/avatars/Girlmage7.png",
  },
  {
    quote: "The support doesn't feel like an afterthought here — it is the whole point. This is the first dispatch service I've actually kept.",
    name: "Nina Hoffmann",
    role: "Hotshot Carrier · Texas",
    avatar: "/avatars/Girlmage8.png",
  },
];

function MobileTestimonialCard({ item }: { item: { quote: string; name: string; role: string; avatar: string; } }) {
  return (
    <div className="w-[85vw] max-w-[320px] shrink-0 bg-[#111] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-5 relative overflow-hidden">
      <Quote className="absolute -top-4 -right-4 w-28 h-28 text-[#F1F5F9]/[0.02] rotate-12" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className="text-4xl font-serif text-[#50C878] leading-[0.5] mt-2">“</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-[#50C878] text-[#50C878]" />
            ))}
          </div>
        </div>
        <p className="text-[#999] text-[0.85rem] leading-relaxed">
          {item.quote}
        </p>
      </div>
      
      <div className="flex items-center gap-3 relative z-10 pt-2">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 relative shrink-0">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[#F1F5F9] font-bold text-xs">{item.name}</span>
          <span className="text-[#666] text-[10px]">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export function MobileTrustBar() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.from(".mobile-trust-header", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".mobile-trust-header",
        start: "top 85%",
      }
    });

    gsap.from(".mobile-trust-stat", {
      opacity: 0,
      y: 15,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".mobile-trust-stats-container",
        start: "top 90%",
      }
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden border-y border-white/8 py-16"
    >
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 12px)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full">
        {/* Header & Stats Container */}
        <div className="px-5 mb-12">
          <div className="flex flex-col gap-10">
            {/* Top Text */}
            <div className="mobile-trust-header text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-[#50C878]/30 bg-[#50C878]/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#50C878]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#50C878]">
                  CARRIER STORIES
                </span>
              </div>
              <h2 className="text-3xl font-black font-display text-[#F1F5F9] mb-3 leading-[1.1] tracking-tight">
                Real drivers.
                <br />
                <span className="text-[#50C878]">Real results.</span>
              </h2>
              <p className="text-[#888] text-[0.9rem] leading-relaxed max-w-sm mx-auto">
                From single-truck owner-operators to growing fleets — here's
                what carriers say about running with Nexar.
              </p>
            </div>

            {/* Stats (Grid layout on mobile) */}
            <div className="mobile-trust-stats-container grid grid-cols-2 gap-y-8 gap-x-4 place-items-center">
              <div className="mobile-trust-stat flex flex-col items-center gap-1 col-span-2 pb-2">
                <div className="flex -space-x-2 mb-1">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className="w-8 h-8 rounded-full border border-black overflow-hidden relative"
                    >
                      <Image
                        src={`/avatars/Girlmage${num}.png`}
                        alt="Driver"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#666]">
                  Loved by{" "}
                  <span className="text-[#F1F5F9] font-bold">500+</span> drivers
                </p>
              </div>

              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="mobile-trust-stat flex flex-col items-center gap-1"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black text-[#F1F5F9]">
                      {stat.value}
                    </span>
                    {stat.isStar && (
                      <Star className="w-4 h-4 fill-[#50C878] text-[#50C878] mb-1" />
                    )}
                  </div>
                  <span className="text-[#666] text-[9px] uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Rows Container */}
        <div className="relative w-full overflow-hidden flex flex-col gap-4 pb-4">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-20" />

          {/* Top Row (Scroll Left) */}
          <div className="flex w-fit">
            <div
              className={`flex gap-4 px-2 ${!reducedMotion ? "animate-scroll-left" : ""}`}
            >
              {[...TOP_ROW, ...TOP_ROW].map((item, i) => (
                <MobileTestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom Row (Scroll Right) */}
          <div className="flex w-fit ml-[-20%]">
            <div
              className={`flex gap-4 px-2 ${!reducedMotion ? "animate-scroll-right" : ""}`}
            >
              {[...BOTTOM_ROW, ...BOTTOM_ROW].map((item, i) => (
                <MobileTestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
