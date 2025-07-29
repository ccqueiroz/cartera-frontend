import { getQueryClient } from "@/app/lib/react-query/queryClient.lib";
import {
  getBillsPayableMonth,
  getInitialDateFinalDateCurrentMonth,
} from "./billsPayableMont.service";
import { HydrationBoundary } from "@/app/lib/react-query/hydratation.lib";
import { dehydrate } from "@tanstack/react-query";
import { BillsPayableMonthContainer } from "./billsPayableMonth.container";
import { BillsPayableMonthFetchingProvider } from "./context/billsPayableMonthFetching.provider";

export async function BillsPayableMonth() {
  const queryClient = getQueryClient();

  const { initialDate, finalDate } =
    await getInitialDateFinalDateCurrentMonth();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["bills_payable_month", { initialDate, finalDate }],
    initialPageParam: { initialDate, finalDate, page: 0, size: 8 },
    queryFn: async ({ pageParam }) => await getBillsPayableMonth(pageParam),
    staleTime: 30_000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillsPayableMonthFetchingProvider
        initialDate={initialDate}
        finalDate={finalDate}
        getBillsPayableMonth={getBillsPayableMonth}
      >
        <BillsPayableMonthContainer />
      </BillsPayableMonthFetchingProvider>
    </HydrationBoundary>
  );
}
