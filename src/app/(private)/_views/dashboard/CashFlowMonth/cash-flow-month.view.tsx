import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { cn } from "@/lib/cn.utils";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CardCashFlow = dynamic(
  () =>
    import(
      "@/app/(private)/components/dashboard/CardCashFlow/card-cash-flow.compontent"
    ).then((mod) => mod.CardCashFlow),
  {
    ssr: false,
  }
);

const CashFlowGaugeChart = dynamic(
  () =>
    import(
      "@/app/(private)/components/dashboard/CashFlowGaugeChart/cash-flow-gauge-chart.component"
    ).then((mod) => mod.CashFlowGaugeChart),
  {
    ssr: false,
  }
);

export default async function CashFlowMonth() {
  return (
    <GlassCard
      className={cn("col-span-3 w-full h-full p-5", "xl:col-span-2")}
      variant="blue"
      animatePulse
    >
      <div
        className={cn(
          "w-full h-full grid grid-cols-1 grid-rows-subgrid gap-5",
          "sm:grid-cols-2 sm:grid-rows-[0.5fr_1fr]"
        )}
      >
        <div className="w-full h-full">
          <Suspense>
            <CardCashFlow
              {...{
                proventType: "receivable",
                totalAmount: 8219.89,
                financialEvents: 1432.92,
                incomeFixedCosts: 5672.82,
              }}
            />
          </Suspense>
        </div>
        <div className="w-full h-full">
          <Suspense>
            <CardCashFlow
              {...{
                proventType: "bill",
                totalAmount: 8219.89,
                financialEvents: 1432.92,
                incomeFixedCosts: 672.82,
              }}
            />
          </Suspense>
        </div>
        <div className="w-full h-full">
          <Suspense>
            <CashFlowGaugeChart bill={21002.08} receivable={2509.19} />
          </Suspense>
        </div>
        <div className="w-full h-full">
          <Suspense>
            <CashFlowGaugeChart bill={122.08} receivable={2509.19} />
          </Suspense>
        </div>
      </div>
    </GlassCard>
  );
}
