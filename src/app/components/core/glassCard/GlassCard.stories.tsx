import { Meta, StoryObj } from "@storybook/react";
import { GlassCard } from "./glassCard.component";

const meta: Meta<typeof GlassCard> = {
  component: GlassCard,
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

type Story = StoryObj<typeof GlassCard>;

export const Playground: Story = {
  args: {
    variant: "default",
    animate: true,
    children: (
      <div className="w-48 h-8 text-black flex items-center justify-center">
        Salvar
      </div>
    ),
  },
};

export const PlaygroundLight: Story = {
  args: {
    variant: "light",
    animate: true,
    children: (
      <div className="w-48 h-16 text-black flex items-center justify-center">
        Salvar
      </div>
    ),
  },
};

export const PlaygroundDark: Story = {
  args: {
    variant: "dark",
    animate: true,
    children: (
      <div className="w-48 h-16 text-white flex items-center justify-center">
        Salvar
      </div>
    ),
  },
};

export const PlaygroundNoAnimate: Story = {
  args: {
    variant: "light",
    animate: false,
    children: (
      <div className="w-48 h-16 text-black flex items-center justify-center">
        Salvar
      </div>
    ),
  },
};
