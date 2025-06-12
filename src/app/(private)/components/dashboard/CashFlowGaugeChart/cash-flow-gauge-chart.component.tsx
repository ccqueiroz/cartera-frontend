"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/Chart/chart";
import { NotificationCashFlowHealth } from "@/domain/CashFlow/cash-flow.dto";
import { useMemo } from "react";
import { GlassCard } from "@/components/core/GlassCard/glass-card.component";

const chartConfig = {
  desktop: {
    label: "Entrada",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Saída",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface CashFlowGaugeChartProps {
  receivable: number;
  bill: number;
}

const formatNotificationMessage = ({
  template,
  percentBalance,
  totalBalance,
}: {
  template: string;
  percentBalance: number;
  totalBalance: number;
}) => {
  const formattedPercent = Intl.NumberFormat("pt-Br", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(percentBalance)
    .replace("%", "");

  const formattedBalance = totalBalance.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return template
    .replace("{percentBalance}", formattedPercent)
    .replace("{totalBalance}", formattedBalance)
    .split(/(?<=[.!?])\s+/);
};

export const CashFlowGaugeChart = ({
  bill = 0,
  receivable = 0,
}: CashFlowGaugeChartProps) => {
  const totalBalance = receivable - bill;
  const percentBalance = bill / (bill + receivable);

  const notificationCashFlowHealth = useMemo(() => {
    if (percentBalance >= 0 && percentBalance <= 0.2)
      return NotificationCashFlowHealth["hight-surplus"];
    else if (percentBalance > 0.2 && percentBalance <= 0.4)
      return NotificationCashFlowHealth["modarate-surplus"];
    else if (percentBalance > 0.4 && percentBalance <= 0.6)
      return NotificationCashFlowHealth["balance"];
    else if (percentBalance > 0.6 && percentBalance <= 0.8)
      return NotificationCashFlowHealth["moderate-deficit"];
    else if (percentBalance > 0.8 && percentBalance <= 100)
      return NotificationCashFlowHealth["severe-deficit"];
    else return NotificationCashFlowHealth.fallback;
  }, [percentBalance]);

  const notificationLines = useMemo(() => {
    return formatNotificationMessage({
      template: notificationCashFlowHealth,
      percentBalance,
      totalBalance,
    });
  }, [notificationCashFlowHealth, percentBalance, totalBalance]);

  return (
    <GlassCard
      variant="dark"
      className="w-full max-w-[600px] p-5 animate-fade-in-up relative"
      style={{ animationDelay: "250ms" }}
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Fluxo de Caixa do Mês
      </h2>
      <div className="w-full flex flex-col justify-between items-between ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full h-full max-w-[600px] max-h-[190px]"
        >
          <RadialBarChart
            data={[{ month: "Junho", receivable, bill }]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <defs>
              <linearGradient
                id="receivableGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#1688f2d0" />
                <stop offset="100%" stopColor="#60a2c1" />
              </linearGradient>
              <linearGradient id="billGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d63333f6" />
                <stop offset="100%" stopColor="#e5313160" />
              </linearGradient>
            </defs>

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 4}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {Intl.NumberFormat("pt-Br", {
                            style: "percent",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }).format(percentBalance)}
                        </tspan>
                        {notificationLines.map((line, index) => (
                          <tspan
                            key={index}
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 40 + index * 20}
                            className="fill-foreground text-sm"
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="receivable"
              stackId="a"
              cornerRadius={2}
              fill={"url(#receivableGradient)"}
              isAnimationActive
              forceCornerRadius
              cornerIsExternal
            />
            <RadialBar
              dataKey="bill"
              fill={"url(#billGradient)"}
              stackId="a"
              cornerRadius={2}
              isAnimationActive
              forceCornerRadius
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </GlassCard>
  );
};
