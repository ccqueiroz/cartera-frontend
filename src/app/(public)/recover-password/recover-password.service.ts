"use server";

import { RecoverPasswordAuthDTO } from "@/domain/Auth/auth.dto";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { recoverPasswordUseCaseFactory } from "@/factories/usecase/recover-password.factory";
import {
  recoverPasswordSchema,
  RecoverPasswordSchemaType,
} from "@/infra/schemas/auth/recover-password.schema";
import { formatErrorsZod } from "@/infra/schemas/format-errors-zod.schema";

export async function recoverPassword(
  _:
    | HandleRequestDTO<RecoverPasswordAuthDTO, RecoverPasswordSchemaType>
    | undefined,
  formData: FormData
) {
  const formDataValues = Object.fromEntries(formData) as Record<string, string>;

  const { email } = {
    email: formDataValues.email ?? "",
  };

  const emptyErrorSchema: RecoverPasswordSchemaType = {
    email: "",
  };

  const parsed = recoverPasswordSchema.safeParse({ email });

  if (!parsed.success) {
    const errorSchema = formatErrorsZod(
      parsed.error
    ) as RecoverPasswordSchemaType;

    return {
      success: false,
      error: "",
      errorSchema,
    } satisfies HandleRequestDTO<
      RecoverPasswordAuthDTO,
      RecoverPasswordSchemaType
    >;
  }

  const recover = await recoverPasswordUseCaseFactory().execute({
    ...parsed.data,
  });

  if (!recover.success) {
    return {
      ...recover,
      errorSchema: emptyErrorSchema,
      triggerAt: new Date().getTime(),
    };
  }

  return {
    ...recover,
    error: "",
    errorSchema: emptyErrorSchema,
    triggerAt: new Date().getTime(),
  } satisfies HandleRequestDTO<
    RecoverPasswordAuthDTO,
    RecoverPasswordSchemaType
  >;
}
