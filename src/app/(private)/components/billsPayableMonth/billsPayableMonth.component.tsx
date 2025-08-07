import {
  getBillsPayableMonth,
  getInitialDateFinalDateCurrentMonth,
} from "./billsPayableMont.service";
import { BillsPayableMonthContainer } from "./billsPayableMonth.container";
import { BillsPayableMonthFetchingProvider } from "./context/billsPayableMonthFetching.provider";

export async function BillsPayableMonth() {
  const { initialDate, finalDate } =
    await getInitialDateFinalDateCurrentMonth();

  return (
    <BillsPayableMonthFetchingProvider
      initialDate={initialDate}
      finalDate={finalDate}
      getBillsPayableMonth={getBillsPayableMonth}
    >
      <BillsPayableMonthContainer />
    </BillsPayableMonthFetchingProvider>
  );
}
