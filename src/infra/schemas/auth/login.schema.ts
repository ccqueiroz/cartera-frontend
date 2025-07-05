import { z } from "zod";
import { MESSAGES_SCHEMA_VALIDATIONS } from "../constants/messages-validations.schema";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
    .email(MESSAGES_SCHEMA_VALIDATIONS.INVALID_EMAIL),
  password: z
    .string()
    .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
    .min(6, MESSAGES_SCHEMA_VALIDATIONS.MIN_LENGTH_PASSWORD),
  keepSession: z.coerce.boolean(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
