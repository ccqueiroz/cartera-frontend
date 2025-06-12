import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FilterSearchReportsByPeriod } from "../_views/dashboard/FilterSearchReportsByPeriod/filter-search-reports-by-period.view";
import { cn } from "@/lib/cn.utils";
import { GlassCard } from "@/components/core/GlassCard/glass-card.component";

const BillsPayableMonth = dynamic(
  () =>
    import(
      "../_views/dashboard/BillsPayableMonth/bills-payable-month.view"
    ).then((mod) => mod.default),
  {
    ssr: false,
  }
);

const CardCashFlow = dynamic(
  () =>
    import(
      "../components/dashboard/CardCashFlow/card-cash-flow.compontent"
    ).then((mod) => mod.CardCashFlow),
  {
    ssr: false,
  }
);

const CashFlowGaugeChart = dynamic(
  () =>
    import(
      "../components/dashboard/CashFlowGaugeChart/cash-flow-gauge-chart.component"
    ).then((mod) => mod.CashFlowGaugeChart),
  {
    ssr: false,
  }
);

export default function DashBoardView() {
  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 md:mt-0 justify-between">
        <h2 className="text-xl font-semibold text-white">Painel Financeiro</h2>
        <FilterSearchReportsByPeriod />
      </div>

      <div className={cn("grid grid-cols-1 gap-3 my-6", "lg:grid-cols-3")}>
        <div className="col-span-3 xl:col-span-1">
          <Suspense>
            <BillsPayableMonth />
          </Suspense>
        </div>

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
      </div>
    </section>
  );
}
