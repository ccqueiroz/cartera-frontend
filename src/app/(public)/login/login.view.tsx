"use client";

import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { Switch } from "@/components/ui/Switch/switch";
import { Label } from "@/components/ui/Label/label";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { signIn } from "./login.service";
import {
  loginSchema,
  LoginSchemaType,
} from "@/infra/schemas/auth/login.schema";
import { InputForm } from "@/components/core/InputForm/input-form.component";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function LoginView({
  keepSessionCookieValue,
}: {
  keepSessionCookieValue: boolean;
}) {
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

    if (!signin.success) {
      toast.error(signin.error);
      return;
    }

    reset();
  };

  return (
    <ManagementAccount titlePage="Login">
      <form
        className="w-full flex flex-col justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
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
        <InputForm
          id="password"
          label="Senha"
          type="password"
          placeholder="Digite a sua senha"
          autoComplete="off"
          {...register("password", { required: true })}
          error={errors.password?.message}
        />
        <div className="w-full flex flex-col items-center gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-row items-center justify-between space-x-1">
            <Controller
              control={control}
              name="keepSession"
              render={({ field: { value, onChange, ...field } }) => (
                <Switch
                  className="scale-[0.8]"
                  id="keepSession"
                  checked={value}
                  onCheckedChange={onChange}
                  {...field}
                />
              )}
            />
            <Label htmlFor="keepSession" className="text-sm brightness-75">
              Continuar conectado
            </Label>
          </div>
          <div>
            <Link
              href={ROUTES.PUBLIC.recover_password}
              className={cn(
                "text-sm brightness-75 cursor-pointer",
                "hover:brightness-100"
              )}
            >
              Recuperar senha.
            </Link>
          </div>
        </div>
        <SubmitAuthButton title="Login" isSubmitting={isSubmitting} />
        <div className="w-full flex flex-col items-center gap-2">
          <Link
            href={ROUTES.PUBLIC.register_account}
            className={cn(
              "text-sm brightness-75 cursor-pointer transition-all duration-300 ease-linear bg-gradient-neon bg-clip-text",
              "hover:bg-gradient-neon hover:bg-clip-text hover:text-transparent hover:bg-35% hover:brightness-100"
            )}
          >
            Não possui conta? Registre-se.
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
