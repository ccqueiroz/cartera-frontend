import { HttpGateway } from "@/domain/http/http.gateway";
import { PersonUserDTO } from "@/domain/personUser/personUser.dto";
import { BASE_API_PATHS } from "@/infra/constants/baseApiPaths.constants";
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
