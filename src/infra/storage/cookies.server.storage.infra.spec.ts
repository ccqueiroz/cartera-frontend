/**
 * @jest-environment node
 */

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CookieServerStorage } from "./cookies.server.storage.infra";

let mockCookieStore: jest.Mocked<ReadonlyRequestCookies>;
let storageMock: CookieServerStorage;

describe("Cookies Server Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ReadonlyRequestCookies>;

    storageMock = new CookieServerStorage(mockCookieStore);
  });

  it("should recover value from cookies", async () => {
    mockCookieStore.get.mockReturnValue({
      value: JSON.stringify({ user: "john" }),
      name: "session",
    });

    const result = await storageMock.recover<{ user: string }>("session");

    expect(mockCookieStore.get).toHaveBeenCalledWith("session");
    expect(result).toEqual({ user: "john" });
  });

  it("should return null if cookie not found", async () => {
    mockCookieStore.get = jest.fn().mockReturnValue(undefined);

    const result = await storageMock.recover("cookies");

    expect(result).toBeNull();
  });

  it("should save value to cookies", async () => {
    await storageMock.save("KEY_THEME_COOKIE", "dark");

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "KEY_THEME_COOKIE",
      "dark",
      undefined
    );
  });

  it("should delete cookie", async () => {
    await storageMock.delete("auth-token");

    expect(mockCookieStore.delete).toHaveBeenCalledWith("auth-token");
  });
});
