export interface Bank {
  id: string;
  name: string;
}

// These types are now for custom user-defined items
export interface Category {
  id: string;
  name: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category: string; // Now a string to match the name of the custom category
  paymentMethod: string; // Now a string to match the name of the custom payment method
  bank?: string;
  installments?: {
    total: number;
    current: number;
    parentId: string;
  } | null;
  paid: boolean;
  isRecurring: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  workplace?: string;
  position?: string;
  role?: string;
}
