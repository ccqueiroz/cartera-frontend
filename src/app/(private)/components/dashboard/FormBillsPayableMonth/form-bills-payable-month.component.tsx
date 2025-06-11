"use client";

import {
  BillsPayableMonthOutPutDTO,
  StatusBillLabel,
} from "@/domain/Bill/bill.dto";
import { resolveIcon } from "../../core/IconSlugCategoriesMap/icon-slug-categories-map.component";
import {
  DatePicker,
  SingleOrRange,
} from "@/components/core/DatePicker/date-picker.component";
import { Label } from "@/components/ui/Label/label";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { cn } from "@/lib/cn.utils";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FormBillsPayableMonthProps {
  bill: BillsPayableMonthOutPutDTO;
}

export const FormBillsPayableMonth = ({ bill }: FormBillsPayableMonthProps) => {
  const [includePayment, setIncludePayment] = useState(false);
  const [includePaymentDate, setIncludePaymentDate] = useState<
    Date | undefined
  >(undefined);

  const handleOnChangeCheckBox = (checked: CheckedState) => {
    setIncludePayment(!!checked);
    if (!checked) setIncludePaymentDate(undefined);
  };

  const handleOnChangeDatePick = (date: SingleOrRange) => {
    setIncludePaymentDate(date as Date | undefined);
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <fieldset className="border-t border-neon-purple/30 pt-4 mt-1 px-[5px]">
        <legend className="text-sm text-start font-semibold text-foreground px-1">
          Dados do Pagamento
        </legend>
        <div className="flex flex-col justify-center items-start gap-3 px-1">
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">Valor: </span>
            <span className="text-sm text-muted-foreground">
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(bill.amount)}
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
              {StatusBillLabel[bill.status]}
            </span>
          </div>
        </div>
      </fieldset>
      <fieldset className="border-t border-neon-purple/30 pt-4 mt-1 px-[5px]">
        <legend className="text-sm text-start font-semibold text-foreground px-1">
          Pagamento
        </legend>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-4 min-h-[48px]">
          <div className="flex justify-start items-center gap-2">
            <Label htmlFor="include-payment" className="text-sm">
              Incluir Pagamento
            </Label>
            <Checkbox
              id="include-payment"
              className={cn(
                "rounded-[4px]",
                "data-[state=checked]:bg-neon-blue/20 data-[state=checked]:text-primary/90",
                "focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-primary/30"
              )}
              checked={includePayment}
              onCheckedChange={handleOnChangeCheckBox}
            />
            <input
              type="hidden"
              name="includePayment"
              value={includePayment ? "true" : "false"}
            />
          </div>
          {includePayment && (
            <div className="flex justify-start items-center gap-2 mb-2">
              <Label htmlFor="paymentDate" className="sr-only text-sm">
                Data do Pagamento
              </Label>
              <DatePicker
                id="paymentDate"
                mode="single"
                placeholder="Informe a data do pagamento"
                classNameButton="w-[260px]"
                onChange={handleOnChangeDatePick}
              />
              <input
                type="hidden"
                name="paymentDate"
                value={includePaymentDate ? includePaymentDate?.toString() : ""}
              />
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};
