"use server";

import { RegisterAuthDTO } from "@/domain/Auth/auth.dto";
import {
  HandleRequestDTO,
  isErrorResponse,
} from "@/domain/core/Api/handle-request.dto";
import { registerUseCaseFactory } from "@/factories/usecase/register.factory";
import { signInUseCaseFactory } from "@/factories/usecase/signin.factory";
import { ROUTES } from "@/infra/constants/routes.contants";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/infra/schemas/auth/register.schema";
import { formatErrorsZod } from "@/infra/schemas/format-errors-zod.schema";
import { CookieServerStorage } from "@/infra/storage/cookies.server.storage.infra";
import { redirect } from "next/navigation";

export async function register(
  _: HandleRequestDTO<RegisterAuthDTO, RegisterSchemaType> | undefined,
  formData: FormData
) {
  const formDataValues = Object.fromEntries(formData) as Record<string, string>;

  const { email, password, confirmPassword, firstName, lastName } = {
    email: formDataValues.email ?? "",
    password: formDataValues.password ?? "",
    confirmPassword: formDataValues.confirmPassword ?? "",
    firstName: formDataValues.firstName ?? "",
    lastName: formDataValues.lastName ?? "",
  };

  const emptyErrorSchema: RegisterSchemaType = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  const parsed = registerSchema.safeParse({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  if (!parsed.success) {
    const errorSchema = formatErrorsZod(parsed.error) as RegisterSchemaType;

    return {
      success: false,
      error: "",
      errorSchema,
    } satisfies HandleRequestDTO<RegisterAuthDTO, RegisterSchemaType>;
  }

  const registerAccount = await registerUseCaseFactory().execute({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });

  if (!registerAccount.success) {
    return {
      ...registerAccount,
      errorSchema: emptyErrorSchema,
      triggerAt: new Date().getTime(),
    };
  }

  const sigin = await signInUseCaseFactory().execute({
    email,
    password,
    keepSession: false,
  });

  if (!sigin.success) {
    return {
      ...sigin,
      data: registerAccount.data,
      error: isErrorResponse(sigin) ? sigin.error : "",
      errorSchema: emptyErrorSchema,
      triggerAt: new Date().getTime(),
    } satisfies HandleRequestDTO<RegisterAuthDTO>;
  }

  redirect(ROUTES.PRIVATE.dashboard);
}
