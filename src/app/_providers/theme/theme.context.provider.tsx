"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { KEY_THEME_COOKIE, ThemeMode } from "@/domain/core/Theme/theme.dto";

type ThemeContextType = {
  themeMode: ThemeMode;
  swithTheme: () => void;
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

  useEffect(() => {
    document.cookie = `${KEY_THEME_COOKIE}=${themeMode}; path=/`;
    document.documentElement.setAttribute("class", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, swithTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not available");
  return ctx;
};
