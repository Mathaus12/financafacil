'use client';

import { useState, useMemo } from 'react';
import { isSameMonth, parseISO } from 'date-fns';
import type { Expense } from '@/lib/types';
import { useData } from '@/context/data-context';
import { ExpensesView } from '@/components/expenses-view';
import { ExpenseFilters, type Filters } from '@/components/expense-filters';
import { MonthNavigator } from '@/components/month-navigator';
import { AppLayout } from '@/components/app-layout';
import { ExpenseForm } from '@/components/expense-form';

export default function ExpensesPage() {
  const { 
    expenses, 
    addExpense,
    updateExpense,
    deleteExpense,
    bulkUpdatePaidStatus,
    bulkDeleteExpenses,
    salary,
    updateSalary,
  } = useData();

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const [filters, setFilters] = useState<Omit<Filters, 'dateRange'>>({
    category: 'Todos',
    paymentMethod: 'Todos',
    status: 'Todos',
  });

  const openAddSheet = () => {
    setExpenseToEdit(null);
    setSheetOpen(true);
  };

  const openEditSheet = (expense: Expense) => {
    setExpenseToEdit(expense);
    setSheetOpen(true);
  };

  const monthlyExpenses = useMemo(() => {
    const selectedDate = parseISO(currentDate);
    return expenses.filter(expense => {
      const expenseDate = parseISO(expense.date);
      return isSameMonth(selectedDate, expenseDate);
    });
  }, [expenses, currentDate]);

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

  const filteredMonthlyExpenses = useMemo(() => {
    return applyFilters(monthlyExpenses);
  }, [monthlyExpenses, filters]);

  return (
    <AppLayout onAddExpense={openAddSheet}>
      <div className="flex-1 space-y-4">
        <MonthNavigator currentDate={currentDate} onDateChange={setCurrentDate} />
        <ExpenseFilters onFilterChange={setFilters} />
        <ExpensesView
            expenses={filteredMonthlyExpenses}
            salary={salary}
            updateSalary={updateSalary}
            onEdit={openEditSheet}
            onDelete={deleteExpense}
            onBulkDelete={bulkDeleteExpenses}
            onBulkUpdatePaid={bulkUpdatePaidStatus}
          />
      </div>
      <ExpenseForm
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        addExpense={(data) => addExpense(data, () => setCurrentDate(data.date))}
        updateExpense={updateExpense}
        expenseToEdit={expenseToEdit}
      />
    </AppLayout>
  );
}
