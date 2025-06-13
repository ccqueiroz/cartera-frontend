import { Meta, StoryObj } from "@storybook/react";
import { ModalFormRecentTransaction } from "./modal-form-recent-transaction.component";

const meta: Meta<typeof ModalFormRecentTransaction> = {
  component: ModalFormRecentTransaction,
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

type Story = StoryObj<typeof ModalFormRecentTransaction>;

export const Playground: Story = {
  args: {
    transaction: {
      type: "receivable",
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      personUserId: "a1b2c3d4-e5f6-7890-1234-56789abcdef4",
      userId: "a1b2c3d4-e5f6-7890-1234-56789abcdef5",
      icon: null,
      amount: 100,
      paymentStatusId: "a1b2c3d4-e5f6-7890-1234-56789abcdef3",
      paymentStatusDescription: "Paid",
      categoryId: "a1b2c3d4-e5f6-7890-1234-56789abcdef1",
      categoryDescription: "TRecebimento por Serviço Prestado",
      paymentMethodId: "a1b2c3d4-e5f6-7890-1234-56789abcdef2",
      paymentMethodDescription: "Test Payment Method 1",
      createdAt: 1749780696589,
      updatedAt: null,
      descriptionTransaction: "Test Receivable 1",
      fixedTransaction: true,
      dueDateTransaction: 1749780696589,
      settledDate: null,
      settledOut: false,
    },
  },
};
