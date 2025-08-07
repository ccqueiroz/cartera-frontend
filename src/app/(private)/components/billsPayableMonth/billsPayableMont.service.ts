"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import {
  BillDTO,
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/bill/bill.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { GetInitialDateFinalDateCurrentMonthHelper } from "@/infra/helpers/getInitialDateFinalDateCurrentMonth.infra";
import { UpdateBillPayableMonthSchemaType } from "@/infra/schemas/bill/updateBillPayableMonth.schema";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { GetBillsPayableMonthService } from "@/service/bill/getBillsPayableMonth.service";
import { UpdateBillPayableMonthService } from "@/service/bill/updateBillsPayableMonth.service";
import { GetBillsPayableMonthUseCase } from "@/usecase/bill/getBillsPayableMonth.usecase";
import { UpdateBillPayableMonthUseCase } from "@/usecase/bill/updateBillsPayableMonth.usecase";
import { cookies } from "next/headers";

export async function getInitialDateFinalDateCurrentMonth() {
  const helper = new GetInitialDateFinalDateCurrentMonthHelper();

  return helper.execute("JUL", 2025);
}

export async function getBillsPayableMonth(queries: InputGetBillsPayableMonth) {
  const storage = new CookieServerStorage(await cookies());

  const service = new GetBillsPayableMonthService(
    (await httpInfraFactory(storage)).get
  );

  const usecase = new GetBillsPayableMonthUseCase(
    handleResponseFactory,
    service
  );

  const response = await HandleProxy({
    request: () => usecase.execute({ queries }),
    isAuthService: false,
    storage,
  });

  const responseJson =
    (await response?.json()) as HandleResponseDTO<BillsPayableMonthListDTO>;

  return responseJson;
}

export async function updateBillPayable(
  data: UpdateBillPayableMonthSchemaType
) {
  const storage = new CookieServerStorage(await cookies());

  const service = new UpdateBillPayableMonthService(
    (await httpInfraFactory(storage)).put
  );

  const usecase = new UpdateBillPayableMonthUseCase(
    handleResponseFactory,
    service
  );

  const response = await HandleProxy({
    request: () =>
      usecase.execute({
        payload: {
          id: data.billId,
          payOut: data.includePayment,
          includePaymentDate: data.includePaymentDate,
        },
      }),
    isAuthService: false,
    storage,
  });

  const responseJson = (await response?.json()) as HandleResponseDTO<BillDTO>;

  return responseJson;
}
