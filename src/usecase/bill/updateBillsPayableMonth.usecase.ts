import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { BillDTO } from "@/domain/bill/bill.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { UpdateBillPayableMonthService } from "@/service/bill/updateBillsPayableMonth.service";

type InputPayload = Required<Pick<BillDTO, "id" | "payOut">> & {
  includePaymentDate: Date | undefined;
};

type InputDTO = {
  signal?: AbortSignal | undefined;
  payload: InputPayload;
};
export class UpdateBillPayableMonthUseCase
  implements Usecase<InputDTO, Promise<HandleResponseDTO<BillDTO>>>
{
  constructor(
    private readonly handleResponseGateway: HandleResponseGateway,
    private readonly updateBIllsPaybaleMonthService: UpdateBillPayableMonthService
  ) {}

  async execute({
    payload,
    signal,
  }: InputDTO): Promise<HandleResponseDTO<BillDTO>> {
    if (!payload.id) {
      return { success: false, error: "" };
    }

    let payDate: number | null = null;

    if (payload.includePaymentDate instanceof Date) {
      payDate = new Date(payload.includePaymentDate).getTime();
    }

    const bill = await this.handleResponseGateway.execute(() =>
      this.updateBIllsPaybaleMonthService.execute({
        payload: {
          id: payload.id,
          payOut: payload.payOut,
          payDate,
        },
        signal,
      })
    );

    return bill;
  }
}
