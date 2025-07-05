import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export type RegisterProps = {
  registerServer: (input: RegisterSchemaType) => Promise<{
    success: false;
    error: string;
  }>;
};

export type UseRegisterReturn = {
  register: UseFormRegister<RegisterSchemaType>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<RegisterSchemaType, unknown, RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
  isSubmitting: boolean;
};
