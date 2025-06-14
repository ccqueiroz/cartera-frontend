"use client";

import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import {
  Select,
  SelectItemsType,
} from "@/components/core/Select/select.component";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/Chart/chart";
import {
  typeComparisonCashFlow,
  typeComparisonCashFlowLabel,
} from "@/domain/CashFlow/cash-flow.dto";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useChartCashFlowByYear } from "./hook/useChartFlowByYear.hook";

const chartConfig = {
  paid: {
    label: "Entrada",
  },
  expenses: {
    label: "Saída",
  },
} satisfies ChartConfig;

const itemsTypeComparisonCashFlowChart: Array<SelectItemsType> = [
  {
    value: typeComparisonCashFlow.PAID_PROFIT,
    label: typeComparisonCashFlowLabel.PAID_PROFIT,
  },
  {
    value: typeComparisonCashFlow.PROFIT,
    label: typeComparisonCashFlowLabel.PROFIT,
  },
  {
    value: typeComparisonCashFlow.INCOMES,
    label: typeComparisonCashFlowLabel.INCOMES,
  },
  {
    value: typeComparisonCashFlow.EXPENSES,
    label: typeComparisonCashFlowLabel.EXPENSES,
  },
];

export const ChartFlowByYear = () => {
  const {
    isPending,
    handleChangeTypeComparisonCashFlow,
    handleChangeYearComparisonCashFlow,
    normalizeNameChartTooltip,
    summary,
    chartLegends,
  } = useChartCashFlowByYear();

  return (
    <div>
      <div className="flex flex-col justify-between items-center pr-0 mb-5 md:flex-row md:pr-2">
        <h2 className="text-lg font-semibold text-white flex-shrink ml-0 md:ml-2">
          Movimentação Financeira
        </h2>
        <div className="w-full flex flex-col items-center justify-end gap-5  md:w-1/2 md:flex-row">
          <div className="w-full md:w-56">
            <Select
              items={[{ value: "2025", label: "2025" }]}
              value={summary.yearComparison}
              onValueChange={handleChangeYearComparisonCashFlow}
            />
          </div>
          <div className="w-full md:w-56">
            <Select
              items={itemsTypeComparisonCashFlowChart}
              value={summary.typeComparison}
              onValueChange={handleChangeTypeComparisonCashFlow}
            />
          </div>
        </div>
      </div>
      <GlassCard variant="dark">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="p-2 md:p-5"
            >
              <ChartContainer config={chartConfig}>
                <AreaChart
                  data={summary.summaryCashFlow}
                  margin={{ top: 20, right: 20, left: 35, bottom: 10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.2)"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={true}
                    interval={0}
                    axisLine={true}
                    tickMargin={8}
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                  />
                  <YAxis
                    allowDataOverflow={
                      summary.typeComparison !==
                        typeComparisonCashFlow.PAID_PROFIT &&
                      summary.typeComparison !== typeComparisonCashFlow.PROFIT
                    }
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                    tickFormatter={(value) =>
                      value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      `${normalizeNameChartTooltip(name.toString())}: `,
                      value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    ]}
                  />
                  <defs>
                    <linearGradient
                      id="paidGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#7DF9FF" stopOpacity={0.6} />
                      <stop
                        offset="95%"
                        stopColor="#C084FC"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#d63333f6"
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="95%"
                        stopColor="#FFF2B3"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="paid"
                    type="monotone"
                    fill="url(#paidGradient)"
                    fillOpacity={0.4}
                    stroke="#C084FC"
                  />
                  {summary.typeComparison !==
                    typeComparisonCashFlow.PAID_PROFIT && (
                    <Area
                      dataKey="expenses"
                      type="monotone"
                      fill="url(#expenseGradient)"
                      fillOpacity={0.4}
                      stroke="#FF6B6B"
                    />
                  )}
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
      <div className="w-full flex flex-col items-start gap-2 mt-3 ml-0 md:ml-2">
        <h4 className="brightness-90 text-neon-white text-sm">Legendas</h4>
        <div className="w-full flex items-center gap-12">
          {chartLegends.legendPaid && (
            <div className="flex items-center justify-start gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#7DF9FF] to-[#C084FC]" />
              <span className="text-xs text-neon-white">
                {chartLegends.legendPaid}
              </span>
            </div>
          )}
          {chartLegends.legendExpenses && (
            <div className="flex items-center justify-start gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#d63333f6] to-[#FFF2B3]" />
              <span className="text-xs text-neon-white">
                {chartLegends.legendExpenses}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
