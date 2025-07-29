import { BillsPayableMonthListDTOAdpatedToPresentation } from "@/domain/bill/bill.dto";
import { UseFormBillPayableMonthReturnProps } from "./formBillPayableMonth.types";
import { resolveIcon } from "@/app/(private)/components/iconSlugCategoriesMap/iconSlugCategoriesMap.component";
import { StatusTransactionLabel } from "@/domain/statusTransaction/statusTransaction.dto";
import { Controller } from "react-hook-form";
import { CheckboxForm } from "@/app/components/core/checkboxForm/checkboxForm.component";
import { DatePickerForm } from "@/app/components/core/datePickerForm/datePickerForm.component";

export function FormBillPayableMonth({
  bill,
  control,
  errors,
  handleOnChangeCheckBox,
  handleOnChangeDatePick,
  includePayment,
  isFetching,
}: Omit<UseFormBillPayableMonthReturnProps, "handleSubmit" | "isSubmitting"> & {
  bill: BillsPayableMonthListDTOAdpatedToPresentation;
}) {
  return (
    <div className="flex flex-col gap-2 justify-center mb-4">
      <fieldset className="border-t border-neon-purple/30 pt-4 mt-1 px-[5px]">
        <legend className="text-sm text-start font-semibold text-foreground px-1">
          Dados do Pagamento
        </legend>
        <div className="flex flex-col justify-center items-start gap-3 px-1">
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">Valor: </span>
            <span className="text-sm text-muted-foreground">
              {bill.amountFormated}
            </span>
          </div>
          {bill.categoryDescription && (
            <div className="flex justify-start items-center gap-2">
              <span className="text-sm">Categoria: </span>
              <div className="flex justify-start items-center gap-1">
                <span className="[&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:text-muted-foreground">
                  {resolveIcon(bill.categoryDescription)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {bill.categoryDescription}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">Status: </span>
            <span className="text-sm text-muted-foreground">
              {StatusTransactionLabel[bill.status]}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset className="border-t border-neon-purple/30 pt-4 mt-1 px-[5px]">
        <legend className="text-sm text-start font-semibold text-foreground px-1">
          Pagamento
        </legend>
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-4 min-h-[48px]">
          <Controller
            control={control}
            name="includePayment"
            render={({ field: { value } }) => (
              <CheckboxForm
                id="includePayment"
                checked={value}
                onCheckedChange={handleOnChangeCheckBox}
                label="Incluir Pagamento"
                positionLabel="left"
                error={errors.includePayment?.message}
                classNameWrapper="mt-0 md:mt-2"
                disabled={isFetching}
              />
            )}
          />
          {includePayment && (
            <Controller
              control={control}
              name="includePaymentDate"
              render={({ field: { value } }) => (
                <DatePickerForm
                  id="includePaymentDate"
                  mode="single"
                  placeholder="Informe a data do pagamento"
                  classNameButton="w-[260px]"
                  label="Data do Pagamento"
                  onChange={handleOnChangeDatePick}
                  value={value}
                  error={errors.includePaymentDate?.message}
                  disabled={isFetching}
                />
              )}
            />
          )}
        </div>
      </fieldset>
    </div>
  );
}
