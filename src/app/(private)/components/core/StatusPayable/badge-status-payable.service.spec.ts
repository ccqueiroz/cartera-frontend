import { resolveStatusColor } from "./badge-status-payable.service";
import { StatusBill } from "@/domain/Bill/bill.dto";

describe("resolveStatusColor", () => {
  it("should return the correct color for PAID", () => {
    expect(resolveStatusColor(StatusBill.PAID)).toBe(
      "bg-green-400/40 text-neon-white"
    );
  });

  it("should return the correct color for DUE_DAY", () => {
    expect(resolveStatusColor(StatusBill.DUE_DAY)).toBe(
      "bg-orange-500/40 text-neon-white"
    );
  });

  it("should return the correct color for DUE_SOON", () => {
    expect(resolveStatusColor(StatusBill.DUE_SOON)).toBe(
      "bg-yellow-400/40 text-neon-white"
    );
  });

  it("should return the correct color for OVERDUE", () => {
    expect(resolveStatusColor(StatusBill.OVERDUE)).toBe(
      "bg-red-500/40 text-neon-white"
    );
  });

  it("should return the correct color for PENDING", () => {
    expect(resolveStatusColor(StatusBill.PENDING)).toBe(
      "bg-neon-purple/40 text-neon-white"
    );
  });

  it("should return default color for unknown status", () => {
    expect(resolveStatusColor("UNKNOWN" as never)).toBe(
      "bg-gray-400/40 text-white"
    );
  });
});
