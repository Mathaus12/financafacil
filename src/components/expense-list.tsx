'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';
import { ReceiptText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Expense } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { getCategoryIcon, getPaymentMethodIcon } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface ExpenseListProps {
  expenses: Expense[];
  selectedExpenses: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function ExpenseList({
  expenses,
  selectedExpenses,
  onSelectionChange,
}: ExpenseListProps) {

  const handleSelectAll = (checked: boolean) => {
    onSelectionChange(checked ? expenses.map((e) => e.id) : []);
  };

  const handleRowSelect = (expenseId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedExpenses, expenseId]
      : selectedExpenses.filter((id) => id !== expenseId);
    onSelectionChange(newSelection);
  };

  const isAllSelected = useMemo(() => {
    return expenses.length > 0 && selectedExpenses.length === expenses.length;
  }, [expenses, selectedExpenses]);

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-10 gap-4">
          <ReceiptText className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Nenhuma despesa este mês</h3>
          <p className="text-muted-foreground">
            Adicione sua primeira despesa para começar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] px-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  aria-label="Selecionar tudo"
                />
              </TableHead>
              <TableHead className="w-[50px] hidden sm:table-cell"></TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Pagamento</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => {
              const CategoryIcon = getCategoryIcon(expense.category);
              const PaymentIcon = getPaymentMethodIcon(expense.paymentMethod);
              const zonedDate = toZonedTime(expense.date, 'UTC');

              return (
                <TableRow
                  key={expense.id}
                  className={cn(
                    expense.paid && 'bg-green-100/40 dark:bg-green-900/20',
                    'cursor-pointer'
                  )}
                  data-state={selectedExpenses.includes(expense.id) && 'selected'}
                  onClick={() => {
                      const isSelected = selectedExpenses.includes(expense.id);
                      handleRowSelect(expense.id, !isSelected);
                  }}
                >
                  <TableCell className="px-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedExpenses.includes(expense.id)}
                      onCheckedChange={(checked) =>
                        handleRowSelect(expense.id, !!checked)
                      }
                      aria-label={`Selecionar despesa ${expense.description}`}
                    />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="font-medium">
                    {expense.description}
                    {expense.isRecurring ? (
                      <Badge variant="outline" className="ml-2">
                        Fixo
                      </Badge>
                    ) : (
                      expense.installments && (
                        <Badge variant="outline" className="ml-2">
                          {expense.installments.current}/
                          {expense.installments.total}
                        </Badge>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={expense.paid ? 'default' : 'secondary'}
                      className={cn(
                        expense.paid ? 'bg-green-600' : 'bg-orange-500',
                        'text-white'
                      )}
                    >
                      {expense.paid ? 'Pago' : 'Pendente'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {PaymentIcon && (
                        <PaymentIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span>
                        {expense.paymentMethod}{' '}
                        {expense.bank && `(${expense.bank})`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(zonedDate, 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
