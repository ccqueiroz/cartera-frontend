"use server";

import { ROUTES } from "@/infra/constants/routes.constants";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { cookiesFactory } from "@/infra/factories/storage/cookies.factory";
import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { SignInService } from "@/service/auth/signin.service";
import { GetValueKeepSessionUseCase } from "@/usecase/auth/getValueKeepSession.usecase";
import { SignInUseCase } from "@/usecase/auth/signin.usecase";
import { redirect } from "next/navigation";

export async function signIn({
  email,
  password,
  keepSession,
}: LoginSchemaType) {
  const service = new SignInService((await httpInfraFactory()).post);
  const storage = await cookiesFactory();

  const usecase = new SignInUseCase(
    handleResponseFactory,
    service,
    storage
  );

  const signin = await usecase.execute({
    email,
    password,
    keepSession,
  });

  if (!signin.success) {
    return signin;
  }

  redirect(ROUTES.PRIVATE.dashboard);
}

export async function getValueKeepSession() {
  const storage = await cookiesFactory();

  const usecase = new GetValueKeepSessionUseCase(storage);

  const keepSession = await usecase.execute();

  return keepSession;
}
