import { SingleOrRange } from "@/app/components/core/datePicker/datePicker.types";
import { BillDTO } from "@/domain/bill/bill.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { UpdateBillPayableMonthSchemaType } from "@/infra/schemas/bill/updateBillPayableMonth.schema";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Control, FieldErrors } from "react-hook-form";

export type FormBillPayableMonthProps = {
  updateBillPayable: (
    data: UpdateBillPayableMonthSchemaType
  ) => Promise<HandleResponseDTO<BillDTO>>;
};

export type UseFormBillPayableMonthReturnProps = {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<
    UpdateBillPayableMonthSchemaType,
    unknown,
    UpdateBillPayableMonthSchemaType
  >;
  errors: FieldErrors<UpdateBillPayableMonthSchemaType>;
  isSubmitting: boolean;
  handleOnChangeCheckBox: (checked: CheckedState) => void;
  handleOnChangeDatePick: (date: SingleOrRange) => void;
  includePayment: boolean;
  isFetching: boolean;
};
