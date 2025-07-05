import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { RecoverPasswordSchemaType } from "@/infra/schemas/auth/recoverPassword.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export type RecoverPasswordProps = {
  recoverPassword: (
    input: RecoverPasswordSchemaType
  ) => Promise<HandleResponseDTO<RecoverPasswordSchemaType>>;
};

export type UseRecoverPasswordReturn = {
  register: UseFormRegister<RecoverPasswordSchemaType>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<
    RecoverPasswordSchemaType,
    unknown,
    RecoverPasswordSchemaType
  >;
  errors: FieldErrors<RecoverPasswordSchemaType>;
  isSubmitting: boolean;
};
