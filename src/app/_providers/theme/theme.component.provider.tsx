"use client";

import { theme } from "@/styles/theme";
import { useTheme } from "./theme.context.provider";

export default function ThemeComponentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedTheme } = useTheme();

  return (
    <main>
      {children}
      <style jsx>{`
        main {
          width: ${theme.width.full};
          height: ${theme.height.screen};
          background: ${selectedTheme.background.background};
          color: ${selectedTheme.colors.textPrimary};
          font-family: var(--font-quicksand);
          font-weight: 400;
          font-size: 1.4rem;
        }
      `}</style>
    </main>
  );
}
