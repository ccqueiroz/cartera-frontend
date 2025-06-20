import { handleRequestFactory } from "../infra/handle-request.factory";
import { SignInUseCase } from "@/usecases/Auth/signin.usecase";
import { signInServiceFactory } from "../service/sigin.factory";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";

export const signInUseCaseFactory = () =>
  new SignInUseCase(
    handleRequestFactory,
    signInServiceFactory(),
    new CookieServerStorage()
  );
