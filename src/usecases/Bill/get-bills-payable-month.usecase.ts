import {
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/Bill/bill.dto";
import { Usecase } from "../usecase";
import { GetBillsPayableMonthService } from "@/service/Bill/get-bills-payable-month.service";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";

type InputDTO = InputGetBillsPayableMonth;

export class GetBillsPayableMonthUseCase
  implements
    Usecase<InputDTO, Promise<HandleRequestDTO<BillsPayableMonthListDTO>>>
{
  constructor(
    private readonly handleRequestGateway: HandleRequestGateway,
    private readonly getBillsPayableMonthService: GetBillsPayableMonthService
  ) {}

  async execute({
    initialDate,
    finalDate,
    ...rest
  }: InputDTO): Promise<HandleRequestDTO<BillsPayableMonthListDTO>> {
    const response = await this.handleRequestGateway.execute(() =>
      this.getBillsPayableMonthService.execute({
        initialDate,
        finalDate,
        ...rest,
      })
    );

    return response;
  }
}
