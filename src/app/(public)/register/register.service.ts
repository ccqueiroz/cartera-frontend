"use server";

import { registerUseCaseFactory } from "@/factories/usecase/register.factory";
import { signInUseCaseFactory } from "@/factories/usecase/signin.factory";
import { ROUTES } from "@/infra/constants/routes.contants";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { redirect } from "next/navigation";

export async function register({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterSchemaType) {
  const registerAccount = await registerUseCaseFactory().execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  if (!registerAccount.success) {
    return registerAccount;
  }

  const sigin = await signInUseCaseFactory().execute({
    email,
    password,
    keepSession: false,
  });

  if (!sigin.success) {
    return sigin;
  }

  redirect(ROUTES.PRIVATE.dashboard);
}
