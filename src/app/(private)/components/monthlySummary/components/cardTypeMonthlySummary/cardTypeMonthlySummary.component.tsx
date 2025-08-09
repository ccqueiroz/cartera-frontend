import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { cn } from "@/app/utils/cn.utils";
import React from "react";
import { CardTypeMonthlySummarySkeleton } from "./cardTypeMonthlySummary.skeleton";

type CardTypeMonthlySummaryProps = {
  children: React.ReactNode;
  color: "success" | "danger" | "info";
  isLoading: boolean;
};

export const CardTypeMonthlySummary = React.memo(
  ({ children, color, isLoading }: CardTypeMonthlySummaryProps) => {
    if (isLoading) return <CardTypeMonthlySummarySkeleton color={color} />;
    return (
      <GlassCard
        variant="dark"
        className={cn("h-[120px] glass-card p-6 text-center w-full", {
          "bg-success/20 border border-success/30": color === "success",
          "bg-danger/20 border border-danger/30": color === "danger",
          "bg-info/20 border border-info/30": color === "info",
        })}
      >
        {children}
      </GlassCard>
    );
  }
);

CardTypeMonthlySummary.displayName = "CardTypeMonthlySummary";
