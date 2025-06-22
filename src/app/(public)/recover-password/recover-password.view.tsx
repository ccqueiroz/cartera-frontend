"use client";

import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";
import {
  recoverPasswordSchema,
  RecoverPasswordSchemaType,
} from "@/infra/schemas/auth/recover-password.schema";
import { recoverPassword } from "./recover-password.service";
import { toast } from "sonner";
import { DomainMessageList } from "@/domain/core/Constants/domain-message-list.constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputForm } from "@/components/core/InputForm/input-form.component";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RecoverPasswordView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecoverPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onSubmit: SubmitHandler<RecoverPasswordSchemaType> = async (data) => {
    const recover = await recoverPassword({ ...data });

    if (!recover.success) {
      toast.error(recover.error);
      return;
    }

    const messageSuccessfull =
      DomainMessageList.EMAIL_HAS_BEEN_SEND_TO_RECOVER_PASSWORD.replace(
        "{complement}",
        recover?.data?.email || ""
      );

    toast.success(messageSuccessfull);

    reset();
  };

  return (
    <ManagementAccount titlePage="Recuperar Senha">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center gap-5"
      >
        <InputForm
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite o seu e-mail"
          autoComplete="off"
          {...register("email", { required: true })}
          error={errors.email?.message}
        />
        <SubmitAuthButton title="Recuperar" isSubmitting={isSubmitting} />
        <div className="w-full flex flex-col items-center gap-2">
          <Link
            href={ROUTES.PUBLIC.login}
            className={cn(
              "text-sm brightness-75 cursor-pointer transition-all duration-300 ease-linear bg-gradient-neon bg-clip-text",
              "hover:bg-gradient-neon hover:bg-clip-text hover:text-transparent hover:bg-35% hover:brightness-100"
            )}
          >
            Já possui conta? Logar.
          </Link>
          <Link
            href={ROUTES.PUBLIC.home}
            className={cn(
              "text-sm brightness-75 cursor-pointer",
              "hover:brightness-100"
            )}
          >
            Voltar para Home.
          </Link>
        </div>
      </form>
    </ManagementAccount>
  );
}
