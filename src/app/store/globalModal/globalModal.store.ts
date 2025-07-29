import { ModalProps } from "@/app/_providers/modal/modal.types";
import { makeAutoObservable } from "mobx";

export class GlobalModalStore {
  open: boolean = false;
  props: ModalProps | null = null;
  disableBtnSuccess = false;
  isFetchingBtnSuccess = true;

  constructor() {
    makeAutoObservable(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDisableBtnSuccess = this.handleDisableBtnSuccess.bind(this);
    this.handleIsFetchingBtnSuccess =
      this.handleIsFetchingBtnSuccess.bind(this);
  }

  openModal(props: ModalProps) {
    this.open = true;
    this.props = props;
    if (props?.states?.btnSuccessStartDesabled) {
      this.disableBtnSuccess = props?.states?.btnSuccessStartDesabled;
    }
  }

  closeModal(open: boolean) {
    if (
      this.props?.states?.handleCloseModal &&
      typeof this.props?.states.handleCloseModal === "function"
    ) {
      this.props?.states.handleCloseModal();
    }
    this.open = open;
  }

  handleDisableBtnSuccess(disabled: boolean) {
    this.disableBtnSuccess = disabled;
  }

  handleIsFetchingBtnSuccess(fetching: boolean) {
    this.isFetchingBtnSuccess = fetching;
  }
}

export const globalModalStore = new GlobalModalStore();
