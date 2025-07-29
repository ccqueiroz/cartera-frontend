import { CookiesGateway } from "@/domain/core/storage/cookies.gateway";
import { Usecase } from "../usecase";
import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";

type InputDTO = void;

type OutputDTO = Promise<boolean>;

export class GetValueKeepSessionUseCase
  implements Usecase<InputDTO, OutputDTO>
{
  constructor(private readonly storage: CookiesGateway) {}

  async execute(): OutputDTO {
    const keepSession = await this.storage.recover(flagsCookies.KEEP_SESSION);

    return !!keepSession;
  }
}
