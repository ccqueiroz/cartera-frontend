import { Suspense } from "react";
import BillsPayableMonth from "../_views/dashboard/BillsPayableMonth/bills-payable-month.view";
import { FilterSearchReportsByPeriod } from "../_views/dashboard/FilterSearchReportsByPeriod/filter-search-reports-by-period.view";

export default function DashBoardView() {
  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 md:mt-0 justify-between">
        <h2 className="text-xl font-semibold text-white">Painel Financeiro</h2>

        <FilterSearchReportsByPeriod />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="col-span-3 xl:col-span-1">
          <Suspense>
            <BillsPayableMonth />
          </Suspense>
        </div>

        <div className="col-span-3 xl:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            {/* <CashFlowCard />
            <CashSummary /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
