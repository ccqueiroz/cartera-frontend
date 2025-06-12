import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { cn } from "@/lib/cn.utils";
import { memo } from "react";

interface BillingCardProps {
  children: React.ReactNode;
  index?: number;
}

export const BillingCard = memo(({ children, index = 0 }: BillingCardProps) => {
  return (
    <GlassCard
      variant="dark"
      className={cn(
        "w-full h-full flex items-start justify-between p-3 rounded-lg animate-fade-in-up card-hover cursor-pointer",
        "md:flex-row md:items-center"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {children}
    </GlassCard>
  );
});

BillingCard.displayName = "BillingCard";
