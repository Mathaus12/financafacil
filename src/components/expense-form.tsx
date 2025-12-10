'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type Expense } from '@/lib/types';
import { Checkbox } from './ui/checkbox';
import { useData } from '@/context/data-context';
import { ScrollArea } from './ui/scroll-area';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const formSchema = z.object({
  description: z.string().min(2, 'A descrição deve ter pelo menos 2 caracteres.'),
  amount: z.coerce.number().positive('O valor deve ser positivo.'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida' }),
  category: z.string({ required_error: 'A categoria é obrigatória.' }),
  paymentMethod: z.string({ required_error: 'A forma de pagamento é obrigatória.' }),
  bank: z.string().optional(),
  paid: z.boolean().default(false),
  expenseType: z.enum(['single', 'installment', 'recurring']).default('single'),
  totalInstallments: z.coerce.number().min(1).max(100).default(1),
});

type ExpenseFormData = z.infer<typeof formSchema>;

interface ExpenseFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addExpense: (data: Omit<Expense, 'id' | 'installments'> & { totalInstallments: number }, onComplete?: () => void) => void;
  updateExpense: (expense: Expense, updateFuture: boolean, onComplete?: () => void) => Promise<void>;
  expenseToEdit: Expense | null;
}

export function ExpenseForm({
  isOpen,
  onOpenChange,
  addExpense,
  updateExpense,
  expenseToEdit,
}: ExpenseFormProps) {
  const isEditMode = !!expenseToEdit;
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, paymentMethods, banks, loading } = useData();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      paid: false,
      expenseType: 'single',
      totalInstallments: 1,
      bank: '',
    },
  });

  const expenseType = form.watch('expenseType');

  useEffect(() => {
    if (isOpen) {
      if (expenseToEdit) {
        let type: 'single' | 'installment' | 'recurring' = 'single';
        if (expenseToEdit.isRecurring) {
          type = 'recurring';
        } else if (expenseToEdit.installments && expenseToEdit.installments.total > 1) {
          type = 'installment';
        }

        form.reset({
          description: expenseToEdit.description,
          amount: expenseToEdit.amount,
          date: expenseToEdit.date.split('T')[0],
          category: expenseToEdit.category,
          paymentMethod: expenseToEdit.paymentMethod,
          bank: expenseToEdit.bank || '',
          paid: expenseToEdit.paid,
          expenseType: type,
          totalInstallments: expenseToEdit.installments?.total || 1,
        });
      } else {
        form.reset({
          description: '',
          amount: 0,
          date: new Date().toISOString().split('T')[0],
          category: undefined,
          paymentMethod: undefined,
          bank: '',
          paid: false,
          expenseType: 'single',
          totalInstallments: 1,
        });
      }
    }
  }, [expenseToEdit, isOpen, form]);

  const performSubmit = async (data: ExpenseFormData, updateFuture: boolean = false): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...data,
        isRecurring: data.expenseType === 'recurring',
        totalInstallments: data.expenseType === 'recurring' ? 100 : (data.expenseType === 'installment' ? data.totalInstallments : 1),
      };

      if (isEditMode && expenseToEdit) {
        const updatedData: Expense = {
          ...expenseToEdit,
          ...finalData,
        };
        await updateExpense(updatedData, updateFuture, () => onOpenChange(false));
      } else {
         addExpense(finalData, () => onOpenChange(false));
      }
      return true;
    } catch (error) {
      console.error("Falha ao enviar formulário", error);
      return false;
    } finally {
        setIsSubmitting(false);
    }
  };

  async function onSubmit(data: ExpenseFormData) {
    if (isEditMode && expenseToEdit?.installments && expenseToEdit.installments.total > 1) {
      setFormData(data);
      setShowUpdateAlert(true);
    } else {
       await performSubmit(data);
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>{isEditMode ? 'Editar Despesa' : 'Adicionar Despesa'}</SheetTitle>
            {isEditMode && expenseToEdit?.installments && !expenseToEdit.isRecurring && (
              <SheetDescription>
                Esta é a parcela {expenseToEdit.installments.current} de {expenseToEdit.installments.total}.
              </SheetDescription>
            )}
            {isEditMode && expenseToEdit?.isRecurring && (
              <SheetDescription>Esta é uma despesa fixa.</SheetDescription>
            )}
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Compras no supermercado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da Despesa</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.name}>
                              {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instituição / Banco</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ''}>
                        <FormControl>
                           <SelectTrigger disabled={loading}>
                            <SelectValue placeholder="Selecione o banco (opcional)..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.name}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4 rounded-md border p-4 shadow">
                  <FormField
                    control={form.control}
                    name="expenseType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tipo de Lançamento</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                            disabled={isEditMode}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="single" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Única</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="installment" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Parcelada</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="recurring" />
                              </FormControl>
                              <FormLabel className="font-normal">Despesa Fixa (Recorrente)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {expenseType === 'installment' && (
                    <FormField
                      control={form.control}
                      name="totalInstallments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Parcelas</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="2"
                              max="100"
                              {...field}
                              disabled={isEditMode}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="paid"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Marcar como paga</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <SheetFooter className="pt-4">
                   <SheetClose asChild>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                  </SheetClose>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar'}</Button>
                </SheetFooter>
              </form>
            </Form>
          </ScrollArea>
           {isEditMode && expenseToEdit?.installments && (
              <AlertDialog open={showUpdateAlert} onOpenChange={setShowUpdateAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Atualizar parcelas?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você deseja aplicar esta alteração somente para esta parcela ou para esta e todas as futuras?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <Button
                            variant="outline"
                            onClick={async () => {
                              if (!formData) return;
                              const success = await performSubmit(formData, false);
                              if (success) {
                                setShowUpdateAlert(false);
                                onOpenChange(false);
                              }
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Salvando...' : 'Apenas esta'}
                          </Button>
                          <Button
                            onClick={async () => {
                              if (!formData) return;
                              const success = await performSubmit(formData, true);
                              if (success) {
                                setShowUpdateAlert(false);
                                onOpenChange(false);
                              }
                            }}
                            disabled={isSubmitting}
                          >
                             {isSubmitting ? 'Salvando...' : 'Esta e as futuras'}
                          </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </SheetContent>
      </Sheet>
    </>
  );
}
