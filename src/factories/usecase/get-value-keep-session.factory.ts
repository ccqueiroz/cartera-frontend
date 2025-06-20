import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { GetValueKeepSessionUseCase } from "@/usecases/Auth/get-value-keep-session.usecase";

export const getValueKeepSessionUseCaseFactory = () =>
  new GetValueKeepSessionUseCase(new CookieServerStorage());
