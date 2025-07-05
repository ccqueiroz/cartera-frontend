import {
  CashFlowByYear,
  CashFlowByYearDTOSumary,
  typeComparisonCashFlow,
} from "@/domain/cashFlow/cashFlow.dto";
import { Usecase } from "../usecase";

type InputDTO = {
  cashflowList: Array<CashFlowByYear>;
  typeComparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow];
};

export class TransformCashFlowByYearToSummaryUseCase
  implements Usecase<InputDTO, Array<CashFlowByYearDTOSumary>>
{
  private transformTransactionsInAbsoluteValue(transaction: number) {
    return Math.abs(transaction);
  }

  execute({
    cashflowList,
    typeComparison,
  }: InputDTO): CashFlowByYearDTOSumary[] {
    const transactionList: Array<CashFlowByYearDTOSumary> = cashflowList.map(
      (cashflow) => {
        const transaction: CashFlowByYearDTOSumary = {
          typeComparison,
          year: cashflow.year,
          month: cashflow.month,
          paid: 0,
          expenses: 0,
        };

        if (typeComparison === typeComparisonCashFlow.PAID_PROFIT) {
          transaction.expenses = 0;
          transaction.paid = cashflow.paidProfit;

          return transaction;
        } else if (typeComparison === typeComparisonCashFlow.PROFIT) {
          transaction.paid = cashflow.paidProfit;
          transaction.expenses = cashflow.generalProfit;

          return transaction;
        } else if (typeComparison === typeComparisonCashFlow.INCOMES) {
          transaction.paid = this.transformTransactionsInAbsoluteValue(
            cashflow.paidIncomes
          );
          transaction.expenses = this.transformTransactionsInAbsoluteValue(
            cashflow.generalIncomes
          );

          return transaction;
        } else if (typeComparison === typeComparisonCashFlow.EXPENSES) {
          transaction.paid = this.transformTransactionsInAbsoluteValue(
            cashflow.paidExpenses
          );
          transaction.expenses = this.transformTransactionsInAbsoluteValue(
            cashflow.generalExpenses
          );

          return transaction;
        } else {
          return transaction;
        }
      }
    );

    return transactionList;
  }
}
