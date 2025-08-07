import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { cn } from "@/app/utils/cn.utils";
import { HTMLAttributes, memo, MouseEventHandler } from "react";

interface BillingCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  hasAnimation?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const BillingCard = memo(
  ({
    children,
    index = 0,
    onClick,
    hasAnimation = false,
  }: BillingCardProps) => {
    return (
      <GlassCard
        data-index={index}
        onClick={onClick}
        variant="dark"
        className={cn(
          "w-full h-full flex flex-col items-start justify-between p-3 rounded-lg card-hover cursor-pointer",
          "md:flex-row md:items-center",
          hasAnimation && "animate-fade-in-up "
        )}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {children}
      </GlassCard>
    );
  }
);

BillingCard.displayName = "BillingCard";
