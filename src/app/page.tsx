import dynamic from "next/dynamic";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { StickyMobileCta } from "../components/layout/StickyMobileCta";

import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { HowItWorks } from "../components/sections/HowItWorks";

// Desktop below-the-fold dynamic imports
const ServicesShowcase = dynamic(() => import("../components/sections/ServicesShowcase"));
const RoadJourney = dynamic(() => import("../components/sections/RoadJourney").then((mod) => mod.RoadJourney));
const Solution = dynamic(() => import("../components/sections/Solution").then((mod) => mod.Solution));
const ServicesDetail = dynamic(() => import("../components/sections/ServicesDetail").then((mod) => mod.ServicesDetail));
const ProcessStack = dynamic(() => import("../components/sections/ProcessStack").then((mod) => mod.ProcessStack));
const Faq = dynamic(() => import("../components/sections/Faq").then((mod) => mod.Faq));
const Cta = dynamic(() => import("../components/sections/Cta").then((mod) => mod.Cta));

// Mobile below-the-fold dynamic imports
import { MobileNavbar } from "../components/layout/mobile/MobileNavbar";
import { MobileFooter } from "../components/layout/mobile/MobileFooter";
import { MobileHero } from "../components/sections/mobile/MobileHero";
import { MobileHowItWorks } from "../components/sections/mobile/MobileHowItWorks";
import { MobileTrustBar } from "../components/sections/mobile/MobileTrustBar";

const MobileServicesShowcase = dynamic(() => import("../components/sections/mobile/MobileServicesShowcase").then((mod) => mod.MobileServicesShowcase));
const MobileRoadJourney = dynamic(() => import("../components/sections/mobile/MobileRoadJourney").then((mod) => mod.MobileRoadJourney));
const MobileSolution = dynamic(() => import("../components/sections/mobile/MobileSolution").then((mod) => mod.MobileSolution));
const MobileServicesDetail = dynamic(() => import("../components/sections/mobile/MobileServicesDetail").then((mod) => mod.MobileServicesDetail));
const MobileProcessStack = dynamic(() => import("../components/sections/mobile/MobileProcessStack").then((mod) => mod.MobileProcessStack));
const MobileFaq = dynamic(() => import("../components/sections/mobile/MobileFaq").then((mod) => mod.MobileFaq));
const MobileCta = dynamic(() => import("../components/sections/mobile/MobileCta").then((mod) => mod.MobileCta));

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
