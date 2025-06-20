"use service";

import { BillDTO } from "@/domain/Bill/bill.dto";
import { ReceivableDTO } from "@/domain/Receivable/receivable.dto";
import { convertBillsAndReceivablesIntoTransactionsFactoryUseCase } from "@/factories/usecase/convert-bills-and-receivables-into-transactions.factory";

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

export default async function getRecentTransactions() {
  const transactions =
    convertBillsAndReceivablesIntoTransactionsFactoryUseCase().execute({
      billsList,
      receivablesList,
    });

  return transactions;
}
