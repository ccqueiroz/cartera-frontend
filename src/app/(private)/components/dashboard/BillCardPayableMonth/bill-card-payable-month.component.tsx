import { BillsPayableMonthOutPutDTO } from "@/domain/Bill/bill.dto";
import { BillingCard } from "../BillingCard/billing-card.component";
import { resolveIcon } from "../../core/IconSlugCategoriesMap/icon-slug-categories-map.component";
import { convertTimeStampInDateHelper } from "@/infra/helpers/index.helpers";
import { TextEllipsis } from "../../core/TextEllipsis/text-ellipsis.component";
import { BadgeStatusPayable } from "../../core/StatusPayable/badge-status-payable.component";
import { memo } from "react";

interface BillCardPayableMonthProps {
  bill: BillsPayableMonthOutPutDTO;
  index?: number;
}
export const BillCardPayableMonth = memo(
  ({ bill, index }: BillCardPayableMonthProps) => {
    console.log("bill", bill);
    return (
      <BillingCard index={index}>
        {!bill && <p>Sem informações</p>}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center glass neon-shadow-blue">
            {resolveIcon(bill.categoryDescription)}
          </div>
          <div>
            <TextEllipsis text={bill.descriptionBill} maxLength={20} />
            <p className="text-sm text-white/70">
              Vence em{" "}
              {convertTimeStampInDateHelper(bill.billDate, "DD/MM/AAAA")}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-fit text-right flex sm:flex-col flex-wrap justify-between items-center sm:items-end mt-2 sm:mt-0">
          <p className="font-semibold digital text-white">
            {Intl.NumberFormat("pt-Br", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
            }).format(bill.amount)}
          </p>
          <BadgeStatusPayable status={bill.status} />
        </div>
      </BillingCard>
    );
  }
);

BillCardPayableMonth.displayName = "BillCardPayableMonth";
