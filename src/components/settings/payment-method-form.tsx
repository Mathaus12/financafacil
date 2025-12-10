'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { PaymentMethod } from '@/lib/types';


const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

interface PaymentMethodFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addPaymentMethod: (data: { name: string }) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  methodToEdit: PaymentMethod | null;
}

export function PaymentMethodForm({
  isOpen,
  onOpenChange,
  addPaymentMethod,
  updatePaymentMethod,
  methodToEdit,
}: PaymentMethodFormProps) {
  const isEditMode = !!methodToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (methodToEdit) {
      form.reset({ name: methodToEdit.name });
    } else {
      form.reset({ name: '' });
    }
  }, [methodToEdit, form, isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && methodToEdit) {
      updatePaymentMethod({ ...methodToEdit, ...data });
    } else {
      addPaymentMethod(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Forma de Pagamento' : 'Adicionar Forma de Pagamento'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Forma de Pagamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cartão de Crédito" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
