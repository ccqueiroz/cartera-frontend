import { Meta, StoryObj } from "@storybook/react";
import MainProvider from "./main.provider";

const meta: Meta<typeof MainProvider> = {
  component: MainProvider,
  decorators: [
    (Story) => (
      <MainProvider>
        <Story />
      </MainProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MainProvider>;

export const Playground: Story = {
  args: {
    children: <h1>Cartera</h1>,
  },
};
