'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, PlusCircle, LayoutDashboard, Wallet, ClipboardList, User as UserIcon } from 'lucide-react';
import { useUser } from '@/firebase';
import { useData } from '@/context/data-context';
import { getAuth } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: ReactNode;
  onAddExpense?: () => void;
}

const navItems = [
  { href: '/expenses', label: 'Despesas', icon: Wallet },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function AppLayout({ children, onAddExpense }: AppLayoutProps) {
  const { user, loading: userLoading } = useUser();
  const { userProfile, loading: dataLoading } = useData();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = userLoading || dataLoading;

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace('/login');
    }
  }, [user, userLoading, router]);

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    router.push('/login');
  };
  
  const firstName = userProfile?.name?.split(' ')[0];

  if (userLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando... Por favor, aguarde!</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar for desktop */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive && 'bg-muted text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile: Greeting or Logo */}
            <div className="md:hidden flex items-center gap-2">
              {firstName ? (
                <>
                  <Wallet className="h-7 w-7 text-primary" />
                  <span className="font-semibold text-lg">Olá, {firstName}</span>
                </>
              ) : (
                <Logo />
              )}
            </div>
            {/* Desktop: Greeting */}
            <div className="hidden md:block">
                {firstName ? <span className="font-semibold text-lg">Olá, {firstName}</span> : <Logo />}
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <div className="hidden md:block">
             {onAddExpense && (
                <Button onClick={onAddExpense} size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Despesa
                </Button>
             )}
            </div>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase() ?? '?'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Cadastros
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content & Footer Wrapper */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
              {isLoading ? (
                <div className="flex h-full flex-1 items-center justify-center">
                  <p>Carregando... Por favor, aguarde!</p>
                </div>
              ) : (
                children
              )}
          </main>
          
          {/* Bottom Bar for mobile */}
          <footer className="md:hidden sticky bottom-0 left-0 z-50 w-full border-t bg-background">
            <nav className="grid h-16 grid-cols-3 items-center justify-center text-xs">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex flex-col items-center gap-1 p-1 text-muted-foreground hover:text-primary',
                      isActive && 'text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-center">{label}</span>
                  </Link>
                )
              })}
              <div className="flex justify-center">
                  {onAddExpense && (
                      <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg"
                        onClick={onAddExpense}
                      >
                        <PlusCircle className="h-6 w-6" />
                        <span className="sr-only">Adicionar Despesa</span>
                      </Button>
                  )}
              </div>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
