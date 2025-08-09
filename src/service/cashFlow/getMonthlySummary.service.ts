import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";

type InputDTO = { year: number; month: number; paid?: boolean };

type Output = {
  data: Omit<
    MonthlySummaryCashFlowOutputDTO,
    "totalInvoices" | "totalExpenses" | "totalBalance"
  >;
  status: number;
};

export class CashFlowGetMonthlySummaryService
  implements Service<InputDTO, Promise<Output>>
{
  constructor(private readonly http: HttpGateway["get"]) {}

  async execute({ year, month, paid }: InputDTO): Promise<Output> {
    const response = await this.http<Output>(
      BASE_API_PATHS.CASH_FLOW.monthly_summary,
      {
        params: { year, month },
        queries: { paid },
        tags: [
          TAGS_CACHE_ROUTES.CASH_FLOW.get_monthly_summary,
          TAGS_CACHE_ROUTES.BILL.bills,
          TAGS_CACHE_ROUTES.RECEIVABLE.receivables,
        ],
      }
    );

    return response;
  }
}
