import React from "react";
import { Select } from "../select/select.component";
import { InputAlertError } from "../inputAlertError/inputAlertError.component";
import { Label } from "../../ui/label";
import { cn } from "@/app/utils/cn.utils";

interface SelectFormProps extends React.ComponentProps<typeof Select> {
  id: string;
  error?: string;
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameLabel?: string;
}

export const SelectForm = React.forwardRef<HTMLButtonElement, SelectFormProps>(
  (
    {
      id,
      error,
      label,
      classNameWrapper,
      classNameLabel,
      classNameSelectTrigger,
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
        <Select
          id={id}
          ref={ref}
          classNameSelectTrigger={classNameSelectTrigger}
          {...props}
        />

        {error && <InputAlertError error={error} />}
      </div>
    );
  }
);

SelectForm.displayName = "SelectForm";
