"use server";

import { signInUseCaseFactory } from "@/factories/usecase/signin.factory";
import { ROUTES } from "@/infra/constants/routes.contants";
import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { redirect } from "next/navigation";

export async function signIn({
  email,
  password,
  keepSession,
}: LoginSchemaType) {
  const signin = await signInUseCaseFactory().execute({
    email,
    password,
    keepSession,
  });

  if (!signin.success) {
    return signin;
  }

  redirect(ROUTES.PRIVATE.dashboard);
}
