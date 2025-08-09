import { Meta, StoryObj } from "@storybook/react";
import { MonthlySummaryContainer } from "./monthlySummary.container";

const meta: Meta<typeof MonthlySummaryContainer> = {
  component: MonthlySummaryContainer,
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

type Story = StoryObj<typeof MonthlySummaryContainer>;

export const Playground: Story = {
  args: {},
};
