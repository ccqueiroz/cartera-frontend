import { KEY_THEME_COOKIE, ThemeMode } from "@/domain/core/Theme/theme.dto";
import { CookiesGateway } from "@/domain/core/Storage/gateway/cookies.gateway";
import { Usecase } from "../usecase";

type Input = CookiesGateway;
type Output = (mode: ThemeMode) => void;

export class SetThemeCookieUseCase implements Usecase<Input, Output> {
  public execute(storage: CookiesGateway) {
    return (mode: ThemeMode) => {
      storage.save(KEY_THEME_COOKIE, mode, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    };
  }
}
