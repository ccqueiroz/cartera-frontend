import { BillDTO } from "@/domain/Bill/bill.dto";
import { Usecase } from "../usecase";
import { ReceivableDTO } from "@/domain/Receivable/receivable.dto";
import { TransactionDTO } from "@/domain/Transaction/transaction.dto";
import { createTransactionFactory } from "@/domain/Transaction/transaction.factory";

type InputDTO = {
  billsList: Array<BillDTO>;
  receivablesList: Array<ReceivableDTO>;
};

export class ConvertBillsAndReceivablesIntoTransactionsUseCase
  implements Usecase<InputDTO, Array<TransactionDTO>>
{
  public constructor(
    private readonly createTransaction: typeof createTransactionFactory
  ) {}
  execute({ billsList, receivablesList }: InputDTO): Array<TransactionDTO> {
    const transactionsList: Array<TransactionDTO> = [];

    const transactionsBills = billsList.map((bill) => {
      return this.createTransaction({
        transactionType: "bill",
        transaction: bill,
      });
    });

    const transactionsReceivables = receivablesList.map((receivable) => {
      return this.createTransaction({
        transactionType: "receivable",
        transaction: receivable,
      });
    });

    transactionsList.push(...transactionsBills, ...transactionsReceivables);

    return transactionsList;
  }
}
