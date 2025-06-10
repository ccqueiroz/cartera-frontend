import { cn } from "@/lib/cn.utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "light" | "dark";
  className?: string;
  children: React.ReactNode;
  animate?: boolean;
}

const baseStyles = "rounded-xl shadow-lg backdrop-blur-[15px] border";

const variantStyles = {
  default: "bg-glass-light border-white/8",
  light: "bg-glass-lighter border-white/5",
  dark: "bg-glass-dark border-white/5",
} as const;

export const GlassCard = ({
  variant = "default",
  className,
  children,
  animate = false,
  ...props
}: GlassCardProps) => {
  const animationStyles = animate ? "card-hover animate-fade-in-up" : "";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
