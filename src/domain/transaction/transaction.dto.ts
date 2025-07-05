import { BillDTO } from "../bill/bill.dto";
import { BaseDto } from "../core/baseDto/baseDto.dto";
import { ReceivableDTO } from "../receivable/receivable.dto";

export type TransactionsType = "bill" | "receivable";

export type TransactionDTO = {
  type: TransactionsType;
  id?: string;
  personUserId: string;
  userId: string;
  descriptionTransaction: string;
  fixedTransaction: boolean;
  dueDateTransaction: number;
  settledDate: number | null;
  settledOut: boolean;
  icon: string | null;
  amount: number;
  paymentStatusId: string;
  paymentStatusDescription: string;
  categoryId: string;
  categoryDescription: string;
  paymentMethodId: string;
  paymentMethodDescription: string;
} & BaseDto;

export type TransactionFactoryProps = {
  transaction: ReceivableDTO | BillDTO;
  transactionType: TransactionsType;
};
