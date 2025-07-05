import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { RegisterAuthDTO } from "@/domain/auth/auth.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { RegisterService } from "@/service/auth/register.service";

type InputDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export class RegisterUseCase
  implements Usecase<InputDTO, Promise<HandleResponseDTO<RegisterAuthDTO>>>
{
  constructor(
    private readonly HandleResponseGateway: HandleResponseGateway,
    private readonly registerService: RegisterService
  ) {}

  async execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  }: InputDTO): Promise<HandleResponseDTO<RegisterAuthDTO>> {
    const response = await this.HandleResponseGateway.execute(() =>
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
