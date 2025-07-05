import { ButtonProps, ButtonUi } from "../../ui/button";
import * as React from "react";

export type VariantType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quartenary"
  | "destructive"
  | "link";

export interface ButtonCoreProps extends Omit<ButtonProps, "variant"> {
  variant: VariantType;
}

const selectedVariant = (variant: VariantType): ButtonProps["variant"] => {
  switch (variant) {
    case "quartenary":
      return "outline";
    default:
      return variant ?? "primary";
  }
};

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonCoreProps>(({ ...props }, ref) => {
    return (
      <ButtonUi ref={ref} {...props} variant={selectedVariant(props.variant)} />
    );
  })
);

Button.displayName = "Button";

export { Button };
