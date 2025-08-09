import { Skeleton } from "@/app/components/ui/skeleton";
import { cn } from "@/app/utils/cn.utils";

type CardTypeMonthlySummarySkeletonProps = {
  color: "success" | "danger" | "info";
};

export const CardTypeMonthlySummarySkeleton = ({
  color,
}: CardTypeMonthlySummarySkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        "w-full h-[120px]",
        `border border-${color}/10`
      )}
    />
  );
};
