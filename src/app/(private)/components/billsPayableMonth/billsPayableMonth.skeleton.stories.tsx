import { Meta, StoryObj } from "@storybook/react";
import { BillsPayabaleMonthSkeleton } from "./billsPayableMonth.skeleton";

const meta: Meta<typeof BillsPayabaleMonthSkeleton> = {
  component: BillsPayabaleMonthSkeleton,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "full",
          height: "400px",
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

type Story = StoryObj<typeof BillsPayabaleMonthSkeleton>;

export const Playground: Story = {
  args: {},
};
