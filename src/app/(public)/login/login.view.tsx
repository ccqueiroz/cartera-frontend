"use client";

import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { Switch } from "@/components/ui/Switch/switch";
import { Label } from "@/components/ui/Label/label";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { signIn } from "./login.service";
import { useFormState } from "react-dom";
import {
  HandleRequestDTO,
  isErrorResponse,
} from "@/domain/core/Api/handle-request.dto";
import { AuthDTO } from "@/domain/Auth/auth.dto";
import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { InputForm } from "@/components/core/InputForm/input-form.component";
import { useTriggerToastError } from "@/hooks/useTriggerToastError";
import { useState } from "react";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";

const initialState: HandleRequestDTO<AuthDTO, LoginSchemaType> = {
  errorSchema: {
    email: "",
    password: "",
    keepSession: "",
  },
  error: "",
  success: false,
  triggerAt: 0,
};

export default function LoginView({
  keepSessionCookieValue,
}: {
  keepSessionCookieValue: boolean;
}) {
  const [state, action] = useFormState<
    HandleRequestDTO<AuthDTO, LoginSchemaType>,
    FormData
  >(signIn, initialState);

  const [keepSession, setKeepSession] = useState(keepSessionCookieValue);

  useTriggerToastError({ state });

  return (
    <ManagementAccount titlePage="Login">
      <form
        className="w-full flex flex-col justify-center items-center gap-5"
        action={action}
      >
        <InputForm
          id="email"
          label="E-mail"
          name="email"
          type="email"
          placeholder="Digite o seu e-mail"
          autoComplete="off"
          error={
            isErrorResponse<AuthDTO, LoginSchemaType>(state) &&
            state.errorSchema.email
              ? state.errorSchema.email
              : undefined
          }
        />
        <InputForm
          id="password"
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite a sua senha"
          autoComplete="off"
          error={
            isErrorResponse<AuthDTO, LoginSchemaType>(state) &&
            state.errorSchema.password
              ? state.errorSchema.password
              : undefined
          }
        />
        <div className="w-full flex flex-col items-center gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-row items-center justify-between space-x-1">
            <Switch
              className="scale-[0.8]"
              id="keepSession"
              checked={keepSession}
              onCheckedChange={setKeepSession}
            />
            <Label htmlFor="keepSession" className="text-sm brightness-75">
              Continuar conectado
            </Label>
            <input
              type="hidden"
              name="keepSession"
              value={keepSession ? 1 : 0}
            />
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
        <SubmitAuthButton title="Login" />
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
