"use client";

import { useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

function TestimonialCard({ item }: { item: { quote: string; name: string; role: string; avatar: string; } }) {
  return (
    <div className="w-[350px] md:w-[400px] shrink-0 bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden group hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#151515] hover:border-white/10 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(127,224,77,0.1)] cursor-pointer">
      {/* Decorative background quote */}
      <Quote className="absolute -top-4 -right-4 w-32 h-32 text-[#F1F5F9]/[0.02] group-hover:text-[#50C878]/[0.05] transition-colors duration-500 rotate-12" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-5xl font-serif text-[#50C878] leading-[0.5] mt-2 group-hover:-translate-y-1 transition-transform duration-300">“</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#50C878] text-[#50C878] group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
            ))}
          </div>
        </div>
        <p className="text-[#999] group-hover:text-[#bbb] transition-colors duration-300 text-sm md:text-[15px] leading-relaxed">
          {item.quote}
        </p>
      </div>
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 relative shrink-0 group-hover:ring-2 ring-[#50C878]/50 transition-all duration-300">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="40px"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[#F1F5F9] font-bold text-sm group-hover:text-[#50C878] transition-colors duration-300">{item.name}</span>
          <span className="text-[#666] text-xs">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export function TrustBar() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.from(".trust-header", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trust-header",
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    gsap.from(".trust-stat", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trust-stats-container",
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black overflow-hidden border-y border-white/8 py-20 md:py-32">
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
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-left,
        .pause-on-hover:hover .animate-scroll-right {
          animation-play-state: paused;
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
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background World/Map Image */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
          alt="Abstract World"
          fill
          className="object-cover"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
          }}
        />
      </div>

      {/* Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-40 w-[600px] h-[600px]"
        style={{
          background: "radial-gradient(circle at center, rgba(127,224,77,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -right-40 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle at center, rgba(127,224,77,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full">
        {/* Header & Stats Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12 mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            
            {/* Left: Text */}
            <div className="trust-header max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#50C878]/30 bg-[#50C878]/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#50C878]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#50C878]">
                  CARRIER STORIES
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black font-display text-[#F1F5F9] mb-4 leading-[1.1] tracking-tight">
                Real drivers.<br />
                <span className="text-[#50C878]">Real results.</span>
              </h2>
              <p className="text-[#888] text-base md:text-lg leading-relaxed max-w-md">
                From owner-operators to growing fleets — here is what the community says about Nexar Dispatch.
              </p>
            </div>

            {/* Right: Stats */}
            <div className="trust-stats-container flex flex-wrap items-center gap-8 md:gap-16 lg:pb-2">
              {/* Avatars preview stack */}
              <div className="trust-stat hidden sm:flex flex-col gap-2">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((num) => (
                    <div key={num} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden relative">
                       <Image src={`/avatars/Girlmage${num}.png`} alt="Driver" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#666]">
                  Loved by <span className="text-[#F1F5F9] font-bold">500+</span> drivers
                </p>
              </div>

              {STATS.map((stat, i) => (
                <div key={i} className="trust-stat flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-3xl md:text-4xl font-black text-[#F1F5F9]">
                      {stat.value}
                    </span>
                    {stat.isStar && <Star className="w-5 h-5 fill-[#50C878] text-[#50C878] mb-2" />}
                  </div>
                  <span className="text-[#666] text-xs uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Marquee Rows Container */}
        <div className="relative w-full pause-on-hover overflow-hidden flex flex-col gap-6 pt-4 pb-8">
          
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

          {/* Top Row (Scroll Left) */}
          <div className="flex w-fit">
            <div className={`flex gap-6 px-3 ${!reducedMotion ? 'animate-scroll-left' : ''}`}>
              {/* Duplicated for seamless loop */}
              {[...TOP_ROW, ...TOP_ROW].map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom Row (Scroll Right) */}
          <div className="flex w-fit ml-[-20%] md:ml-[-10%]">
            <div className={`flex gap-6 px-3 ${!reducedMotion ? 'animate-scroll-right' : ''}`}>
              {/* Duplicated for seamless loop */}
              {[...BOTTOM_ROW, ...BOTTOM_ROW].map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
