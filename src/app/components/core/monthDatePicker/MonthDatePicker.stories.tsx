import { Meta, StoryObj } from "@storybook/react";
import { MonthDatePick } from "./monthDatePicker.component";

const meta: Meta<typeof MonthDatePick> = {
  component: MonthDatePick,
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

type Story = StoryObj<typeof MonthDatePick>;

export const Playground: Story = {
  args: {},
};
