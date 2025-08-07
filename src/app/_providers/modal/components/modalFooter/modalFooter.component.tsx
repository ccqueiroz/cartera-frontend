import { Button } from "@/app/components/core/button/button.component";
import { DialogFooter } from "@/app/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  HandleModalActions,
  ModalFooterProps as ModalFooterPropsByTypes,
} from "../../modal.types";
import { ButtonConfirmAction } from "./buttonConfirmAction/buttonConfirmAction.component";
import { memo } from "react";

type ModalFooterProps = ModalFooterPropsByTypes & {
  handleSuccessAction?: HandleModalActions;
  disabledBtnConfirmAction?: boolean;
  isFetchingBtnConfirmAction?: boolean;
};

const ModalFooter = memo(
  ({
    btnCancelAction,
    btnConfirmAction,
    handleSuccessAction,
    disabledBtnConfirmAction,
    isFetchingBtnConfirmAction,
  }: ModalFooterProps) => {
    return (
      <DialogFooter className="justify-end gap-3 flex-col sm:flex-row">
        {btnCancelAction && (
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="button"
              size="lg"
              className="w-full sm:max-w-[120px] text-md"
            >
              {btnCancelAction}
            </Button>
          </DialogClose>
        )}
        {btnConfirmAction?.children && (
          <ButtonConfirmAction
            form={btnConfirmAction.form}
            handleSuccessActionProp={handleSuccessAction}
            disabledBtnConfirmAction={disabledBtnConfirmAction}
            isFetchingBtnConfirmAction={isFetchingBtnConfirmAction}
          >
            {btnConfirmAction.children}
          </ButtonConfirmAction>
        )}
      </DialogFooter>
    );
  }
);

ModalFooter.displayName = "ModalFooter";

export { ModalFooter };
