import { BaseDto } from "../core/baseDto/baseDto.dto";

export type ReceivableDTO = {
  id?: string;
  personUserId: string;
  userId: string;
  descriptionReceivable: string;
  fixedReceivable: boolean;
  receivableDate: number | null;
  receivalDate: number | null;
  receival: boolean;
  icon: string | null;
  amount: number;
  paymentStatusId: string;
  paymentStatusDescription: string;
  categoryId: string;
  categoryDescription: string;
  paymentMethodId: string;
  paymentMethodDescription: string;
} & BaseDto;
