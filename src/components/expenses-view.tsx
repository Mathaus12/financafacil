'use client';

import { useState } from "react";
import { Wallet, MinusCircle, DollarSign, CheckCircle, Landmark, Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseList } from "@/components/expense-list";
import { Input } from "@/components/ui/input";
import { formatCurrency, cn } from "@/lib/utils";
import type { Expense } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';


interface ExpensesViewProps {
    expenses: Expense[];
    salary: number;
    updateSalary: (salary: number) => void;
    onEdit: (expense: Expense) => void;
    onDelete: (expenseId: string, deleteFuture: boolean, installments: Expense['installments']) => Promise<void>;
    onBulkDelete: (ids: string[]) => void;
    onBulkUpdatePaid: (ids: string[], paid: boolean) => void;
}

export function ExpensesView({
    expenses,
    salary,
    updateSalary,
    onEdit,
    onDelete,
    onBulkDelete,
    onBulkUpdatePaid,
}: ExpensesViewProps) {
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
     const [deleteAlert, setDeleteAlert] = useState<{
        isOpen: boolean;
        expense: Expense | null;
      }>({ isOpen: false, expense: null });
    
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
    
    const totalPaidExpenses = expenses
        .filter(expense => expense.paid)
        .reduce((sum, expense) => sum + expense.amount, 0);

    const remainingBalance = salary - totalPaidExpenses;
    
    const handleBulkDelete = () => {
        if (selectedExpenses.length === 1) {
            const expense = expenses.find(exp => exp.id === selectedExpenses[0]);
            if (expense && (expense.isRecurring || (expense.installments && expense.installments.total > 1))) {
                setDeleteAlert({ isOpen: true, expense });
                return;
            }
        }
        onBulkDelete(selectedExpenses);
        setSelectedExpenses([]);
    };
    
    const confirmDelete = async (deleteFuture: boolean) => {
        if (deleteAlert.expense) {
            await onDelete(
                deleteAlert.expense.id,
                deleteFuture,
                deleteAlert.expense.installments
            );
        }
        setDeleteAlert({ isOpen: false, expense: null });
        setSelectedExpenses([]);
    };

    const handleBulkUpdatePaid = (paid: boolean) => {
        onBulkUpdatePaid(selectedExpenses, paid);
        setSelectedExpenses([]);
    };

    const handleEdit = () => {
        if (selectedExpenses.length !== 1) return;
        const expenseToEdit = expenses.find(exp => exp.id === selectedExpenses[0]);
        if (expenseToEdit) {
            onEdit(expenseToEdit);
            setSelectedExpenses([]);
        }
    }

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Salário Mensal</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            <Input
                                type="number"
                                placeholder="Seu salário"
                                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
                                value={salary || ""}
                                onChange={(e) => updateSalary(Number(e.target.value))}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(totalExpenses)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total de despesas do período
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(totalPaidExpenses)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Soma das contas pagas no período
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Saldo Restante</CardTitle>
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={cn(
                            "text-2xl font-bold",
                            remainingBalance > 0 ? "text-green-600" : "text-red-600"
                            )}>
                            {formatCurrency(remainingBalance)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Salário - despesas pagas
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-4" />

             <div className="space-y-4">
                 {selectedExpenses.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-muted/50 rounded-lg justify-between">
                         <p className="text-sm font-medium text-muted-foreground">
                            {selectedExpenses.length} item(s) selecionado(s)
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                            <Button size="sm" variant="outline" onClick={() => handleBulkUpdatePaid(true)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Pago
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleBulkUpdatePaid(false)}>
                                <MinusCircle className="mr-2 h-4 w-4" />
                                Não Pago
                            </Button>
                            {selectedExpenses.length === 1 && (
                                <Button size="sm" variant="outline" onClick={handleEdit}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                            </Button>
                        </div>
                    </div>
                 )}
                <h2 className="text-2xl font-bold tracking-tight">Despesas</h2>
                <ExpenseList
                    expenses={expenses}
                    selectedExpenses={selectedExpenses}
                    onSelectionChange={setSelectedExpenses}
                />
            </div>
             <AlertDialog
                open={deleteAlert.isOpen}
                onOpenChange={(isOpen) =>
                setDeleteAlert({ isOpen, expense: isOpen ? deleteAlert.expense : null })
                }
            >
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                    {deleteAlert.expense?.installments && !deleteAlert.expense.isRecurring &&
                        ' Esta é uma despesa parcelada.'}
                    {deleteAlert.expense?.isRecurring &&
                        ' Esta é uma despesa recorrente.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    {(deleteAlert.expense?.installments || deleteAlert.expense?.isRecurring) ? (
                    <>
                        <Button variant="outline" onClick={() => confirmDelete(false)}>Excluir só esta</Button>
                        <Button variant="destructive" onClick={() => confirmDelete(true)}>Excluir esta e futuras</Button>
                    </>
                    ) : (
                    <AlertDialogAction
                        onClick={() => confirmDelete(false)}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Confirmar Exclusão
                    </AlertDialogAction>
                    )}
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
