import { cn } from "@/app/utils/cn.utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gradient-dark", className)}
      {...props}
    />
  );
}

export { Skeleton };
