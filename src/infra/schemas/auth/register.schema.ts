import { z } from "zod";
import { MESSAGES_SCHEMA_VALIDATIONS } from "../constants/messages-validations.schema";

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD })
      .email(MESSAGES_SCHEMA_VALIDATIONS.INVALID_EMAIL),
    firstName: z.string({
      required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD,
    }),
    lastName: z.string({
      required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD,
    }),
    password: z
      .string({ required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD })
      .min(6, MESSAGES_SCHEMA_VALIDATIONS.MIN_LENGTH_PASSWORD),
    confirmPassword: z
      .string({ required_error: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD })
      .min(6, MESSAGES_SCHEMA_VALIDATIONS.MIN_LENGTH_PASSWORD),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      MESSAGES_SCHEMA_VALIDATIONS.confirmPassword_MUST_TO_BE_EQUAL_TO_PASSWORD,
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = Record<
  keyof z.infer<typeof registerSchema>,
  string
>;
