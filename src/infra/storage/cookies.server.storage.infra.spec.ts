/**
 * @jest-environment node
 */

import { CookieServerStorage } from "./cookies.server.storage.infra";

describe("Cookies Server Storage", () => {
  const mockCookieStore = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };

  const storageMock = new CookieServerStorage(mockCookieStore as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should recover value from cookies", () => {
    mockCookieStore.get.mockReturnValue({
      value: JSON.stringify({ user: "john" }),
    });

    const result = storageMock.recover<{ user: string }>("session");

    expect(mockCookieStore.get).toHaveBeenCalledWith("session");
    expect(result).toEqual({ user: "john" });
  });

  it("should return null if cookie not found", () => {
    mockCookieStore.get.mockReturnValue(undefined);

    const result = storageMock.recover("cookies");

    expect(result).toBeNull();
  });

  it("should save value to cookies", () => {
    storageMock.save("KEY_THEME_COOKIE", "dark");

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "KEY_THEME_COOKIE",
      "dark",
      undefined
    );
  });

  it("should delete cookie", () => {
    storageMock.delete("auth-token");

    expect(mockCookieStore.delete).toHaveBeenCalledWith("auth-token");
  });
});
