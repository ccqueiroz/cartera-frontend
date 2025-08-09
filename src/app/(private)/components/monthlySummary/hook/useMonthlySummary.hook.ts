import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";
import { TAGS_CACHE_ROUTES } from "@/infra/constants/tagsCacheRoutes.constants";
import { useQuery } from "@tanstack/react-query";
import { getDataCashFlowMonthlySummary } from "../monthlySummary.service";
import { adapterNumberToNumberFormated } from "@/app/utils/adapterNumberToNumberFormated.utils";

type UseMonthlySummaryProps = {
  date: Date;
};

export const useMonthlySummary = ({ date }: UseMonthlySummaryProps) => {
  const returnInErrorCase: MonthlySummaryCashFlowOutputDTO & {
    totalExpensesFormated: string;
    totalInvoicesFormated: string;
    totalBalanceFormated: string;
  } = {
    fixedIncome: 0,
    variableRevenue: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
    totalInvoices: 0,
    totalExpenses: 0,
    totalBalance: 0,
    totalExpensesFormated: "",
    totalInvoicesFormated: "",
    totalBalanceFormated: "",
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [
      TAGS_CACHE_ROUTES.CASH_FLOW.get_monthly_summary,
      TAGS_CACHE_ROUTES.BILL.bills,
      TAGS_CACHE_ROUTES.RECEIVABLE.receivables,
      `month-${date.getMonth()}-year-${date.getFullYear()}`,
    ],
    queryFn: async () => {
      const response = await getDataCashFlowMonthlySummary(
        date.getMonth(),
        date.getFullYear()
      );

      if (!response.success)
        return {
          ...returnInErrorCase,
          totalInvoicesFormated: adapterNumberToNumberFormated(0, "currency"),
          totalExpensesFormated: adapterNumberToNumberFormated(0, "currency"),
          totalBalanceFormated: adapterNumberToNumberFormated(0, "currency"),
        };

      return {
        ...response.data,
        totalInvoicesFormated: adapterNumberToNumberFormated(
          response.data.totalInvoices,
          "currency"
        ),
        totalExpensesFormated: adapterNumberToNumberFormated(
          response.data.totalExpenses,
          "currency"
        ),
        totalBalanceFormated: adapterNumberToNumberFormated(
          response.data.totalBalance,
          "currency"
        ),
      };
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    enabled: date.getFullYear() > 0 && date.getMonth() >= 0,
  });

  return {
    dataMonthlySummary: data || returnInErrorCase,
    isFetching: isLoading || (!data && isFetching),
  };
};
