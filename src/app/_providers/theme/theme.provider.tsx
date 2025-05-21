"use client";

import { theme } from "@/styles/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <style jsx>{`
        main {
          width: 100%;
          height: auto;
          background: ${theme.background.primary};
        }
      `}</style>
    </main>
  );
}
