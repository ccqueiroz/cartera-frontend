import React from "react";
import type { Preview } from "@storybook/react";

import "../src/app/globals.css";
import "./storybook.css";
import MainProvider from "../src/app/_providers/main/main.provider";
import { useTheme } from "../src/app/_providers/theme/theme.context.provider";

function ButtonSwithTheme() {
  const { swithTheme, themeMode } = useTheme();

  return (
    <div style={{ position: "absolute", top: 16, right: 16, zIndex: 9999 }}>
      <button
        onClick={swithTheme}
        style={{
          background: "#eee",
          border: "1px solid #ccc",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: 6,
        }}
      >
        Mudar para {themeMode === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MainProvider>
      <ButtonSwithTheme />
      {children}
    </MainProvider>
  );
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "dark", value: "#000000" },
        { name: "light", value: "ffffff" },
      ],
      default: "light",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeWrapper>
        <Story />
      </ThemeWrapper>
    ),
  ],
};

export default preview;
