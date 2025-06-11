import { StatusBill } from "@/domain/Bill/bill.dto";

const ColorStatusPayable: Record<
  (typeof StatusBill)[keyof typeof StatusBill],
  string
> = {
  PAID: "bg-green-400/40 text-neon-white",
  DUE_DAY: "bg-orange-500/40 text-neon-white",
  DUE_SOON: "bg-yellow-400/40 text-neon-white",
  OVERDUE: "bg-red-500/40 text-neon-white",
  PENDING: "bg-neon-purple/40 text-neon-white",
};

export function resolveStatusColor(
  status: (typeof StatusBill)[keyof typeof StatusBill]
): string {
  return (
    (
      ColorStatusPayable as Record<
        (typeof StatusBill)[keyof typeof StatusBill],
        string
      >
    )[status] ?? "bg-gray-400/40 text-white"
  );
}
