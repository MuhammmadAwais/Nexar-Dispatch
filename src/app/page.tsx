import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { StickyMobileCta } from "../components/layout/StickyMobileCta";

import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import ServicesShowcase from "../components/sections/ServicesShowcase";
import { RoadJourney } from "../components/sections/RoadJourney";
import { Solution } from "../components/sections/Solution";
import { ServicesDetail } from "../components/sections/ServicesDetail";
import { HowItWorks } from "../components/sections/HowItWorks";
import { ProcessStack } from "../components/sections/ProcessStack";
import { Faq } from "../components/sections/Faq";
import { Cta } from "../components/sections/Cta";

// Mobile components
import { MobileNavbar } from "../components/layout/mobile/MobileNavbar";
import { MobileFooter } from "../components/layout/mobile/MobileFooter";
import { MobileHero } from "../components/sections/mobile/MobileHero";
import { MobileTrustBar } from "../components/sections/mobile/MobileTrustBar";
import { MobileServicesShowcase } from "../components/sections/mobile/MobileServicesShowcase";
import { MobileRoadJourney } from "../components/sections/mobile/MobileRoadJourney";
import { MobileSolution } from "../components/sections/mobile/MobileSolution";
import { MobileServicesDetail } from "../components/sections/mobile/MobileServicesDetail";
import { MobileHowItWorks } from "../components/sections/mobile/MobileHowItWorks";
import { MobileProcessStack } from "../components/sections/mobile/MobileProcessStack";
import { MobileFaq } from "../components/sections/mobile/MobileFaq";
import { MobileCta } from "../components/sections/mobile/MobileCta";

export default function Home() {
  return (
    <>
      {/* ── DESKTOP VIEW ── */}
      <div className="hidden md:block">
        <Navbar />
        <main className="flex min-h-screen flex-col">
          <Hero />
          <HowItWorks />
          <TrustBar />
          <ServicesShowcase />
          <ServicesDetail />
          <RoadJourney />
          <Solution />
          <ProcessStack />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>

      {/* ── MOBILE VIEW ── */}
      <div className="block md:hidden">
        <MobileNavbar />
        <main className="flex min-h-[100dvh] flex-col">
          <MobileHero />
          <MobileHowItWorks />
          <MobileTrustBar />
          <MobileServicesShowcase />
          <MobileServicesDetail />
          <MobileRoadJourney />
          <MobileSolution />
          <MobileProcessStack />
          <MobileFaq />
          <MobileCta />
        </main>
        <MobileFooter />
      </div>
      
      {/* Sticky CTA (shows on mobile only natively inside component) */}
      <StickyMobileCta />
    </>
  );
}
