"use server";

import { HandleProxy } from "@/app/actions/handleProxy/handleProxy.service";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { RecoverPasswordSchemaType } from "@/infra/schemas/auth/recoverPassword.schema";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { RecoverPasswordService } from "@/service/auth/recoverPassword.service";
import { RecoverPasswordUseCase } from "@/usecase/auth/recoverPassword.usecase";
import { cookies } from "next/headers";

export async function recoverPassword({ email }: RecoverPasswordSchemaType) {
  const storage = new CookieServerStorage(await cookies());

  const service = new RecoverPasswordService(
    (await httpInfraFactory(storage)).post
  );

  const usecase = new RecoverPasswordUseCase(handleResponseFactory, service);

  const response = await HandleProxy({
    request: () =>
      usecase.execute({
        email,
      }),
    isAuthService: true,
    storage,
  });

  const responseJson = (await response?.json()) as HandleResponseDTO<{
    email: string;
  }>;

  return responseJson;
}
