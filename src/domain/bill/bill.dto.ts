import { ResponseListDTO } from "../core/api/responseList.dto";
import { BaseDto } from "../core/baseDto/baseDto.dto";
import { PaginationParams } from "../core/listParams/listParams.dto";
import { StatusTransaction } from "../statusTransaction/status-transaction.dto";

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

export type BillsPayableMonthOutPutDTO = {
  id: string;
  amount: number;
  descriptionBill: string;
  billDate: number;
  categoryId: string;
  categoryDescription: string;
  status: (typeof StatusTransaction)[keyof typeof StatusTransaction];
};

export type InputGetBillsPayableMonth =
  PaginationParams<BillsPayableMonthOutPutDTO> & {
    initialDate: number;
    finalDate: number;
  };

export type BillsPayableMonthListDTO =
  ResponseListDTO<BillsPayableMonthOutPutDTO>;
