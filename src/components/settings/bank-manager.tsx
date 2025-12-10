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
import { BankForm } from './bank-form';
import type { Bank } from '@/lib/types';


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
