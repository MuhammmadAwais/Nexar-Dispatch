import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { StickyMobileCta } from "../../components/layout/StickyMobileCta";
import { ContactPageSection } from "../../components/sections/contact/ContactPageSection";

export const metadata = {
  title: "Contact Us | Nexar Dispatch",
  description: "Get in touch with Nexar Dispatch to optimize your fleet and scale your operations.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col pt-20">
        <ContactPageSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
