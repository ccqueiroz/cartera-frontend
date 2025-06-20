import { createTransactionFactory } from "./../../domain/Transaction/transaction.factory";
import { ConvertBillsAndReceivablesIntoTransactionsUseCase } from "@/usecases/Transaction/convert-bills-and-receivables-into-transactions.usecase";

export const convertBillsAndReceivablesIntoTransactionsFactoryUseCase = () =>
  new ConvertBillsAndReceivablesIntoTransactionsUseCase(
    createTransactionFactory
  );
