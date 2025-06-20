"use server";

import { AuthDTO } from "@/domain/Auth/auth.dto";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { signInUseCaseFactory } from "@/factories/usecase/signin.factory";
import { ROUTES } from "@/infra/constants/routes.contants";
import {
  loginSchema,
  LoginSchemaType,
} from "@/infra/schemas/auth/login.schema";
import { formatErrorsZod } from "@/infra/schemas/format-errors-zod.schema";
import { redirect } from "next/navigation";

export async function signIn(
  _: HandleRequestDTO<AuthDTO, LoginSchemaType> | undefined,
  formData: FormData
) {
  const formDataValues = Object.fromEntries(formData) as Record<string, string>;

  const { email, password, keepSession } = {
    email: formDataValues.email ?? "",
    password: formDataValues.password ?? "",
    keepSession: +formDataValues.keepSession === 1,
  };

  const emptyErrorSchema: LoginSchemaType = {
    email: "",
    password: "",
    keepSession: "",
  };

  const parsed = loginSchema.safeParse({ email, password, keepSession });

  if (!parsed.success) {
    const errorSchema = formatErrorsZod(parsed.error) as LoginSchemaType;

    return {
      success: false,
      error: "",
      errorSchema,
    } satisfies HandleRequestDTO<AuthDTO, LoginSchemaType>;
  }

  const sigin = await signInUseCaseFactory().execute({
    ...parsed.data,
  });

  if (!sigin.success) {
    return {
      ...sigin,
      errorSchema: emptyErrorSchema,
      triggerAt: new Date().getTime(),
    };
  }

  redirect(ROUTES.PRIVATE.dashboard);
}
