import { StatusByTransactionType } from "@/domain/StatusTransaction/status-transaction.dto";
import { resolveStatusColorTransactionType } from "./badge-status-by-transaction-type.service";

describe("resolveStatusColorTransactionType", () => {
  it("should return the correct color for RECEIVABLE", () => {
    expect(
      resolveStatusColorTransactionType(StatusByTransactionType.RECEIVABLE)
    ).toBe("bg-green-400/40 text-neon-white");
  });

  it("should return the correct color for BILL", () => {
    expect(
      resolveStatusColorTransactionType(StatusByTransactionType.BILL)
    ).toBe("bg-red-500/40 text-neon-white");
  });

  it("should return default color for unknown status", () => {
    expect(resolveStatusColorTransactionType("UNKNOWN" as never)).toBe(
      "bg-gray-400/40 text-white"
    );
  });
});
