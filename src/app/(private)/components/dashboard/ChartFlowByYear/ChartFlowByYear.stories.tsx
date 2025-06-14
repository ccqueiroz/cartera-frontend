import { Meta, StoryObj } from "@storybook/react";
import { ChartFlowByYear } from "./chart-flow-by-year.component";

const meta: Meta<typeof ChartFlowByYear> = {
  component: ChartFlowByYear,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "700px",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full overflow-x-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChartFlowByYear>;

export const Playground: Story = {
  args: {
    summaryCashFlow: [
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "JAN",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "FEV",
        paid: 1120,
        expenses: 48,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "MAR",
        paid: 148,
        expenses: 300,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "ABR",
        paid: 2400.0,
        expenses: 9209.56,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "MAI",
        paid: 200,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "JUN",
        paid: 1256.87,
        expenses: 290,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "JUL",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "AGO",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "SET",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "OUT",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "NOV",
        paid: 0,
        expenses: 0,
      },
      {
        typeComparison: "PROFIT",
        year: 2025,
        month: "DEZ",
        paid: 0,
        expenses: 0,
      },
    ],
  },
};
