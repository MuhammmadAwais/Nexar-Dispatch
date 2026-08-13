"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../ui/Button";
import Image from "next/image";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Equipment", href: "#equipment" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    
    // Prevent scrolling when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-line shadow-sm py-4" 
            : "bg-transparent border-b border-transparent py-6"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-[clamp(1.25rem,4vw,4rem)] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Nexar Dispatch" width={180} height={40} className="object-contain w-auto h-[32px] md:h-[40px]" style={{ width: "auto" }} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-body font-medium hover:text-accent text-sm transition-colors duration-quick ease-quick"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Button size="md" variant="primary" className="shadow-[0_4px_14px_rgba(4,120,87,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]">Get Started</Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-text-body hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-[24px] pt-24 px-4 pb-8 flex flex-col justify-between lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : i * 0.04, duration: 0.2 }}
                  className="text-display-l text-text font-display font-bold border-b border-line pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="pt-8">
              <Button size="lg" className="w-full shadow-[0_4px_14px_rgba(4,120,87,0.3)]" onClick={() => setMobileOpen(false)}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
