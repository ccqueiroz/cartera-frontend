import { RegisterProps } from "../register.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/infra/schemas/auth/register.schema";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/infra/constants/routes.constants";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";

type useRegisterProps = RegisterProps;

export const useRegister = ({ registerServer }: useRegisterProps) => {
  const router = useRouter();

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

    toast.success(DomainMessageList.SUCCESS_REGISTERED_ACCOUNT);

    router.push(ROUTES.PRIVATE.dashboard);

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
