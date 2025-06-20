import { handleRequestFactory } from "../infra/handle-request.factory";
import { RecoverPasswordUseCase } from "@/usecases/Auth/recover-password.usecase";
import { recoverPasswordServiceFactory } from "../service/recover-password.factory";

export const recoverPasswordUseCaseFactory = () =>
  new RecoverPasswordUseCase(
    handleRequestFactory,
    recoverPasswordServiceFactory()
  );
