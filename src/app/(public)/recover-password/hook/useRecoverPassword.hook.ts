import {
  recoverPasswordSchema,
  RecoverPasswordSchemaType,
} from "@/infra/schemas/auth/recoverPassword.schema";
import { RecoverPasswordProps } from "../recoverPassword.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type UseRecoverPassword = RecoverPasswordProps;

export const useRecoverPassword = ({ recoverPassword }: UseRecoverPassword) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecoverPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onSubmit: SubmitHandler<RecoverPasswordSchemaType> = async (data) => {
    const response = await recoverPassword({ ...data });

    if (!response?.success && response?.error) {
      toast.error(response?.error);
      return;
    }

    reset();
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isSubmitting,
    control,
  };
};
