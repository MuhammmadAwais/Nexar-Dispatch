import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function HudCard({ 
  label, 
  value, 
  highlight = false,
  className
}: { 
  label: string; 
  value: string; 
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-xl border border-line p-4 rounded-card shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col gap-1 min-w-[140px] transition-all",
      className
    )}>
      <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider font-semibold">
        {label}
      </span>
      <span className={cn(
        "text-display-s font-display font-bold tracking-tight", 
        highlight ? "text-accent drop-shadow-[0_2px_4px_rgba(4,120,87,0.2)]" : "text-text"
      )}>
        {value}
      </span>
    </div>
  );
}
