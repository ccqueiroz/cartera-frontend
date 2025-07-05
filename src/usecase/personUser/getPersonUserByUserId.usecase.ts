import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { PersonUserDTO } from "@/domain/personUser/personUser.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { GetPersonUserByUserIdService } from "@/service/personUser/getPersonUserByUserId.service";

type Input = { userId: string; tagToCache: Array<string> };

export class GetPersonUserByUserIdUseCase
  implements Usecase<Input, Promise<HandleResponseDTO<PersonUserDTO | null>>>
{
  constructor(
    private readonly handleResponseGateway: HandleResponseGateway,
    private readonly getPersonUserByUseridService: GetPersonUserByUserIdService
  ) {}

  async execute({
    userId,
    tagToCache = [],
  }: Input): Promise<HandleResponseDTO<PersonUserDTO | null>> {
    if (!userId) {
      return {
        success: false,
        error: "",
      };
    }

    const personUser = await this.handleResponseGateway.execute(() =>
      this.getPersonUserByUseridService.execute({
        userId,
        tagToCache,
      })
    );

    return personUser;
  }
}
