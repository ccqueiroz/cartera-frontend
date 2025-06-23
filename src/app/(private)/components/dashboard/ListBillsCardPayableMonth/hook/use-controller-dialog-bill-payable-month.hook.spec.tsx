import { renderHook, act } from "@testing-library/react";
import { useControllerDialogBillPayableMonth } from "./use-controller-dialog-bill-payable-month.hook";
import { BillsPayableMonthOutPutDTO } from "@/domain/Bill/bill.dto";

describe("useControllerDialogBillPayableMonth", () => {
  const mockBill: BillsPayableMonthOutPutDTO = {
    id: "1",
    descriptionBill: "Aluguel",
    amount: 1500,
    billDate: new Date().getTime(),
    categoryId: "121212244t5tefdf",
    categoryDescription: "Moradia e Manutencao Residencial",
    status: "DUE_DAY",
  };

  it("should have initial state closed and null bill", () => {
    const { result } = renderHook(() => useControllerDialogBillPayableMonth());

    expect(result.current.openDialog).toBe(false);
    expect(result.current.billToDialog).toBeNull();
  });

  it("should open dialog with bill data", () => {
    const { result } = renderHook(() => useControllerDialogBillPayableMonth());

    act(() => {
      result.current.handleOpenDialog(mockBill);
    });

    expect(result.current.openDialog).toBe(true);
    expect(result.current.billToDialog).toEqual(mockBill);
  });

  it("should close dialog and reset bill data", () => {
    const { result } = renderHook(() => useControllerDialogBillPayableMonth());

    act(() => {
      result.current.handleOpenDialog(mockBill);
    });

    act(() => {
      result.current.handleCloseDialog(false);
    });

    expect(result.current.openDialog).toBe(false);
    expect(result.current.billToDialog).toBeNull();
  });

  it("should set openDialog to true when closing with true param (edge case)", () => {
    const { result } = renderHook(() => useControllerDialogBillPayableMonth());

    act(() => {
      result.current.handleCloseDialog(true);
    });

    expect(result.current.openDialog).toBe(true);
    expect(result.current.billToDialog).toBeNull();
  });
});
