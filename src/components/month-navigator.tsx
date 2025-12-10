"use client";

import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface MonthNavigatorProps {
  currentDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
}

export function MonthNavigator({
  currentDate,
  onDateChange,
}: MonthNavigatorProps) {
  
  const [year, month, day] = currentDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const handlePreviousMonth = () => {
    onDateChange(subMonths(dateObj, 1).toISOString().split('T')[0]);
  };

  const handleNextMonth = () => {
    onDateChange(addMonths(dateObj, 1).toISOString().split('T')[0]);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date.toISOString().split('T')[0]);
    }
  }

  const formattedDate = format(dateObj, "MMMM/yyyy", { locale: ptBR });

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="text-2xl font-bold capitalize tracking-tight p-2 h-auto">
            {formattedDate}
            <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateObj}
            onSelect={handleDateSelect}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handlePreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Mês anterior</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próximo mês</span>
        </Button>
      </div>
    </div>
  );
}
