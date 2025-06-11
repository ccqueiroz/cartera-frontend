import { cn } from "@/lib/cn.utils";
import { memo } from "react";

interface BillingCardProps {
  children: React.ReactNode;
  index?: number;
}

export const BillingCard = memo(({ children, index = 0 }: BillingCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start md:items-center justify-between p-3 rounded-lg glass-light animate-fade-in-up card-hover cursor-pointer"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {children}
    </div>
  );
});

BillingCard.displayName = "BillingCard";
