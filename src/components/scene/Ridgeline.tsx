import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Ridgeline({ className }: { className?: string }) {
  return (
    <div className={cn("absolute bottom-[200px] left-0 h-[300px] w-[6000px]", className)}>
      <svg className="w-full h-full">
        <defs>
          <pattern id="ridgeline-pattern" width="1920" height="300" patternUnits="userSpaceOnUse">
            <path 
              d="M0,150 L100,150 L150,180 L300,180 L400,100 L600,100 L700,140 L1000,140 L1100,80 L1400,80 L1500,120 L1700,120 L1800,150 L1920,150 L1920,300 L0,300 Z" 
              fill="#0D1B2A" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ridgeline-pattern)" />
      </svg>
    </div>
  );
}
