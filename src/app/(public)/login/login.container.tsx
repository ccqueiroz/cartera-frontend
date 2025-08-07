"use client";

import dynamic from "next/dynamic";
import { useLogin } from "./hook/useLogin.hook";
import { LoginProps } from "./login.types";

const LoginView = dynamic(
  () => import("./login.view").then((mod) => mod.LoginView),
  {
    ssr: false,
  }
);

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
