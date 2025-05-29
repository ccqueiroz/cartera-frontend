import { Meta, StoryObj } from "@storybook/react";
import { DefaultButton } from ".";

const meta: Meta<typeof DefaultButton> = {
  component: DefaultButton,
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

type Story = StoryObj<typeof DefaultButton>;

export const Playground: Story = {
  args: {
    variant: "primary",
    hasBoder: true,
    children: <span>Salvar</span>,
  },
};
