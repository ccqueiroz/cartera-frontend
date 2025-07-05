import { BillDTO } from "@/domain/bill/bill.dto";
import { ConvertBillsAndReceivablesIntoTransactionsUseCase } from "./convertBillsAndReceivablesIntoTransactions.usecase";
import { ReceivableDTO } from "@/domain/receivable/receivable.dto";
import { TransactionDTO } from "@/domain/transaction/transaction.dto";
import { createTransactionFactory } from "@/domain/transaction/transaction.factory";

const billsList: Array<BillDTO> = [
  {
    id: "24177d92-1aee-4479-859b-72f01c9ade24",
    personUserId: "06627d91-1aee-4479-859b-72f01c9ade24",
    userId: "b3e1c7f2-2d4e-48a5-a1f3-ef7c1e36d9b4",
    descriptionBill: "Faculdade",
    fixedBill: false,
    billDate: new Date().getTime(),
    payDate: new Date().getTime(),
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
    createdAt: new Date().getTime(),
    updatedAt: null,
  },
  {
    id: "121377d92-1aee-4479-859b-72f01c9ade24",
    personUserId: "06627d91-1aee-4479-859b-72f01c9ade24",
    userId: "b3e1c7f2-2d4e-48a5-a1f3-ef7c1e36d9b4",
    descriptionBill: "Taxas e Impostos",
    fixedBill: false,
    billDate: new Date().getTime(),
    payDate: new Date().getTime(),
    payOut: true,
    icon: null,
    amount: 1200.0,
    paymentStatusId: "d5a2f9c1-3e6a-41b9-9e6d-5c8eaf39b1b2",
    paymentStatusDescription: "Pago",
    categoryId: "7a3f4c8d-0e1b-43a9-91b5-4c7f6d9b2a6e",
    categoryDescription: "Supermercado",
    paymentMethodId: "g12c3e1b2-4a9e-4f6b-8d2e-3b7c6a1e5f9d",
    paymentMethodDescription: "Pix",
    isPaymentCardBill: false,
    isShoppingListBill: true,
    createdAt: new Date().getTime(),
    updatedAt: null,
  },
];

const receivablesList: Array<ReceivableDTO> = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    categoryId: "a1b2c3d4-e5f6-7890-1234-56789abcdef1",
    paymentMethodId: "a1b2c3d4-e5f6-7890-1234-56789abcdef2",
    paymentStatusId: "a1b2c3d4-e5f6-7890-1234-56789abcdef3",
    personUserId: "a1b2c3d4-e5f6-7890-1234-56789abcdef4",
    userId: "a1b2c3d4-e5f6-7890-1234-56789abcdef5",
    descriptionReceivable: "Test Receivable 1",
    fixedReceivable: true,
    receivableDate: new Date().getTime(),
    icon: null,
    amount: 100,
    categoryDescription: "Recebimento por Serviço Prestado",
    paymentMethodDescription: "Cartão de Crédito",
    paymentStatusDescription: "Paid",
    createdAt: new Date().getTime(),
    receivalDate: null,
    receival: false,
    updatedAt: null,
  },
  {
    id: "b2c3d4e5-f6a1-8901-2345-67890abcde12",
    categoryId: "b2c3d4e5-f6a1-8901-2345-67890abcde13",
    paymentMethodId: "a1b2c3d4-e5f6-7890-1234-56789abcdef2",
    paymentStatusId: "b2c3d4e5-f6a1-8901-2345-67890abcde15",
    personUserId: "b2c3d4e5-f6a1-8901-2345-67890abcde16",
    userId: "b2c3d4e5-f6a1-8901-2345-67890abcde17",
    descriptionReceivable: "Test Receivable 2",
    fixedReceivable: false,
    receivableDate: new Date().getTime(),
    icon: null,
    amount: 200,
    categoryDescription: "Investimentos e Rendimentos Financeiros",
    paymentMethodDescription: "Boleto Bancário",
    paymentStatusDescription: "Pending",
    createdAt: new Date().getTime(),
    receivalDate: null,
    receival: false,
    updatedAt: null,
  },
];

describe("Convert Bills And Receivables Into Transactions UseCase", () => {
  const useCase = new ConvertBillsAndReceivablesIntoTransactionsUseCase(
    createTransactionFactory
  );

  it("should convert only bills into transactions", () => {
    const result = useCase.execute({ billsList, receivablesList: [] });

    expect(result).toHaveLength(billsList.length);

    result.forEach((transaction: TransactionDTO, index: number) => {
      const original = billsList[index];
      expect(transaction.type).toBe("bill");
      expect(transaction.descriptionTransaction).toBe(original.descriptionBill);
      expect(transaction.fixedTransaction).toBe(original.fixedBill);
      expect(transaction.dueDateTransaction).toBe(original.billDate);
      expect(transaction.settledDate).toBe(original.payDate);
      expect(transaction.settledOut).toBe(original.payOut);
      expect(transaction.amount).toBe(original.amount);
      expect(transaction.categoryId).toBe(original.categoryId);
    });
  });

  it("should convert only receivables into transactions", () => {
    const result = useCase.execute({ billsList: [], receivablesList });

    expect(result).toHaveLength(receivablesList.length);

    result.forEach((transaction: TransactionDTO, index: number) => {
      const original = receivablesList[index];
      expect(transaction.type).toBe("receivable");
      expect(transaction.descriptionTransaction).toBe(
        original.descriptionReceivable
      );
      expect(transaction.fixedTransaction).toBe(original.fixedReceivable);
      expect(transaction.dueDateTransaction).toBe(original.receivableDate);
      expect(transaction.settledDate).toBe(original.receivalDate);
      expect(transaction.settledOut).toBe(original.receival);
      expect(transaction.amount).toBe(original.amount);
      expect(transaction.categoryId).toBe(original.categoryId);
    });
  });

  it("should convert both bills and receivables into transactions", () => {
    const result = useCase.execute({ billsList, receivablesList });

    expect(result).toHaveLength(billsList.length + receivablesList.length);

    const billsTransactions = result.slice(0, billsList.length);
    const receivableTransactions = result.slice(billsList.length);

    billsTransactions.forEach((transaction: TransactionDTO, index: number) => {
      const original = billsList[index];
      expect(transaction.type).toBe("bill");
      expect(transaction.descriptionTransaction).toBe(original.descriptionBill);
    });

    receivableTransactions.forEach(
      (transaction: TransactionDTO, index: number) => {
        const original = receivablesList[index];
        expect(transaction.type).toBe("receivable");
        expect(transaction.descriptionTransaction).toBe(
          original.descriptionReceivable
        );
      }
    );
  });

  it("should return an empty array when both input lists are empty", () => {
    const result = useCase.execute({ billsList: [], receivablesList: [] });
    expect(result).toEqual([]);
  });
});
