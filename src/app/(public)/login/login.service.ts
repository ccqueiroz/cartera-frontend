"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import { AuthDTO } from "@/domain/auth/auth.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { cookiesFactory } from "@/infra/factories/storage/cookies.factory";
import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { SignInService } from "@/service/auth/signin.service";
import { GetValueKeepSessionUseCase } from "@/usecase/auth/getValueKeepSession.usecase";
import { SignInUseCase } from "@/usecase/auth/signin.usecase";
import { cookies } from "next/headers";

export async function signIn({
  email,
  password,
  keepSession,
}: LoginSchemaType) {
  const storage = new CookieServerStorage(await cookies());

  const service = new SignInService((await httpInfraFactory(storage)).post);

  const usecase = new SignInUseCase(handleResponseFactory, service, storage);

  const response = await HandleProxy({
    request: () =>
      usecase.execute({
        email,
        password,
        keepSession,
      }),
    isAuthService: true,
    storage,
  });

  const responseJson = (await response?.json()) as HandleResponseDTO<AuthDTO>;

  return responseJson;
}

export async function getValueKeepSession() {
  const storage = await cookiesFactory();

  const usecase = new GetValueKeepSessionUseCase(storage);

  const keepSession = await usecase.execute();

  return keepSession;
}
