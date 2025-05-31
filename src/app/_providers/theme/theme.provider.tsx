"use client";

import {
  ThemeProviderClient,
  ThemeProviderClientInterface,
} from "./theme.context.provider";
import s from "./theme.module.css";

export default function ThemeProvider({
  children,
  initialTheme,
}: ThemeProviderClientInterface) {
  return (
    <ThemeProviderClient initialTheme={initialTheme}>
      <main className={s.main}>{children}</main>
    </ThemeProviderClient>
  );
}
