"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as any) || internalRef;
    const prefersReducedMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion || !resolvedRef.current) return;
      const rect = resolvedRef.current.getBoundingClientRect();
      const hx = e.clientX - rect.left - rect.width / 2;
      const hy = e.clientY - rect.top - rect.height / 2;
      // Magnetic pull factor
      x.set(hx * 0.2);
      y.set(hy * 0.2);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={resolvedRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: prefersReducedMotion ? 0 : mouseXSpring, y: prefersReducedMotion ? 0 : mouseYSpring }}
        whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center font-body rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors duration-quick ease-quick",
          {
            "bg-accent text-white hover:bg-accent-2 shadow-[0_4px_14px_rgba(4,120,87,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)]": variant === "primary",
            "bg-surface border border-line text-text hover:border-accent hover:text-accent hover:bg-surface-2": variant === "secondary",
            "px-5 py-2 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
