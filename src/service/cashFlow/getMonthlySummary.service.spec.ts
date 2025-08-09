import { CashFlowGetMonthlySummaryService } from "./getMonthlySummary.service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";
import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";

describe("CashFlowGetMonthlySummaryService", () => {
  const mockHttp = jest.fn();
  const service = new CashFlowGetMonthlySummaryService(mockHttp);

  const mockData: Omit<
    MonthlySummaryCashFlowOutputDTO,
    "totalInvoices" | "totalExpenses" | "totalBalance"
  > = {
    fixedIncome: 1000,
    variableRevenue: 200,
    fixedExpenses: 500,
    variableExpenses: 100,
  };

  beforeEach(() => {
    mockHttp.mockClear();
  });

  it("should call the HTTP client with correct params when 'paid' is provided", async () => {
    const response = { data: mockData, status: 200 };
    mockHttp.mockResolvedValue(response);

    const result = await service.execute({ year: 2025, month: 5, paid: true });

    expect(mockHttp).toHaveBeenCalledTimes(1);
    expect(mockHttp).toHaveBeenCalledWith(
      BASE_API_PATHS.CASH_FLOW.monthly_summary,
      {
        params: { year: 2025, month: 5 },
        queries: { paid: true },
        tags: [
          TAGS_CACHE_ROUTES.CASH_FLOW.get_monthly_summary,
          TAGS_CACHE_ROUTES.BILL.bills,
          TAGS_CACHE_ROUTES.RECEIVABLE.receivables,
        ],
      }
    );
    expect(result).toEqual(response);
  });

  it("should call the HTTP client with 'paid' as undefined if not provided", async () => {
    const response = { data: mockData, status: 200 };
    mockHttp.mockResolvedValue(response);

    const result = await service.execute({ year: 2025, month: 6 });

    expect(mockHttp).toHaveBeenCalledWith(
      BASE_API_PATHS.CASH_FLOW.monthly_summary,
      expect.objectContaining({
        params: { year: 2025, month: 6 },
        queries: { paid: undefined },
      })
    );
    expect(result).toEqual(response);
  });

  it("should throw if HTTP client throws an error", async () => {
    mockHttp.mockRejectedValue(new Error("Network Error"));

    await expect(service.execute({ year: 2025, month: 6 })).rejects.toThrow(
      "Network Error"
    );
  });
});
