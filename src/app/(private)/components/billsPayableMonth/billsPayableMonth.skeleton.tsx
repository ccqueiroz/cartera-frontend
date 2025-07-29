import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { Skeleton } from "@/app/components/ui/skeleton";
import { cn } from "@/app/utils/cn.utils";

export const BillsPayabaleMonthSkeleton = () => {
  return (
    <GlassCard
      className={cn("w-full h-[400px] p-4", "p-5 h-[500px]")}
      variant="blue"
    >
      <div className="w-full mb-4">
        <Skeleton className="h-7 w-56" />
      </div>
      <div className="w-full">
        <Skeleton className="w-full h-[410px]" />
      </div>
    </GlassCard>
  );
};
