import { cn } from "@/app/utils/cn.utils";
import { FilterSearchReportsByPeriod } from "../../components/filterSearchReportsByPeriod/filterSearchReportsByPeriod.component";
import { BillsPayableMonth } from "../../components/billsPayableMonth/billsPayableMonth.component";
import { MonthSummary } from "../../components/monthlySummary/monthlySummary.component";

export default function DashboardView() {
  return (
    <section className="container mx-auto p-4">
      <section className="flex flex-col sm:flex-row items-center gap-3 mt-3 justify-between">
        <h2 className="text-xl font-semibold text-muted/90">
          Painel Financeiro
        </h2>
        <FilterSearchReportsByPeriod />
      </section>

      <section className={cn("w-full h-full mt-5")}>
        <MonthSummary />
      </section>

      <section
        className={cn(
          "grid grid-cols-1 gap-3 my-6",
          "sm:grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-3"
        )}
      >
        <div className="col-span-3 xl:col-span-1">
          <BillsPayableMonth />
        </div>
        <div className="col-span-3 xl:col-span-2"></div>
      </section>
      <section></section>
    </section>
  );
}
