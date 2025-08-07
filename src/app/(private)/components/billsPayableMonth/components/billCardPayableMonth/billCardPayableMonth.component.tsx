import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { BillsPayableMonthListDTOAdpatedToPresentation } from "@/domain/bill/bill.dto";
import { memo, MouseEventHandler } from "react";
import { BillingCard } from "../../../billingCard/billingCard.component";
import { resolveIcon } from "../../../iconSlugCategoriesMap/iconSlugCategoriesMap.component";
import { TextEllipsis } from "../../../textEllipsis/textEllipsis.component";
import { BadgeStatusPayable } from "../../../statusPayable/badgeStatusPayable.component";

interface BillCardPayableMonthProps {
  bill: BillsPayableMonthListDTOAdpatedToPresentation | null;
  index?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const BillCardPayableMonth = memo(
  ({ bill, index, onClick }: BillCardPayableMonthProps) => {
    if (!bill)
      return (
        <GlassCard role="listitem" aria-label="Informações indisponíveis">
          <p>Dados não disponíveis</p>
        </GlassCard>
      );

    return (
      <BillingCard
        index={index}
        onClick={onClick}
        hasAnimation={false}
        role="listitem"
        aria-labelledby={`bill-card-${index}`}
        tabIndex={0}
      >
        <div className="flex items-center gap-3" id={`bill-card-${index}`}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center glass neon-shadow-blue">
            {resolveIcon(bill.categoryDescription)}
          </div>
          <div>
            <TextEllipsis text={bill.descriptionBill} maxLength={20} />
            <p
              className="text-sm text-white/70"
              aria-label={`Vence em ${bill.billDateFormated}`}
            >
              Vence em {bill.billDateFormated}
            </p>
          </div>
        </div>
        <div className="w-full sm:w-fit text-right flex sm:flex-col flex-wrap justify-between items-center sm:items-end mt-2 sm:mt-0">
          <p
            className="font-semibold digital text-white"
            aria-label={`Valor: ${bill.amountFormated}`}
          >
            {bill.amountFormated}
          </p>
          <BadgeStatusPayable status={bill.status} />
        </div>
      </BillingCard>
    );
  }
);

BillCardPayableMonth.displayName = "BillCardPayableMonth";
