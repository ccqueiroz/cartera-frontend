import { cn } from "@/app/utils/cn.utils";
import { resolveStatusColor } from "./badgeStatusPayable.service";
import {
  StatusTransaction,
  StatusTransactionLabel,
} from "@/domain/transaction/enum/status.dto";

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
