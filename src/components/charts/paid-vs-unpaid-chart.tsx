"use client"
import * as React from "react";
import { useMemo } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface PaidVsUnpaidChartProps {
  expenses: Expense[];
}

const chartConfig = {
    paid: {
        label: "Pago",
        color: "hsl(var(--chart-2))",
    },
    unpaid: {
        label: "Pendente",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function PaidVsUnpaidChart({ expenses }: PaidVsUnpaidChartProps) {
  const chartData = useMemo(() => {
    const paidAmount = expenses
      .filter((expense) => expense.paid)
      .reduce((sum, expense) => sum + expense.amount, 0);
    const unpaidAmount = expenses
      .filter((expense) => !expense.paid)
      .reduce((sum, expense) => sum + expense.amount, 0);

    return [
      { name: "Pago", value: paidAmount, fill: chartConfig.paid.color },
      { name: "Pendente", value: unpaidAmount, fill: chartConfig.unpaid.color },
    ].filter(item => item.value > 0);
  }, [expenses]);
  
  const totalAmount = useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <ChartTooltip 
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)} 
                nameKey="name" 
                hideLabel
            />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="hsl(var(--foreground))"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  className="text-xs font-bold"
                >
                  {chartData[index].name} ({(percent * 100).toFixed(0)}%)
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
           <foreignObject width="100%" height="100%">
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-lg font-bold">
                  Total
                  <span className="text-sm text-muted-foreground block">{formatCurrency(totalAmount)}</span>
                </p>
              </div>
          </foreignObject>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
