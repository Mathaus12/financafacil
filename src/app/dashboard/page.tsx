'use client';

import { useState, useMemo } from 'react';
import type { Expense } from '@/lib/types';
import { useData } from '@/context/data-context';
import { DashboardView } from '@/components/dashboard-view';
import { ExpenseFilters, type Filters } from '@/components/expense-filters';
import { AppLayout } from '@/components/app-layout';

export default function DashboardPage() {
  const { expenses } = useData();
  
  const [filters, setFilters] = useState<Omit<Filters, 'dateRange'>>({
    category: "Todos",
    paymentMethod: "Todos",
    status: "Todos",
  });

  const applyFilters = (expenseList: Expense[]) => {
    return expenseList.filter(expense => {
      if (filters.category !== 'Todos' && expense.category !== filters.category) {
        return false;
      }
      if (filters.paymentMethod !== 'Todos' && expense.paymentMethod !== filters.paymentMethod) {
        return false;
      }
      if (filters.status !== 'Todos') {
        const isPaid = filters.status === 'Pago';
        if (expense.paid !== isPaid) {
          return false;
        }
      }
      return true;
    });
  };

  const filteredExpenses = useMemo(() => {
    return applyFilters(expenses);
  }, [expenses, filters]);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <ExpenseFilters onFilterChange={setFilters} />
        <DashboardView expenses={filteredExpenses} />
      </div>
    </AppLayout>
  );
}
