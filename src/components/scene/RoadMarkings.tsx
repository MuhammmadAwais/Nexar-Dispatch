import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function RoadMarkings({ className }: { className?: string }) {
  return (
    <div className={cn("absolute bottom-[45px] left-0 h-[10px] w-[6000px] opacity-50", className)}>
      <svg className="w-full h-full">
        <defs>
          <pattern id="road-markings-pattern" width="1920" height="10" patternUnits="userSpaceOnUse">
            <path 
              d="M0,5 h100 m140,0 h100 m140,0 h100 m140,0 h100 m140,0 h100 m140,0 h100 m140,0 h100 m140,0 h100 m140,0" 
              stroke="#475569" 
              strokeWidth="6" 
              strokeDasharray="100, 140" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#road-markings-pattern)" />
      </svg>
    </div>
  );
}
