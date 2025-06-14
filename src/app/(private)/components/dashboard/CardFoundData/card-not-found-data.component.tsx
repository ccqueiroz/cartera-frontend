import {
  GlassCard,
  VariantGlassType,
} from "@/components/core/GlassCard/glass-card.component";
import { cn } from "@/lib/cn.utils";

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
      className={cn("p-5 h-[90%] w-full", className)}
      variant={variant}
    >
      <p className="text-center mt-5 brightness-75 text-wrap">{text}</p>
    </GlassCard>
  );
};
