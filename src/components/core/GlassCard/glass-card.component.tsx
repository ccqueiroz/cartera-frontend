import { cn } from "@/lib/cn.utils";

export type VariantGlassType = "default" | "light" | "dark" | "blue" | "purple";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantGlassType;
  className?: string;
  children: React.ReactNode;
  animate?: boolean;
  animatePulse?: boolean;
}

const baseStyles = "rounded-xl shadow-lg backdrop-blur-[15px] border";

const variantStyles = {
  default: "bg-glass-light border-white/8",
  light: "bg-glass-lighter border-white/5",
  dark: "bg-glass-dark border-white/5",
  blue: "bg-neon-blue/10",
  purple: "bg-neon-purple/10",
} as const;

export const GlassCard = ({
  variant = "default",
  className,
  children,
  animate = false,
  animatePulse = false,
  ...props
}: GlassCardProps) => {
  const animationStyles = animate ? "card-hover animate-fade-in-up" : "";

  const animationPulseStyles = animatePulse ? "animate-pulse-neon-card" : "";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles,
        animationPulseStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
