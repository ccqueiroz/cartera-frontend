import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./use-debouce.hook";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should call callback after delay", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current.debounce();
    });

    expect(callback).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should reset timer if debounce is called again before delay", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current.debounce();
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    act(() => {
      result.current.debounce();
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback if cancel is called before delay", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current.debounce();
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    act(() => {
      result.current.cancel();
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).not.toBeCalled();
  });

  it("should allow multiple debounce calls with proper execution", () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current.debounce();
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.debounce();
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
