import { BillDTO } from "../Bill/bill.dto";
import { BaseDto } from "../core/BaseDto/base-dto.dto";
import { ReceivableDTO } from "../Receivable/receivable.dto";

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
