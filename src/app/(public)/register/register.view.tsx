"use client";

import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.contants";
import { cn } from "@/lib/cn.utils";
import { ManagementAccount } from "../_views/managementAccount/management-account.view";
import { SubmitAuthButton } from "../components/SubmitAuthButton/submit-auth-button.component";
import {
  HandleRequestDTO,
  isErrorResponse,
} from "@/domain/core/Api/handle-request.dto";
import { RegisterAuthDTO } from "@/domain/Auth/auth.dto";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { useFormState } from "react-dom";
import { useTriggerToastError } from "@/hooks/useTriggerToastError";
import { register } from "./register.service";
import { InputForm } from "@/components/core/InputForm/input-form.component";

const initialState: HandleRequestDTO<RegisterAuthDTO, RegisterSchemaType> = {
  errorSchema: {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  },
  error: "",
  success: false,
  triggerAt: 0,
};

export default function RegisterView() {
  const [state, action] = useFormState<
    HandleRequestDTO<RegisterAuthDTO, RegisterSchemaType>,
    FormData
  >(register, initialState);

  useTriggerToastError({ state });

  return (
    <ManagementAccount titlePage="Criar Conta" className="max-w-3xl">
      <form
        action={action}
        className="w-full flex flex-col justify-center items-center gap-5"
      >
        <InputForm
          id="email"
          label="E-mail"
          name="email"
          type="email"
          placeholder="Digite o seu e-mail"
          error={
            isErrorResponse<RegisterAuthDTO, RegisterSchemaType>(state) &&
            state.errorSchema.email
              ? state.errorSchema.email
              : undefined
          }
        />
        <div className="w-full flex flex-col sm:flex-row gap-5">
          <InputForm
            id="password"
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
            error={
              isErrorResponse<RegisterAuthDTO, RegisterSchemaType>(state) &&
              state.errorSchema.password
                ? state.errorSchema.password
                : undefined
            }
          />
          <InputForm
            id="confirmPassword"
            name="confirmPassword"
            label="Confirma a senha"
            type="password"
            placeholder="Digite a sua senha"
            error={
              isErrorResponse<RegisterAuthDTO, RegisterSchemaType>(state) &&
              state.errorSchema.confirmPassword
                ? state.errorSchema.confirmPassword
                : undefined
            }
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-5">
          <InputForm
            id="firstName"
            name="firstName"
            label="Primeiro nome"
            placeholder="Digite o seu primeiro nome"
            error={
              isErrorResponse<RegisterAuthDTO, RegisterSchemaType>(state) &&
              state.errorSchema.firstName
                ? state.errorSchema.firstName
                : undefined
            }
          />

          <InputForm
            id="lastName"
            name="lastName"
            label="Último nome"
            placeholder="Digite o seu último nome"
            error={
              isErrorResponse<RegisterAuthDTO, RegisterSchemaType>(state) &&
              state.errorSchema.lastName
                ? state.errorSchema.lastName
                : undefined
            }
          />
        </div>
        <SubmitAuthButton title="Registrar" />
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
