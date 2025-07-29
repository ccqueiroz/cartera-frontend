import {
  GlassCard,
  VariantGlassType,
} from "@/app/components/core/glassCard/glassCard.component";
import { cn } from "@/app/utils/cn.utils";

interface CardNotFountDataProps {
  text: string;
  className?: string;
  variant?: VariantGlassType;
}

export const CardNotFoundData = ({
  text,
  variant = "dark",
  className,
}: CardNotFountDataProps) => {
  return (
    <GlassCard
      role="status"
      aria-live="polite"
      aria-label={text}
      className={cn("p-5 h-[90%] w-full", className)}
      variant={variant}
    >
      <span className="sr-only">{text}</span>
      <p className="text-center mt-5 brightness-75 text-wrap">{text}</p>
    </GlassCard>
  );
};
