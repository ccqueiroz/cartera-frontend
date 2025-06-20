import { AuthDTO } from "@/domain/Auth/auth.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/Http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/base-api-paths.constants";

type InputDTO = { email: string };

export class RecoverPasswordService
  implements Service<InputDTO, Promise<void>>
{
  constructor(private readonly http: HttpGateway["post"]) {}

  async execute({ email }: InputDTO): Promise<void> {
    await this.http<AuthDTO>(
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
