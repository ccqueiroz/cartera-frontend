"use server";

import { recoverPasswordUseCaseFactory } from "@/factories/usecase/recover-password.factory";
import {
  RecoverPasswordSchemaType,
} from "@/infra/schemas/auth/recover-password.schema";

export async function recoverPassword({ email }: RecoverPasswordSchemaType) {
  const recover = await recoverPasswordUseCaseFactory().execute({
    email,
  });

  if (!recover.success) return recover;

  return { ...recover, data: { email } };
}
