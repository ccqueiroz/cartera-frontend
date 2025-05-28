export type ThemeMode = "light" | "dark";

export const KEY_THEME_COOKIE = "theme-mode";

export type GetInitialTheme = () => ThemeMode;

export type SetThemeCookie = (mode: ThemeMode) => void;
