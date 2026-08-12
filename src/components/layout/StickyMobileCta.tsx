"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.body.clientHeight;

          const pastHero = scrollY > windowHeight * 0.8;
          const nearBottom = scrollY + windowHeight >= documentHeight - 400;

          setVisible(pastHero && !nearBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe bg-gradient-to-t from-bg via-bg/90 to-transparent lg:hidden pointer-events-none"
        >
          <div className="pointer-events-auto max-w-md mx-auto">
            <Button size="lg" className="w-full border border-line-bright shadow-[0_0_24px_rgba(47,128,237,0.15)]">
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
