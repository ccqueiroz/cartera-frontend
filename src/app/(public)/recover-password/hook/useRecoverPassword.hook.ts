import {
  recoverPasswordSchema,
  RecoverPasswordSchemaType,
} from "@/infra/schemas/auth/recoverPassword.schema";
import { RecoverPasswordProps } from "../recoverPassword.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";

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

    if (response.success && response.data?.email) {
      toast.success(
        DomainMessageList.EMAIL_HAS_BEEN_SEND_TO_RECOVER_PASSWORD.replace(
          "{complement}",
          response.data.email
        )
      );
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
