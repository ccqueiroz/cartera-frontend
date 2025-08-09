import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { CashFlowMonthlySummaryUseCase } from "./cashFlowMonthlySummary.usecase";
import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";
import { CashFlowGetMonthlySummaryService } from "@/service/cashFlow/getMonthlySummary.service";

describe("CashFlowMonthlySummaryUseCase", () => {
  const mockHandleResponseGateway: jest.Mocked<HandleResponseGateway> = {
    execute: jest.fn(),
  };

  const mockCashFlowMonthlySummaryService: jest.Mocked<CashFlowGetMonthlySummaryService> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CashFlowGetMonthlySummaryService>;

  const useCase = new CashFlowMonthlySummaryUseCase(
    mockHandleResponseGateway,
    mockCashFlowMonthlySummaryService
  );

  const baseData: Omit<
    MonthlySummaryCashFlowOutputDTO,
    "totalInvoices" | "totalExpenses" | "totalBalance"
  > = {
    fixedIncome: 1000,
    variableRevenue: 200,
    fixedExpenses: 500,
    variableExpenses: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return calculated totals when response is successful", async () => {
    mockHandleResponseGateway.execute.mockResolvedValue({
      success: true,
      data: baseData,
      status: 200,
    });

    const result = await useCase.execute({
      year: 2025,
      month: 5,
      paid: true,
    });

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleResponseGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );

    expect(result).toEqual({
      success: true,
      data: {
        ...baseData,
        totalInvoices: 1200,
        totalExpenses: 600,
        totalBalance: 600,
      },
      status: 200,
    });
  });

  it("should return the response as is when success is false", async () => {
    mockHandleResponseGateway.execute.mockResolvedValue({
      success: false,
      error: "Network error",
      status: 500,
    });

    const result = await useCase.execute({ year: 2025, month: 6 });

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      error: "Network error",
      status: 500,
      success: false,
    });
  });
});
