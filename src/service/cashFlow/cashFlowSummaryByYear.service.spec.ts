import { CashFlowByYear } from "@/domain/cashFlow/cashFlow.dto";
import { CashFlowSummaryByYearService } from "./cashFlowSummaryByYear.service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";

describe("CashFlowSummaryByYearService", () => {
  const CashFlowByYearList: Array<CashFlowByYear> = [
    {
      year: 2025,
      month: "JAN",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 0,
    },
    {
      year: 2025,
      month: "FEV",
      generalIncomes: 100,
      paidIncomes: 0,
      generalExpenses: 148,
      paidExpenses: 0,
      generalProfit: -48,
      paidProfit: 0,
    },
    {
      year: 2025,
      month: "MAR",
      generalIncomes: 300,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 148,
      generalProfit: 300,
      paidProfit: -148,
    },
    {
      year: 2025,
      month: "ABR",
      generalIncomes: 200,
      paidIncomes: 0,
      generalExpenses: 9409.56,
      paidExpenses: 0,
      generalProfit: -1209.56,
      paidProfit: 780,
    },
    {
      year: 2025,
      month: "MAI",
      generalIncomes: 0,
      paidIncomes: 200,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 52930,
      paidProfit: 12200,
    },
    {
      year: 2025,
      month: "JUN",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: -1200,
    },
    {
      year: 2025,
      month: "JUL",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: -3029.92,
    },
    {
      year: 2025,
      month: "AGO",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 4020,
    },
    {
      year: 2025,
      month: "SET",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 0,
    },
    {
      year: 2025,
      month: "OUT",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 0,
    },
    {
      year: 2025,
      month: "NOV",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 0,
    },
    {
      year: 2025,
      month: "DEZ",
      generalIncomes: 0,
      paidIncomes: 0,
      generalExpenses: 0,
      paidExpenses: 0,
      generalProfit: 0,
      paidProfit: 0,
    },
  ];

  const mockHttp = jest.fn();

  const service = new CashFlowSummaryByYearService(mockHttp);

  beforeEach(() => {
    mockHttp.mockClear();
  });

  it("should call the HTTP client with correct URL, params, and tags", async () => {
    mockHttp.mockResolvedValue(CashFlowByYearList);

    const input = { year: 2025 };

    const result = await service.execute(input);

    expect(mockHttp).toHaveBeenCalledTimes(1);
    expect(mockHttp).toHaveBeenCalledWith(
      BASE_API_PATHS.CASH_FLOW.summary_year,
      {
        params: { year: 2025 },
        tags: [
          TAGS_CACHE_ROUTES.CASH_FLOW.get_summary_year,
          TAGS_CACHE_ROUTES.BILL.bills,
          TAGS_CACHE_ROUTES.RECEIVABLE.receivables,
        ],
      }
    );

    expect(result).toEqual(CashFlowByYearList);
  });

  it("should return an empty array when API response is empty", async () => {
    mockHttp.mockResolvedValue([]);

    const result = await service.execute({ year: 2025 });

    expect(result).toEqual([]);
  });

  it("should throw if HTTP client throws an error", async () => {
    mockHttp.mockRejectedValue(new Error("Network Error"));

    await expect(service.execute({ year: 2025 })).rejects.toThrow(
      "Network Error"
    );
  });
});
