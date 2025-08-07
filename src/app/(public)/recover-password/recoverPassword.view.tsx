import { ROUTES } from "@/infra/constants/routes.constants";
import { UseRecoverPasswordReturn } from "./recoverPassword.types";
import { cn } from "@/app/utils/cn.utils";
import Link from "next/link";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submitAuthButton.component";
import { InputForm } from "@/app/components/core/inputForm/inputForm.component";
import { ManagementAccount } from "../views/managementAccount/managementAccount.view";

type RecoverPasswordViewProps = UseRecoverPasswordReturn;

export const RecoverPasswordView = ({
  errors,
  isSubmitting,
  handleSubmit,
  register,
}: RecoverPasswordViewProps) => {
  return (
    <ManagementAccount titlePage="Recuperar Senha">
      <form
        onSubmit={handleSubmit}
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
};
