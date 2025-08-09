"use client";

import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { Progress } from "@/app/components/ui/progress";
import { adapterNumberToNumberFormated } from "@/app/utils/adapterNumberToNumberFormated.utils";
import { cn } from "@/app/utils/cn.utils";
import { LucideIcon } from "lucide-react";
import React, { useMemo, useRef } from "react";
import { CardAnalysisTypeAmountPercentSkeleton } from "./cardAnalysisTypeAmountPercent.skeleton";

type CardAnalysisTypeAmountPercentProps = {
  icon: LucideIcon;
  type: string;
  descriptionType: string;
  totalAmount: number;
  amount: number;
  color: "success" | "warning" | "danger" | "info";
  isLoading?: boolean;
};

export const CardAnalysisTypeAmountPercent = React.memo(
  ({
    icon,
    type,
    descriptionType,
    totalAmount,
    amount,
    color,
    isLoading,
  }: CardAnalysisTypeAmountPercentProps) => {
    const percent = useMemo(() => {
      if (!totalAmount) return 0;
      return Math.round((amount / totalAmount) * 100);
    }, [amount, totalAmount]);

    const valuesAmountFormated = useMemo(() => {
      return {
        amount: adapterNumberToNumberFormated(amount, "currency"),
        percent: adapterNumberToNumberFormated(percent / 100, "percent", 0),
      };
    }, [amount, percent]);

    const Icon = useRef(icon).current;

    if (isLoading) return <CardAnalysisTypeAmountPercentSkeleton />;

    return (
      <GlassCard
        className="w-full h-max border border-neon-lavender/20 py-2 px-3"
        variant="dark"
      >
        <div className="w-full h-full flex justify-between">
          <div className="w-full h-full flex gap-2 items-center">
            <div
              className={cn(
                "inline-flex items-center justify-center w-8 h-8 rounded-full",
                {
                  "bg-success/20 border border-success/30": color === "success",
                  "bg-danger/20 border border-danger/30": color === "danger",
                  "bg-info/20 border border-info/30": color === "info",
                  "bg-warning/20 border border-warning/30": color === "warning",
                }
              )}
            >
              <Icon className={cn("h-5 w-5", `text-${color}`)} />
            </div>
            <div className="flex flex-col">
              <span>{type}</span>
              <span className="text-xs text-muted-foreground/60">
                {descriptionType}
              </span>
            </div>
          </div>
          <div className="w-full h-full flex gap-2 items-center justify-end">
            <div className="flex flex-col items-end">
              <span className={cn(`text-${color}`)}>
                {valuesAmountFormated.amount}
              </span>
              <span className="text-xs text-muted-foreground/60">
                {valuesAmountFormated.percent}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mt-2">
          <Progress value={percent} color={color} className="h-2" />
        </div>
      </GlassCard>
    );
  }
);

CardAnalysisTypeAmountPercent.displayName = "CardAnalysisTypeAmountPercent";
