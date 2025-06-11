import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FilterSearchReportsByPeriod } from "../_views/dashboard/FilterSearchReportsByPeriod/filter-search-reports-by-period.view";
import { cn } from "@/lib/cn.utils";

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

        <div
          className={cn(
            "col-span-3 grid-flow-col grid-rows-3 gap-3",
            "xl:col-span-2",
            "border"
          )}
        >
          <div
            className={cn(
              "rol-span-1 col-span-2 flex flex-col gap-5",
              "md:flex-row md:justify-between md:items-center"
            )}
          >
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

            <Suspense>
              <CardCashFlow
                {...{
                  proventType: "bill",
                  totalAmount: 8219.89,
                  financialEvents: 1432.92,
                  incomeFixedCosts: 5672.82,
                }}
              />
            </Suspense>
          </div>
          <div
            className={cn(
              "rol-span-2 col-span-2 flex flex-col gap-5",
              "md:flex-row md:justify-between"
            )}
          >
            card gráfico e outra informação que possa ser relevante e caiba no
            layout e não perca a estética clean(?)
          </div>
        </div>
      </div>
    </section>
  );
}
