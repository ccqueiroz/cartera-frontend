import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.component";

const meta: Meta<typeof Button> = {
  component: Button,
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

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: <span>Salvar</span>,
  },
};
