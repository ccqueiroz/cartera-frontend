import { act, renderHook, waitFor } from "@testing-library/react";
import { useChartCashFlowByYear } from "./useChartFlowByYear.hook";
import * as service from "@/app/(private)/_views/dashboard/CashFlowByYearChart/cash-flow-by-year-chart.service";
import { typeComparisonCashFlow } from "@/domain/CashFlow/cash-flow.dto";

jest.mock(
  "@/app/(private)/_views/dashboard/CashFlowByYearChart/cash-flow-by-year-chart.service"
);

const mockSummary = [
  {
    typeComparison: typeComparisonCashFlow.PAID_PROFIT,
    year: 2025,
    month: "JAN",
    expenses: 100,
    paid: 200,
  },
];

describe("useChartCashFlowByYear", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (service.default as jest.Mock).mockResolvedValue(mockSummary);
  });

  it("should initialize with default state and fetch data on mount", async () => {
    const { result } = renderHook(() =>
      useChartCashFlowByYear({ summaryCashFlow: mockSummary })
    );

    expect(result.current.summary).toEqual({
      summaryCashFlow: mockSummary,
      typeComparison: typeComparisonCashFlow.PAID_PROFIT,
      yearComparison: new Date().getFullYear().toString(),
    });

    await waitFor(() => {
      expect(service.default).not.toHaveBeenCalledWith(
        typeComparisonCashFlow.PAID_PROFIT,
        new Date().getFullYear().toString()
      );
    });

    expect(result.current.summary.summaryCashFlow).toEqual(mockSummary);
  });

  it("should change typeComparison and fetch data", async () => {
    const { result } = renderHook(() =>
      useChartCashFlowByYear({ summaryCashFlow: mockSummary })
    );

    act(() => {
      result.current.handleChangeTypeComparisonCashFlow(
        typeComparisonCashFlow.PROFIT
      );
    });

    await waitFor(() => {
      expect(service.default).toHaveBeenCalledWith(
        typeComparisonCashFlow.PROFIT,
        new Date().getFullYear().toString()
      );
    });

    expect(result.current.summary.typeComparison).toBe(
      typeComparisonCashFlow.PROFIT
    );
    expect(result.current.summary.summaryCashFlow).toEqual(mockSummary);
  });

  it("should change yearComparison and fetch data", async () => {
    const { result } = renderHook(() =>
      useChartCashFlowByYear({ summaryCashFlow: mockSummary })
    );

    act(() => {
      result.current.handleChangeYearComparisonCashFlow("2026");
    });

    await waitFor(() => {
      expect(service.default).toHaveBeenCalledWith(
        typeComparisonCashFlow.PAID_PROFIT,
        "2026"
      );
    });

    expect(result.current.summary.yearComparison).toBe("2026");
    expect(result.current.summary.summaryCashFlow).toEqual(mockSummary);
  });

  it("should not change year if input is invalid", async () => {
    const { result } = renderHook(() =>
      useChartCashFlowByYear({ summaryCashFlow: mockSummary })
    );

    const currentYear = new Date().getFullYear().toString();

    act(() => {
      result.current.handleChangeYearComparisonCashFlow("abcd");
    });

    expect(result.current.summary.yearComparison).toBe(currentYear);
  });

  describe("normalizeNameChartTooltip", () => {
    it("should return correct label for PAID_PROFIT", async () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      expect(result.current.normalizeNameChartTooltip("paid")).toBe(
        "Lucro Real"
      );
    });

    it("should return correct label for PROFIT", async () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.PROFIT
        );
      });

      expect(result.current.normalizeNameChartTooltip("paid")).toBe(
        "Lucro Real"
      );
      expect(result.current.normalizeNameChartTooltip("expenses")).toBe(
        "Lucro Previsto"
      );
    });

    it("should return correct label for INCOMES", async () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.INCOMES
        );
      });

      expect(result.current.normalizeNameChartTooltip("paid")).toBe(
        "Valores Recebidos"
      );
      expect(result.current.normalizeNameChartTooltip("expenses")).toBe(
        "Valores Estimados"
      );
    });

    it("should return correct label for EXPENSES", async () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.EXPENSES
        );
      });

      expect(result.current.normalizeNameChartTooltip("paid")).toBe(
        "Valores Pagos"
      );
      expect(result.current.normalizeNameChartTooltip("expenses")).toBe(
        "Valores Estimados"
      );
    });
  });

  describe("chartLegends", () => {
    it("should return correct legends for PAID_PROFIT", () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );
      expect(result.current.chartLegends).toEqual({
        legendPaid: "Lucro Real",
        legendExpenses: null,
      });
    });

    it("should return correct legends for PROFIT", () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.PROFIT
        );
      });

      expect(result.current.chartLegends).toEqual({
        legendPaid: "Lucro Real",
        legendExpenses: "Lucro Previsto",
      });
    });

    it("should return correct legends for INCOMES", () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.INCOMES
        );
      });

      expect(result.current.chartLegends).toEqual({
        legendPaid: "Valores Recebidos",
        legendExpenses: "Valores Estimados",
      });
    });

    it("should return correct legends for EXPENSES", () => {
      const { result } = renderHook(() =>
        useChartCashFlowByYear({ summaryCashFlow: mockSummary })
      );

      act(() => {
        result.current.handleChangeTypeComparisonCashFlow(
          typeComparisonCashFlow.EXPENSES
        );
      });

      expect(result.current.chartLegends).toEqual({
        legendPaid: "Valores Pagos",
        legendExpenses: "Valores Estimados",
      });
    });
  });
});
