"use client";

import ThemeComponentProvider from "./theme.component.provider";
import {
  ThemeProviderClient,
  ThemeProviderClientInterface,
} from "./theme.context.provider";

export default function ThemeProvider({
  children,
  initialTheme,
}: ThemeProviderClientInterface) {

  return (
    <ThemeProviderClient initialTheme={initialTheme}>
      <ThemeComponentProvider>{children}</ThemeComponentProvider>
    </ThemeProviderClient>
  );
}
