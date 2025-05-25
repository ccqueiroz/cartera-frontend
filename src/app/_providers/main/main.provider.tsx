import StyledJsxRegistry from "../style/registry.style.provider";
import ThemeProvider from "../theme/theme.provider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledJsxRegistry>
      <ThemeProvider>{children}</ThemeProvider>
    </StyledJsxRegistry>
  );
}
