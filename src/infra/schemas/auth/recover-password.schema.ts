import { z } from "zod";
import { MESSAGES_SCHEMA_VALIDATIONS } from "../constants/messages-validations.schema";

export const recoverPasswordSchema = z.object({
  email: z
    .string({ required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD })
    .email(MESSAGES_SCHEMA_VALIDATIONS.INVALID_EMAIL),
});

export type RecoverPasswordSchemaType = z.infer<typeof recoverPasswordSchema>;
