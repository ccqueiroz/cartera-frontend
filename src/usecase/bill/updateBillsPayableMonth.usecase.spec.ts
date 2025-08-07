import { UpdateBillPayableMonthUseCase } from "@/usecase/bill/updateBillsPayableMonth.usecase";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { UpdateBillPayableMonthService } from "@/service/bill/updateBillsPayableMonth.service";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { StatusTransaction } from "@/domain/transaction/enum/status.dto";
import { CategoryDescriptionEnum } from "@/domain/transaction/enum/categoryDescription.enum";
import { CategoryGroupEnum } from "@/domain/transaction/enum/categoryGroup.enum";
import { TransactionMethodDescriptionEnum } from "@/domain/transaction/enum/methodDescription.enum";
import { BillDTO } from "@/domain/bill/bill.dto";

describe("UpdateBillPayableMonthUseCase", () => {
  const mockHandleResponseGateway: jest.Mocked<HandleResponseGateway> = {
    execute: jest.fn(),
  };

  const mockUpdateBillsPayableMonthService: jest.Mocked<UpdateBillPayableMonthService> =
    {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateBillPayableMonthService>;

  const useCase = new UpdateBillPayableMonthUseCase(
    mockHandleResponseGateway,
    mockUpdateBillsPayableMonthService
  );

  const billObject: BillDTO = {
    id: "121377d92-1aee-4479-859b-72f01c9ade24",
    personUserId: "06627d91-1aee-4479-859b-72f01c9ade24",
    userId: "b3e1c7f2-2d4e-48a5-a1f3-ef7c1e36d9b4",
    descriptionBill: "Supermercado",
    categoryDescriptionEnum: CategoryDescriptionEnum.SUPERMARKET,
    categoryGroup: CategoryGroupEnum.SHOPPING,
    fixedBill: false,
    billDate: new Date().getTime(),
    payDate: null,
    payOut: false,
    icon: null,
    amount: 1200.0,
    paymentStatus: StatusTransaction.PAID,
    categoryId: "7a3f4c8d-0e1b-43a9-91b5-4c7f6d9b2a6e",
    categoryDescription: "Supermercado",
    paymentMethodId: "g12c3e1b2-4a9e-4f6b-8d2e-3b7c6a1e5f9d",
    paymentMethodDescription: "Pix",
    paymentMethodDescriptionEnum: TransactionMethodDescriptionEnum.PIX,
    isPaymentCardBill: false,
    isShoppingListBill: true,
    createdAt: new Date().getTime(),
    updatedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error when ID is missing", async () => {
    const result = await useCase.execute({
      payload: {
        id: "",
        payOut: false,
        includePaymentDate: undefined,
      },
    });

    expect(result).toEqual({
      success: false,
      error: DomainMessageList.BILL_ID_NOT_FOUND,
      status: 400,
    });

    expect(mockHandleResponseGateway.execute).not.toHaveBeenCalled();
    expect(mockUpdateBillsPayableMonthService.execute).not.toHaveBeenCalled();
  });

  it("should call updateBillService with payDate as timestamp when includePaymentDate is a Date", async () => {
    const paymentDate = new Date("2025-08-07T12:00:00Z");
    const expectedTimestamp = paymentDate.getTime();

    const expectedResponse = {
      success: true,
      data: billObject,
      status: 200,
    };

    (mockHandleResponseGateway.execute as jest.Mock).mockResolvedValueOnce(
      expectedResponse
    );

    const result = await useCase.execute({
      payload: {
        id: billObject.id as string,
        payOut: billObject.payOut,
        includePaymentDate: paymentDate,
      },
    });

    expect(result).toEqual(expectedResponse);

    expect(mockHandleResponseGateway.execute).toHaveBeenCalledWith(
      expect.any(Function)
    );

    const callFn = (mockHandleResponseGateway.execute as jest.Mock).mock
      .calls[0][0];

    await callFn();

    expect(mockUpdateBillsPayableMonthService.execute).toHaveBeenCalledWith({
      payload: {
        id: billObject.id,
        payOut: billObject.payOut,
        payDate: expectedTimestamp,
      },
      signal: undefined,
    });
  });

  it("should call updateBillService with payDate as null when includePaymentDate is undefined", async () => {
    const expectedResponse = {
      success: true,
      data: billObject,
      status: 200,
    };

    (mockHandleResponseGateway.execute as jest.Mock).mockResolvedValueOnce(
      expectedResponse
    );

    const result = await useCase.execute({
      payload: {
        id: billObject.id as string,
        payOut: billObject.payOut,
        includePaymentDate: undefined,
      },
    });

    expect(result).toEqual(expectedResponse);

    const callFn = (mockHandleResponseGateway.execute as jest.Mock).mock
      .calls[0][0];

    await callFn();

    expect(mockUpdateBillsPayableMonthService.execute).toHaveBeenCalledWith({
      payload: {
        id: billObject.id,
        payOut: billObject.payOut,
        payDate: null,
      },
      signal: undefined,
    });
  });
});
