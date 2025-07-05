import { createTransactionFactory } from "@/domain/transaction/transaction.factory";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { BillDTO } from "@/domain/bill/bill.dto";
import { ReceivableDTO } from "@/domain/receivable/receivable.dto";

const bill: BillDTO = {
  id: "24177d92-1aee-4479-859b-72f01c9ade24",
  personUserId: "06627d91-1aee-4479-859b-72f01c9ade24",
  userId: "b3e1c7f2-2d4e-48a5-a1f3-ef7c1e36d9b4",
  descriptionBill: "Faculdade",
  fixedBill: false,
  billDate: new Date("2025-6-12").getTime(),
  payDate: new Date("2025-6-12").getTime(),
  payOut: true,
  icon: null,
  amount: 8209.56,
  paymentStatusId: "d5a2f9c1-3e6a-41b9-9e6d-5c8eaf39b1b2",
  paymentStatusDescription: "Pago",
  categoryId: "efc9c97d-70b8-49ce-8674-9b0cedf2c3f0",
  categoryDescription: "Educação e Leitura",
  paymentMethodId: "f8c3e2b7-4a9e-4f6b-8d2e-3b7c6a1e5f9d",
  paymentMethodDescription: "Pix",
  isPaymentCardBill: false,
  isShoppingListBill: false,
  createdAt: new Date("2025-6-12").getTime(),
  updatedAt: null,
};

const receivable: ReceivableDTO = {
  id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
  categoryId: "a1b2c3d4-e5f6-7890-1234-56789abcdef1",
  paymentMethodId: "a1b2c3d4-e5f6-7890-1234-56789abcdef2",
  paymentStatusId: "a1b2c3d4-e5f6-7890-1234-56789abcdef3",
  personUserId: "a1b2c3d4-e5f6-7890-1234-56789abcdef4",
  userId: "a1b2c3d4-e5f6-7890-1234-56789abcdef5",
  descriptionReceivable: "Test Receivable 1",
  fixedReceivable: true,
  receivableDate: new Date("2025-6-12").getTime(),
  icon: null,
  amount: 100,
  categoryDescription: "Recebimento por Serviço Prestado",
  paymentMethodDescription: "Cartão de Crédito",
  paymentStatusDescription: "Paid",
  createdAt: new Date("2025-6-12").getTime(),
  receivalDate: null,
  receival: false,
  updatedAt: null,
};

describe("create Transaction Factory", () => {
  it("should create a transaction from a BillDTO", () => {
    const result = createTransactionFactory({
      transaction: bill,
      transactionType: "bill",
    });

    expect(result).toEqual({
      type: "bill",
      id: bill.id,
      personUserId: bill.personUserId,
      userId: bill.userId,
      descriptionTransaction: bill.descriptionBill,
      fixedTransaction: bill.fixedBill,
      dueDateTransaction: bill.billDate,
      settledDate: bill.payDate,
      settledOut: bill.payOut,
      icon: bill.icon,
      amount: bill.amount,
      paymentStatusId: bill.paymentStatusId,
      paymentStatusDescription: bill.paymentStatusDescription,
      categoryId: bill.categoryId,
      categoryDescription: bill.categoryDescription,
      paymentMethodId: bill.paymentMethodId,
      paymentMethodDescription: bill.paymentMethodDescription,
      updatedAt: bill.updatedAt,
      createdAt: bill.createdAt,
    });
  });

  it("should create a transaction from a ReceivableDTO", () => {
    const result = createTransactionFactory({
      transaction: receivable,
      transactionType: "receivable",
    });

    expect(result).toEqual({
      type: "receivable",
      id: receivable.id,
      personUserId: receivable.personUserId,
      userId: receivable.userId,
      descriptionTransaction: receivable.descriptionReceivable,
      fixedTransaction: receivable.fixedReceivable,
      dueDateTransaction: receivable.receivableDate,
      settledDate: receivable.receivalDate,
      settledOut: receivable.receival,
      icon: receivable.icon,
      amount: receivable.amount,
      paymentStatusId: receivable.paymentStatusId,
      paymentStatusDescription: receivable.paymentStatusDescription,
      categoryId: receivable.categoryId,
      categoryDescription: receivable.categoryDescription,
      paymentMethodId: receivable.paymentMethodId,
      paymentMethodDescription: receivable.paymentMethodDescription,
      updatedAt: receivable.updatedAt,
      createdAt: receivable.createdAt,
    });
  });

  it("should throw an error if transaction is neither BillDTO nor ReceivableDTO", () => {
    const invalidTransaction = {
      descriptionUnknown: "Unknown",
    };

    expect(() =>
      createTransactionFactory({
        transaction: invalidTransaction as never,
        transactionType: "invalid" as never,
      })
    ).toThrow(DomainMessageList.TRANSACTION_IS_NOT_VALID);
  });
});
