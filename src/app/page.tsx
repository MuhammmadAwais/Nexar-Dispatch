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

export default function Home() {
  return (
    <>
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
      <StickyMobileCta />
    </>
  );
}
