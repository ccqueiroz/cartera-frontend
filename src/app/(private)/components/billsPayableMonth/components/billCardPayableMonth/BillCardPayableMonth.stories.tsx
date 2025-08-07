import { Meta, StoryObj } from "@storybook/react";
import { BillCardPayableMonth } from "./billCardPayableMonth.component";

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
      billDateFormated: Intl.DateTimeFormat("pt-BR").format(
        new Date().getTime()
      ),
      amountFormated: Intl.NumberFormat("pt-Br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(1500),
      categoryId: "121212244t5tefdf",
      categoryDescription: "Moradia e Manutencao Residencial",
      status: "PENDING",
    },
  },
};
