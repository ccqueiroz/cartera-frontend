import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";

type InputDTO = { email: string };

type OutputDTO = { data: null; status: number };
export class RecoverPasswordService
  implements Service<InputDTO, Promise<OutputDTO>>
{
  constructor(private readonly http: HttpGateway["post"]) {}

  async execute({ email }: InputDTO): Promise<OutputDTO> {
    return await this.http<OutputDTO>(
      BASE_API_PATHS.AUTH.recovery_password,
      {
        email,
      },
      {
        cache: "no-store",
      }
    );
  }
}
