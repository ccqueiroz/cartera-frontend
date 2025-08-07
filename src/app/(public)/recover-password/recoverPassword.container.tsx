"use client";

import dynamic from "next/dynamic";
import { useRecoverPassword } from "./hook/useRecoverPassword.hook";
import { RecoverPasswordProps } from "./recoverPassword.types";

const RecoverPasswordView = dynamic(
  () => import("./recoverPassword.view").then((mod) => mod.RecoverPasswordView),
  {
    ssr: false,
  }
);

export default function RecoverPasswordContainer({
  recoverPassword,
}: RecoverPasswordProps) {
  const { register, handleSubmit, errors, isSubmitting, control } =
    useRecoverPassword({
      recoverPassword,
    });

  return (
    <RecoverPasswordView
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
