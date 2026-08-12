import * as React from "react";
import { Eyebrow } from "../ui/Eyebrow";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line pt-16 pb-8 px-4 md:px-[clamp(1.25rem,4vw,4rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <h2 className="text-display-m font-display text-text mb-4">NEXAR DISPATCH</h2>
            <p className="text-text-body max-w-sm mb-6">
              A premium dispatch service built to keep owner-operators and small fleets moving. We handle the paperwork, negotiations, and route planning so you can focus on the drive.
            </p>
            <p className="text-label font-mono text-text-muted uppercase tracking-label">
              Nexar Dispatch is a dispatching service, not a freight broker or motor carrier.
            </p>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-7">
            <Eyebrow>Services</Eyebrow>
            <ul className="space-y-3">
              {["Load Search", "Rate Negotiation", "Route Planning", "Paperwork"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-body hover:text-text transition-colors duration-quick ease-quick text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Eyebrow>Company</Eyebrow>
            <ul className="space-y-3">
              {["About", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-body hover:text-text transition-colors duration-quick ease-quick text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Eyebrow>Legal</Eyebrow>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms", "Carrier Agreement"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-body hover:text-text transition-colors duration-quick ease-quick text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-line gap-4">
          <div className="flex gap-6">
            <a href="mailto:info@nexardispatch.com" className="text-text-body hover:text-text text-sm transition-colors">
              info@nexardispatch.com
            </a>
            <a href="tel:8005550199" className="text-text-body hover:text-text text-sm transition-colors">
              (800) 555-0199
            </a>
          </div>
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Nexar Dispatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
