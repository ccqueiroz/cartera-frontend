import { RegisterProps } from "../register.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/infra/schemas/auth/register.schema";

type useRegisterProps = RegisterProps;

export const useRegister = ({ registerServer }: useRegisterProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    const response = await registerServer({ ...data });

    if (!response?.success && response?.error) {
      toast.error(response?.error);
      return;
    }

    reset();
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    control,
    errors,
    isSubmitting,
  };
};
