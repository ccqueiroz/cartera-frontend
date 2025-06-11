import { Meta, StoryObj } from "@storybook/react";
import { BillCardPayableMonth } from "./bill-card-payable-month.component";

const meta: Meta<typeof BillCardPayableMonth> = {
  component: BillCardPayableMonth,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
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

type Story = StoryObj<typeof BillCardPayableMonth>;

export const Playground: Story = {
  args: {
    bill: {
      id: "1",
      descriptionBill: "Aluguel",
      amount: 1500,
      billDate: new Date().getTime(),
      categoryId: "121212244t5tefdf",
      categoryDescription: "Moradia e Manutencao Residencial",
      status: "PENDING",
    },
  },
};
