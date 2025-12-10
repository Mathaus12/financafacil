"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesByCategoryChart } from "@/components/charts/expenses-by-category-chart";
import { ExpensesByPaymentMethodChart } from "@/components/charts/expenses-by-payment-method-chart";
import { PaidVsUnpaidChart } from "@/components/charts/paid-vs-unpaid-chart";
import type { Expense } from "@/lib/types";
import { BarChart, PieChart, CreditCard, LineChart } from "lucide-react";
import { ExpensesOverTimeChart } from "./charts/expenses-over-time-chart";

interface DashboardViewProps {
    expenses: Expense[];
    activeCategory: string | null;
    onCategorySelect: (category: string | null) => void;
    activePaymentMethod: string | null;
    onPaymentMethodSelect: (method: string | null) => void;
    activeStatus: string | null;
    onStatusSelect: (status: string | null) => void;
}

export function DashboardView({ 
    expenses,
    activeCategory,
    onCategorySelect,
    activePaymentMethod,
    onPaymentMethodSelect,
    activeStatus,
    onStatusSelect,
 }: DashboardViewProps) {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Despesas por Categoria</CardTitle>
                        <BarChart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ExpensesByCategoryChart 
                            expenses={expenses}
                            activeItem={activeCategory}
                            onItemSelect={onCategorySelect}
                         />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Despesas por Pagamento</CardTitle>
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ExpensesByPaymentMethodChart 
                            expenses={expenses} 
                            activeItem={activePaymentMethod}
                            onItemSelect={onPaymentMethodSelect}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>Pagos vs. Pendentes</CardTitle>
                         <PieChart className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <PaidVsUnpaidChart 
                            expenses={expenses}
                            activeItem={activeStatus}
                            onItemSelect={onStatusSelect}
                        />
                    </CardContent>
                </Card>
            </div>
             <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Despesas ao Longo do Ano</CardTitle>
                    <LineChart className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <ExpensesOverTimeChart expenses={expenses} />
                </CardContent>
            </Card>
        </div>
    );
}