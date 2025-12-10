'use client';
import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useUser, useFirestore, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useToast } from '@/hooks/use-toast';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  Timestamp,
  setDoc,
  deleteField,
} from 'firebase/firestore';
import { addMonths, startOfDay } from 'date-fns';

import type { Bank, Category, PaymentMethod, Expense, UserProfile } from '@/lib/types';

interface DataContextValue {
  // Data
  banks: Bank[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  expenses: Expense[];
  salary: number;
  userProfile: UserProfile | null;
  
  // Loading State
  loading: boolean;

  // Mutators
  addBank: (data: { name: string }) => void;
  updateBank: (bank: Bank) => void;
  deleteBank: (bankId: string) => void;

  addCategory: (data: { name: string }) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  addPaymentMethod: (data: { name: string }) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (methodId: string) => void;

  addExpense: (expenseData: Omit<Expense, "id" | "installments"> & { totalInstallments: number }, onComplete?: () => void) => void;
  updateExpense: (updatedExpense: Expense, updateFuture: boolean, onComplete?: () => void) => Promise<void>;
  deleteExpense: (expenseId: string, deleteFuture: boolean, installmentsInfo: Expense["installments"]) => Promise<void>;
  bulkUpdatePaidStatus: (expenseIds: string[], paid: boolean) => void;
  bulkDeleteExpenses: (expenseIds: string[]) => void;

  updateSalary: (newSalary: number) => void;
  updateUserProfile: (profileData: Omit<UserProfile, 'id'>) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const userId = user?.uid;

  // --- DATA FETCHING ---
  const banksQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'banks')) : null, [firestore, userId]);
  const { data: banksData, loading: banksLoading } = useCollection<Bank>(banksQuery);

  const categoriesQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'categories')) : null, [firestore, userId]);
  const { data: categoriesData, loading: categoriesLoading } = useCollection<Category>(categoriesQuery);

  const paymentMethodsQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'paymentMethods')) : null, [firestore, userId]);
  const { data: paymentMethodsData, loading: paymentMethodsLoading } = useCollection<PaymentMethod>(paymentMethodsQuery);

  const expensesQuery = useMemoFirebase(() => userId ? query(collection(firestore, 'users', userId, 'expenses')) : null, [firestore, userId]);
  const { data: expensesData, loading: expensesLoading } = useCollection<Expense>(expensesQuery);

  const salaryDocRef = useMemoFirebase(() => userId ? doc(firestore, "users", userId, "settings", "salary") : null, [userId, firestore]);
  const { data: salaryData, loading: salaryLoading } = useDoc<{amount: number}>(salaryDocRef);

  const profileDocRef = useMemoFirebase(() => userId ? doc(firestore, 'users', userId, 'profile', 'main') : null, [firestore, userId]);
  const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(profileDocRef);


  // --- DATA MEMOIZATION AND TRANSFORMATION ---
  const banks = useMemo(() => banksData ? [...banksData].sort((a, b) => a.name.localeCompare(b.name)) : [], [banksData]);
  const categories = useMemo(() => categoriesData ? [...categoriesData].sort((a, b) => a.name.localeCompare(b.name)) : [], [categoriesData]);
  const paymentMethods = useMemo(() => paymentMethodsData ? [...paymentMethodsData].sort((a, b) => a.name.localeCompare(b.name)) : [], [paymentMethodsData]);
  const salary = useMemo(() => salaryData?.amount || 0, [salaryData]);

  const expenses = useMemo(() => {
    if (!expensesData) return [];
    const sorted = expensesData.map(d => {
        const dateValue = d.date;
        let finalDate: string;
        if (dateValue instanceof Timestamp) finalDate = dateValue.toDate().toISOString().split('T')[0];
        else if (typeof dateValue === 'string') finalDate = dateValue;
        else if (dateValue && (dateValue as any).toDate) finalDate = (dateValue as any).toDate().toISOString().split('T')[0];
        else finalDate = new Date().toISOString().split('T')[0];
        return { ...d, date: finalDate };
    });
    return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expensesData]);

  const loading = banksLoading || categoriesLoading || paymentMethodsLoading || expensesLoading || salaryLoading || profileLoading;

  // --- MUTATORS (Generic CRUD for settings) ---
  const createCrudFunctions = <T extends {id: string, name: string}>(collectionName: string, singularName: string) => {
    const collectionRef = userId ? collection(firestore, 'users', userId, collectionName) : null;

    const addItem = (data: { name: string }) => {
      if (!collectionRef) return;
      const dataWithTimestamp = { ...data, createdAt: Timestamp.now() };
      addDoc(collectionRef, dataWithTimestamp).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} adicionado(a).` });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: dataWithTimestamp }));
        toast({ title: 'Erro!', description: `Não foi possível adicionar ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    const updateItem = (item: T) => {
      if (!userId) return;
      const { id, ...dataToUpdate } = item;
      const docRef = doc(firestore, 'users', userId, collectionName, id);
      updateDoc(docRef, dataToUpdate).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} atualizado(a).` });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'update', requestResourceData: dataToUpdate }));
        toast({ title: 'Erro!', description: `Não foi possível atualizar ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    const deleteItem = (itemId: string) => {
      if (!userId) return;
      const docRef = doc(firestore, 'users', userId, collectionName, itemId);
      deleteDoc(docRef).then(() => {
        toast({ title: 'Sucesso!', description: `${singularName} excluído(a).`, variant: 'destructive' });
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: docRef.path, operation: 'delete' }));
        toast({ title: 'Erro!', description: `Não foi possível excluir ${singularName.toLowerCase()}.`, variant: 'destructive' });
      });
    };

    return { addItem, updateItem, deleteItem };
  };

  const { addItem: addBank, updateItem: updateBank, deleteItem: deleteBank } = createCrudFunctions<Bank>('banks', 'Banco');
  const { addItem: addCategory, updateItem: updateCategory, deleteItem: deleteCategory } = createCrudFunctions<Category>('categories', 'Categoria');
  const { addItem: addPaymentMethod, updateItem: updatePaymentMethod, deleteItem: deletePaymentMethod } = createCrudFunctions<PaymentMethod>('paymentMethods', 'Forma de Pagamento');

  // --- EXPENSE MUTATORS ---
  const addExpense = (expenseData: Omit<Expense, "id" | "installments"> & { totalInstallments: number }, onComplete?: () => void) => {
    if (!firestore || !userId) return;
    const { totalInstallments, amount, date, isRecurring, ...rest } = expenseData;
    const collectionRef = collection(firestore, "users", userId, "expenses");
  
    const cleanData: any = { ...rest };
    if (!cleanData.bank) {
      delete cleanData.bank;
    }
  
    if (totalInstallments > 1) {
      const batch = writeBatch(firestore);
      const parentId = doc(collection(firestore, "tmp")).id;
      const entryAmount = isRecurring ? amount : amount / totalInstallments;
      const baseDate = startOfDay(new Date(date));
  
      for (let i = 0; i < totalInstallments; i++) {
        const entryDate = addMonths(baseDate, i);
        const newDocRef = doc(collectionRef);
        const newEntry: Omit<Expense, 'id'> = {
          ...cleanData,
          amount: entryAmount,
          date: entryDate.toISOString().split('T')[0],
          paid: i === 0 ? expenseData.paid : false,
          isRecurring: isRecurring || false,
          installments: { parentId, current: i + 1, total: totalInstallments },
        };
        batch.set(newDocRef, newEntry);
      }
      batch.commit().then(() => {
        if (!isRecurring) toast({ title: "Sucesso!", description: `${totalInstallments} parcelas foram adicionadas.` });
        onComplete?.();
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: { details: `Batch write for ${totalInstallments} installments.` } }));
        toast({ title: "Erro de Permissão!", description: "Não foi possível adicionar as despesas parceladas.", variant: 'destructive' });
      });
    } else {
      const expensePayload: any = { ...cleanData, amount, date, isRecurring: isRecurring || false, paid: expenseData.paid };
      addDoc(collectionRef, expensePayload).then(() => {
        if (!isRecurring) toast({ title: "Sucesso!", description: "Sua despesa foi adicionada." });
        onComplete?.();
      }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: collectionRef.path, operation: 'create', requestResourceData: expensePayload }));
        toast({ title: "Erro!", description: "Ocorreu um erro ao adicionar a despesa.", variant: 'destructive' });
      });
    }
  };

  const updateExpense = async (updatedExpense: Expense, updateFuture: boolean, onComplete?: () => void): Promise<void> => {
    if (!firestore || !userId) {
      throw new Error("Firestore ou usuário não disponível.");
    }
  
    const { id, ...dataToUpdate } = { ...updatedExpense };
    if (!dataToUpdate.bank) {
      (dataToUpdate as any).bank = deleteField();
    }
  
    try {
      if (updateFuture && dataToUpdate.installments) {
        const batch = writeBatch(firestore);
        const { parentId, current } = dataToUpdate.installments;
        const q = query(collection(firestore, "users", userId, "expenses"), where("installments.parentId", "==", parentId));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
          const docData = docSnap.data();
          if (docData.installments && docData.installments.current >= current) {
            const docRef = doc(firestore, "users", userId, "expenses", docSnap.id);
            // Destructure to remove fields that should not be batch updated on all future items
            const { id: expenseId, installments, paid, date, ...baseUpdateData} = dataToUpdate;
            
            if (docSnap.id === id) { 
              // Update the current doc with all changes
              batch.update(docRef, { ...baseUpdateData, paid, date });
            } else { 
              // Only update shared fields for future docs
              const futureUpdateData: any = {
                description: baseUpdateData.description,
                amount: baseUpdateData.isRecurring ? baseUpdateData.amount : docData.amount,
                category: baseUpdateData.category,
                paymentMethod: baseUpdateData.paymentMethod,
              };
              if (baseUpdateData.bank) {
                  futureUpdateData.bank = baseUpdateData.bank;
              } else {
                  futureUpdateData.bank = deleteField();
              }
              batch.update(docRef, futureUpdateData);
            }
          }
        });
        await batch.commit();
        toast({ title: "Sucesso!", description: "Parcelas atualizadas." });
      } else {
        const { installments, ...singleDataToUpdate } = dataToUpdate;
        const docRef = doc(firestore, "users", userId, "expenses", id);
        await updateDoc(docRef, singleDataToUpdate);
        toast({ title: "Sucesso!", description: "Despesa atualizada." });
      }
      onComplete?.();
    } catch (e) {
      const pathForError = `/users/${userId}/expenses/${updatedExpense.id}`;
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: pathForError, operation: 'update', requestResourceData: dataToUpdate }));
      toast({ title: "Erro!", description: "Ocorreu um erro ao atualizar a despesa.", variant: 'destructive' });
      throw e; // Re-throw the error to be caught by the caller
    }
  };

  const deleteExpense = async (expenseId: string, deleteFuture: boolean, installmentsInfo: Expense["installments"]): Promise<void> => {
    if (!firestore || !userId) return;
    
    const expenseToDelete = expenses.find(exp => exp.id === expenseId);
    if (!expenseToDelete) return;
    
    const isRecurring = expenseToDelete.isRecurring;
    const isInstallment = !!installmentsInfo;

    try {
        if (deleteFuture && (isInstallment || isRecurring)) {
            const batch = writeBatch(firestore);
            // We must use the parentId from the expense to be deleted
            const parentId = expenseToDelete.installments?.parentId;
            const currentInstallment = expenseToDelete.installments?.current || 0;
            
            if (!parentId) {
                // This case handles a single recurring expense that might not have a parentId yet.
                // Or if something went wrong. Just delete the single one.
                 const docRef = doc(firestore, "users", userId, "expenses", expenseId);
                 await deleteDoc(docRef);
                 toast({ title: "Sucesso!", description: "Despesa removida.", variant: 'destructive' });
                 return;
            }

            const q = query(collection(firestore, "users", userId, "expenses"), where("installments.parentId", "==", parentId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(docSnap => {
                const docData = docSnap.data();
                if (docData.installments && docData.installments.current >= currentInstallment) {
                    batch.delete(docSnap.ref);
                }
            });
            await batch.commit();
            toast({ title: "Sucesso!", description: "Despesa e futuras ocorrências foram removidas.", variant: 'destructive' });
        } else {
            const docRef = doc(firestore, "users", userId, "expenses", expenseId);
            await deleteDoc(docRef);
            if (!isRecurring) toast({ title: "Sucesso!", description: "Despesa removida.", variant: 'destructive' });
        }
    } catch (e) {
        const pathForError = `/users/${userId}/expenses/${expenseId}`;
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: pathForError, operation: 'delete' }));
        toast({ title: "Erro!", description: "Ocorreu um erro ao remover a despesa.", variant: 'destructive' });
        throw e;
    }
  };

  const bulkUpdatePaidStatus = async (expenseIds: string[], paid: boolean) => {
    if (!firestore || !userId) return;
    const batch = writeBatch(firestore);
    expenseIds.forEach(id => {
      const docRef = doc(firestore, "users", userId, "expenses", id);
      batch.update(docRef, { paid });
    });
    try {
        await batch.commit();
        toast({ title: "Sucesso!", description: `${expenseIds.length} despesa(s) foram atualizadas.` });
    } catch(e) {
        toast({ title: "Erro!", description: "Ocorreu um erro ao atualizar as despesas.", variant: 'destructive' });
    }
  };

  const bulkDeleteExpenses = async (expenseIds: string[]) => {
    if (!firestore || !userId) return;
    const batch = writeBatch(firestore);
    
    expenseIds.forEach(id => {
        const docRef = doc(firestore, "users", userId, "expenses", id);
        batch.delete(docRef);
    });

    try {
        await batch.commit();
        toast({ title: "Sucesso!", description: `${expenseIds.length} despesa(s) foram removidas.`, variant: 'destructive' });
    } catch (e) {
        toast({ title: "Erro!", description: "Ocorreu um erro ao remover as despesas.", variant: 'destructive' });
    }
  };

  // --- SALARY MUTATOR ---
  const updateSalary = async (newSalary: number) => {
    if (!salaryDocRef) return;
    const data = { amount: newSalary };
    setDoc(salaryDocRef, data, { merge: true }).catch(e => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: salaryDocRef.path, operation: 'update', requestResourceData: data }));
        toast({ title: "Erro!", description: "Não foi possível atualizar o salário.", variant: "destructive" });
    });
  };

  // --- PROFILE MUTATOR ---
  const updateUserProfile = (profileData: Omit<UserProfile, 'id'>) => {
    if (!profileDocRef) return;
    setDoc(profileDocRef, profileData, { merge: true }).catch(e => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({ path: profileDocRef.path, operation: 'update', requestResourceData: profileData }));
      toast({ title: "Erro!", description: "Não foi possível atualizar o perfil.", variant: "destructive" });
    });
  };

  // --- CONTEXT VALUE ---
  const value = useMemo(() => ({
    banks,
    categories,
    paymentMethods,
    expenses,
    salary,
    userProfile,
    loading,
    addBank,
    updateBank,
    deleteBank,
    addCategory,
    updateCategory,
    deleteCategory,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    addExpense,
    updateExpense,
    deleteExpense,
    bulkUpdatePaidStatus,
    bulkDeleteExpenses,
    updateSalary,
    updateUserProfile,
  }), [banks, categories, paymentMethods, expenses, salary, userProfile, loading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
