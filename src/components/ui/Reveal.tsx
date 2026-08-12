"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RevealProps {
  children: React.ReactNode;
  stagger?: boolean;
  staggerDelay?: number;
  delay?: number;
  className?: string;
}

const variants = {
  hidden: (reduced: boolean) => (reduced ? { opacity: 0 } : { opacity: 0, y: 16 }),
  visible: (reduced: boolean) => (reduced ? { opacity: 1 } : { opacity: 1, y: 0 }),
};

export const Reveal = ({ children, stagger = false, staggerDelay = 0.06, delay = 0, className }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (stagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
        custom={prefersReducedMotion}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return (
            <motion.div 
              variants={variants} 
              custom={prefersReducedMotion} 
              transition={{
                duration: prefersReducedMotion ? 0.12 : 0.42,
                ease: prefersReducedMotion ? "easeOut" : [0.16, 1, 0.3, 1],
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
      variants={variants}
      custom={prefersReducedMotion}
      transition={{
        duration: prefersReducedMotion ? 0.12 : 0.42,
        ease: prefersReducedMotion ? "easeOut" : [0.16, 1, 0.3, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};
