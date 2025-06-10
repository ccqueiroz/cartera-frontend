import { BaseDto } from "../core/BaseDto/base-dto.dto";

export type BillDTO = {
  id?: string;
  personUserId: string;
  userId: string;
  descriptionBill: string;
  fixedBill: boolean;
  billDate: number | null;
  payDate: number | null;
  payOut: boolean;
  icon: string | null;
  amount: number;
  paymentStatusId: string;
  paymentStatusDescription: string;
  categoryId: string;
  categoryDescription: string;
  paymentMethodId: string;
  paymentMethodDescription: string;
  isPaymentCardBill: boolean;
  invoiceCardData?: InvoiceCardData;
  isShoppingListBill: boolean;
  shoppingListData?: ShoppingListData;
} & BaseDto;

export type ShoppingListData = {
  shoppingListId: string;
};

export type InvoiceCardData = {
  paymentCardId: string;
  invoiceCardId: string;
};

export const StatusBill = {
  PENDING: "PENDING",
  DUE_SOON: "DUE_SOON",
  DUE_DAY: "DUE_DAY",
  OVERDUE: "OVERDUE",
  PAID: "PAID",
} as const;

export const StatusBillLabel = {
  PENDING: "Pendente",
  DUE_SOON: "Próximo ao vencimento",
  DUE_DAY: "Dia do vencimento",
  OVERDUE: "Atrasado",
  PAID: "Pago",
} as const;

export type BillsPayableMonthOutPutDTO = {
  id: string;
  amount: number;
  descriptionBill: string;
  billDate: number;
  categoryId: string;
  categoryDescription: string;
  status: (typeof StatusBill)[keyof typeof StatusBill];
};
