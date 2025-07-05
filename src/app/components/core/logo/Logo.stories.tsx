import { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./logo.component";

const meta: Meta<typeof Logo> = {
  component: Logo,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  args: {
    size: "xl",
  },
};
