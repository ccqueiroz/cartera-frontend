import { cn } from "@/lib/cn.utils";
import React from "react";

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "purple" | "gradient" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const baseStyles =
  "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:brightness-75";

const variantStyles = {
  blue: "bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/30",
  purple:
    "bg-neon-purple/20 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/30",
  gradient:
    "bg-gradient-neon bg-200% animate-gradient-flow text-white border border-white/10 hover:border-white/20",
  ghost: "bg-transparent border border-white/10 text-white hover:bg-white/5",
} as const;

const sizeStyles = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-6 py-3",
} as const;

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ variant = "blue", size = "md", className, children, ...props }, ref) => {
    const applyVariant = props.disabled
      ? variantStyles[variant].replace(/hover:[^ ]+/g, "")
      : variantStyles[variant];

    return (
      <button
        ref={ref}
        className={cn(baseStyles, applyVariant, sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
