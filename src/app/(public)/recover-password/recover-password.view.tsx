"use client";

import { Input } from "@/components/ui/Input/input";
import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { Label } from "@/components/ui/Label/label";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { RecoverPasswordAuthDTO } from "@/domain/Auth/auth.dto";
import { RecoverPasswordSchemaType } from "@/infra/schemas/auth/recover-password.schema";
import { useFormState } from "react-dom";
import { recoverPassword } from "./recover-password.service";
import { useTriggerToastError } from "@/hooks/useTriggerToastError";
import { useEffect } from "react";
import { toast } from "sonner";
import { DomainMessageList } from "@/domain/core/Constants/domain-message-list.constants";

const initialState: HandleRequestDTO<
  RecoverPasswordAuthDTO,
  RecoverPasswordSchemaType
> = {
  errorSchema: {
    email: "",
  },
  error: "",
  success: false,
  triggerAt: 0,
};

export default function RecoverPasswordView() {
  const [state, action] = useFormState<
    HandleRequestDTO<RecoverPasswordAuthDTO, RecoverPasswordSchemaType>,
    FormData
  >(recoverPassword, initialState);

  useTriggerToastError({ state });

  useEffect(() => {
    if (state.success) {
      const messageSuccessfull =
        DomainMessageList.EMAIL_HAS_BEEN_SEND_TO_RECOVER_PASSWORD.replace(
          "{complement}",
          state?.data?.email || ""
        );
      toast.success(messageSuccessfull);
    }
  }, [state.data?.email, state.success]);

  return (
    <ManagementAccount titlePage="Recuperar Senha">
      <form
        action={action}
        className="w-full flex flex-col justify-center items-center gap-5"
      >
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <Label htmlFor="email" className="text-sm brightness-75 ml-1">
            Digite o seu e-mail
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
          />
        </div>
        <SubmitAuthButton title="Recuperar" />
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
