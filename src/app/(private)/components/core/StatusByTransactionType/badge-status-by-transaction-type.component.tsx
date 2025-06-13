import { cn } from "@/lib/cn.utils";
import { resolveStatusColorTransactionType } from "./badge-status-by-transaction-type.service";
import {
  StatusByTransactionType,
  StatusByTransactionTypeLabel,
} from "@/domain/StatusTransaction/status-transaction.dto";

export const BadgeStatusByTransactionType = ({
  status,
}: {
  status: (typeof StatusByTransactionType)[keyof typeof StatusByTransactionType];
}) => {
  return (
    <span
      className={cn(
        "w-fit text-xs px-2 py-1 rounded-full",
        resolveStatusColorTransactionType(status)
      )}
    >
      {StatusByTransactionTypeLabel[status]}
    </span>
  );
};
