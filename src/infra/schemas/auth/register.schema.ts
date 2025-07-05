import { z } from "zod";
import { MESSAGES_SCHEMA_VALIDATIONS } from "../constants/messages-validations.schema";

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
      .email(MESSAGES_SCHEMA_VALIDATIONS.INVALID_EMAIL),
    firstName: z
      .string()
      .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
      .regex(
        /^[A-Za-z]+$/i,
        MESSAGES_SCHEMA_VALIDATIONS.ONLY_LETTERS_ARE_ALLOWED
      ),
    lastName: z
      .string()
      .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
      .regex(
        /^[A-Za-z]+$/i,
        MESSAGES_SCHEMA_VALIDATIONS.ONLY_LETTERS_ARE_ALLOWED
      ),
    password: z
      .string()
      .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
      .min(6, MESSAGES_SCHEMA_VALIDATIONS.MIN_LENGTH_PASSWORD),
    confirmPassword: z
      .string()
      .nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD)
      .min(6, MESSAGES_SCHEMA_VALIDATIONS.MIN_LENGTH_PASSWORD),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message:
      MESSAGES_SCHEMA_VALIDATIONS.CONFIRM_PASSWORD_MUST_TO_BE_EQUAL_TO_PASSWORD,
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
