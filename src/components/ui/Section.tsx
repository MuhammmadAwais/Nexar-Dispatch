import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  index?: string;
  title?: string;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ index, title, children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full py-[clamp(5rem,10vw,9rem)] relative overflow-hidden bg-bg", className)}
        {...props}
      >
        {/* Subtle grid background for all sections to maintain premium aesthetic */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50" 
          style={{
            backgroundImage: `linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)`,
            backgroundSize: `4rem 4rem`,
            maskImage: `radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)`
          }}
        />
        
        <div className="mx-auto max-w-7xl px-4 md:px-[clamp(1.25rem,4vw,4rem)] relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-[clamp(1.25rem,4vw,4rem)] relative">
            {/* Left Rail (Desktop >= 1280px) */}
            <div className="hidden xl:block xl:col-span-1 relative">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
              {index && title && (
                <div className="sticky top-24 pl-4 pt-2">
                  <span className="text-label font-mono uppercase tracking-label text-text-muted">
                    {index} / {title}
                  </span>
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div className="xl:col-span-11">
              {children}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";
