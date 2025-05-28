import StyledJsxRegistry from "../style/registry.style.provider";
import ThemeProvider from "../theme/theme.provider";
import { getInitialTheme } from "../theme/theme.server.provider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = getInitialTheme();

  return (
    <StyledJsxRegistry>
      <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
    </StyledJsxRegistry>
  );
}
