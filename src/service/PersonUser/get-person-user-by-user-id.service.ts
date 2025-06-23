import { HttpGateway } from "@/domain/Http/http.gateway";
import { PersonUserDTO } from "@/domain/PersonUser/person-user.dto";
import { BASE_API_PATHS } from "@/infra/constants/base-api-paths.constants";
import { Service } from "../service";

type InputDTO = { userId: string; tagToCache: Array<string> };

export class GetPersonUserByUserIdService
  implements Service<InputDTO, Promise<PersonUserDTO>>
{
  constructor(private readonly http: HttpGateway["get"]) {}

  async execute({ userId, tagToCache = [] }: InputDTO): Promise<PersonUserDTO> {
    const response = await this.http<PersonUserDTO>(
      BASE_API_PATHS.PERSON_USER.list_by_user_id,
      {
        params: { id: userId },
        tags: tagToCache,
        cache: "force-cache",
      }
    );

    return response;
  }
}
