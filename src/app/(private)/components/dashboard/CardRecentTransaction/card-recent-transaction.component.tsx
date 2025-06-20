import { convertTimeStampInDateFactory } from "@/factories/infra/convert-timestamp-in-date.factory";
import { TransactionDTO } from "@/domain/Transaction/transaction.dto";
import { BillingCard } from "../BillingCard/billing-card.component";
import { resolveIcon } from "../../core/IconSlugCategoriesMap/icon-slug-categories-map.component";
import { TextEllipsis } from "../../core/TextEllipsis/text-ellipsis.component";
import { BadgeStatusByTransactionType } from "../../core/StatusByTransactionType/badge-status-by-transaction-type.component";
import { StatusByTransactionType } from "@/domain/StatusTransaction/status-transaction.dto";

interface CardRecentTransactionProps {
  transaction: TransactionDTO;
  index?: number;
}
export const CardRecentTransaction = ({
  transaction,
  index,
}: CardRecentTransactionProps) => {
  return (
    <BillingCard index={index}>
      {!transaction ? (
        <p>Sem informações</p>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center glass neon-shadow-blue">
              {resolveIcon(transaction.categoryDescription)}
            </div>
            <div>
              <TextEllipsis
                text={transaction.descriptionTransaction}
                maxLength={20}
              />
              <p className="text-sm text-white/70">
                Efetuado em{" "}
                {convertTimeStampInDateFactory(
                  Number(transaction.settledDate),
                  "DD/MM/AAAA"
                )}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-fit text-right flex sm:flex-col flex-wrap justify-between items-center sm:items-end mt-2 sm:mt-0">
            <p className="font-semibold digital text-white">
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(transaction.amount)}
            </p>
            <BadgeStatusByTransactionType
              status={
                transaction.type.toUpperCase() as keyof typeof StatusByTransactionType
              }
            />
          </div>
        </>
      )}
    </BillingCard>
  );
};
