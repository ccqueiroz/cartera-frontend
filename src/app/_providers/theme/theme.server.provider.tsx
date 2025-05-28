import { ThemeMode } from "@/domain/core/Theme/theme.dto";
import { cookiesStorage } from "@/infra/storage";
import { GetInitialThemeUseCase } from "@/usecases/theme/get-initial-theme.usecase";
import { SetThemeCookieUseCase } from "@/usecases/theme/set-theme-cookie.usecase";

const getInitialThemeUseCase = new GetInitialThemeUseCase();

const setThemeCookieUseCase = new SetThemeCookieUseCase();

const getInitialTheme = () => {
  return getInitialThemeUseCase.execute(cookiesStorage);
};

const setThemeCookie = (mode: ThemeMode) => {
  setThemeCookieUseCase.execute(cookiesStorage)(mode);
};

export { getInitialTheme, setThemeCookie };
