import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { StoryStack } from "@/components/sections/StoryStack";
import Image from "next/image";

export const metadata = {
  title: "About Us | Nexar Dispatch",
  description: "Our story and the process of how we partner with you to scale your trucking business.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white flex flex-col relative">
        {/* Faded Background Image (Matches CTA style but brighter) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <Image
            src="/about-bg.jpg"
            alt="About us background"
            fill
            className="object-cover"
            priority
            style={{ filter: "blur(2px) brightness(0.9)" }}
          />
          {/* Radial gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 pt-[100px]">
          <StoryStack />
        </div>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
