import { CookiesGateway } from "@/domain/core/Storage/cookies.gateway";
import { Usecase } from "../usecase";
import { flagsCookies } from "@/domain/core/Storage/flags-cookies.constants";

type InputDTO = void;

type OutputDTO = boolean;

export class GetValueKeepSessionUseCase
  implements Usecase<InputDTO, OutputDTO>
{
  constructor(private readonly storage: CookiesGateway) {}

  execute(): OutputDTO {
    const keepSession = this.storage.recover(flagsCookies.KEEP_SESSION);

    return keepSession === "true";
  }
}
