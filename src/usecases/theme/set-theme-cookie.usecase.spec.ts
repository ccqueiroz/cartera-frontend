/**
 * @jest-environment node
 */

import { SetThemeCookieUseCase } from "@/usecases/theme/set-theme-cookie.usecase";
import { KEY_THEME_COOKIE } from "@/domain/core/Theme/theme.dto";
import type { CookiesGateway } from "@/domain/core/Storage/gateway/cookies.gateway";

describe("Set Theme Cookie Usecase", () => {
  let setThemeCookie: SetThemeCookieUseCase;
  let mockCookiesGateway: jest.Mocked<CookiesGateway>;

  beforeEach(() => {
    mockCookiesGateway = {
      save: jest.fn(),
    } as never;

    setThemeCookie = new SetThemeCookieUseCase();
  });

  it("should call storage.save with mode 'light' and correct options", () => {
    const setter = setThemeCookie.execute(mockCookiesGateway);
    setter("light");

    expect(mockCookiesGateway.save).toHaveBeenCalledWith(
      KEY_THEME_COOKIE,
      "light",
      {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      }
    );
  });

  it("should call storage.save with mode 'dark' and correct options", () => {
    const setter = setThemeCookie.execute(mockCookiesGateway);
    setter("dark");

    expect(mockCookiesGateway.save).toHaveBeenCalledWith(
      KEY_THEME_COOKIE,
      "dark",
      {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      }
    );
  });
});
