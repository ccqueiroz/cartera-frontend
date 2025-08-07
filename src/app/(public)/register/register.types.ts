import { AuthDTO } from "@/domain/auth/auth.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export type RegisterProps = {
  registerServer: (
    input: RegisterSchemaType
  ) => Promise<HandleResponseDTO<AuthDTO>>;
};

export type UseRegisterReturn = {
  register: UseFormRegister<RegisterSchemaType>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<RegisterSchemaType, unknown, RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
  isSubmitting: boolean;
};
