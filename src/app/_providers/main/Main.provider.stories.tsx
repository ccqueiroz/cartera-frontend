import { Meta, StoryObj } from "@storybook/react";
import MainProvider from "./main.provider";

const meta: Meta<typeof MainProvider> = {
  component: MainProvider,
};

export default meta;

type Story = StoryObj<typeof MainProvider>;

export const Playground: Story = {
  args: {
    children: <h1>Cartera</h1>,
  },
};
