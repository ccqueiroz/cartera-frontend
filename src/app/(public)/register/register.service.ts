"use server";

import { ROUTES } from "@/infra/constants/routes.constants";
import { handleResponseFactory } from "@/infra/factories/handleResponse/handleReponse.factory";
import { httpInfraFactory } from "@/infra/factories/http/http.factory";
import { cookiesFactory } from "@/infra/factories/storage/cookies.factory";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { RegisterService } from "@/service/auth/register.service";
import { SignInService } from "@/service/auth/signin.service";
import { RegisterUseCase } from "@/usecase/auth/register.usecase";
import { SignInUseCase } from "@/usecase/auth/signin.usecase";
import { redirect } from "next/navigation";

export async function register({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterSchemaType) {
  const http = await httpInfraFactory();
  const service = new RegisterService(http.post);
  const usecase = new RegisterUseCase(handleResponseFactory, service);

  const registerAccount = await usecase.execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  if (!registerAccount.success) {
    return registerAccount;
  }

  const serviceLogin = new SignInService(http.post);
  const storage = await cookiesFactory();
  const usecaseLogin = new SignInUseCase(
    handleResponseFactory,
    serviceLogin,
    storage
  );

  const signin = await usecaseLogin.execute({
    email,
    password,
    keepSession: false,
  });

  if (!signin.success) {
    return signin;
  }

  redirect(ROUTES.PRIVATE.dashboard);
}
