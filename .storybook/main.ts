import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/nextjs",
  staticDirs: [],
  features: { backgroundsStoryGlobals: false },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {
      alias: {},
      extensions: [],
      fallback: {},
      modules: [],
    };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next/navigation": require.resolve("./mocks/nextNavigationMock.ts"),
    };
    return config;
  },
};

export default config;
