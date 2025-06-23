import { PersonUserDTO } from "@/domain/PersonUser/person-user.dto";
import { Usecase } from "../usecase";
import { GetPersonUserByUserIdService } from "@/service/PersonUser/get-person-user-by-user-id.service";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";

type Input = { userId: string; tagToCache: Array<string> };

export class GetPersonUserByUserIdUseCase
  implements Usecase<Input, Promise<HandleRequestDTO<PersonUserDTO | null>>>
{
  constructor(
    private readonly handleRequestGateway: HandleRequestGateway,
    private readonly getPersonUserByUseridService: GetPersonUserByUserIdService
  ) {}

  async execute({
    userId,
    tagToCache = [],
  }: Input): Promise<HandleRequestDTO<PersonUserDTO | null>> {
    if (!userId) {
      return {
        success: false,
        error: "",
      };
    }

    const personUser = await this.handleRequestGateway.execute(() =>
      this.getPersonUserByUseridService.execute({
        userId,
        tagToCache,
      })
    );

    return personUser;
  }
}
