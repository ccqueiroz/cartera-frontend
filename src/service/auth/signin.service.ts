import { AuthDTO } from "@/domain/auth/auth.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

type InputDTO = { email: string; password: string };

export class SignInService implements Service<InputDTO, Promise<AuthDTO>> {
  constructor(private readonly http: HttpGateway["post"]) {}

  async execute({ email, password }: InputDTO): Promise<AuthDTO> {
    const response = await this.http<AuthDTO>(
      BASE_API_PATHS.AUTH.login,
      {
        email,
        password,
      },
      {
        cache: "no-store",
      }
    );

    return response;
  }
}
