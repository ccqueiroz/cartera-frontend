import { Meta, StoryObj } from "@storybook/react";
import { FormBillsPayableMonth } from "./form-bills-payable-month.component";

const meta: Meta<typeof FormBillsPayableMonth> = {
  component: FormBillsPayableMonth,
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

type Story = StoryObj<typeof FormBillsPayableMonth>;

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
