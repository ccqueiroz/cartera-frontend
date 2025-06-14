import { cn } from "@/lib/cn.utils";
import { resolveStatusColor } from "./badge-status-payable.service";
import {
  StatusTransaction,
  StatusTransactionLabel,
} from "@/domain/StatusTransaction/status-transaction.dto";

export const BadgeStatusPayable = ({
  status,
}: {
  status: (typeof StatusTransaction)[keyof typeof StatusTransaction];
}) => {
  return (
    <span
      className={cn(
        "w-fit text-xs px-2 py-1 rounded-full",
        resolveStatusColor(status)
      )}
    >
      {StatusTransactionLabel[status]}
    </span>
  );
};
