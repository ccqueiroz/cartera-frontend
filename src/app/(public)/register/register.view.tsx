"use client";

import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/infra/schemas/auth/register.schema";
import { register as onRegister } from "./register.service";
import { InputForm } from "@/components/core/InputForm/input-form.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function RegisterView() {
  const {
    register,
    handleSubmit,
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
    const registerAction = await onRegister({ ...data });

    if (!registerAction.success) {
      toast.error(registerAction.error);
      return;
    }

    reset();
  };

  return (
    <ManagementAccount titlePage="Criar Conta" className="max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center gap-5"
      >
        <InputForm
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite o seu e-mail"
          {...register("email", { required: true })}
          error={errors.email?.message}
        />
        <div className="w-full flex flex-col sm:flex-row gap-5">
          <InputForm
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
            {...register("password", { required: true })}
            error={errors.password?.message}
          />
          <InputForm
            id="confirmPassword"
            label="Confirma a senha"
            type="password"
            placeholder="Digite a sua senha"
            {...register("confirmPassword", { required: true })}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-5">
          <InputForm
            id="firstName"
            label="Primeiro nome"
            placeholder="Digite o seu primeiro nome"
            {...register("firstName", { required: true })}
            error={errors.firstName?.message}
          />

          <InputForm
            id="lastName"
            label="Último nome"
            placeholder="Digite o seu último nome"
            {...register("lastName", { required: true })}
            error={errors.lastName?.message}
          />
        </div>
        <SubmitAuthButton title="Registrar" isSubmitting={isSubmitting} />
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
