import { GetBillsPayableMonthUseCase } from "./get-bills-payable-month.usecase";
import { GetBillsPayableMonthService } from "@/service/Bill/get-bills-payable-month.service";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import {
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/Bill/bill.dto";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";

describe("GetBillsPayableMonthUseCase", () => {
  const mockHandleRequestGateway: jest.Mocked<HandleRequestGateway> = {
    execute: jest.fn(),
  };

  const mockGetBillsPayableMonthService: jest.Mocked<GetBillsPayableMonthService> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetBillsPayableMonthService>;

  const useCase = new GetBillsPayableMonthUseCase(
    mockHandleRequestGateway,
    mockGetBillsPayableMonthService
  );

  const input: InputGetBillsPayableMonth = {
    initialDate: 1748746800000,
    finalDate: 1751252400000,
    page: 0,
    size: 10,
  };

  const billsResponse: BillsPayableMonthListDTO = {
    content: [
      {
        id: "1",
        amount: 100,
        descriptionBill: "Internet Bill",
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

  const handleRequestResponse: HandleRequestDTO<BillsPayableMonthListDTO> = {
    data: billsResponse,
    success: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute the usecase successfully", async () => {
    mockHandleRequestGateway.execute.mockResolvedValueOnce(
      handleRequestResponse
    );

    const result = await useCase.execute(input);

    expect(mockHandleRequestGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleRequestGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );

    const callFn = mockHandleRequestGateway.execute.mock.calls[0][0];
    mockGetBillsPayableMonthService.execute.mockResolvedValueOnce(
      billsResponse
    );
    const serviceResult = await callFn();

    expect(mockGetBillsPayableMonthService.execute).toHaveBeenCalledWith(input);
    expect(serviceResult).toEqual(billsResponse);

    expect(result).toEqual(handleRequestResponse);
  });

  it("should propagate error from handleRequestGateway", async () => {
    const error = new Error("Request failed");
    mockHandleRequestGateway.execute.mockRejectedValueOnce(error);

    await expect(useCase.execute(input)).rejects.toThrow("Request failed");

    expect(mockHandleRequestGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleRequestGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });
});
