import React from "react";
import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import {
  getBillsPayableMonth,
  updateBillPayable,
} from "./bills-payable-month.service";
import { getInitialDateFinalDateCurrentMonthFactory } from "@/factories/infra/get-initial-date-final-date-current-month.factory";
import { ListBillsCardPayableMonth } from "@/app/(private)/components/dashboard/ListBillsCardPayableMonth/list-bills-card-payable-month.component";

export default async function BillsPayableMonth() {
  const { initialDate, finalDate } =
    getInitialDateFinalDateCurrentMonthFactory();

  const billsPayableMonth = await getBillsPayableMonth({
    initialDate,
    finalDate,
    page: 0,
    size: 8,
  });

  return (
    <GlassCard className="p-5 h-[500px]" variant="blue">
      <h2 className="text-lg font-semibold text-white mb-4">
        Contas a Pagar do Mês
      </h2>
      {!billsPayableMonth.success && <>Falha na busca dos dados.</>}
      {billsPayableMonth.success && (
        <ListBillsCardPayableMonth
          initialDataBillsCardPayableMonth={billsPayableMonth.data}
          updateBillPayable={updateBillPayable}
          getBillsPayableMonth={getBillsPayableMonth}
          initialDate={initialDate}
          finalDate={finalDate}
        />
      )}
    </GlassCard>
  );
}
