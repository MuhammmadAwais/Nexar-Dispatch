import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Skyline({ className }: { className?: string }) {
  return (
    <div className={cn("absolute bottom-[200px] left-0 h-[200px] w-[6000px]", className)}>
      <svg className="w-full h-full">
        <defs>
          <pattern id="skyline-pattern" width="1920" height="200" patternUnits="userSpaceOnUse">
            <rect x="50" y="100" width="120" height="100" fill="#132436" />
            <rect x="250" y="50" width="60" height="150" rx="30" fill="#132436" />
            <rect x="320" y="50" width="60" height="150" rx="30" fill="#132436" />
            
            {/* Crane Structure */}
            <path d="M500,200 L510,80 L650,80 L650,70 L510,70 L500,20 L490,20 L490,200 Z" fill="#132436" />
            <path d="M495,150 L530,150 M495,120 L530,120 M495,90 L530,90" stroke="#07111F" strokeWidth="4" />
            
            {/* Warehouse */}
            <rect x="800" y="120" width="200" height="80" fill="#132436" />
            <rect x="1150" y="40" width="80" height="160" fill="#132436" />
            
            {/* Water tower/Structure */}
            <polygon points="1300,200 1300,100 1350,60 1400,100 1400,200" fill="#132436" />
            
            {/* Port stack */}
            <rect x="1550" y="140" width="150" height="60" fill="#132436" />
            
            {/* Pylon */}
            <path d="M1800,200 L1820,50 L1840,200 M1780,100 L1860,100 M1800,150 L1840,150" stroke="#132436" strokeWidth="6" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skyline-pattern)" />
      </svg>
    </div>
  );
}
