import { renderHook } from "@testing-library/react";
import { useTriggerToastError } from "./useTriggerToastError";
import { toast } from "sonner";
import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("useTriggerToastError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should trigger toast.error when there is an error and triggerAt changes", () => {
    const state = {
      success: false,
      error: "Credenciais inválidas",
      errorSchema: {},
      triggerAt: Date.now(),
    };

    const { rerender } = renderHook(
      ({ state }) => useTriggerToastError({ state }),
      { initialProps: { state } }
    );

    expect(toast.error).toHaveBeenCalledWith("Credenciais inválidas");

    const newState = {
      ...state,
      error: "Error interno no servidor",
      triggerAt: Date.now() + 1000,
    };

    rerender({ state: newState });

    expect(toast.error).toHaveBeenCalledTimes(2);
    expect(toast.error).toHaveBeenCalledWith("Error interno no servidor");
  });

  it("should not trigger toast if error is empty", () => {
    const state = {
      success: false,
      error: "",
      errorSchema: {},
      triggerAt: Date.now(),
    };

    renderHook(() => useTriggerToastError({ state }));

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should not trigger toast if triggerAt does not change", () => {
    const state = {
      success: false,
      error: "Error",
      errorSchema: {},
      triggerAt: Date.now(),
    };

    const { rerender } = renderHook(
      ({ state }) => useTriggerToastError({ state }),
      { initialProps: { state } }
    );

    expect(toast.error).toHaveBeenCalledWith("Error");

    rerender({ state });

    expect(toast.error).toHaveBeenCalledTimes(1);
  });

  it("should not trigger toast if error is undefined", () => {
    const state = {
      success: false,
      error: undefined,
      errorSchema: {},
      triggerAt: Date.now(),
    } as unknown as HandleRequestDTO<unknown> & {
      triggerAt?: number | undefined;
      error?: string | undefined;
    };

    renderHook(() => useTriggerToastError({ state }));

    expect(toast.error).not.toHaveBeenCalled();
  });
});
