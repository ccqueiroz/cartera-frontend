import { TransformCashFlowByYearToSummaryUseCase } from "./transformCashFlowByYearToSummary.usecase";
import {
  typeComparisonCashFlow,
  CashFlowByYear,
} from "@/domain/cashFlow/cashFlow.dto";

describe("Transform Cash Flow By Year To Summary UseCase", () => {
  const usecase = new TransformCashFlowByYearToSummaryUseCase();

  const mockCashFlowList: Array<CashFlowByYear> = [
    {
      year: 2025,
      month: "JAN",
      generalIncomes: 1000,
      paidIncomes: 800,
      generalExpenses: 500,
      paidExpenses: 400,
      generalProfit: 500,
      paidProfit: 400,
    },
    {
      year: 2025,
      month: "FEV",
      generalIncomes: -2000,
      paidIncomes: -1500,
      generalExpenses: -1000,
      paidExpenses: -800,
      generalProfit: -1000,
      paidProfit: -900,
    },
  ];

  it("should transform with type PAID_PROFIT", () => {
    const result = usecase.execute({
      cashflowList: mockCashFlowList,
      typeComparison: typeComparisonCashFlow.PAID_PROFIT,
    });

    expect(result).toEqual([
      {
        typeComparison: typeComparisonCashFlow.PAID_PROFIT,
        year: 2025,
        month: "JAN",
        paid: 400,
        expenses: 0,
      },
      {
        typeComparison: typeComparisonCashFlow.PAID_PROFIT,
        year: 2025,
        month: "FEV",
        paid: -900,
        expenses: 0,
      },
    ]);
  });

  it("should transform with type PROFIT", () => {
    const result = usecase.execute({
      cashflowList: mockCashFlowList,
      typeComparison: typeComparisonCashFlow.PROFIT,
    });

    expect(result).toEqual([
      {
        typeComparison: typeComparisonCashFlow.PROFIT,
        year: 2025,
        month: "JAN",
        paid: 400,
        expenses: 500,
      },
      {
        typeComparison: typeComparisonCashFlow.PROFIT,
        year: 2025,
        month: "FEV",
        paid: -900,
        expenses: -1000,
      },
    ]);
  });

  it("should transform with type INCOMES and convert to absolute values", () => {
    const result = usecase.execute({
      cashflowList: mockCashFlowList,
      typeComparison: typeComparisonCashFlow.INCOMES,
    });

    expect(result).toEqual([
      {
        typeComparison: typeComparisonCashFlow.INCOMES,
        year: 2025,
        month: "JAN",
        paid: 800,
        expenses: 1000,
      },
      {
        typeComparison: typeComparisonCashFlow.INCOMES,
        year: 2025,
        month: "FEV",
        paid: 1500,
        expenses: 2000,
      },
    ]);
  });

  it("should transform with type EXPENSES and convert to absolute values", () => {
    const result = usecase.execute({
      cashflowList: mockCashFlowList,
      typeComparison: typeComparisonCashFlow.EXPENSES,
    });

    expect(result).toEqual([
      {
        typeComparison: typeComparisonCashFlow.EXPENSES,
        year: 2025,
        month: "JAN",
        paid: 400,
        expenses: 500,
      },
      {
        typeComparison: typeComparisonCashFlow.EXPENSES,
        year: 2025,
        month: "FEV",
        paid: 800,
        expenses: 1000,
      },
    ]);
  });

  it("should return default values if typeComparison is invalid (coverage safety)", () => {
    const result = usecase.execute({
      cashflowList: mockCashFlowList,
      typeComparison: "INVALID_TYPE" as never,
    });

    expect(result).toEqual([
      {
        typeComparison: "INVALID_TYPE",
        year: 2025,
        month: "JAN",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "INVALID_TYPE",
        year: 2025,
        month: "FEV",
        paid: 0,
        expenses: 0,
      },
    ]);
  });
});
