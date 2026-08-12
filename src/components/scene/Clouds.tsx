import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Clouds({ className }: { className?: string }) {
  return (
    <div className={cn("absolute top-0 left-0 h-[400px] w-[6000px] opacity-30", className)}>
      <svg className="w-full h-full">
        <defs>
          <pattern id="cloud-pattern" width="1920" height="400" patternUnits="userSpaceOnUse">
            <path d="M0,100 C200,80 400,120 600,100 C800,80 1000,120 1200,100 C1400,80 1600,120 1920,100 L1920,150 C1600,170 1400,130 1200,150 C1000,170 800,130 600,150 C400,130 200,170 0,150 Z" fill="#132436"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cloud-pattern)" />
      </svg>
    </div>
  );
}
