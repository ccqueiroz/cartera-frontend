import React from "react";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/app/utils/cn.utils";
import { Label } from "../../ui/label";
import { InputAlertError } from "../inputAlertError/inputAlertError.component";

interface CheckBoxFormProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  id: string;
  positionLabel?: "left" | "top" | "right";
  error?: string;
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameCheckbox?: string;
  classNameLabel?: string;
}

const labelTopPosition = "flex-col items-start gap-1";
const labelSidePosition = "items-center gap-2";
const labelLeftSidePosition = "flex-row justify-start";
const labelRightSidePosition = "flex-row-reverse justify-end";

export const CheckboxForm = React.forwardRef<
  React.ComponentRef<typeof Checkbox>,
  CheckBoxFormProps
>(
  (
    {
      id,
      label,
      error,
      positionLabel = "right",
      classNameWrapper,
      classNameCheckbox,
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
        <div
          className={cn(
            "w-full flex",
            classNameWrapper,
            positionLabel === "top" ? labelTopPosition : labelSidePosition,
            positionLabel === "left" ? labelLeftSidePosition : "",
            positionLabel === "right" ? labelRightSidePosition : ""
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
          <Checkbox
            ref={ref}
            id={id}
            className={cn(
              "rounded-[4px]",
              "data-[state=checked]:bg-neon-blue/20 data-[state=checked]:text-primary/90",
              "focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border-primary/30",
              classNameCheckbox
            )}
            {...props}
            aria-invalid={!!error}
          />
        </div>
        {error && <InputAlertError error={error} />}
      </div>
    );
  }
);

CheckboxForm.displayName = "CheckboxForm";
