import { Service } from "../service";
import {
  BillsPayableMonthListDTO,
  InputGetBillsPayableMonth,
} from "@/domain/bill/bill.dto";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

type InputDTO = {
  queries: InputGetBillsPayableMonth;
  signal?: AbortSignal | undefined;
};

export class GetBillsPayableMonthService
  implements Service<InputDTO, Promise<BillsPayableMonthListDTO>>
{
  constructor(private readonly http: HttpGateway["get"]) {}

  async execute({
    queries: { initialDate, finalDate, ...rest },
    signal,
  }: InputDTO): Promise<BillsPayableMonthListDTO> {
    const response = await this.http<BillsPayableMonthListDTO>(
      BASE_API_PATHS.BILL.by_month_status,
      {
        queries: {
          ...rest,
          initialDate,
          finalDate,
        },
        cache: "no-store",
        signal,
      }
    );

    return response;
  }
}
