import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  const floatingImages = [
    { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80", top: "10%", left: "15%", width: 200, height: 150, delay: "0s" },
    { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", top: "60%", left: "10%", width: 180, height: 220, delay: "2s" },
    { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", top: "20%", left: "75%", width: 220, height: 160, delay: "1s" },
    { src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80", top: "70%", left: "80%", width: 190, height: 200, delay: "3s" },
    { src: "https://images.unsplash.com/photo-1517429128955-67750afd7e32?w=800&q=80", top: "5%", left: "45%", width: 150, height: 150, delay: "1.5s" },
    { src: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=800&q=80", top: "85%", left: "40%", width: 250, height: 180, delay: "0.5s" },
  ];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center border-t border-white/5">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Blurred Background Images */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]">
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
              filter: "blur(6px) brightness(0.7)",
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
        {/* Radial gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-90" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto text-center">
        
        <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-black text-white leading-[1.3] md:leading-[1.2] tracking-tight mb-8 drop-shadow-lg">
          Run Your Truck Like a{" "}
          <span className="relative inline-block border border-[#50C878]/30 bg-[#50C878]/10 px-4 md:px-5 py-1 md:py-2 mx-1 align-middle translate-y-[-2px]">
            {/* Corner Points */}
            <span className="absolute top-[-3px] left-[-3px] w-[5px] h-[5px] bg-white" />
            <span className="absolute top-[-3px] right-[-3px] w-[5px] h-[5px] bg-white" />
            <span className="absolute bottom-[-3px] left-[-3px] w-[5px] h-[5px] bg-white" />
            <span className="absolute bottom-[-3px] right-[-3px] w-[5px] h-[5px] bg-white" />
            <span className="font-medium text-[#E6F4EA] leading-none">Business</span>
          </span>
          <br className="hidden md:block" /> Not a Second Job
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed">
          Let a dedicated dispatcher handle the paperwork, the negotiating, and the phone calls — you handle the miles.
        </p>

        <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-[#50C878] text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#50C878]/90 transition-all shadow-[0_0_20px_rgba(80,200,120,0.3)] hover:shadow-[0_0_40px_rgba(80,200,120,0.5)]">
          Get Started Today
          <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>

    </section>
  );
}
