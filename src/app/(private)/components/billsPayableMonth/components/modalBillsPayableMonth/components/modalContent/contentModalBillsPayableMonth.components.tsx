import { BillsPayableMonthListDTOAdpatedToPresentation } from "@/domain/bill/bill.dto";
import { FormBillPayableMonth } from "./components/formBillPayableMonth/formBillPayableMonth.component";
import { useFormBillPayableMonth } from "./components/formBillPayableMonth/hook/useFormBillPayableMonth.hook";
import { FormBillPayableMonthProps } from "./components/formBillPayableMonth/formBillPayableMonth.types";
import { globalModalStore } from "@/app/store/globalModal/globalModal.store";

export function ContentModalBillsPayableMonth({
  bill,
  updateBillPayable,
}: FormBillPayableMonthProps & {
  bill: BillsPayableMonthListDTOAdpatedToPresentation;
}) {
  const modalGlobalStore = globalModalStore;
  const {
    control,
    errors,
    handleOnChangeCheckBox,
    handleOnChangeDatePick,
    includePayment,
    handleSubmit,
    isFetching,
  } = useFormBillPayableMonth({
    updateBillPayable,
    handleDisableBtnSuccess: modalGlobalStore.handleDisableBtnSuccess,
    handleIsFetchingBtnSuccess: modalGlobalStore.handleIsFetchingBtnSuccess,
    billId: bill.id,
  });

  return (
    <form id={`form-update-bill-payable-${bill.id}`} onSubmit={handleSubmit}>
      <FormBillPayableMonth
        bill={bill}
        control={control}
        errors={errors}
        handleOnChangeCheckBox={handleOnChangeCheckBox}
        handleOnChangeDatePick={handleOnChangeDatePick}
        includePayment={includePayment}
        isFetching={isFetching}
      />
    </form>
  );
}
