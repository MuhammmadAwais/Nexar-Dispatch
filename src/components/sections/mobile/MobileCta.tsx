"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MobileCta() {
  const floatingImages = [
    { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80", top: "5%", left: "5%", width: 140, height: 100, delay: "0s" },
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", top: "70%", left: "60%", width: 150, height: 120, delay: "1s" },
  ];

  return (
    <section className="relative w-full py-24 min-h-[500px] bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Blurred Background Images (Reduced for mobile) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.25]">
        {floatingImages.map((img, i) => (
          <div
            key={i}
            className="absolute rounded-2xl overflow-hidden animate-float-slow shadow-2xl"
            style={{
              top: img.top,
              left: img.left,
              width: img.width,
              height: img.height,
              animationDelay: img.delay,
              filter: "blur(6px) brightness(0.6)",
            }}
          >
            <Image
              src={img.src}
              alt="Logistics background"
              fill
              className="object-cover"
            />
          </div>
        ))}
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 max-w-sm mx-auto text-center">
        
        <h2 className="text-3xl font-display font-medium text-white leading-[1.1] tracking-tight mb-5 drop-shadow-lg">
          Transform Your Logistics Operations Into A Scalable Fleet With
        </h2>
        
        <div className="relative inline-flex items-center justify-center border border-[#50C878]/30 bg-[#50C878]/10 px-6 py-3 mb-10">
          {/* Corner Points */}
          <div className="absolute top-[-2px] left-[-2px] w-[3px] h-[3px] bg-white" />
          <div className="absolute top-[-2px] right-[-2px] w-[3px] h-[3px] bg-white" />
          <div className="absolute bottom-[-2px] left-[-2px] w-[3px] h-[3px] bg-white" />
          <div className="absolute bottom-[-2px] right-[-2px] w-[3px] h-[3px] bg-white" />
          
          <span className="text-3xl font-display font-medium text-[#E6F4EA] tracking-tight whitespace-nowrap">
            Nexar Dispatch
          </span>
        </div>

        <Link href="/contact" className="group relative w-full inline-flex items-center justify-center gap-3 bg-[#50C878] text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#50C878]/90 transition-all shadow-[0_0_20px_rgba(80,200,120,0.3)]">
          Get Started Today
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>

    </section>
  );
}
