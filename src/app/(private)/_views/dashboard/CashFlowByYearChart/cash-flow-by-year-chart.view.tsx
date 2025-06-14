import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { ChartFlowByYear } from "@/app/(private)/components/dashboard/ChartFlowByYear/chart-flow-by-year.component";
import { cn } from "@/lib/cn.utils";

export default async function CashFlowByYearChart() {
  return (
    <GlassCard className={cn("w-full h-full p-5")} variant="blue">
      <ChartFlowByYear />
    </GlassCard>
  );
}
