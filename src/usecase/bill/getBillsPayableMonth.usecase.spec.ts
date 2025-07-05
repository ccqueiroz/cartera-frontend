import { GetBillsPayableMonthUseCase } from "./getBillsPayableMonth.usecase";
import { GetBillsPayableMonthService } from "@/service/bill/getBillsPayableMonth.service";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import {
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/bill/bill.dto";

describe("GetBillsPayableMonthUseCase", () => {
  const mockHandleResponseGateway: jest.Mocked<HandleResponseGateway> = {
    execute: jest.fn(),
  };

  const mockGetBillsPayableMonthService: jest.Mocked<GetBillsPayableMonthService> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetBillsPayableMonthService>;

  const useCase = new GetBillsPayableMonthUseCase(
    mockHandleResponseGateway,
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

  const handleRequestResponse: HandleResponseDTO<BillsPayableMonthListDTO> = {
    data: billsResponse,
    success: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute the usecase successfully", async () => {
    mockHandleResponseGateway.execute.mockResolvedValueOnce(
      handleRequestResponse
    );

    const result = await useCase.execute(input);

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleResponseGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );

    const callFn = mockHandleResponseGateway.execute.mock.calls[0][0];
    mockGetBillsPayableMonthService.execute.mockResolvedValueOnce(
      billsResponse
    );
    const serviceResult = await callFn();

    expect(mockGetBillsPayableMonthService.execute).toHaveBeenCalledWith(input);
    expect(serviceResult).toEqual(billsResponse);

    expect(result).toEqual(handleRequestResponse);
  });

  it("should propagate error from HandleResponseGateway", async () => {
    const error = new Error("Request failed");
    mockHandleResponseGateway.execute.mockRejectedValueOnce(error);

    await expect(useCase.execute(input)).rejects.toThrow("Request failed");

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledTimes(1);
    expect(mockHandleResponseGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });
});
