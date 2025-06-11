import React from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { BillsPayableMonthOutPutDTO } from "@/domain/Bill/bill.dto";
import { convertTimeStampInDateHelper } from "@/infra/helpers/index.helpers";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/Dialog/dialog";
import { Button } from "@/components/core/Button";
import { NeonButton } from "@/components/core/NeonButton/neon-button.component";
import { BillCardPayableMonth } from "@/app/(private)/components/dashboard/BillCardPayableMonth/bill-card-payable-month.component";
import { DialogHeader } from "@/app/(private)/components/dashboard/DialogHeader/dialog-header.component";
import { FormBillsPayableMonth } from "@/app/(private)/components/dashboard/FormBillsPayableMonth/form-bills-payable-month.component";
import { updateBillPayable } from "./bills-payable-month.service";

const DialogContent = dynamic(
  () =>
    import("@/components/ui/Dialog/dialog").then((mod) => mod.DialogContent),
  {
    ssr: false,
  }
);

const BILLS_DATA: BillsPayableMonthOutPutDTO[] = [
  {
    id: "1",
    descriptionBill: "Aluguel",
    amount: 1500,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Moradia e Manutencao Residencial",
    status: "DUE_DAY",
  },
  {
    id: "2",
    descriptionBill: "Nubank",
    amount: 2340.5,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Despesa com Cartão de crédito",
    status: "OVERDUE",
  },
  {
    id: "3",
    descriptionBill: "Plano de Saúde",
    amount: 120,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Cuidados com pets",
    status: "DUE_SOON",
  },
  {
    id: "4",
    descriptionBill: "Claro Tv",
    amount: 90,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Assinatura de Internet, Telefonia e Streamings",
    status: "PENDING",
  },
  {
    id: "5",
    descriptionBill: "Feira do mês",
    amount: 850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Supermercado",
    status: "PAID",
  },
  {
    id: "6",
    descriptionBill: "IPTU",
    amount: 3850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Serviços e Utilidades Públicas",
    status: "PAID",
  },
  {
    id: "7",
    descriptionBill: "Compras no Shopping 121212121",
    amount: 850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Vestuário e Acessórios",
    status: "DUE_SOON",
  },
  {
    id: "8",
    descriptionBill: "Apple Watch da feira",
    amount: 1850.75,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Presentes e Doações",
    status: "DUE_DAY",
  },
];

export default async function BillsPayableMonth() {
  return (
    <GlassCard className="p-5 h-[415px] overflow-y-auto w-full">
      <h2 className="text-lg font-semibold text-white mb-4">
        Contas a Pagar do Mês
      </h2>
      <div id="teste" className="space-y-3">
        {BILLS_DATA.map((bill, index) => (
          <Dialog key={bill.id}>
            <DialogTrigger asChild>
              <BillCardPayableMonth bill={bill} index={index} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader title="Relatório de Despesa">
                <span>{bill.descriptionBill}</span>
                <span className="hidden sm:block">-</span>
                <span>
                  Data de vencimento:{" "}
                  {convertTimeStampInDateHelper(bill.billDate, "DD/MM/AAAA")}
                </span>
              </DialogHeader>
              <form
                id={`form-update-bill-payable-${bill.id}`}
                action={updateBillPayable}
              >
                <FormBillsPayableMonth bill={bill} />
              </form>
              <DialogFooter className="justify-end gap-3 flex-col sm:flex-row">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="lg"
                    className="w-full sm:max-w-[120px] text-md"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <NeonButton
                  type="submit"
                  variant="blue"
                  form={`form-update-bill-payable-${bill.id}`}
                  size="lg"
                  className="w-full sm:max-w-[120px]"
                >
                  Salvar
                </NeonButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </GlassCard>
  );
}
