import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface border border-line rounded-card overflow-hidden",
          "transition-all duration-quick ease-quick",
          "hover:border-line-bright hover:bg-surface-2 hover:-translate-y-[2px]",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
