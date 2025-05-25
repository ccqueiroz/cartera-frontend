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
        @keyframes animatedGradient {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        main {
          width: ${theme.width.full};
          background: ${theme.dark.background.gradient};
          height: ${theme.height.screen};
          color: ${theme.dark.colors.primary};
          background-size: 600% 600%;
          animation: ${theme.dark.animation.background};
          font-family: var(--font-quicksand);
          font-weight: 400;
          font-size: 1.4rem;
        }
      `}</style>
    </main>
  );
}
