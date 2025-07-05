"use server";

import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { RecoverPasswordSchemaType } from "@/infra/schemas/auth/recoverPassword.schema";
import { RecoverPasswordService } from "@/service/auth/recoverPassword.service";
import { RecoverPasswordUseCase } from "@/usecase/auth/recoverPassword.usecase";

export async function recoverPassword({ email }: RecoverPasswordSchemaType) {
  const http = await httpInfraFactory();
  const service = new RecoverPasswordService(http.post);
  const usecase = new RecoverPasswordUseCase(handleResponseFactory, service);

  const recover = await usecase.execute({
    email,
  });

  if (!recover.success) return recover;

  return { ...recover, data: { email } };
}
