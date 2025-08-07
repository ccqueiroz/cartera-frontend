import { UpdateBillPayableMonthService } from "./updateBillsPayableMonth.service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { BillDTO } from "@/domain/bill/bill.dto";
import { StatusTransaction } from "@/domain/transaction/enum/status.dto";
import { CategoryDescriptionEnum } from "@/domain/transaction/enum/categoryDescription.enum";
import { CategoryGroupEnum } from "@/domain/transaction/enum/categoryGroup.enum";
import { TransactionMethodDescriptionEnum } from "@/domain/transaction/enum/methodDescription.enum";

describe("UpdateBillPayableMonthService", () => {
  const httpPutMock = jest.fn();

  const service = new UpdateBillPayableMonthService(httpPutMock);

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

  const input = {
    payload: {
      id: billObject.id,
      payDate: billObject.payDate,
      payOut: billObject.payOut,
    } as Required<Pick<BillDTO, "id" | "payDate" | "payOut">>,
    signal: undefined as AbortSignal | undefined,
  };

  const expectedResponse = {
    data: billObject,
    status: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call http.put with correct params and return response", async () => {
    httpPutMock.mockResolvedValueOnce(expectedResponse);

    const result = await service.execute(input);

    expect(result).toEqual(expectedResponse);

    expect(httpPutMock).toHaveBeenCalledWith(
      BASE_API_PATHS.BILL.edit,
      {
        payload: {
          id: billObject.id,
          payDate: billObject.payDate,
          payOut: billObject.payOut,
        },
      },
      {
        params: { id: billObject.id },
        cache: "no-store",
        signal: undefined,
      }
    );
  });

  it("should propagate errors from http.put", async () => {
    const error = new Error("Failed to update bill");
    httpPutMock.mockRejectedValueOnce(error);

    await expect(service.execute(input)).rejects.toThrow(
      "Failed to update bill"
    );

    expect(httpPutMock).toHaveBeenCalledWith(
      BASE_API_PATHS.BILL.edit,
      {
        payload: {
          id: billObject.id,
          payDate: billObject.payDate,
          payOut: billObject.payOut,
        },
      },
      {
        params: { id: billObject.id },
        cache: "no-store",
        signal: undefined,
      }
    );
  });
});
