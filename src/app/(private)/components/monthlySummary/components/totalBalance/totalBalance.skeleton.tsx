import { Skeleton } from "@/app/components/ui/skeleton";

export const TotalBalanceSkeleton = () => {
  return (
    <div className="flex flex-col items-center ml-3 gap-2">
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-36 h-8" />
    </div>
  );
};
