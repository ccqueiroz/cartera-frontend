import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/nextjs",
  staticDirs: ["../src/app/fonts"],
  features: { backgroundsStoryGlobals: false },
};

export default config;
