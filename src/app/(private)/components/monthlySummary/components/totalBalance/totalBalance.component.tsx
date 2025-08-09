import { cn } from "@/app/utils/cn.utils";
import React from "react";
import { TotalBalanceSkeleton } from "./totalBalance.skeleton";

type TotalBalanceComponentProps = {
  color: "success" | "danger";
  isLoading: boolean;
  title: string;
  amount: string;
  dir: "left" | "right";
};

const TotalBalanceComponent = React.memo(
  ({ color, isLoading, title, amount, dir }: TotalBalanceComponentProps) => {
    if (isLoading) return <TotalBalanceSkeleton />;
    return (
      <div
        className={cn(
          "flex flex-col items-center",
          dir === "left" ? "ml-3" : "mr-3"
        )}
      >
        <span className="text-xs text-muted-foreground/60">{title}</span>
        <span className={cn("text-md md:text-xl font-bold", `text-${color}`)}>
          {amount}
        </span>
      </div>
    );
  }
);

const TotalBalance = TotalBalanceComponent;

TotalBalance.displayName = "TotalBalance";

export { TotalBalance };
