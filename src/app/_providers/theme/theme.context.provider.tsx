"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { KEY_THEME_COOKIE, ThemeMode } from "@/domain/core/Theme/theme.dto";
import { theme } from "@/styles/theme";

type SelectedThemeType = typeof theme.dark | typeof theme.light;

type ThemeContextType = {
  themeMode: ThemeMode;
  swithTheme: () => void;
  selectedTheme: SelectedThemeType;
};

export interface ThemeProviderClientInterface {
  children: React.ReactNode;
  initialTheme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProviderClient({
  children,
  initialTheme,
}: ThemeProviderClientInterface) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);

  const swithTheme = () =>
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));

  const selectedTheme = useMemo(() => theme[themeMode], [themeMode]);

  useEffect(() => {
    document.cookie = `${KEY_THEME_COOKIE}=${themeMode}; path=/`;
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, swithTheme, selectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not available");
  return ctx;
};
