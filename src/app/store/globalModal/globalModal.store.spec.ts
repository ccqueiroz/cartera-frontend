import { GlobalModalStore } from "./globalModal.store";
import { ModalProps } from "@/app/_providers/modal/modal.types";

describe("GlobalModalStore", () => {
  let store: GlobalModalStore;

  beforeEach(() => {
    store = new GlobalModalStore();
  });

  it("should initialize with default values", () => {
    expect(store.open).toBe(false);
    expect(store.props).toBeNull();
    expect(store.disableBtnSuccess).toBe(false);
    expect(store.isFetchingBtnSuccess).toBe(true);
  });

  it("should open modal and set props", () => {
    const props: ModalProps = {
      header: { title: "Test Modal" },
    };

    store.openModal(props);

    expect(store.open).toBe(true);
    expect(store.props).toEqual(props);
    expect(store.disableBtnSuccess).toBe(false);
  });

  it("should open modal and set disableBtnSuccess if provided", () => {
    const props: ModalProps = {
      states: { btnSuccessStartDesabled: true },
    };

    store.openModal(props);

    expect(store.open).toBe(true);
    expect(store.disableBtnSuccess).toBe(true);
  });

  it("should close modal without calling handleCloseModal if not provided", () => {
    store.openModal({});

    const spy = jest.fn();
    store.props!.states = { handleCloseModal: undefined };

    store.closeModal(false);

    expect(spy).not.toHaveBeenCalled();
    expect(store.open).toBe(false);
  });

  it("should call handleCloseModal when closing modal if provided", () => {
    const handleCloseModal = jest.fn();
    store.openModal({
      states: { handleCloseModal },
    });

    store.closeModal(false);

    expect(handleCloseModal).toHaveBeenCalled();
    expect(store.open).toBe(false);
  });

  it("should update disableBtnSuccess state", () => {
    store.handleDisableBtnSuccess(true);
    expect(store.disableBtnSuccess).toBe(true);

    store.handleDisableBtnSuccess(false);
    expect(store.disableBtnSuccess).toBe(false);
  });

  it("should update isFetchingBtnSuccess state", () => {
    store.handleIsFetchingBtnSuccess(false);
    expect(store.isFetchingBtnSuccess).toBe(false);

    store.handleIsFetchingBtnSuccess(true);
    expect(store.isFetchingBtnSuccess).toBe(true);
  });
});
