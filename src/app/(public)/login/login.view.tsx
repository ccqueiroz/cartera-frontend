import { InputForm } from "@/app/components/core/inputForm/inputForm.component";
import { ManagementAccount } from "../views/managementAccount/managementAccount.view";
import { UseLoginReturn } from "./login.types";
import { Controller } from "react-hook-form";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.constants";
import { cn } from "@/app/lib/cn.utils";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submitAuthButton.component";

type LoginViewProps = UseLoginReturn;

export const LoginView = ({
  control,
  errors,
  isSubmitting,
  handleSubmit,
  register,
}: LoginViewProps) => {
  return (
    <ManagementAccount titlePage="Login">
      <form
        className="w-full flex flex-col justify-center items-center gap-5"
        onSubmit={handleSubmit}
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
};
