"use client"

import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/context/data-context";

interface ExpensesByPaymentMethodChartProps {
  expenses: Expense[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, fill } = props;
  const formattedValue = formatCurrency(value);
  const labelWidth = formattedValue.length * 7; // Approximate width of the label
  
  const fitsInside = width > labelWidth + 10;
  
  return (
    <text
      x={fitsInside ? x + width - 5 : x + width + 5}
      y={y + height / 2}
      dy={4}
      fill={fitsInside ? fill : "hsl(var(--foreground))"}
      textAnchor={fitsInside ? "end" : "start"}
      className="text-xs font-medium"
    >
      {formattedValue}
    </text>
  );
};

export function ExpensesByPaymentMethodChart({ expenses }: ExpensesByPaymentMethodChartProps) {
  const { paymentMethods } = useData();

  const chartData = useMemo(() => {
    if (!paymentMethods || paymentMethods.length === 0) return [];
    return paymentMethods.map((method) => {
      const total = expenses
        .filter((expense) => expense.paymentMethod === method.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: method.name,
        total: total,
      };
    }).filter(item => item.total > 0);
  }, [expenses, paymentMethods]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            left: 10,
            right: 50
          }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={120}
            tick={{ fill: 'hsl(var(--foreground))' }}
            tickFormatter={(value) => {
              if (value.length > 12) {
                return `${value.substring(0, 12)}...`;
              }
              return value;
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
          />
          <Bar dataKey="total" fill="var(--color-total)" radius={5}>
             <LabelList
              dataKey="total"
              position="insideRight"
              content={<CustomLabel fill="#FFFFFF" />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
