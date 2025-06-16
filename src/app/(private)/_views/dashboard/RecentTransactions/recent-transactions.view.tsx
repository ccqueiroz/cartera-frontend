import { TransactionsType } from "@/domain/Transaction/transaction.dto";
import getRecentTransactions from "./recent-transactions.service";
import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/Dialog/dialog";
import { DialogHeader } from "@/app/(private)/components/dashboard/DialogHeader/dialog-header.component";
import { CardNotFoundData } from "@/app/(private)/components/dashboard/CardFoundData/card-not-found-data.component";
import { convertTimeStampInDateFactory } from "@/factories/infra/infra.factories";
import { CardRecentTransaction } from "@/app/(private)/components/dashboard/CardRecentTransaction/card-recent-transaction.component";
import { NeonButton } from "@/components/core/NeonButton/neon-button.component";
import { ModalFormRecentTransaction } from "@/app/(private)/components/dashboard/ModalFormRecentTransaction/modal-form-recent-transaction.component";
import { cn } from "@/lib/cn.utils";

const getTypeTransaction = (type: TransactionsType) => {
  if (type === "bill") return "Pagamento";
  else if (type === "receivable") return "Recebimento";
  else return "";
};

export default async function RecentTransactions() {
  const transactions = await getRecentTransactions();

  return (
    <GlassCard
      variant="dark"
      className={cn(
        "w-full max-w-[600px] p-1 animate-fade-in-up h-[276px] overflow-y-auto",
        "lg:p-5"
      )}
      style={{ animationDelay: "250ms" }}
    >
      <h2
        className={cn(
          "text-lg font-semibold text-white mb-4 mt-4 ml-2",
          "lg:mt-0 ml-0"
        )}
      >
        Transações recentes
      </h2>
      {transactions?.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <Dialog key={transaction.id}>
              <DialogTrigger asChild>
                <CardRecentTransaction
                  transaction={transaction}
                  index={index}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader
                  title={`Transação - ${getTypeTransaction(transaction.type)}`}
                >
                  <span>{transaction.descriptionTransaction}</span>
                  <span className="hidden sm:block">-</span>
                  <span>
                    Data de vencimento:{" "}
                    {convertTimeStampInDateFactory(
                      transaction.dueDateTransaction,
                      "DD/MM/AAAA"
                    )}
                  </span>
                </DialogHeader>
                <div>
                  <ModalFormRecentTransaction transaction={transaction} />
                </div>
                <DialogFooter className="justify-end gap-3 flex-col sm:flex-row">
                  <DialogClose asChild>
                    <NeonButton
                      type="button"
                      variant="blue"
                      size="lg"
                      className="w-full sm:max-w-[120px] text-md"
                    >
                      Fechar
                    </NeonButton>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <CardNotFoundData
          text="Não existem transações recentes."
          variant="blue"
          className=" h-[80%]"
        />
      )}
    </GlassCard>
  );
}
