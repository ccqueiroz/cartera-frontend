import {
  loginSchema,
  LoginSchemaType,
} from "@/infra/schemas/auth/login.schema";
import { LoginProps } from "../login.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type useLoginProps = LoginProps;

export const useLogin = ({ keepSessionCookieValue, signIn }: useLoginProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      keepSession: keepSessionCookieValue,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    const signin = await signIn({ ...data });

    if (!signin?.success && signin?.error) {
      toast.error(signin?.error);
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
