import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export type LoginProps = {
  keepSessionCookieValue: boolean;
  signIn: (input: LoginSchemaType) => Promise<{
    success: false;
    error: string;
  }>;
};

export type UseLoginReturn = {
  register: UseFormRegister<LoginSchemaType>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<LoginSchemaType, unknown, LoginSchemaType>;
  errors: FieldErrors<LoginSchemaType>;
  isSubmitting: boolean;
};
