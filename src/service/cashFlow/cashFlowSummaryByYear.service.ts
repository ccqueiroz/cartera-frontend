import { CashFlowByYear } from "@/domain/cashFlow/cashFlow.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";

type InputDTO = { year: number };

export class CashFlowSummaryByYearService
  implements Service<InputDTO, Promise<Array<CashFlowByYear>>>
{
  constructor(private readonly http: HttpGateway["get"]) {}

  async execute({ year }: InputDTO): Promise<Array<CashFlowByYear>> {
    const response = await this.http<Array<CashFlowByYear>>(
      BASE_API_PATHS.CASH_FLOW.summary_year,
      {
        params: { year },
        tags: [
          TAGS_CACHE_ROUTES.CASH_FLOW.get_summary_year,
          TAGS_CACHE_ROUTES.BILL.bills,
          TAGS_CACHE_ROUTES.RECEIVABLE.receivables,
        ],
      }
    );

    return response;
  }
}
