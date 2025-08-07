export type ModalHeaderProps = {
  description?: React.ComponentType;
  title?: React.ReactNode;
  className?: string;
};

export type HandleModalActions = () => void;

export type BtnConfirmActionProps = {
  children: React.ReactNode;
  form:
    | { type: "button"; idForm: undefined }
    | { type: "submit"; idForm: string };
};

export type ModalFooterProps = {
  btnCancelAction?: React.ReactNode;
  btnConfirmAction?: BtnConfirmActionProps;
};

export type ModalActions = {
  handleSuccessAction?: HandleModalActions;
  handleCancelAction?: HandleModalActions;
};

export type ModalProps = {
  header?: ModalHeaderProps;
  content?: React.ComponentType;
  footer?: ModalFooterProps;
  actions?: ModalActions;
  states?: {
    handleCloseModal?: () => void;
    btnSuccessStartDesabled?: boolean;
  };
};
