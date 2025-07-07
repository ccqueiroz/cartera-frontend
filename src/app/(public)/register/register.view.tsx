import { InputForm } from "@/app/components/core/inputForm/inputForm.component";
import { UseRegisterReturn } from "./register.types";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submitAuthButton.component";
import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.constants";
import { cn } from "@/app/utils/cn.utils";
import { ManagementAccount } from "../views/managementAccount/managementAccount.view";

type RegisterViewProps = UseRegisterReturn;

export const RegisterView = ({
  errors,
  isSubmitting,
  handleSubmit,
  register,
}: RegisterViewProps) => {
  return (
    <ManagementAccount titlePage="Criar Conta" className="max-w-3xl">
      <form
        onSubmit={handleSubmit}
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
};
