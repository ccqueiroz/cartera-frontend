import { Meta, StoryObj } from "@storybook/react";
import { CardAnalysisTypeAmountPercent } from "./cardAnalysisTypeAmountPercent.component";
import { TrendingDown, TrendingUp } from "lucide-react";

const meta: Meta<typeof CardAnalysisTypeAmountPercent> = {
  component: CardAnalysisTypeAmountPercent,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
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

type Story = StoryObj<typeof CardAnalysisTypeAmountPercent>;

export const Playground: Story = {
  args: {
    type: "Receita Fixa",
    descriptionType: "Salário, aposentadoria, etc.",
    amount: 5500.5,
    totalAmount: 7000.73,
    color: "success",
    icon: TrendingDown,
    isLoading: false,
  },
};
