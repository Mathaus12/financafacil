"use client";

import { useState, useEffect } from "react";
import { X, Filter, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useData } from "@/context/data-context";
import { DateRange } from "react-day-picker";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

type Status = "Todos" | "Pago" | "Pendente";

export interface Filters {
  category: string;
  paymentMethod: string;
  status: Status;
  dateRange?: DateRange;
}

interface ExpenseFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export function ExpenseFilters({ onFilterChange }: ExpenseFiltersProps) {
  const { categories, paymentMethods, loading } = useData();

  const [category, setCategory] = useState<string>("Todos");
  const [paymentMethod, setPaymentMethod] = useState<string>("Todos");
  const [status, setStatus] = useState<Status>("Todos");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  useEffect(() => {
    onFilterChange({
      category,
      paymentMethod,
      status,
      dateRange,
    });
  }, [category, paymentMethod, status, dateRange, onFilterChange]);
  
  const resetFilters = () => {
    setCategory("Todos");
    setPaymentMethod("Todos");
    setStatus("Todos");
    setDateRange({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    });
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
        <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full md:w-[260px] justify-start text-left font-normal bg-card",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yy", { locale: ptBR })} -{" "}
                      {format(dateRange.to, "dd/MM/yy", { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yy", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <X className="h-4 w-4" />
            Limpar
        </Button>
      </div>
  );
}