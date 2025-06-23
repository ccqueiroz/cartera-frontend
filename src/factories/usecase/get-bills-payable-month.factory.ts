import { GetBillsPayableMonthUseCase } from "@/usecases/Bill/get-bills-payable-month.usecase";
import { handleRequestFactory } from "../infra/handle-request.factory";
import { getBillsPayableMonthServiceFactory } from "../service/get-bills-payable-month.factory";

export const getBillsPayableMonthUseCaseFactory = () =>
  new GetBillsPayableMonthUseCase(
    handleRequestFactory,
    getBillsPayableMonthServiceFactory()
  );
