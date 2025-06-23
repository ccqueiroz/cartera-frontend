"use client";
import dynamic from "next/dynamic";
import { BillCardPayableMonth } from "@/app/(private)/components/dashboard/BillCardPayableMonth/bill-card-payable-month.component";
import {
  BillsPayableMonthListDTO,
  BillsPayableMonthOutPutDTO,
  InputGetBillsPayableMonth,
} from "@/domain/Bill/bill.dto";
import { CardNotFoundData } from "../CardFoundData/card-not-found-data.component";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { NeonSpinner } from "@/components/core/NeonSpinner/neon-spinner.component";
import { useInfinityScrollListBillsPayableMonth } from "./hook/use-infinity-scroll-list-bills-payable-month.hook";
import { useControllerDialogBillPayableMonth } from "./hook/use-controller-dialog-bill-payable-month.hook";
import { cn } from "@/lib/cn.utils";

const DialogFormBillsPayableMonth = dynamic(
  () =>
    import("./fragments/dialog-form-bills-payable-month.component").then(
      (mod) => mod.DialogFormBillsPayableMonth
    ),
  {
    ssr: false,
  }
);

export type ListBillsCardPayableMonthProps = {
  initialDataBillsCardPayableMonth: BillsPayableMonthListDTO;
  initialDate: number;
  finalDate: number;
  updateBillPayable: (data: FormData) => Promise<void>;
  getBillsPayableMonth: (
    queries: InputGetBillsPayableMonth
  ) => Promise<HandleRequestDTO<BillsPayableMonthListDTO>>;
};

export const ListBillsCardPayableMonth = ({
  initialDataBillsCardPayableMonth,
  updateBillPayable,
  initialDate,
  finalDate,
  getBillsPayableMonth,
}: ListBillsCardPayableMonthProps) => {
  const { content, GAP, parentRef, rowVirtualizer } =
    useInfinityScrollListBillsPayableMonth({
      initialDataBillsCardPayableMonth,
      initialDate,
      finalDate,
      getBillsPayableMonth,
    });

  const { openDialog, billToDialog, handleOpenDialog, handleCloseDialog } =
    useControllerDialogBillPayableMonth();

  return (
    <>
      {content?.length > 0 ? (
        <>
          <div
            ref={parentRef}
            className="h-[410px] overflow-y-auto w-full scroll-smooth"
          >
            <div
              className="w-[99%] mx-auto"
              style={{
                height: rowVirtualizer.getTotalSize(),
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const bill = content[virtualRow.index];
                if (!bill) {
                  return (
                    <div
                      key={virtualRow.key}
                      className={cn(
                        `w-full h-[${virtualRow.size - GAP}] absolute t-0 l-0`
                      )}
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div className="w-full flex justify-center items-center">
                        <div className="w-7 h-7 flex items-center justify-center opacity-85">
                          <NeonSpinner />
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={virtualRow.key}
                    className={cn(
                      `w-full h-[${virtualRow.size - GAP}] absolute t-0 l-0`
                    )}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <BillCardPayableMonth
                      bill={bill}
                      index={virtualRow.index}
                      onClick={() => handleOpenDialog(bill)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {openDialog && (
            <DialogFormBillsPayableMonth
              open={openDialog}
              setOpen={handleCloseDialog}
              updateBillPayable={updateBillPayable}
              bill={billToDialog as BillsPayableMonthOutPutDTO}
            />
          )}
        </>
      ) : (
        <CardNotFoundData text="Não há contas a serem pagas." variant="dark" />
      )}
    </>
  );
};
