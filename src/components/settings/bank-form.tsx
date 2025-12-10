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
import type { Bank } from '@/lib/types';


const formSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
});

interface BankFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addBank: (data: { name: string }) => void;
  updateBank: (bank: Bank) => void;
  bankToEdit: Bank | null;
}

export function BankForm({
  isOpen,
  onOpenChange,
  addBank,
  updateBank,
  bankToEdit,
}: BankFormProps) {
  const isEditMode = !!bankToEdit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (bankToEdit) {
      form.reset({ name: bankToEdit.name });
    } else {
      form.reset({ name: '' });
    }
  }, [bankToEdit, form, isOpen]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode && bankToEdit) {
      updateBank({ ...bankToEdit, ...data });
    } else {
      addBank(data);
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Banco' : 'Adicionar Banco'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Banco</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Nubank" {...field} />
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
