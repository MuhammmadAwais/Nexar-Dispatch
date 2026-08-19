"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Home",         href: "/"             },
  { label: "About us",    href: "/about"          },
  { label: "Services",    href: "/#services-mobile" },
  { label: "How it works",href: "/#how-it-works-mobile" },
  { label: "Equipment",   href: "/#equipment-mobile" },
  { label: "Contact us",  href: "/contact"       },
];

export function MobileNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "py-3 bg-black/90 backdrop-blur-md border-b border-white/5" : "py-4 bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0 z-10">
          <Image
            src="/logo.png"
            alt="Nexar Dispatch"
            width={140}
            height={30}
            className="object-contain w-auto h-[28px] brightness-0 invert"
          />
        </Link>

        {/* Mobile toggle */}
        <button
          className="p-2 text-[#F1F5F9]/80 hover:text-white transition-colors z-[60]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {LINKS.map((link, i) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <motion.a
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.18 }}
                    className="flex items-center gap-3 text-2xl font-display font-black text-[#F1F5F9] border-b border-white/10 py-4 uppercase tracking-tight transition-colors"
                  >
                    {i === 0 && (
                      <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                    )}
                    {link.label}
                  </motion.a>
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-8">
              <Link
                href="/#services"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-full py-4 text-lg font-bold text-black"
                style={{
                  background: "linear-gradient(90deg, #50C878 0%, #0B3D2E 100%)"
                }}
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-full py-4 text-lg font-semibold text-[#F1F5F9] border border-white/20"
              >
                Talk to us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
