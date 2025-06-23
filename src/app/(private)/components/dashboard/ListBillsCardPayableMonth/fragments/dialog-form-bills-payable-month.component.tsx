import { BillsPayableMonthOutPutDTO } from "@/domain/Bill/bill.dto";
import {
  Dialog,
  DialogClose,
  DialogFooter,
} from "@/components/ui/Dialog/dialog";
import { convertTimeStampInDateFactory } from "@/factories/infra/convert-timestamp-in-date.factory";
import { DialogHeader } from "@/app/(private)/components/dashboard/DialogHeader/dialog-header.component";
import dynamic from "next/dynamic";
import { FormBillsPayableMonth } from "@/app/(private)/components/dashboard/FormBillsPayableMonth/form-bills-payable-month.component";
import { Button } from "@/components/core/Button";
import { NeonButton } from "@/components/core/NeonButton/neon-button.component";

const DialogContent = dynamic(
  () =>
    import("@/components/ui/Dialog/dialog").then((mod) => mod.DialogContent),
  {
    ssr: false,
  }
);

type DialogFormBillsPayableMonthProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: BillsPayableMonthOutPutDTO;
  updateBillPayable: (data: FormData) => Promise<void>;
};

export const DialogFormBillsPayableMonth = ({
  open,
  setOpen,
  bill,
  updateBillPayable,
}: DialogFormBillsPayableMonthProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader title="Relatório de Despesa">
          <span>{bill.descriptionBill}</span>
          <span className="hidden sm:block">-</span>
          <span>
            Data de vencimento:{" "}
            {convertTimeStampInDateFactory(bill.billDate, "DD/MM/AAAA")}
          </span>
        </DialogHeader>
        <form
          id={`form-update-bill-payable-${bill.id}`}
          action={updateBillPayable.bind(null)}
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
  );
};
