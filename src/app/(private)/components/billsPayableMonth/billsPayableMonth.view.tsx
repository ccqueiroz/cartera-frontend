import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { ListBillsPayableMonthViewProps } from "./billsPayableMonth.types";
import { InfiniteScrollBillsCardPayableMonth } from "./components/infiniteScrollBillsCardPayableMonth/infiniteScrollBillsCardPayableMonth.component";

export function BillsPayableMonthView({
  fetchNextPage,
  error,
  hasNextPage,
}: ListBillsPayableMonthViewProps) {
  return (
    <GlassCard
      className="p-5 h-[500px] overflow-hidden"
      variant="blue"
      role="region"
      aria-label="Seção de contas a pagar do mês"
    >
      <h2 className="mb-5">Contas a Pagar do Mês</h2>
      <InfiniteScrollBillsCardPayableMonth
        hasNextPage={hasNextPage}
        error={error}
        fetchNextPage={fetchNextPage}
      />
    </GlassCard>
  );
}
