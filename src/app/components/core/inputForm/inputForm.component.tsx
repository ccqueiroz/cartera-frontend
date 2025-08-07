import { cn } from "@/app/utils/cn.utils";
import React, { memo } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { InputAlertError } from "../inputAlertError/inputAlertError.component";

interface InputFormProps extends React.ComponentProps<"input"> {
  id: string;
  error?: string;
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameInput?: string;
  classNameLabel?: string;
}

export const InputForm = memo(
  React.forwardRef<HTMLInputElement, InputFormProps>(
    (
      {
        id,
        error,
        label,
        classNameWrapper,
        classNameInput,
        classNameLabel,
        ...props
      },
      ref
    ) => {
      return (
        <div
          className={cn(
            "w-full flex flex-col items-start gap-1",
            classNameWrapper
          )}
        >
          {label && (
            <Label
              htmlFor={id}
              className={cn("text-sm brightness-75 ml-1", classNameLabel)}
            >
              {label}
            </Label>
          )}
          <Input
            ref={ref}
            id={id}
            className={cn(classNameInput)}
            {...props}
            aria-invalid={!!error}
          />
          {error && <InputAlertError error={error} />}
        </div>
      );
    }
  )
);

InputForm.displayName = "InputForm";
