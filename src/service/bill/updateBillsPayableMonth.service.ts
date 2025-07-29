import { BillDTO } from "@/domain/bill/bill.dto";
import { Service } from "../service";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { HttpGateway } from "@/domain/http/http.gateway";

type InputPayload = Required<Pick<BillDTO, "id" | "payDate" | "payOut">>;

type InputDTO = {
  signal?: AbortSignal | undefined;
  payload: InputPayload;
};

export class UpdateBillPayableMonthService
  implements Service<InputDTO, Promise<BillDTO>>
{
  constructor(private readonly http: HttpGateway["put"]) {}

  async execute({ payload, signal }: InputDTO): Promise<BillDTO> {
    const response = await this.http<BillDTO>(
      BASE_API_PATHS.BILL.edit,
      {
        payload,
      },
      {
        params: { id: payload.id },
        cache: "no-store",
        signal,
      }
    );

    return response;
  }
}
