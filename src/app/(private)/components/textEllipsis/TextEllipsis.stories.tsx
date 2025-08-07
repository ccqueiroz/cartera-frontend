import { Meta, StoryObj } from "@storybook/react";
import { TextEllipsis } from "./textEllipsis.component";

const meta: Meta<typeof TextEllipsis> = {
  component: TextEllipsis,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid white",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TextEllipsis>;

export const Playground: Story = {
  args: {
    maxLength: 25,
    text: "Caio Cezar Guedes de Queiroz",
  },
};

export const PlaygroundWithTruncked: Story = {
  args: {
    maxLength: 25,
    text: "Caio Cezar Guedes de Queiroz",
  },
};
