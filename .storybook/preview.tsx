import React from "react";
import type { Preview } from "@storybook/react";
import MainProvider from "../src/app/_providers/main/main.provider";
import "../src/app/globals.css";
import "./storybook.css";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-background">
      <MainProvider>{children}</MainProvider>
    </div>
  );
}

const preview: Preview = {
  parameters: {
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
