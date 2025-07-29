import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";
import {
  BtnConfirmActionProps,
  HandleModalActions,
} from "../../../modal.types";
import { useCallback } from "react";

type ButtonConfirmActionProps = BtnConfirmActionProps & {
  handleSuccessActionProp?: HandleModalActions;
  disabledBtnConfirmAction?: boolean;
  isFetchingBtnConfirmAction?: boolean;
};

export const ButtonConfirmAction = ({
  children,
  form,
  handleSuccessActionProp,
  disabledBtnConfirmAction,
  isFetchingBtnConfirmAction,
}: ButtonConfirmActionProps) => {
  const handleSuccessAction = useCallback(() => {
    return form.type === "button" &&
      typeof handleSuccessActionProp === "function"
      ? handleSuccessActionProp()
      : undefined;
  }, [form.type, handleSuccessActionProp]);

  return (
    <NeonButton
      type={form.type}
      variant="blue"
      form={form.idForm}
      size="lg"
      className="w-full sm:max-w-[120px]"
      onClick={handleSuccessAction}
      disabled={disabledBtnConfirmAction}
      isLoading={isFetchingBtnConfirmAction}
    >
      {children}
    </NeonButton>
  );
};
