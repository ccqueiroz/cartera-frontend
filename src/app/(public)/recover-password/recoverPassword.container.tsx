"use client";

import { useRecoverPassword } from "./hook/useRecoverPassword.hook";
import { RecoverPasswordProps } from "./recoverPassword.types";
import { RecoverPasswordView } from "./recoverPassword.view";

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
