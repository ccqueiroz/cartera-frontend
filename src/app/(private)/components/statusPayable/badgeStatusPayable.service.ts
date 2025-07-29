import { StatusTransaction } from "@/domain/statusTransaction/statusTransaction.dto";

const ColorStatusPayable: Record<
  (typeof StatusTransaction)[keyof typeof StatusTransaction],
  string
> = {
  PAID: "bg-green-400/40 text-neon-white",
  DUE_DAY: "bg-orange-500/40 text-neon-white",
  DUE_SOON: "bg-yellow-400/40 text-neon-white",
  OVERDUE: "bg-red-500/40 text-neon-white",
  PENDING: "bg-neon-purple/40 text-neon-white",
};

export function resolveStatusColor(
  status: (typeof StatusTransaction)[keyof typeof StatusTransaction]
): string {
  return (
    (
      ColorStatusPayable as Record<
        (typeof StatusTransaction)[keyof typeof StatusTransaction],
        string
      >
    )[status] ?? "bg-gray-400/40 text-white"
  );
}
