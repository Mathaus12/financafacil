"use client"
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { Expense } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ExpensesOverTimeChartProps {
  expenses: Expense[];
}

export function ExpensesOverTimeChart({ expenses }: ExpensesOverTimeChartProps) {
  const chartData = useMemo(() => {
    const dataByMonth: { [key: string]: { total: number; date: Date } } = {};

    expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        
        if (isNaN(expenseDate.getTime())) {
            return;
        }

        const monthKey = format(expenseDate, "yyyy-MM");

        if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = { total: 0, date: expenseDate };
        }
        dataByMonth[monthKey].total += expense.amount;
    });

    return Object.entries(dataByMonth)
      .map(([key, data]) => {
          const [year, month] = key.split('-').map(Number);
          const monthName = format(new Date(year, month - 1), "MMM", { locale: ptBR });
          return {
            month: `${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`,
            total: data.total,
            date: data.date,
          }
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());

  }, [expenses]);
  
  if (chartData.length === 0) {
    return <p className="text-muted-foreground text-center">Não há dados de despesas para exibir o gráfico.</p>
  }

  const chartConfig = {
    total: {
      label: "Despesas",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Rotate labels if there are more than 6 months to display to avoid overlap
  const xAxisProps = chartData.length > 6 
    ? { angle: -45, textAnchor: 'end' as const, height: 50, interval: 0 } 
    : { interval: 'preserveStartEnd' as const };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData} margin={{ left: -10, right: 20, top: 20, bottom: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fill: 'hsl(var(--foreground))' }}
            {...xAxisProps}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value as number)}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={90}
            tick={{ fill: 'hsl(var(--foreground))' }}
          />
          <ChartTooltip 
            cursor={false}
            content={<ChartTooltipContent 
                formatter={(value) => formatCurrency(value as number)}
                indicator="dot" 
            />}
            
            />
          <Area
            dataKey="total"
            type="monotone"
            fill="var(--color-total)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
