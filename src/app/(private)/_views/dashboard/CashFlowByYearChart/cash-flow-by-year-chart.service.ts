"use server";

import {
  CashFlowByYear,
  typeComparisonCashFlow,
} from "@/domain/CashFlow/cash-flow.dto";
import { TransformCashFlowByYearToSummaryFactoryUseCase } from "@/factories/usecase/usecase.factories";

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

export default async function getDataCashFlowByYear(
  typeComparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow],
  yearComparison: string
) {
  const summaryList = TransformCashFlowByYearToSummaryFactoryUseCase().execute({
    cashflowList: CashFlowByYearList,
    typeComparison,
  });
  void yearComparison;

  return summaryList;
}
