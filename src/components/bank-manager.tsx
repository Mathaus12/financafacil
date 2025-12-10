'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useData } from '@/context/data-context';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
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

function BankForm({
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

export function BankManager() {
  const { banks, addBank, updateBank, deleteBank, loading } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bankToEdit, setBankToEdit] = useState<Bank | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{isOpen: boolean, bankId: string | null}>({isOpen: false, bankId: null});

  const handleAdd = () => {
    setBankToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (bank: Bank) => {
    setBankToEdit(bank);
    setIsFormOpen(true);
  };

  const handleDelete = (bankId: string) => {
    setDeleteAlert({isOpen: true, bankId});
  };

  const confirmDelete = () => {
    if (deleteAlert.bankId) {
        deleteBank(deleteAlert.bankId);
    }
    setDeleteAlert({isOpen: false, bankId: null});
  }

  if (loading) {
    return <p>Carregando bancos...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Banco
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(bank)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(bank.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <BankForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        addBank={addBank}
        updateBank={updateBank}
        bankToEdit={bankToEdit}
      />

       <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({isOpen, bankId: isOpen ? deleteAlert.bankId : null})}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o banco.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
