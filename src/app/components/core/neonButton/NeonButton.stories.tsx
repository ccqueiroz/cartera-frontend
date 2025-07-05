import { Meta, StoryObj } from "@storybook/react";
import { NeonButton } from "./neonButton.component";

const meta: Meta<typeof NeonButton> = {
  component: NeonButton,
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

type Story = StoryObj<typeof NeonButton>;

export const Playground: Story = {
  args: {
    variant: "blue",
    children: (
      <div className="w-48 h-8 text-black flex items-center justify-center">
        Salvar
      </div>
    ),
    isLoading: true,
  },
};
