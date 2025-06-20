import { TransactionDTO } from "@/domain/Transaction/transaction.dto";
import { resolveIcon } from "../../core/IconSlugCategoriesMap/icon-slug-categories-map.component";
import {
  StatusByTransactionType,
  StatusByTransactionTypeLabel,
} from "@/domain/StatusTransaction/status-transaction.dto";
import { convertTimeStampInDateFactory } from "@/factories/infra/convert-timestamp-in-date.factory";

interface ModalFormRecentTransaction {
  transaction: TransactionDTO;
}

export const ModalFormRecentTransaction = ({
  transaction,
}: ModalFormRecentTransaction) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      <fieldset className="border-t border-neon-purple/30 pt-4 mt-1 px-[5px]">
        <legend className="text-sm text-start font-semibold text-foreground px-1">
          Dados da Transação
        </legend>
        <div className="flex flex-col justify-center items-start gap-3 px-1">
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">Valor: </span>
            <span className="text-sm text-muted-foreground">
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(transaction.amount)}
            </span>
          </div>
          {transaction.categoryDescription && (
            <div className="flex justify-start items-center gap-2">
              <span className="text-sm">Categoria: </span>
              <div className="flex justify-start items-center gap-1">
                <span className="[&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:text-muted-foreground">
                  {resolveIcon(transaction.categoryDescription)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {transaction.categoryDescription}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">Status: </span>
            <span className="text-sm text-muted-foreground">
              {
                StatusByTransactionTypeLabel[
                  transaction.type.toUpperCase() as keyof typeof StatusByTransactionType
                ]
              }
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">
              Data{" "}
              {`${
                transaction.type === "bill" ? "do Pagamento" : "do Recebimento"
              }`}
              :{" "}
            </span>
            <span className="text-sm text-muted-foreground">
              {convertTimeStampInDateFactory(
                transaction.settledDate ?? 0,
                "DD/MM/AAAA"
              )}
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">
              Método{" "}
              {`${
                transaction.type === "bill" ? "do Pagamento" : "do Recebimento"
              }`}
              :{" "}
            </span>
            <span className="text-sm text-muted-foreground">
              {transaction.paymentMethodDescription}
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm">
              Tipo{" "}
              {`${
                transaction.type === "bill" ? "do Pagamento" : "do Recebimento"
              }`}
              :{" "}
            </span>
            <span className="text-sm text-muted-foreground">
              {transaction.fixedTransaction ? "Recorrente" : "Variável"}
            </span>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
