import { KEY_THEME_COOKIE, ThemeMode } from "@/domain/core/Theme/theme.dto";
import { CookiesGateway } from "@/domain/core/Storage/gateway/cookies.gateway";
import { Usecase } from "../usecase";

type Input = CookiesGateway;
type Output = ThemeMode;

export class GetInitialThemeUseCase implements Usecase<Input, Output> {
  public execute(storage: CookiesGateway) {
    const mode = storage.recover(KEY_THEME_COOKIE) as ThemeMode;

    return mode === "light" || mode === "dark" ? mode : "dark";
  }
}
