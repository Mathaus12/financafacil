'use client';
import { useState } from 'react';
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
import { PaymentMethodForm } from './payment-method-form';
import type { PaymentMethod } from '@/lib/types';


export function PaymentMethodManager() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod, loading } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState<PaymentMethod | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<{isOpen: boolean, methodId: string | null}>({isOpen: false, methodId: null});

  const handleAdd = () => {
    setMethodToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (method: PaymentMethod) => {
    setMethodToEdit(method);
    setIsFormOpen(true);
  };

  const handleDelete = (methodId: string) => {
    setDeleteAlert({isOpen: true, methodId});
  };

  const confirmDelete = () => {
    if (deleteAlert.methodId) {
        deletePaymentMethod(deleteAlert.methodId);
    }
    setDeleteAlert({isOpen: false, methodId: null});
  }

  if (loading) {
    return <p>Carregando formas de pagamento...</p>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Forma de Pagamento
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
            {paymentMethods.map((method) => (
              <TableRow key={method.id}>
                <TableCell>{method.name}</TableCell>
                <TableCell>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(method)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(method.id)} className="text-destructive focus:text-destructive">
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

      <PaymentMethodForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        addPaymentMethod={addPaymentMethod}
        updatePaymentMethod={updatePaymentMethod}
        methodToEdit={methodToEdit}
      />

       <AlertDialog open={deleteAlert.isOpen} onOpenChange={(isOpen) => setDeleteAlert({isOpen, methodId: isOpen ? deleteAlert.methodId : null})}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente a forma de pagamento.
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
