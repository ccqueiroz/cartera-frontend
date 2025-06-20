import { RegisterAuthDTO } from "@/domain/Auth/auth.dto";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { Usecase } from "../usecase";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { RegisterService } from "@/service/Auth/register.service";

type InputDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export class RegisterUseCase
  implements Usecase<InputDTO, Promise<HandleRequestDTO<RegisterAuthDTO>>>
{
  constructor(
    private readonly handleRequestGateway: HandleRequestGateway,
    private readonly registerService: RegisterService
  ) {}

  async execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  }: InputDTO): Promise<HandleRequestDTO<RegisterAuthDTO>> {
    const response = await this.handleRequestGateway.execute(() =>
      this.registerService.execute({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      })
    );

    return response;
  }
}
