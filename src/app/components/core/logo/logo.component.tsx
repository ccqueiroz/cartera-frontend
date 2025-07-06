import { cn } from "@/app/lib/cn.utils";

interface LogoProps {
  size?: "md" | "lg" | "xl";
  className?: string;
}

const fontSizes = {
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl",
} as const;

const sizes = {
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
} as const;

const sizesSVG = {
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
} as const;

export const Logo = ({ size = "md", className }: LogoProps) => {
  return (
    <div className="mb-8 animate-fade-in-up">
      <div
        className={cn(
          "flex items-center justify-center gap-3 font-bold tracking-tight",
          fontSizes[size],
          className
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center rounded-lg",
            sizes[size]
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20",
              "rounded-lg",
              "backdrop-blur-sm border border-neon-blue/30"
            )}
          />

          <svg
            className={cn("relative z-10", sizesSVG[size])}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="3"
              fill="rgba(125, 249, 255, 0.2)"
              stroke="#7DF9FF"
              strokeWidth="1"
            />
            <path
              d="M3 8 L21 8"
              stroke="#7DF9FF"
              strokeWidth="1"
              opacity="0.7"
            />
            <rect x="6" y="10" width="4" height="2" rx="1" fill="#7DF9FF" />
            <rect x="12" y="10" width="6" height="2" rx="1" fill="#C084FC" />
            <rect x="6" y="14" width="3" height="2" rx="1" fill="#C084FC" />
            <rect x="11" y="14" width="4" height="2" rx="1" fill="#7DF9FF" />
            <circle cx="17" cy="15" r="1.5" fill="#7DF9FF" />
            <circle cx="19" cy="7" r="0.5" fill="#C084FC" opacity="0.6" />
            <defs>
              <linearGradient
                id="walletGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(125, 249, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(192, 132, 252, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span>
          <span className="text-neon-blue">Car</span>
          <span className="text-neon-purple">te</span>
          <span className="text-white">ra</span>
        </span>
      </div>
    </div>
  );
};
