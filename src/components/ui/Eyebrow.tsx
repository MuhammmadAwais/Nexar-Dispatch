import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Eyebrow = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-label font-mono uppercase tracking-label text-text-muted block mb-4", className)}
        {...props}
      />
    );
  }
);
Eyebrow.displayName = "Eyebrow";
