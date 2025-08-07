import { Skeleton } from "@/app/components/ui/skeleton";
import { HTMLAttributes, useMemo } from "react";

interface SkeletonBillingCardProps extends HTMLAttributes<HTMLDivElement> {
  amountCards?: number;
}

export const SkeletonBillingCard = ({
  amountCards = 1,
  ...rest
}: SkeletonBillingCardProps) => {
  const listCards = useMemo(() => {
    return [...Array(amountCards).keys()];
  }, [amountCards]);

  return (
    <div id="skeleton" className="w-full flex flex-col gap-4" {...rest}>
      {listCards.map((_, i) => (
        <Skeleton key={`skeleton-${i}`} className="w-full h-20" />
      ))}
    </div>
  );
};
