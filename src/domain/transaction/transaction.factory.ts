import { BillDTO } from "../bill/bill.dto";
import { DomainMessageList } from "../core/constants/domainMessageList.constants";
import { ReceivableDTO } from "../receivable/receivable.dto";
import { TransactionDTO, TransactionFactoryProps } from "./transaction.dto";

const isBill = (
  transaction: ReceivableDTO | BillDTO
): transaction is BillDTO => {
  return "descriptionBill" in transaction;
};

const isReceivable = (
  transaction: ReceivableDTO | BillDTO
): transaction is ReceivableDTO => {
  return "descriptionReceivable" in transaction;
};

export const createTransactionFactory = ({
  transaction,
  transactionType,
}: TransactionFactoryProps): TransactionDTO => {
  const commonAttributes = {
    type: transactionType,
    id: transaction.id,
    personUserId: transaction.personUserId,
    userId: transaction.userId,
    icon: transaction.icon,
    amount: transaction.amount,
    paymentStatusId: transaction.paymentStatusId,
    paymentStatusDescription: transaction.paymentStatusDescription,
    categoryId: transaction.categoryId,
    categoryDescription: transaction.categoryDescription,
    paymentMethodId: transaction.paymentMethodId,
    paymentMethodDescription: transaction.paymentMethodDescription,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };

  if (isBill(transaction)) {
    return {
      ...commonAttributes,
      descriptionTransaction: transaction.descriptionBill,
      fixedTransaction: transaction.fixedBill,
      dueDateTransaction: transaction.billDate ?? 0,
      settledDate: transaction.payDate,
      settledOut: transaction.payOut,
    };
  }

  if (isReceivable(transaction)) {
    return {
      ...commonAttributes,
      descriptionTransaction: transaction.descriptionReceivable,
      fixedTransaction: transaction.fixedReceivable,
      dueDateTransaction: transaction.receivableDate ?? 0,
      settledDate: transaction.receivalDate,
      settledOut: transaction.receival,
    };
  }

  throw new Error(DomainMessageList.TRANSACTION_IS_NOT_VALID);
};
