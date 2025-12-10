'use client';

import { useState, useMemo } from 'react';
import { isWithinInterval, parseISO, startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';
import type { Expense } from '@/lib/types';
import { useData } from '@/context/data-context';
import { DashboardView } from '@/components/dashboard-view';
import { ExpenseFilters, type Filters } from '@/components/expense-filters';
import { AppLayout } from '@/components/app-layout';

export default function DashboardPage() {
  const { expenses } = useData();
  
  const [filters, setFilters] = useState<Filters>({
    category: "Todos",
    paymentMethod: "Todos",
    status: "Todos",
    dateRange: {
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    },
  });

  // State for cross-filtering from charts
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  
  const clearChartFilters = () => {
    setActiveCategory(null);
    setActivePaymentMethod(null);
    setActiveStatus(null);
  };
  
  const isAnyChartFilterActive = activeCategory || activePaymentMethod || activeStatus;

  const applyFilters = (expenseList: Expense[]) => {
    return expenseList.filter(expense => {
      // Date filtering logic from date picker
      const expenseDate = parseISO(expense.date);
      if (filters.dateRange?.from && !filters.dateRange.to) {
        if (!isSameMonth(expenseDate, filters.dateRange.from)) {
          return false;
        }
      } else if (filters.dateRange?.from && filters.dateRange?.to) {
        if (!isWithinInterval(expenseDate, { start: filters.dateRange.from, end: filters.dateRange.to })) {
          return false;
        }
      }
      
      // Standard filters from dropdowns
      if (filters.category !== 'Todos' && expense.category !== filters.category) return false;
      if (filters.paymentMethod !== 'Todos' && expense.paymentMethod !== filters.paymentMethod) return false;
      if (filters.status !== 'Todos') {
        if ((filters.status === 'Pago' && !expense.paid) || (filters.status === 'Pendente' && expense.paid)) {
          return false;
        }
      }
      
      // Cross-filtering from chart clicks
      if (activeCategory && expense.category !== activeCategory) return false;
      if (activePaymentMethod && expense.paymentMethod !== activePaymentMethod) return false;
      if (activeStatus) {
         if ((activeStatus === 'Pago' && !expense.paid) || (activeStatus === 'Pendente' && expense.paid)) {
           return false;
         }
      }

      return true;
    });
  };

  const filteredExpenses = useMemo(() => {
    return applyFilters(expenses);
  }, [expenses, filters, activeCategory, activePaymentMethod, activeStatus]);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        
        <ExpenseFilters onFilterChange={setFilters} />
        
        {isAnyChartFilterActive && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Filtrando por clique no gráfico.{' '}
            <Button variant="ghost" size="sm" onClick={clearChartFilters} className="flex items-center gap-1">
              <FilterX className="h-4 w-4" />
              Limpar seleção
            </Button>
          </div>
        )}

        <DashboardView 
          expenses={filteredExpenses} 
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
          activePaymentMethod={activePaymentMethod}
          onPaymentMethodSelect={setActivePaymentMethod}
          activeStatus={activeStatus}
          onStatusSelect={setActiveStatus}
        />
      </div>
    </AppLayout>
  );
}