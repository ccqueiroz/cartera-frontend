import { Meta, StoryObj } from "@storybook/react";
import { SwitchThemeButton } from ".";

const meta: Meta<typeof SwitchThemeButton> = {
  component: SwitchThemeButton,
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

type Story = StoryObj<typeof SwitchThemeButton>;

export const Playground: Story = {
  args: {},
};
