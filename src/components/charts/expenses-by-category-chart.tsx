"use client"

import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useData } from "@/context/data-context";

interface ExpensesByCategoryChartProps {
  expenses: Expense[];
  activeItem: string | null;
  onItemSelect: (item: string | null) => void;
}

const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width + 5}
        y={y + props.height / 2}
        fill={'hsl(var(--foreground))'}
        textAnchor={'start'}
        dominantBaseline="middle"
        className="text-xs font-medium"
      >
        {formatCurrency(value)}
      </text>
    );
  };


export function ExpensesByCategoryChart({ expenses, activeItem, onItemSelect }: ExpensesByCategoryChartProps) {
  const { categories } = useData();

  const chartData = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    
    const dataByCategory = categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: category.name,
        total: total,
      };
    })
    .filter(item => item.total > 0)
    .sort((a, b) => b.total - a.total);

    return dataByCategory;
  }, [expenses, categories]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  };

  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const payload = data.activePayload[0].payload;
      onItemSelect(activeItem === payload.name ? null : payload.name);
    }
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            left: 10,
            right: 80
          }}
          onClick={handleBarClick}
          style={{ cursor: 'pointer' }}
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
            cursor={{ fill: 'hsl(var(--accent))' }}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
          />
          <Bar dataKey="total" radius={5}>
             <LabelList
                dataKey="total"
                position="right"
                content={<CustomLabel />}
            />
            {chartData.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={'var(--color-total)'}
                    opacity={activeItem === null || activeItem === entry.name ? 1 : 0.3}
                />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}