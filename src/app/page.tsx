import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { StickyMobileCta } from "../components/layout/StickyMobileCta";

import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import ServicesShowcase from "../components/sections/ServicesShowcase";
import { RoadJourney } from "../components/sections/RoadJourney";
import { Problem } from "../components/sections/Problem";
import { Solution } from "../components/sections/Solution";
import { Services } from "../components/sections/Services";
import { Equipment } from "../components/sections/Equipment";
import { HowItWorks } from "../components/sections/HowItWorks";
import { LoadBoard } from "../components/sections/LoadBoard";
import { RouteMap } from "../components/sections/RouteMap";
import { WhyNexar } from "../components/sections/WhyNexar";
import { Metrics } from "../components/sections/Metrics";
import { Testimonials } from "../components/sections/Testimonials";
import { Faq } from "../components/sections/Faq";
import { Cta } from "../components/sections/Cta";
import { ContactForm } from "../components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <HowItWorks />
        <TrustBar />
        <ServicesShowcase />
        <RoadJourney />
        <Problem />
        <Solution />
        <Services />
        <Equipment />
        <LoadBoard />
        <RouteMap />
        <WhyNexar />
        <Metrics />
        <Testimonials />
        <Faq />
        <Cta />
        <ContactForm />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
