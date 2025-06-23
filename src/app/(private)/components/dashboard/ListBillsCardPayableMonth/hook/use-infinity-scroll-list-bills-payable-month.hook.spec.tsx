import { renderHook, act, waitFor } from "@testing-library/react";
import * as virtualizer from "@tanstack/react-virtual";
import { BillsPayableMonthListDTO } from "@/domain/Bill/bill.dto";
import { useInfinityScrollListBillsPayableMonth } from "./use-infinity-scroll-list-bills-payable-month.hook";

jest.mock("@tanstack/react-virtual");
const mockedUseVirtualizer = virtualizer.useVirtualizer as jest.Mock;

describe("useInfinityScrollListBillsPayableMonth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/(not wrapped in act)/gi.test(message)) {
        return;
      }
      console.warn(message);
    });
  });
  const initialData: BillsPayableMonthListDTO = {
    content: [
      {
        id: "1",
        amount: 100,
        descriptionBill: "Bill 1",
        billDate: 123,
        categoryId: "cat1",
        categoryDescription: "Category 1",
        status: "PENDING",
      },
    ],
    page: 1,
    size: 8,
    totalElements: 10,
    totalPages: 2,
    ordering: null,
  };

  const initialDate = 1000;
  const finalDate = 2000;
  const pageSize = 8;

  let getBillsPayableMonthMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseVirtualizer.mockImplementation(({ count }) => ({
      count,
      getVirtualItems: () => [{ index: count - 1 }],
    }));

    getBillsPayableMonthMock = jest.fn().mockResolvedValue({
      success: true,
      data: initialData,
    });
  });

  it("should initialize with initial data", () => {
    const { result } = renderHook(() =>
      useInfinityScrollListBillsPayableMonth({
        initialDataBillsCardPayableMonth: initialData,
        initialDate,
        finalDate,
        getBillsPayableMonth: getBillsPayableMonthMock,
      })
    );

    expect(result.current.content).toEqual(initialData.content);
    expect(result.current.page).toBe(initialData.page);
    expect(result.current.size).toBe(initialData.size);
    expect(result.current.totalElements).toBe(initialData.totalElements);
    expect(result.current.totalPages).toBe(initialData.totalPages);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.isLoadingList).toBe(false);
  });

  it("should fetch next page when scrolled to last item", async () => {
    const nextPageData: BillsPayableMonthListDTO = {
      content: [
        ...initialData.content,
        {
          id: "2",
          amount: 200,
          descriptionBill: "Bill 2",
          billDate: 456,
          categoryId: "cat2",
          categoryDescription: "Category 2",
          status: "PAID",
        },
      ],
      page: 2,
      size: 8,
      totalElements: 10,
      totalPages: 2,
      ordering: null,
    };

    getBillsPayableMonthMock.mockResolvedValueOnce({
      success: true,
      data: nextPageData,
    });

    const { result, rerender } = renderHook(() =>
      useInfinityScrollListBillsPayableMonth({
        initialDataBillsCardPayableMonth: initialData,
        initialDate,
        finalDate,
        getBillsPayableMonth: getBillsPayableMonthMock,
      })
    );

    rerender();

    await waitFor(() => {
      expect(getBillsPayableMonthMock).toHaveBeenCalledWith({
        initialDate,
        finalDate,
        page: 2,
        size: pageSize,
      });
    });

    await waitFor(() => {
      expect(result.current.content.find((b) => b.id === "2")).toBeDefined();
    });
  });

  it("should NOT fetch if already loading", async () => {
    let resolveFetch: (value?: unknown) => void;

    getBillsPayableMonthMock.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    const { rerender } = renderHook(() =>
      useInfinityScrollListBillsPayableMonth({
        initialDataBillsCardPayableMonth: initialData,
        initialDate,
        finalDate,
        getBillsPayableMonth: getBillsPayableMonthMock,
      })
    );

    mockedUseVirtualizer.mockImplementation(({ count }) => ({
      count,
      getVirtualItems: () => [{ index: count - 1 }],
    }));

    rerender();

    rerender();

    expect(getBillsPayableMonthMock).toHaveBeenCalledTimes(1);

    act(() => {
      resolveFetch();
    });
  });

  it("should NOT update content if fetch response is failure", async () => {
    getBillsPayableMonthMock.mockResolvedValue({
      success: false,
      data: null,
    });

    const { result, rerender } = renderHook(() =>
      useInfinityScrollListBillsPayableMonth({
        initialDataBillsCardPayableMonth: initialData,
        initialDate,
        finalDate,
        getBillsPayableMonth: getBillsPayableMonthMock,
      })
    );

    rerender();

    await waitFor(() => {
      expect(getBillsPayableMonthMock).toHaveBeenCalled();
    });

    expect(result.current.content).toEqual(initialData.content);
  });

  it("should cleanup without errors on unmount", () => {
    const { unmount } = renderHook(() =>
      useInfinityScrollListBillsPayableMonth({
        initialDataBillsCardPayableMonth: initialData,
        initialDate,
        finalDate,
        getBillsPayableMonth: getBillsPayableMonthMock,
      })
    );

    act(() => {
      unmount();
    });
  });
});
