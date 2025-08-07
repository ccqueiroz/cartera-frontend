"use client";

import dynamic from "next/dynamic";
import { useRegister } from "./hook/useRegister.hook";
import { RegisterProps } from "./register.types";

const RegisterView = dynamic(
  () => import("./register.view").then((mod) => mod.RegisterView),
  {
    ssr: false,
  }
);

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
