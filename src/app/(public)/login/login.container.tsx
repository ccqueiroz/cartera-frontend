"use client";

import { useLogin } from "./hook/useLogin.hook";
import { LoginProps } from "./login.types";
import { LoginView } from "./login.view";

export default function LoginContainer({
  keepSessionCookieValue,
  signIn,
}: LoginProps) {
  const { register, handleSubmit, control, errors, isSubmitting } = useLogin({
    keepSessionCookieValue,
    signIn,
  });

  return (
    <LoginView
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
