import getDataCashFlowByYear from "@/app/(private)/_views/dashboard/CashFlowByYearChart/cash-flow-by-year-chart.service";
import {
  CashFlowByYearDTOSumary,
  typeComparisonCashFlow,
} from "@/domain/CashFlow/cash-flow.dto";
import {
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";

interface StateDataProps {
  summaryCashFlow: Array<CashFlowByYearDTOSumary>;
  typeComparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow];
  yearComparison: string;
}

export function useChartCashFlowByYear({
  summaryCashFlow = [],
}: {
  summaryCashFlow: Array<CashFlowByYearDTOSumary>;
}) {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<StateDataProps>({
    summaryCashFlow: summaryCashFlow,
    typeComparison: typeComparisonCashFlow.PAID_PROFIT,
    yearComparison: new Date().getFullYear()?.toString(),
  });

  const handleGetDataCashFlowByYear = (
    comparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow],
    year: string
  ) => {
    startTransition(async () => {
      const summaryData = await getDataCashFlowByYear(comparison, year);
      setSummary((prev) => ({
        ...prev,
        summaryCashFlow: summaryData,
      }));
    });
  };

  const handleChangeTypeComparisonCashFlow = useCallback(
    (value: string) => {
      const typeComparisonSelected =
        value as (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow];

      setSummary((prev) => ({
        ...prev,
        typeComparison: typeComparisonSelected,
      }));

      handleGetDataCashFlowByYear(
        typeComparisonSelected,
        summary.yearComparison
      );
    },
    [summary.yearComparison]
  );

  const handleChangeYearComparisonCashFlow = useCallback(
    (value: string) => {
      if (!/[0-9]{4}/.test(value) && value !== "") return;

      setSummary((prev) => ({
        ...prev,
        yearComparison: value,
      }));

      handleGetDataCashFlowByYear(summary.typeComparison, value);
    },
    [summary.typeComparison]
  );

  const normalizeNameChartTooltip = useCallback(
    (name: string) => {
      let nameNormalized = "";

      if (summary.typeComparison === typeComparisonCashFlow.PAID_PROFIT) {
        nameNormalized = "Lucro Real";
      } else if (summary.typeComparison === typeComparisonCashFlow.PROFIT) {
        nameNormalized = name === "paid" ? "Lucro Real" : "Lucro Previsto";
      } else if (summary.typeComparison === typeComparisonCashFlow.INCOMES) {
        nameNormalized =
          name === "paid" ? "Valores Recebidos" : "Valores Estimados";
      } else if (summary.typeComparison === typeComparisonCashFlow.EXPENSES) {
        nameNormalized =
          name === "paid" ? "Valores Pagos" : "Valores Estimados";
      }
      return nameNormalized;
    },
    [summary.typeComparison]
  );

  const chartLegends = useMemo(() => {
    let legendPaid: string | null = null;
    let legendExpenses: string | null = null;

    if (summary.typeComparison === typeComparisonCashFlow.PAID_PROFIT) {
      legendPaid = "Lucro Real";
    } else if (summary.typeComparison === typeComparisonCashFlow.PROFIT) {
      legendPaid = "Lucro Real";
      legendExpenses = "Lucro Previsto";
    } else if (summary.typeComparison === typeComparisonCashFlow.INCOMES) {
      legendPaid = "Valores Recebidos";
      legendExpenses = "Valores Estimados";
    } else if (summary.typeComparison === typeComparisonCashFlow.EXPENSES) {
      legendPaid = "Valores Pagos";
      legendExpenses = "Valores Estimados";
    }

    return {
      legendPaid,
      legendExpenses,
    };
  }, [summary.typeComparison]);

  return {
    isPending,
    handleChangeTypeComparisonCashFlow,
    handleChangeYearComparisonCashFlow,
    normalizeNameChartTooltip,
    summary,
    chartLegends,
  };
}
