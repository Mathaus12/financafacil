import {
  Car,
  UtensilsCrossed,
  Home,
  HeartPulse,
  Film,
  GraduationCap,
  Shirt,
  MoreHorizontal,
  CreditCard,
  Landmark,
  Wallet,
  Smartphone,
  Barcode,
  HelpCircle, // Default icon
  type LucideIcon,
} from "lucide-react";

// This is now a mapping of keywords to icons for dynamic matching.
// The key should be a lowercase, normalized version of the category name.
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  alimentacao: UtensilsCrossed,
  comida: UtensilsCrossed,
  restaurante: UtensilsCrossed,
  moradia: Home,
  casa: Home,
  aluguel: Home,
  transporte: Car,
  carro: Car,
  uber: Car,
  saude: HeartPulse,
  medico: HeartPulse,
  farmacia: HeartPulse,
  lazer: Film,
  entretenimento: Film,
  educacao: GraduationCap,
  estudo: GraduationCap,
  vestuario: Shirt,
  roupas: Shirt,
  cartao: CreditCard,
  outros: MoreHorizontal,
};

// This is now a mapping of keywords to icons for dynamic matching.
const PAYMENT_METHOD_ICON_MAP: Record<string, LucideIcon> = {
  credito: CreditCard,
  debito: Landmark,
  dinheiro: Wallet,
  pix: Smartphone,
  boleto: Barcode,
};

const normalizeString = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const getCategoryIcon = (categoryName: string): LucideIcon => {
    if (!categoryName) {
        return HelpCircle;
    }
    const normalizedName = normalizeString(categoryName);
    const keywords = Object.keys(CATEGORY_ICON_MAP);
    const foundKeyword = keywords.find(keyword => normalizedName.includes(keyword));
    return foundKeyword ? CATEGORY_ICON_MAP[foundKeyword] : HelpCircle;
};

export const getPaymentMethodIcon = (methodName: string): LucideIcon => {
    if (!methodName) {
        return CreditCard;
    }
    const normalizedName = normalizeString(methodName);
    const keywords = Object.keys(PAYMENT_METHOD_ICON_MAP);
    const foundKeyword = keywords.find(keyword => normalizedName.includes(keyword));
    return foundKeyword ? PAYMENT_METHOD_ICON_MAP[foundKeyword] : CreditCard;
};
