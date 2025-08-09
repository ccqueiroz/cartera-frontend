import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { ListBillsPayableMonthViewProps } from "./billsPayableMonth.types";
import { InfiniteScrollBillsCardPayableMonth } from "./components/infiniteScrollBillsCardPayableMonth/infiniteScrollBillsCardPayableMonth.component";
import { DollarSign } from "lucide-react";

export function BillsPayableMonthView({
  fetchNextPage,
  error,
  hasNextPage,
}: ListBillsPayableMonthViewProps) {
  return (
    <GlassCard
      className="p-5 h-[500px] overflow-hidden glass-card-hover border border-neon-lavender/20"
      variant="dark"
      role="region"
      aria-label="Seção de contas a pagar do mês"
    >
      <div className="mb-5 w-full flex gap-1 items-center">
        <DollarSign className="h-5 w-5 text-neon-lavender" />
        <h2 className="font-semibold text-neon-lavender">
          Contas a Pagar do Mês
        </h2>
      </div>
      <InfiniteScrollBillsCardPayableMonth
        hasNextPage={hasNextPage}
        error={error}
        fetchNextPage={fetchNextPage}
      />
    </GlassCard>
  );
}
