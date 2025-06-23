"use server";

import { InputGetBillsPayableMonth } from "@/domain/Bill/bill.dto";
import { getBillsPayableMonthUseCaseFactory } from "@/factories/usecase/get-bills-payable-month.factory";

export async function updateBillPayable(data: FormData) {
  try {
    const { includePayment, paymentDate } = Object.fromEntries(data.entries());

    void includePayment;
    void paymentDate;
  } finally {
  }
}

export async function getBillsPayableMonth(queries: InputGetBillsPayableMonth) {
  const response = await getBillsPayableMonthUseCaseFactory().execute(queries);

  return response;
}
