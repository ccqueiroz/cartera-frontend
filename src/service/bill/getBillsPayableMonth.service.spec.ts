import { GetBillsPayableMonthService } from "./getBillsPayableMonth.service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { BillsPayableMonthListDTO } from "@/domain/bill/bill.dto";

describe("GetBillsPayableMonthService", () => {
  const mockHttpGet = jest.fn();
  const service = new GetBillsPayableMonthService(mockHttpGet);

  const input = {
    initialDate: 1748746800000,
    finalDate: 1751252400000,
    page: 0,
    size: 10,
  };

  const mockResponse: BillsPayableMonthListDTO = {
    content: [
      {
        id: "1",
        amount: 150,
        descriptionBill: "Electricity Bill",
        billDate: 1748746800000,
        categoryId: "cat1",
        categoryDescription: "Utilities",
        status: "PENDING",
      },
    ],
    page: 0,
    size: 10,
    totalElements: 1,
    totalPages: 1,
    ordering: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call http.get with correct parameters and return data", async () => {
    mockHttpGet.mockResolvedValueOnce(mockResponse);

    const result = await service.execute({ queries: input });

    expect(mockHttpGet).toHaveBeenCalledWith(
      BASE_API_PATHS.BILL.by_month_status,
      {
        queries: {
          ...input,
        },
        cache: "no-store",
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("should propagate http.get errors", async () => {
    const error = new Error("Network error");
    mockHttpGet.mockRejectedValueOnce(error);

    await expect(service.execute({ queries: input })).rejects.toThrow(
      "Network error"
    );

    expect(mockHttpGet).toHaveBeenCalledWith(
      BASE_API_PATHS.BILL.by_month_status,
      {
        queries: {
          ...input,
        },
        cache: "no-store",
      }
    );
  });
});
