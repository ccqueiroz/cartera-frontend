import { Meta, StoryObj } from "@storybook/react";
import { CashFlowGaugeChart } from "./cash-flow-gauge-chart.component";

const meta: Meta<typeof CashFlowGaugeChart> = {
  component: CashFlowGaugeChart,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
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

type Story = StoryObj<typeof CashFlowGaugeChart>;

export const Playground: Story = {
  args: {
    receivable: 8219.89,
    bill: 1432.92,
  },
};
