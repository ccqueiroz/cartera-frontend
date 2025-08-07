import { Meta, StoryObj } from "@storybook/react";
import { BillingCard } from "./billingCard.component";

const meta: Meta<typeof BillingCard> = {
  component: BillingCard,
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

type Story = StoryObj<typeof BillingCard>;

export const Playground: Story = {
  args: {},
};
