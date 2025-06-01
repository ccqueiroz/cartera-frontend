"use client";

import {
  ThemeProviderClient,
  ThemeProviderClientInterface,
} from "./theme.context.provider";
import { mergeClass } from "./theme.style";

export default function ThemeProvider({
  children,
  initialTheme,
}: ThemeProviderClientInterface) {
  return (
    <ThemeProviderClient initialTheme={initialTheme}>
      <main className={mergeClass}>{children}</main>
    </ThemeProviderClient>
  );
}
