import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./useMobile.hook";

function createMatchMedia(width: number): typeof window.matchMedia {
  return (query: string) => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    const mql = {
      matches: width < 600,
      media: query,
      onchange: null,
      addEventListener: (
        event: string,
        callback: (e: MediaQueryListEvent) => void
      ) => {
        if (event === "change") listeners.push(callback);
      },
      removeEventListener: (
        event: string,
        callback: (e: MediaQueryListEvent) => void
      ) => {
        if (event === "change") {
          const index = listeners.indexOf(callback);
          if (index > -1) listeners.splice(index, 1);
        }
      },
      dispatchEvent: (event: MediaQueryListEvent) => {
        listeners.forEach((listener) => listener(event));
        return true;
      },
    };

    return mql as unknown as MediaQueryList;
  };
}

describe("use is mobile hook", () => {
  const originalMatchMedia = window.matchMedia;
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("should return true when width is less than 600", () => {
    window.innerWidth = 500;
    window.matchMedia = createMatchMedia(500);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should return false when width is 600 or more", () => {
    window.innerWidth = 800;
    window.matchMedia = createMatchMedia(800);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should respond to matchMedia change", () => {
    let width = 700;
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    window.innerWidth = width;
    window.matchMedia = (query: string) => {
      return {
        matches: width < 600,
        media: query,
        addEventListener: (
          _event: string,
          callback: (e: MediaQueryListEvent) => void
        ) => {
          listeners.push(callback);
        },
        removeEventListener: (
          _event: string,
          callback: (e: MediaQueryListEvent) => void
        ) => {
          const index = listeners.indexOf(callback);
          if (index >= 0) listeners.splice(index, 1);
        },
        dispatchEvent: () => true,
      } as unknown as MediaQueryList;
    };

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      width = 500;
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: width,
      });

      listeners.forEach((callback) =>
        callback({ matches: true } as MediaQueryListEvent)
      );
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listener on unmount", () => {
    const removeListener = jest.fn();
    const addListener = jest.fn(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_: string, __: (e: MediaQueryListEvent) => void) => {}
    );

    window.matchMedia = () =>
      ({
        matches: false,
        addEventListener: addListener,
        removeEventListener: removeListener,
        media: "(max-width: 599px)",
      } as unknown as MediaQueryList);

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeListener).toHaveBeenCalled();
  });
});
