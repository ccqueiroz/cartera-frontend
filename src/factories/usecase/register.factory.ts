import { handleRequestFactory } from "../infra/handle-request.factory";
import { RegisterUseCase } from "@/usecases/Auth/register.usecase";
import { registerServiceFactory } from "../service/register.factory";

export const registerUseCaseFactory = () =>
  new RegisterUseCase(handleRequestFactory, registerServiceFactory());
