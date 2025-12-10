import { Wallet } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Wallet className="h-7 w-7 text-primary" />
      <span className="whitespace-nowrap text-xl font-bold tracking-tight">
        Finança Fácil
      </span>
    </div>
  );
}
