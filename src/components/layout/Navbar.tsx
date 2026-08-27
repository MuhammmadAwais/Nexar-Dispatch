"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home",         href: "/"             },
  { label: "About us",    href: "/about"          },
  { label: "Services",    href: "/#services"      },
  { label: "How it works",href: "/#how-it-works"  },
  { label: "Equipment",   href: "/#equipment"     },
  { label: "Contact us",  href: "/contact"       },
];

export function Navbar() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.substring(1);
    }
    if (href === "/") {
      return pathname === "/" && activeHash === "";
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-300",
          scrolled ? "py-3 bg-black/80 backdrop-blur-md" : "py-5 bg-transparent"
        )}
      >
        {/* ── 1. Logo (far left) ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 z-10">
          <Image
            src={scrolled ? "/shortForm-white-logo.png" : "/longForm-white-logo.png"}
            alt="Nexar Dispatch"
            width={300}
            height={90}
            unoptimized
            className={cn(
              "object-contain w-auto transition-all duration-300",
              scrolled ? "h-[24px] md:h-[32px]" : "h-[36px] md:h-[48px] xl:h-[56px]"
            )}
            style={{ width: "auto" }}
          />
        </Link>

        {/* ── 2. Nav pill (center) — hidden on mobile ── */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-[#333333]/60 backdrop-blur-md px-6 py-3 shadow-lg border border-white/5">
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-full px-3 py-1 text-[14px] font-medium whitespace-nowrap transition-colors duration-200",
                    active
                      ? "text-[#50C878]"
                      : "text-[#F1F5F9]/70 hover:text-[#50C878]"
                  )}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] shrink-0 shadow-[0_0_8px_rgba(80,200,120,0.8)]" />
                  )}
                  {link.label}
                  {/* Animated underline on hover */}
                  {!active && (
                    <span className="absolute left-3 right-3 -bottom-1 h-[2px] rounded-full bg-[#50C878]/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ── 3. CTA Buttons (far right) — hidden on mobile ── */}
        <div className="hidden lg:flex items-center gap-6 shrink-0 z-10">
          <Link
            href="/contact"
            className="text-[15px] font-medium text-[#F1F5F9] hover:text-[#F1F5F9]/80 transition-colors duration-150"
          >
            Talk to us
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded-full px-7 py-2.5 text-[15px] font-bold text-black shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{
              background: "linear-gradient(90deg, #50C878 0%, #0B3D2E 100%)"
            }}
          >
            Get Started
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="lg:hidden p-2 text-[#F1F5F9]/70 hover:text-[#F1F5F9] transition-colors z-10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.22 }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden"
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
                    className="flex items-center gap-3 text-2xl font-display font-black text-[#F1F5F9] border-b border-white/8 py-4 uppercase tracking-tight transition-colors"
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
