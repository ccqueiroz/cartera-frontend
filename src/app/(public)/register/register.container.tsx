"use client";

import { useRegister } from "./hook/useRegister.hook";
import { RegisterProps } from "./register.types";
import { RegisterView } from "./register.view";

export default function RegisterContainer({ registerServer }: RegisterProps) {
  const { register, handleSubmit, control, errors, isSubmitting } = useRegister(
    {
      registerServer,
    }
  );

  return (
    <RegisterView
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
