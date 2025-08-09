export type CashFlowByYear = {
  year: number;
  month: string;
  generalIncomes: number;
  paidIncomes: number;
  generalExpenses: number;
  paidExpenses: number;
  generalProfit: number;
  paidProfit: number;
};

export const typeComparisonCashFlow = {
  PAID_PROFIT: "PAID_PROFIT",
  PROFIT: "PROFIT",
  INCOMES: "INCOMES",
  EXPENSES: "EXPENSES",
} as const;

export const typeComparisonCashFlowLabel = {
  PAID_PROFIT: "Lucro Real",
  PROFIT: "Lucro Previsto",
  INCOMES: "Entradas",
  EXPENSES: "Saídas",
} as const;

export type CashFlowByYearDTOSumary = {
  typeComparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow];
  year: number;
  month: string;
  expenses: number;
  paid: number;
};

export type GetMonthlySummaryCashFlowInputDTO = {
  month: number;
  year: number;
  userId: string;
  paid?: boolean;
};

export type MonthlySummaryCashFlowOutputDTO = {
  fixedIncome: number;
  variableRevenue: number;
  fixedExpenses: number;
  variableExpenses: number;
  totalInvoices: number;
  totalExpenses: number;
  totalBalance: number;
};
