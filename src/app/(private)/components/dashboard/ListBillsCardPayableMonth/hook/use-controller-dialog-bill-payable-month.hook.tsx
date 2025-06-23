import { BillsPayableMonthOutPutDTO } from "@/domain/Bill/bill.dto";
import { useCallback, useState } from "react";

export const useControllerDialogBillPayableMonth = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [billToDialog, setBillToDialog] =
    useState<BillsPayableMonthOutPutDTO | null>(null);

  const handleOpenDialog = (bill: BillsPayableMonthOutPutDTO) => {
    setBillToDialog(bill);
    setOpenDialog(true);
  };

  const handleCloseDialog = useCallback((open: boolean) => {
    setBillToDialog(null);
    setOpenDialog(open);
  }, []);

  return {
    openDialog,
    billToDialog,
    handleOpenDialog,
    handleCloseDialog,
  };
};
