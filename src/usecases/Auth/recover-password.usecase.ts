import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { Usecase } from "../usecase";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { RecoverPasswordService } from "@/service/Auth/recover-password.service";

type InputDTO = { email: string };

export class RecoverPasswordUseCase
  implements Usecase<InputDTO, Promise<HandleRequestDTO<{ email: string }>>>
{
  constructor(
    private readonly handleRequestGateway: HandleRequestGateway,
    private readonly recoverPasswordService: RecoverPasswordService
  ) {}

  async execute({
    email,
  }: InputDTO): Promise<HandleRequestDTO<{ email: string }>> {
    const response = await this.handleRequestGateway.execute(() =>
      this.recoverPasswordService.execute({ email })
    );

    return {
      ...response,
      ...(response.success ? { data: { email } } : {}),
    } as HandleRequestDTO<{ email: string }>;
  }
}
