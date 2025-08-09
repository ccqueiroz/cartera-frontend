"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { CashFlowGetMonthlySummaryService } from "@/service/cashFlow/getMonthlySummary.service";
import { CashFlowMonthlySummaryUseCase } from "@/usecase/cashFlow/cashFlowMonthlySummary.usecase";
import { cookies } from "next/headers";

export async function getDataCashFlowMonthlySummary(
  month: number,
  year: number
) {
  const storage = new CookieServerStorage(await cookies());

  const service = new CashFlowGetMonthlySummaryService(
    (await httpInfraFactory(storage)).get
  );

  const usecase = new CashFlowMonthlySummaryUseCase(
    handleResponseFactory,
    service
  );

  const response = await HandleProxy({
    request: () => usecase.execute({ month, year }),
    isAuthService: false,
    storage,
  });

  const responseJson =
    (await response?.json()) as HandleResponseDTO<MonthlySummaryCashFlowOutputDTO>;

  return responseJson;
}
