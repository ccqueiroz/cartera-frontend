import { StatusTransaction } from "@/domain/transaction/enum/status.dto";
import { resolveStatusColor } from "./badgeStatusPayable.service";

describe("resolveStatusColor", () => {
  it("should return the correct color for PAID", () => {
    expect(resolveStatusColor(StatusTransaction.PAID)).toBe(
      "bg-green-400/40 text-neon-white"
    );
  });

  it("should return the correct color for DUE_DAY", () => {
    expect(resolveStatusColor(StatusTransaction.DUE_DAY)).toBe(
      "bg-orange-500/40 text-neon-white"
    );
  });

  it("should return the correct color for DUE_SOON", () => {
    expect(resolveStatusColor(StatusTransaction.DUE_SOON)).toBe(
      "bg-yellow-400/40 text-neon-white"
    );
  });

  it("should return the correct color for OVERDUE", () => {
    expect(resolveStatusColor(StatusTransaction.OVERDUE)).toBe(
      "bg-red-500/40 text-neon-white"
    );
  });

  it("should return the correct color for PENDING", () => {
    expect(resolveStatusColor(StatusTransaction.TO_PAY)).toBe(
      "bg-neon-purple/40 text-neon-white"
    );
  });

  it("should return default color for unknown status", () => {
    expect(resolveStatusColor("UNKNOWN" as never)).toBe(
      "bg-gray-400/40 text-white"
    );
  });
});
