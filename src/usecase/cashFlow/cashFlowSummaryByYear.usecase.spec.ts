import { CashFlowByYear, CashFlowByYearDTOSumary, typeComparisonCashFlow } from "@/domain/cashFlow/cashFlow.dto";
import { CashFLowSummaryByYearUseCase } from "./cashFlowSummaryByYear.usecase";
import { TransformCashFlowByYearToSummaryUseCase } from "./transformCashFlowByYearToSummary.usecase";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { CashFlowSummaryByYearService } from "@/service/cashFlow/cashFlowSummaryByYear.service";


describe("CashFLowSummaryByYearUseCase", () => {
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

  const summaryResult: Array<CashFlowByYearDTOSumary> = CashFlowByYearList.map(
    (item) => ({
      typeComparison: typeComparisonCashFlow.PROFIT,
      year: item.year,
      month: item.month,
      paid: item.paidProfit,
      expenses: item.generalProfit,
    })
  );

  const mockHandleResponseGateway: jest.Mocked<HandleResponseGateway> = {
    execute: jest.fn(),
  };

  const mockCashFlowSummaryByYearService: jest.Mocked<CashFlowSummaryByYearService> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CashFlowSummaryByYearService>;

  const mockTransformCashFlowByYearToSummaryUseCase: jest.Mocked<TransformCashFlowByYearToSummaryUseCase> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<TransformCashFlowByYearToSummaryUseCase>;

  const useCase = new CashFLowSummaryByYearUseCase(
    mockHandleResponseGateway,
    mockCashFlowSummaryByYearService,
    mockTransformCashFlowByYearToSummaryUseCase
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return summary data when handleRequest is successful", async () => {
    mockHandleResponseGateway.execute.mockResolvedValue({
      success: true,
      data: CashFlowByYearList,
    });

    mockTransformCashFlowByYearToSummaryUseCase.execute.mockReturnValue(
      summaryResult
    );

    const result = await useCase.execute({
      typeComparison: typeComparisonCashFlow.PROFIT,
      year: 2025,
    });

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleResponseGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );

    expect(
      mockTransformCashFlowByYearToSummaryUseCase.execute
    ).toHaveBeenCalledTimes(1);
    expect(
      mockTransformCashFlowByYearToSummaryUseCase.execute
    ).toHaveBeenCalledWith({
      typeComparison: typeComparisonCashFlow.PROFIT,
      cashflowList: CashFlowByYearList,
    });

    expect(result).toEqual(summaryResult);
  });

  it("should return empty array when handleRequest fails", async () => {
    mockHandleResponseGateway.execute.mockResolvedValue({
      success: false,
      error: "Network error",
    });

    const result = await useCase.execute({
      typeComparison: typeComparisonCashFlow.EXPENSES,
      year: 2025,
    });

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(
      mockTransformCashFlowByYearToSummaryUseCase.execute
    ).not.toHaveBeenCalled();

    expect(result).toEqual([]);
  });
});
