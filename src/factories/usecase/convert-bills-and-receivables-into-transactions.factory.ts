import { createTransactionFactory } from "./../../domain/Transaction/transaction.factory";
import { ConvertBillsAndReceivablesIntoTransactionsUseCase } from "@/usecases/Transaction/convert-bills-and-receivables-into-transactions.usecase";

let convertBillsAndReceivablesIntoTransactions: ConvertBillsAndReceivablesIntoTransactionsUseCase | null =
  null;

export const convertBillsAndReceivablesIntoTransactionsFactory =
  (): ConvertBillsAndReceivablesIntoTransactionsUseCase => {
    if (!convertBillsAndReceivablesIntoTransactions) {
      convertBillsAndReceivablesIntoTransactions =
        new ConvertBillsAndReceivablesIntoTransactionsUseCase(
          createTransactionFactory
        );
    }

    return convertBillsAndReceivablesIntoTransactions;
  };
