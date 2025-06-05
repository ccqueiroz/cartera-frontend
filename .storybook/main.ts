import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/nextjs",
  staticDirs: [],
  features: { backgroundsStoryGlobals: false },
};

export default config;
