import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { ChartFlowByYear } from "@/app/(private)/components/dashboard/ChartFlowByYear/chart-flow-by-year.component";
import { cn } from "@/lib/cn.utils";
import getDataCashFlowByYear from "./cash-flow-by-year-chart.service";
import { typeComparisonCashFlow } from "@/domain/CashFlow/cash-flow.dto";

export default async function CashFlowByYearChart() {
  const summaryData = await getDataCashFlowByYear(
    typeComparisonCashFlow.PAID_PROFIT,
    new Date().getFullYear()?.toString()
  );
  return (
    <GlassCard className={cn("w-full h-full p-5")} variant="blue">
      <ChartFlowByYear summaryCashFlow={summaryData} />
    </GlassCard>
  );
}
