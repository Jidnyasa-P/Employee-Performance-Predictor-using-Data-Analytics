import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className, ...props }: any) => (
  <div className={cn("vibrant-panel p-8", className)} {...props}>
    {children}
  </div>
);

export const Badge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "high" | "medium" | "low" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    high: "bg-[#4ECDC4]/20 text-[#4ECDC4]",
    medium: "bg-[#FFE66D]/30 text-[#D4AF37]",
    low: "bg-[#FF6B6B]/10 text-[#FF6B6B]",
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", variants[variant])}>
      {children}
    </span>
  );
};
