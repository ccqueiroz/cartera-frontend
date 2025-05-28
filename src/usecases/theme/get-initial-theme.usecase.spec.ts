/**
 * @jest-environment node
 */

import { GetInitialThemeUseCase } from "@/usecases/theme/get-initial-theme.usecase";
import { KEY_THEME_COOKIE } from "@/domain/core/Theme/theme.dto";
import type { CookiesGateway } from "@/domain/core/Storage/gateway/cookies.gateway";

describe("Get Initial Theme Usecase", () => {
  let getInitialTheme: GetInitialThemeUseCase;
  let mockCookiesGateway: jest.Mocked<CookiesGateway>;

  beforeEach(() => {
    mockCookiesGateway = {
      recover: jest.fn(),
    } as never;

    getInitialTheme = new GetInitialThemeUseCase();
  });

  it("should return 'light' if stored theme is 'light'", () => {
    mockCookiesGateway.recover.mockReturnValue("light");

    const result = getInitialTheme.execute(mockCookiesGateway);

    expect(result).toBe("light");
    expect(mockCookiesGateway.recover).toHaveBeenCalledWith(KEY_THEME_COOKIE);
  });

  it("should return 'dark' if stored theme is 'dark'", () => {
    mockCookiesGateway.recover.mockReturnValue("dark");

    const result = getInitialTheme.execute(mockCookiesGateway);

    expect(result).toBe("dark");
  });

  it("should return 'dark' if stored theme is null", () => {
    mockCookiesGateway.recover.mockReturnValue(null);

    const result = getInitialTheme.execute(mockCookiesGateway);

    expect(result).toBe("dark");
  });

  it("should return 'dark' if stored theme is invalid", () => {
    mockCookiesGateway.recover.mockReturnValue("blue");

    const result = getInitialTheme.execute(mockCookiesGateway);

    expect(result).toBe("dark");
  });
});
