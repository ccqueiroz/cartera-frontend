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

const CashFlowMonth = dynamic(
  () =>
    import("../_views/dashboard/CashFlowMonth/cash-flow-month.view").then(
      (mod) => mod.default
    ),
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

        <Suspense>
          <CashFlowMonth />
        </Suspense>
      </div>
    </section>
  );
}
