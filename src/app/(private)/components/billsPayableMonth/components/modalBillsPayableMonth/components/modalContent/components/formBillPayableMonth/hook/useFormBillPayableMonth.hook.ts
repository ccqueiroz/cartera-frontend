import { CheckedState } from "@radix-ui/react-checkbox";
import { SingleOrRange } from "@/app/components/core/datePicker/datePicker.types";
import {
  updateBillPayableMonthSchema,
  UpdateBillPayableMonthSchemaType,
} from "@/infra/schemas/bill/updateBillPayableMonth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormBillPayableMonthProps } from "../formBillPayableMonth.types";
import { toast } from "sonner";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFormBillPayableMonth = ({
  updateBillPayable,
  handleDisableBtnSuccess,
  handleIsFetchingBtnSuccess,
  billId,
}: FormBillPayableMonthProps & {
  handleDisableBtnSuccess(disabled: boolean): void;
  handleIsFetchingBtnSuccess(fetching: boolean): void;
  billId: string;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
  } = useForm<UpdateBillPayableMonthSchemaType>({
    defaultValues: {
      billId,
      includePayment: false,
      includePaymentDate: undefined,
    },
    resolver: zodResolver(updateBillPayableMonthSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateBillPayableMonthSchemaType) =>
      await updateBillPayable({ ...data }),
    onSuccess: (data) => {
      if (!data?.success && data?.error) {
        toast.error(data?.error);
        return;
      } else {
        toast.success(DomainMessageList.OPERATION_SUCCESS);
      }
      reset();
      //resetar as keys next / react quuery
    },
  });

  const onSubmit: SubmitHandler<UpdateBillPayableMonthSchemaType> = async (
    data
  ) => mutation.mutate({ ...data });

  const handleOnChangeCheckBox = (checked: CheckedState) => {
    setValue("includePayment", !!checked);
    if (!checked) {
      setValue("includePaymentDate", undefined);
      clearErrors("includePaymentDate");
    }
    handleDisableBtnSuccess(!!!checked);
  };

  const handleOnChangeDatePick = (date: SingleOrRange) => {
    if (errors.includePaymentDate) {
      clearErrors("includePaymentDate");
    }
    setValue("includePaymentDate", date as Date | undefined);
  };

  const includePayment = watch("includePayment");

  useEffect(() => {
    handleIsFetchingBtnSuccess(mutation.isPending);
  }, [handleIsFetchingBtnSuccess, mutation.isPending]);

  return {
    control,
    errors,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
    handleOnChangeCheckBox,
    handleOnChangeDatePick,
    includePayment,
    isFetching: mutation.isPending,
  };
};
