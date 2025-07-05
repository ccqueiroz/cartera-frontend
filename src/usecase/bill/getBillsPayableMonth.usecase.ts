import {
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/bill/bill.dto";
import { Usecase } from "../usecase";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { GetBillsPayableMonthService } from "@/service/bill/getBillsPayableMonth.service";

type InputDTO = InputGetBillsPayableMonth;

export class GetBillsPayableMonthUseCase
  implements
    Usecase<InputDTO, Promise<HandleResponseDTO<BillsPayableMonthListDTO>>>
{
  constructor(
    private readonly handleResponseGateway: HandleResponseGateway,
    private readonly getBillsPayableMonthService: GetBillsPayableMonthService
  ) {}

  async execute({
    initialDate,
    finalDate,
    ...rest
  }: InputDTO): Promise<HandleResponseDTO<BillsPayableMonthListDTO>> {
    const response = await this.handleResponseGateway.execute(() =>
      this.getBillsPayableMonthService.execute({
        initialDate,
        finalDate,
        ...rest,
      })
    );

    return response;
  }
}
