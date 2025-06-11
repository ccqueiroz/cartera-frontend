import { cn } from "@/lib/cn.utils";
import { resolveStatusColor } from "./badge-status-payable.service";
import { StatusBill, StatusBillLabel } from "@/domain/Bill/bill.dto";

export const BadgeStatusPayable = ({
  status,
}: {
  status: (typeof StatusBill)[keyof typeof StatusBill];
}) => {
  return (
    <span
      className={cn(
        "w-fit text-xs px-2 py-1 rounded-full",
        resolveStatusColor(status)
      )}
    >
      {StatusBillLabel[status]}
    </span>
  );
};
