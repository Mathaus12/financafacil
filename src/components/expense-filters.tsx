"use client";

import { useState, useEffect } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useData } from "@/context/data-context";

type Status = "Todos" | "Pago" | "Pendente";

export interface Filters {
  category: string;
  paymentMethod: string;
  status: Status;
}

interface ExpenseFiltersProps {
  onFilterChange: (filters: Omit<Filters, 'dateRange'>) => void;
}

export function ExpenseFilters({ onFilterChange }: ExpenseFiltersProps) {
  const { categories, paymentMethods, loading } = useData();

  const [category, setCategory] = useState<string>("Todos");
  const [paymentMethod, setPaymentMethod] = useState<string>("Todos");
  const [status, setStatus] = useState<Status>("Todos");

  useEffect(() => {
    onFilterChange({
      category,
      paymentMethod,
      status,
    });
  }, [category, paymentMethod, status, onFilterChange]);
  
  const resetFilters = () => {
    setCategory("Todos");
    setPaymentMethod("Todos");
    setStatus("Todos");
  }

  return (
      <div className="flex flex-col md:flex-row items-center gap-2 py-4">
        <div className="flex items-center gap-2 font-semibold text-sm md:text-base">
            <Filter className="h-4 w-4" />
            Filtros
        </div>
        <Select value={category} onValueChange={setCategory} disabled={loading}>
          <SelectTrigger className="w-full md:w-[160px] bg-card">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Categorias</SelectItem>
            {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={loading}>
          <SelectTrigger className="w-full md:w-[160px] bg-card">
            <SelectValue placeholder="Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Pagamentos</SelectItem>
            {paymentMethods.map(method => <SelectItem key={method.id} value={method.name}>{method.name}</SelectItem>)}
          </SelectContent>
        </Select>
         <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
          <SelectTrigger className="w-full md:w-[120px] bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Status</SelectItem>
            <SelectItem value="Pago">Pago</SelectItem>
            <SelectItem value="Pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <X className="h-4 w-4" />
            Limpar
        </Button>
      </div>
  );
}
