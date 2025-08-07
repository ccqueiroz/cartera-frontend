import { AuthDTO } from "@/domain/auth/auth.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

type InputDTO = { email: string; password: string };

type OutputDTO = { data: AuthDTO; status: number };

export class SignInService implements Service<InputDTO, Promise<OutputDTO>> {
  constructor(private readonly http: HttpGateway["post"]) {}

  async execute({ email, password }: InputDTO): Promise<OutputDTO> {
    const response = await this.http<OutputDTO>(
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
