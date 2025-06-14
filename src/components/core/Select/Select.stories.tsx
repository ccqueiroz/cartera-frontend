import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select.component";

const meta: Meta<typeof Select> = {
  component: Select,
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

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    items: [
      { value: "1", label: "Primeiro Item" },
      { value: "2", label: "Segundo Item Segundo Item Segundo Item" },
      { value: "3", label: "Terceiro Item" },
      { value: "4", label: "Quarto Item" },
    ],
    onValueChange(value) {
      void value;
    },
    value: "1",
  },
};
