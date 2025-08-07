"use client";

import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { ModalHeader } from "./components/modalHeader/modalHeader.component";
import { ModalFooter } from "./components/modalFooter/modalFooter.component";
import { ModalContent } from "./components/modalContent/modalContent.components";
import { observer } from "mobx-react-lite";
import { globalModalStore } from "@/app/store/globalModal/globalModal.store";
import React, { createElement } from "react";

export const ModalView = observer(() => {
  const modalStore = globalModalStore;

  if (!modalStore.props) return <></>;

  return (
    <Dialog open={modalStore.open} onOpenChange={modalStore.closeModal}>
      <DialogContent>
        {modalStore.props.header && (
          <ModalHeader
            title={modalStore.props.header.title}
            className={modalStore.props.header.className}
            description={modalStore.props.header.description}
          />
        )}
        {modalStore.props.content && (
          <ModalContent>{createElement(modalStore.props.content)}</ModalContent>
        )}
        {modalStore.props.footer && (
          <ModalFooter
            btnConfirmAction={modalStore.props.footer.btnConfirmAction}
            btnCancelAction={modalStore.props.footer.btnCancelAction}
            handleSuccessAction={modalStore.props?.actions?.handleSuccessAction}
            disabledBtnConfirmAction={modalStore.disableBtnSuccess}
            isFetchingBtnConfirmAction={modalStore.isFetchingBtnSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});
