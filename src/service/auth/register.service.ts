import { RegisterAuthDTO } from "@/domain/auth/auth.dto";
import { Service } from "../service";
import { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";

type InputDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export class RegisterService
  implements Service<InputDTO, Promise<RegisterAuthDTO>>
{
  constructor(private readonly http: HttpGateway["post"]) {}

  async execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  }: InputDTO): Promise<RegisterAuthDTO> {
    const response = await this.http<RegisterAuthDTO>(
      BASE_API_PATHS.AUTH.register_account,
      {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      },
      {
        cache: "no-store",
      }
    );

    return response;
  }
}
