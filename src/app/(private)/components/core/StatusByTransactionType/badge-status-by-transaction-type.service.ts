import { StatusByTransactionType } from "@/domain/StatusTransaction/status-transaction.dto";

const ColorStatusByTransactionType: Record<
  (typeof StatusByTransactionType)[keyof typeof StatusByTransactionType],
  string
> = {
  RECEIVABLE: "bg-green-400/40 text-neon-white",
  BILL: "bg-red-500/40 text-neon-white",
};

export function resolveStatusColorTransactionType(
  status: (typeof StatusByTransactionType)[keyof typeof StatusByTransactionType]
): string {
  return (
    (
      ColorStatusByTransactionType as Record<
        (typeof StatusByTransactionType)[keyof typeof StatusByTransactionType],
        string
      >
    )[status] ?? "bg-gray-400/40 text-white"
  );
}
