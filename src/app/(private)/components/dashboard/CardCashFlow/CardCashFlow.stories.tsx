import { Meta, StoryObj } from "@storybook/react";
import { CardCashFlow } from "./card-cash-flow.compontent";

const meta: Meta<typeof CardCashFlow> = {
  component: CardCashFlow,
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

type Story = StoryObj<typeof CardCashFlow>;

export const Playground: Story = {
  args: {
    proventType: "receivable",
    totalAmount: 8219.89,
    financialEvents: 1432.92,
    incomeFixedCosts: 5672.82,
  },
};
