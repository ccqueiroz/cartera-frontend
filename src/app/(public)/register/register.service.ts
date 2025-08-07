"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import { AuthDTO, RegisterAuthDTO } from "@/domain/auth/auth.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { RegisterService } from "@/service/auth/register.service";
import { SignInService } from "@/service/auth/signin.service";
import { RegisterUseCase } from "@/usecase/auth/register.usecase";
import { SignInUseCase } from "@/usecase/auth/signin.usecase";
import { cookies } from "next/headers";

export async function register({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterSchemaType) {
  const storage = new CookieServerStorage(await cookies());

  const service = new RegisterService((await httpInfraFactory(storage)).post);

  const usecase = new RegisterUseCase(handleResponseFactory, service);

  const response = await HandleProxy({
    request: () =>
      usecase.execute({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      }),
    isAuthService: true,
    storage,
  });

  const registerAccount =
    (await response?.json()) as HandleResponseDTO<RegisterAuthDTO>;

  if (!registerAccount.success) {
    return registerAccount;
  }

  const serviceLogin = new SignInService(
    (await httpInfraFactory(storage)).post
  );

  const usecaseLogin = new SignInUseCase(
    handleResponseFactory,
    serviceLogin,
    storage
  );

  const signin = await HandleProxy({
    request: () =>
      usecaseLogin.execute({
        email,
        password,
        keepSession: false,
      }),
    isAuthService: true,
    storage,
  });

  const responseSiginJson =
    (await signin?.json()) as HandleResponseDTO<AuthDTO>;

  return responseSiginJson;
}
