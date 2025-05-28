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
      <div id="glass">{children}</div>

      <style jsx>{`
        @keyframes animatedGradientLight {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes animatedGradientDark {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        main {
          width: ${theme.width.full};
          height: ${theme.height.screen};
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${selectedTheme.background.gradient};
          background-size: 600% 600%;
          animation: ${selectedTheme.animation.background};
        }

        #glass {
          width: 99%;
          height: 98%;
          background: ${selectedTheme.background.background};
          background-size: 600% 600%;
          backdrop-filter: ${selectedTheme.background.glassEffect};
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: ${theme.borderRadius.xl};
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          animation: ${selectedTheme.animation.background};
          transition: all 0.3s ease;
          color: ${selectedTheme.colors.textPrimary};
          font-family: var(--font-quicksand);
          font-weight: 400;
          font-size: 1.4rem;
        }
      `}</style>
    </main>
  );
}
