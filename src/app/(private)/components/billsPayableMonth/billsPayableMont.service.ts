"use server";

import { InputGetBillsPayableMonth } from "@/domain/bill/bill.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { GetInitialDateFinalDateCurrentMonthHelper } from "@/infra/helpers/getInitialDateFinalDateCurrentMonth.infra";
import { UpdateBillPayableMonthSchemaType } from "@/infra/schemas/bill/updateBillPayableMonth.schema";
import { GetBillsPayableMonthService } from "@/service/bill/getBillsPayableMonth.service";
import { UpdateBillPayableMonthService } from "@/service/bill/updateBillsPayableMonth.service";
import { GetBillsPayableMonthUseCase } from "@/usecase/bill/getBillsPayableMonth.usecase";
import { UpdateBillPayableMonthUseCase } from "@/usecase/bill/updateBillsPayableMonth.usecase";

export async function getInitialDateFinalDateCurrentMonth() {
  const helper = new GetInitialDateFinalDateCurrentMonthHelper();

  return helper.execute();
}

export async function getBillsPayableMonth(queries: InputGetBillsPayableMonth) {
  const service = new GetBillsPayableMonthService(
    (await httpInfraFactory()).get
  );
  const usecase = new GetBillsPayableMonthUseCase(
    handleResponseFactory,
    service
  );
  const response = await usecase.execute({ queries });

  return response;
}

export async function updateBillPayable(
  data: UpdateBillPayableMonthSchemaType
) {
  const service = new UpdateBillPayableMonthService(
    (await httpInfraFactory()).put
  );

  const usecase = new UpdateBillPayableMonthUseCase(
    handleResponseFactory,
    service
  );

  const response = await usecase.execute({
    payload: {
      id: data.billId,
      payOut: data.includePayment,
      includePaymentDate: data.includePaymentDate,
    },
  });

  return response;
}
