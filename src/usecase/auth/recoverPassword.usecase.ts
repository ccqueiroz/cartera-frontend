import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { RecoverPasswordService } from "@/service/auth/recoverPassword.service";

type InputDTO = { email: string };

export class RecoverPasswordUseCase
  implements Usecase<InputDTO, Promise<HandleResponseDTO<{ email: string }>>>
{
  constructor(
    private readonly HandleResponseGateway: HandleResponseGateway,
    private readonly recoverPasswordService: RecoverPasswordService
  ) {}

  async execute({
    email,
  }: InputDTO): Promise<HandleResponseDTO<{ email: string }>> {
    const response = await this.HandleResponseGateway.execute(() =>
      this.recoverPasswordService.execute({ email })
    );

    return {
      ...response,
      ...(response.success ? { data: { email } } : {}),
    } as HandleResponseDTO<{ email: string }>;
  }
}
